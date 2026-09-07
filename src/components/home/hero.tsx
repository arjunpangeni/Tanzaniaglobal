"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeroCtas } from "@/components/home/hero-ctas";

const POSTER =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=75";

export function HomeHero() {
  const t = useTranslations("home");
  const [playVideo, setPlayVideo] = useState(false);
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setPlayVideo(Boolean(videoUrl) && !reduce && !mobile);
  }, [videoUrl]);

  return (
    <section className="relative mx-auto mt-3 w-[min(1180px,calc(100%-1rem))] overflow-hidden rounded-[1.25rem] min-h-[70vh] sm:mt-4 sm:w-[min(1180px,calc(100%-1.25rem))] sm:min-h-[78vh] sm:rounded-[2rem]">
      {playVideo && videoUrl ? (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={POSTER}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-[#12161c]/92 via-[#12161c]/55 to-[#12161c]/15" />
      <div className="relative flex min-h-[70vh] flex-col justify-end gap-5 px-4 py-10 text-white sm:min-h-[78vh] sm:gap-7 sm:px-7 sm:py-14 md:px-14 md:py-20">
        <h1 className="heading-on-media max-w-4xl font-heading text-[1.65rem] leading-[1.28] text-balance text-white sm:text-[2.35rem] lg:text-[2.85rem] lg:leading-[1.25]">
          {t("heroTitle")}
        </h1>
        <p className="subheading-on-media max-w-xl text-[1.02rem] leading-[1.7] text-pretty text-white md:text-lg">
          {t("heroBody")}
        </p>
        <HeroCtas />
      </div>
    </section>
  );
}
