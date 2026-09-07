import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/lib/data";
import { PageHero } from "@/components/layout/page-hero";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResourcesPage() {
  const t = await getTranslations("resources");
  const cta = await getTranslations("cta");
  const posts = await getPosts();

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] space-y-14 pb-24">
        <div className="grid max-w-sm gap-6">
          {[{ href: "/resources/ielts-calculator", title: t("ielts") }].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition hover:-translate-y-0.5">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">{item.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        <section>
          <h2 className="font-heading text-3xl text-foreground">{t("blog")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/resources/blog/${post.slug}`} className="group">
                <article className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative h-40 w-full">
                    <Image
                      src={post.coverUrl}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-tz-blue-deep">{post.category}</p>
                    <h3 className="mt-2 font-heading text-xl group-hover:underline">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs">{cta("readMore")}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
