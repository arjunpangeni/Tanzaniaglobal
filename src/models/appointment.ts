import { Schema, models, model } from "mongoose";

const AppointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    destination: String,
    studyLevel: String,
    message: String,
    date: { type: String, required: true },
    purpose: { type: String, enum: ["counselling", "inquiry"], default: "counselling" },
    mode: { type: String, enum: ["in-person", "online"], default: "online" },
    location: { type: String, enum: ["online", "dar", "reading"], default: "online" },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "cancelled"],
    },
  },
  { timestamps: true }
);

AppointmentSchema.index({ date: 1 });

export const Appointment =
  models.Appointment || model("Appointment", AppointmentSchema);
