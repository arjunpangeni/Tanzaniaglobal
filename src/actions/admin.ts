"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth, isAdminEmail } from "@/lib/auth";
import { dbConnect } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) throw new Error("Unauthorized");
  const conn = await dbConnect();
  if (!conn) throw new Error("Database is not configured");
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const { Post } = await import("@/models/post");
  const id = String(formData.get("id") || "");
  const payload = {
    slug: String(formData.get("slug")),
    title: String(formData.get("title")),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    category: String(formData.get("category") || "Notes"),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    coverUrl: String(formData.get("coverUrl") || ""),
    locale: "en",
    published: formData.get("published") === "on",
    publishedAt: new Date(String(formData.get("publishedAt") || Date.now())),
  };
  if (id) await Post.findByIdAndUpdate(id, payload);
  else await Post.create(payload);
  revalidateTag("posts", "max");
  revalidatePath("/resources");
  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const { Post } = await import("@/models/post");
  await Post.findByIdAndDelete(id);
  revalidateTag("posts", "max");
  revalidatePath("/resources");
  revalidatePath("/admin/posts");
}

export async function saveUniversity(formData: FormData) {
  await requireAdmin();
  const { University } = await import("@/models/university");
  const id = String(formData.get("id") || "");
  const payload = {
    slug: String(formData.get("slug")),
    name: String(formData.get("name")),
    country: String(formData.get("country")),
    countrySlug: String(formData.get("countrySlug")),
    city: String(formData.get("city")),
    ranking: Number(formData.get("ranking") || 0),
    rankingTier: String(formData.get("rankingTier") || "college"),
    logoUrl: String(formData.get("logoUrl") || ""),
    coverUrl: String(formData.get("coverUrl") || ""),
    overview: String(formData.get("overview") || ""),
    tuitionMin: Number(formData.get("tuitionMin") || 0),
    tuitionMax: Number(formData.get("tuitionMax") || 0),
    programs: String(formData.get("programs") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    fields: String(formData.get("fields") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    requirements: String(formData.get("requirements") || ""),
    scholarships: String(formData.get("scholarships") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    published: formData.get("published") === "on",
  };
  if (id) await University.findByIdAndUpdate(id, payload);
  else await University.create(payload);
  revalidateTag("universities", "max");
  revalidatePath("/universities");
  revalidatePath("/admin/universities");
}

export async function deleteUniversity(id: string) {
  await requireAdmin();
  const { University } = await import("@/models/university");
  await University.findByIdAndDelete(id);
  revalidateTag("universities", "max");
  revalidatePath("/universities");
  revalidatePath("/admin/universities");
}

export async function updateEnquiryStatus(id: string, status: string) {
  await requireAdmin();
  const { Enquiry } = await import("@/models/enquiry");
  await Enquiry.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/enquiries");
}

export async function updateAppointmentStatus(id: string, status: string) {
  await requireAdmin();
  const { Appointment } = await import("@/models/appointment");
  await Appointment.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/appointments");
}
