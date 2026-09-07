import { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: String,
    content: String,
    category: String,
    tags: [String],
    coverUrl: String,
    locale: { type: String, default: "en" },
    publishedAt: Date,
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PostSchema.index({ published: 1, publishedAt: -1 });
PostSchema.index({ published: 1, slug: 1 });

export const Post = models.Post || model("Post", PostSchema);
