"use server";

import { z } from "zod";
import { dbConnect } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { verifyRecaptcha } from "@/lib/recaptcha";

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => EMAIL_RE.test(value)),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{8,15}$/.test(value)),
  destination: z.string().optional(),
  studyLevel: z.string().optional(),
  message: z.string().max(2000).optional(),
  service: z.string().optional(),
  university: z.string().optional(),
  website: z.string().optional(),
});

const appointmentSchema = leadSchema.extend({
  date: z.string().min(8),
  purpose: z.enum(["counselling", "inquiry"]),
  mode: z.enum(["in-person", "online"]),
  location: z.enum(["online", "dar", "reading"]),
  captcha: z.string().min(10),
});

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "local";
}

export async function submitEnquiry(formData: FormData) {
  if (!rateLimit(`enquiry:${await clientKey()}`)) {
    return { ok: false, error: "Please wait a moment and try again." };
  }
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: "Please check the form fields." };
  if (parsed.data.website) return { ok: true };
  if (process.env.RECAPTCHA_SECRET_KEY) {
    const human = await verifyRecaptcha(String(formData.get("captcha") ?? ""));
    if (!human) return { ok: false, error: "captcha" };
  }
  const conn = await dbConnect();
  if (!conn) return { ok: false, error: "offline" };
  const { Enquiry } = await import("@/models/enquiry");
  await Enquiry.create({
    ...parsed.data,
    source: "contact",
    status: "new",
  });
  return { ok: true };
}

export async function submitAppointment(formData: FormData) {
  if (!rateLimit(`appt:${await clientKey()}`)) {
    return { ok: false, error: "Please wait a moment and try again." };
  }
  const parsed = appointmentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: "Please check the form fields." };
  if (parsed.data.website) return { ok: true };
  const human = await verifyRecaptcha(parsed.data.captcha);
  if (!human) return { ok: false, error: "captcha" };
  const { captcha: _captcha, ...booking } = parsed.data;
  const [year, month, dayNum] = booking.date.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, dayNum)).getUTCDay();
  if (weekday === 0 || weekday === 6) return { ok: false, error: "Weekdays only." };
  const conn = await dbConnect();
  if (!conn) return { ok: false, error: "offline" };
  const { Appointment } = await import("@/models/appointment");
  try {
    await Appointment.create({
      ...booking,
      status: "pending",
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "taken" };
  }
}
