import { getLocale, getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export async function FaqSection() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as "en" | "sw";

  return (
    <section className="section-pad mx-auto w-[min(800px,calc(100%-2rem))]">
      <h2 className="heading-soft font-heading text-3xl text-foreground md:text-[2.35rem]">{t("faqTitle")}</h2>
      <Accordion className="mt-10 gap-3 text-foreground">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-2xl border-none px-4 not-last:border-b-0 sm:px-5">
            <AccordionTrigger>{faq.q[locale]}</AccordionTrigger>
            <AccordionContent>{faq.a[locale]}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
