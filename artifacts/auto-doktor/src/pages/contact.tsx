import { Clock3, Mail, MapPin, Phone, Send, TrainFront } from "lucide-react";
import { Link } from "wouter";
import { PageIntro, SectionEyebrow, SiteShell } from "@/components/site-shell";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <PageIntro eyebrow={t("contact.eyebrowPage")} title={t("contact.pageTitle")} description={t("contact.pageIntro")} />
      <section className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[24px] bg-[#23384a] p-8 text-[#edf3f2] sm:p-10"><SectionEyebrow light>{t("contact.reach")}</SectionEyebrow><h2 className="mt-4 font-display text-3xl font-bold tracking-[-.05em]">{t("contact.reachTitle")}</h2><div className="mt-10 grid gap-6"><div className="flex gap-4"><Phone className="mt-1 text-[#f6a15a]" size={19} /><div><p className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-[#91aab3]">{t("contact.phone")}</p><p className="mt-1 block text-sm font-bold">[Telefonnummer folgt]</p><p className="mt-1 text-xs text-[#91aab3]">{t("contact.hours")}</p></div></div><div className="flex gap-4"><Mail className="mt-1 text-[#f6a15a]" size={19} /><div><p className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-[#91aab3]">{t("contact.email")}</p><p className="mt-1 block text-sm font-bold">[E-Mail folgt]</p></div></div><div className="flex gap-4"><Clock3 className="mt-1 text-[#f6a15a]" size={19} /><div><p className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-[#91aab3]">{t("contact.responseTime")}</p><p className="mt-1 text-sm font-bold" data-testid="text-contact-response">{t("contact.withinDay")}</p></div></div></div></div>
          <div className="grid gap-5 sm:grid-cols-2"><div className="rounded-[24px] border border-[#cbdadc] bg-[#f5f8f7] p-7 sm:p-9"><MapPin className="text-[#438a88]" size={23} /><h2 className="mt-10 font-display text-2xl font-bold tracking-[-.04em]">{t("contact.area")}</h2><p className="mt-3 text-sm leading-6 text-[#63777d]">{t("contact.areaText")}</p><div className="mt-8 rounded-xl bg-[#d6e8e7] p-3 font-mono-ui text-[10px] uppercase tracking-[.13em] text-[#438a88]" data-testid="text-service-area">{t("contact.areaPending")}</div></div><div className="rounded-[24px] border border-[#cbdadc] bg-[#f5f8f7] p-7 sm:p-9"><TrainFront className="text-[#438a88]" size={23} /><h2 className="mt-10 font-display text-2xl font-bold tracking-[-.04em]">{t("contact.location")}</h2><p className="mt-3 text-sm leading-6 text-[#63777d]">{t("contact.locationText")}</p><div className="mt-8 rounded-xl bg-[#d6e8e7] p-3 font-mono-ui text-[10px] uppercase tracking-[.13em] text-[#438a88]" data-testid="text-location-placeholder">{t("contact.locationPending")}</div></div><div className="rounded-[24px] bg-[#f6a15a] p-7 sm:col-span-2 sm:p-9"><Send className="text-[#23384a]" size={23} /><h2 className="mt-10 font-display text-2xl font-bold tracking-[-.04em] text-[#23384a]">{t("contact.noDetour")}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#3c5360]">{t("contact.noDetourText")}</p><Link href="/problem-melden" className="mt-7 inline-flex items-center rounded-full bg-[#23384a] px-5 py-3.5 text-sm font-extrabold text-[#edf3f2]" data-testid="link-contact-report">{t("home.startIntake")}</Link></div></div>
        </div>
      </section>
    </SiteShell>
  );
}