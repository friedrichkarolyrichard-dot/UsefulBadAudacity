import { ArrowDownRight, ArrowRight, Check, CircleAlert, Gauge, HandHeart, MapPin, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Link } from "wouter";
import { SectionEyebrow, SiteShell, TrustStrip } from "@/components/site-shell";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-[#23384a] text-[#edf3f2]">
        <div className="absolute -right-24 -top-32 h-[480px] w-[480px] rounded-full border-[70px] border-[#314b5f] opacity-60" />
        <div className="absolute bottom-[-160px] left-[46%] h-[380px] w-[380px] rounded-full border-[1px] border-[#f6a15a]/30" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-24">
          <div className="animate-rise">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#527080] px-3 py-1.5 font-mono-ui text-[10px] uppercase tracking-[.17em] text-[#b9cbd0]" data-testid="status-availability"><span className="h-2 w-2 rounded-full bg-[#62c7a1]" /> {t("home.area")}</div>
            <h1 className="max-w-3xl font-display text-[clamp(3.8rem,8.5vw,8.4rem)] font-bold leading-[.86] tracking-[-.075em]">{t("home.heroTitle")}</h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[#b9cbd0]">{t("home.heroText")}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/problem-melden" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#f6a15a] px-6 py-4 text-sm font-extrabold text-[#23384a] shadow-[0_5px_0_#d97b38] transition-all hover:-translate-y-1 hover:shadow-[0_7px_0_#d97b38]" data-testid="link-hero-problem">{t("nav.report")} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#527080] px-6 py-4 text-sm font-bold text-[#edf3f2] transition-colors hover:border-[#f6a15a] hover:text-[#f6a15a]" data-testid="link-hero-services">{t("home.services")} <ArrowDownRight size={17} /></Link>
            </div>
            <div className="mt-10 max-w-xl border-t border-[#3f5b6b] pt-5"><TrustStrip /></div>
          </div>
          <div className="animate-rise-delay relative mx-auto w-full max-w-[450px]">
            <div className="relative rounded-[30px] bg-[#d6e8e7] p-5 text-[#23384a] shadow-2xl shadow-[#142735]/40 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#b9d1d1] pb-5">
                 <div><p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[#438a88]">{t("home.intake")}</p><p className="mt-1 font-display text-xl font-bold">{t("home.sort")}</p></div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#23384a] text-[#f6a15a]"><Gauge size={21} /></div>
              </div>
              <div className="space-y-5 py-6">
                {["1", "2", "3"].map((number) => {
                  const copy = number === "1" ? [t("home.question1"), t("home.sub1")] : number === "2" ? [t("home.question2"), t("home.sub2")] : [t("home.question3"), t("home.sub3")];
                  return (
                    [number.padStart(2, "0"), copy[0], copy[1]]
                  );
                }).map(([num, title, sub]) => (
                  <div className="flex gap-4" key={num}><span className="font-mono-ui text-[11px] text-[#438a88]">{num}</span><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-[#5c717a]">{sub}</p></div><Check size={16} className="ml-auto mt-0.5 text-[#438a88]" /></div>
                ))}
              </div>
               <div className="rounded-2xl bg-[#23384a] p-4 text-[#edf3f2]"><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#f6a15a]">{t("home.advantage")}</p><p className="mt-2 text-sm leading-5 text-[#c2d2d5]">{t("home.advantageText")}</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
           <div><SectionEyebrow>{t("home.eyebrow")}</SectionEyebrow><h2 className="mt-4 max-w-md font-display text-4xl font-bold leading-[.98] tracking-[-.06em] sm:text-5xl">{t("home.title")}</h2></div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
             {[
               [CircleAlert, t("home.listenTitle"), t("home.listenText")],
               [ShieldCheck, t("home.knowTitle"), t("home.knowText")],
               [HandHeart, t("home.careTitle"), t("home.careText")],
               [MapPin, t("home.localTitle"), t("home.localText")],
             ].map(([Icon, title, text], index) => <div key={title as string} className="border-t border-[#cbdadc] pt-5"><Icon size={21} className="text-[#438a88]" /><h3 className="mt-4 font-display text-xl font-bold tracking-[-.03em]">{title as string}</h3><p className="mt-2 text-sm leading-6 text-[#63777d]">{text as string}</p><span className="mt-5 block font-mono-ui text-[10px] text-[#9aabad]">0{index + 1}</span></div>)}
          </div>
        </div>
      </section>
      <section className="bg-[#f6a15a]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-20">
           <div><SectionEyebrow>{t("home.firstStep")}</SectionEyebrow><h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[.95] tracking-[-.06em] text-[#23384a] sm:text-6xl">{t("home.reportTitle")}</h2><p className="mt-5 max-w-lg text-base leading-7 text-[#3c5360]">{t("home.reportText")}</p></div>
           <Link href="/problem-melden" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#23384a] px-6 py-4 text-sm font-extrabold text-[#edf3f2] transition-transform hover:-translate-y-1" data-testid="link-cta-report">{t("home.startIntake")} <ArrowRight size={18} /></Link>
        </div>
      </section>
      <section className="bg-[#d6e8e7]">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
           <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><SectionEyebrow>{t("home.process")}</SectionEyebrow><h2 className="mt-3 font-display text-4xl font-bold tracking-[-.06em]">Vom Problem zur Richtung.</h2></div><Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-[#438a88]" data-testid="link-process-services">{t("home.processLink")} <ArrowRight size={16} /></Link></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-[#b9d1d1] bg-[#b9d1d1] md:grid-cols-3">
             {[[t("home.step1"), t("home.step1Text")], [t("home.step2"), t("home.step2Text")], [t("home.step3"), t("home.step3Text")]].map(([title, text], index) => <div key={title} className="bg-[#e5f0ef] p-7 sm:p-9"><span className="font-mono-ui text-[11px] text-[#438a88]">0{index + 1}</span><h3 className="mt-12 font-display text-2xl font-bold tracking-[-.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#5c717a]">{text}</p></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
           <div className="rounded-[24px] bg-[#23384a] p-8 text-[#edf3f2] sm:p-12"><Sparkles size={24} className="text-[#f6a15a]" /><p className="mt-14 max-w-lg font-display text-3xl font-bold leading-[1.05] tracking-[-.05em] sm:text-4xl">{t("home.quote")}</p><div className="mt-10 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#438a88] font-bold text-sm">ML</span><span className="text-sm text-[#b9cbd0]">Martin L. · Thun</span></div></div>
           <div className="flex flex-col justify-between rounded-[24px] border border-[#cbdadc] p-8 sm:p-12"><Wrench size={24} className="text-[#438a88]" /><div><h3 className="mt-14 font-display text-3xl font-bold tracking-[-.05em]">{t("home.workshopTitle")}</h3><p className="mt-4 text-sm leading-6 text-[#63777d]">{t("home.workshopText")}</p><Link href="/kontakt" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#438a88]" data-testid="link-home-contact">{t("home.speak")} <ArrowRight size={16} /></Link></div></div>
        </div>
      </section>
    </SiteShell>
  );
}