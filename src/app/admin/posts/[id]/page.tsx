import { notFound } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-guard";
import { dbConnect } from "@/lib/db";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const conn = await dbConnect();
  if (!conn) notFound();
  const { Post } = await import("@/models/post");
  const doc = await Post.findById(id).lean();
  if (!doc) notFound();

  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">Edit post</h1>
      <PostForm
        post={{
          _id: String(doc._id),
          slug: doc.slug,
          title: doc.title,
          excerpt: doc.excerpt,
          content: doc.content,
          category: doc.category,
          tags: doc.tags,
          coverUrl: doc.coverUrl,
          publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : "",
          published: doc.published,
        }}
      />
    </div>
  );
}
