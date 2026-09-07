import { requireAdminSession } from "@/lib/admin-guard";
import { PostForm } from "@/components/admin/post-form";

export default async function NewPostPage() {
  await requireAdminSession();
  return (
    <div>
      <h1 className="mb-6 font-heading text-3xl">New post</h1>
      <PostForm />
    </div>
  );
}
