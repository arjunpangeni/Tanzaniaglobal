import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPost, getPosts } from "@/lib/data";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const t = await getTranslations("common");

  return (
    <article className="mx-auto w-[min(760px,calc(100%-2rem))] py-20">
      <p className="text-xs font-semibold tracking-wide text-tz-blue-deep uppercase">
        {post.category} · {post.publishedAt}
      </p>
      <h1 className="mt-4 font-heading text-4xl text-balance text-foreground">{post.title}</h1>
      <p className="mt-5 leading-relaxed text-muted-foreground">{t("swNote")}</p>
      <div
        className="mt-10 max-w-full space-y-5 overflow-x-auto break-words text-muted-foreground [&_a]:text-primary [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_p]:leading-[1.8] [&_pre]:overflow-x-auto [&_strong]:text-foreground [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
