import { savePost } from "@/actions/admin";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudinaryField } from "./cloudinary-field";

export function PostForm({
  post,
}: {
  post?: {
    _id?: string;
    slug: string;
    title: string;
    excerpt?: string;
    content?: string;
    category?: string;
    tags?: string[];
    coverUrl?: string;
    publishedAt?: string;
    published?: boolean;
  };
}) {
  return (
    <form
      className="grid max-w-2xl gap-4"
      action={async (fd) => {
        "use server";
        await savePost(fd);
        redirect("/admin/posts");
      }}
    >
      <input type="hidden" name="id" defaultValue={post?._id} />
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={post?.title} className="h-10" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required defaultValue={post?.slug} className="h-10" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content">Content (HTML)</Label>
        <Textarea id="content" name="content" rows={10} defaultValue={post?.content} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" defaultValue={post?.category} className="h-10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma)</Label>
          <Input id="tags" name="tags" defaultValue={post?.tags?.join(", ")} className="h-10" />
        </div>
      </div>
      <CloudinaryField name="coverUrl" label="Cover image" defaultValue={post?.coverUrl} />
      <div className="grid gap-2">
        <Label htmlFor="publishedAt">Publish date</Label>
        <Input
          id="publishedAt"
          name="publishedAt"
          type="date"
          defaultValue={post?.publishedAt?.slice(0, 10)}
          className="h-10"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={post?.published !== false} />
        Published
      </label>
      <Button type="submit" className="rounded-full">
        Save
      </Button>
    </form>
  );
}
