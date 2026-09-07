import mongoose from "mongoose";
import { seedUniversities } from "../src/content/universities";
import { seedPosts } from "../src/content/posts";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Set MONGODB_URI before seeding.");
  process.exit(1);
}
const mongoUri: string = uri;

const UniversitySchema = new mongoose.Schema({}, { strict: false });
const PostSchema = new mongoose.Schema({}, { strict: false });

async function main() {
  await mongoose.connect(mongoUri);
  const University = mongoose.models.University || mongoose.model("University", UniversitySchema);
  const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

  for (const u of seedUniversities) {
    await University.updateOne({ slug: u.slug }, { $set: u }, { upsert: true });
  }
  for (const p of seedPosts) {
    await Post.updateOne(
      { slug: p.slug },
      { $set: { ...p, published: true, publishedAt: new Date(p.publishedAt) } },
      { upsert: true }
    );
  }
  console.log(`Seeded ${seedUniversities.length} universities and ${seedPosts.length} posts.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
