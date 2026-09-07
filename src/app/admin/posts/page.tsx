import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-guard";
import { dbConnect } from "@/lib/db";
import { deletePost } from "@/actions/admin";
import { seedPosts } from "@/content/posts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminPostsPage() {
  await requireAdminSession();
  const conn = await dbConnect();
  let posts: { _id?: string; slug: string; title: string; publishedAt?: string }[] = [];
  if (conn) {
    const { Post } = await import("@/models/post");
    const docs = await Post.find().sort({ createdAt: -1 }).lean();
    posts = docs.map((d) => ({
      _id: String(d._id),
      slug: d.slug,
      title: d.title,
      publishedAt: d.publishedAt ? new Date(d.publishedAt).toISOString().slice(0, 10) : "",
    }));
  }
  if (!posts.length) posts = seedPosts.map((p) => ({ slug: p.slug, title: p.title, publishedAt: p.publishedAt }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl">Blog posts</h1>
        <Link href="/admin/posts/new" className={cn(buttonVariants())}>
          New post
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card text-foreground">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Date</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.slug} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3 text-muted-foreground">{p.slug}</td>
                <td className="p-3">{p.publishedAt}</td>
                <td className="p-3 text-right">
                  {p._id ? (
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/posts/${p._id}`} className="underline">
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deletePost(p._id!);
                        }}
                      >
                        <button className="text-destructive underline" type="submit">
                          Delete
                        </button>
                      </form>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Seed only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
