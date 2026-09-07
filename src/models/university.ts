import { Schema, models, model } from "mongoose";

const UniversitySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    countrySlug: { type: String, required: true },
    city: { type: String, required: true },
    ranking: { type: Number, default: 0 },
    rankingTier: { type: String, default: "college" },
    logoUrl: String,
    coverUrl: String,
    overview: String,
    tuitionMin: Number,
    tuitionMax: Number,
    programs: [String],
    fields: [String],
    requirements: String,
    scholarships: [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UniversitySchema.index({ published: 1, countrySlug: 1 });
UniversitySchema.index({ published: 1, rankingTier: 1 });
UniversitySchema.index({ published: 1, fields: 1 });
UniversitySchema.index({ published: 1, name: 1 });

export const University =
  models.University || model("University", UniversitySchema);
