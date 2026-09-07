import { Schema, models, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    destination: String,
    studyLevel: String,
    message: String,
    service: String,
    university: String,
    source: { type: String, default: "contact" },
    status: { type: String, default: "new", enum: ["new", "contacted", "closed"] },
  },
  { timestamps: true }
);

export const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);
