import { ArrowRight, Check, ClipboardList, FileSearch, Home, Route, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { ContactBlock, PageIntro, SectionEyebrow, SiteShell } from "@/components/site-shell";
import { useI18n } from "@/lib/i18n";

const fallbackServices = [
  { slug: "vorpruefung", name: "Digitale Vorprüfung", price: "Kostenlos", description: "Eine strukturierte erste Einordnung, damit du weisst, was jetzt sinnvoll ist.", features: ["Fallaufnahme in klaren Schritten", "Erste Einschätzung der Dringlichkeit", "Antwort innert eines Werktags"] },
  { slug: "diagnose", name: "Professionelle Diagnose", price: "Auf Anfrage", description: "Wir schauen genauer hin und besprechen die Ursache direkt mit dir.", features: ["Technische Diagnose vor Ort", "Verständliche Erklärung", "Transparenter Vorschlag für das weitere Vorgehen"] },
  { slug: "begleitung", name: "Reparaturbegleitung", price: "Auf Anfrage", description: "Von der ersten Offerte bis zur Abholung: eine Person, die den Überblick behält.", features: ["Offerten gemeinsam einordnen", "Koordination mit Partnerbetrieben", "Rückfragen ohne Umwege"] },
];

export default function Services() {
  const { t } = useI18n();
  const query = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  const localizedServices = [
    { slug: "vorpruefung", name: t("services.digital"), price: t("services.free"), description: t("services.digitalText"), features: [t("services.feature1"), t("services.feature2"), t("services.feature3")] },
    { slug: "diagnose", name: t("services.diagnosis"), price: t("services.request"), description: t("services.diagnosisText"), features: [t("services.feature4"), t("services.feature5"), t("services.feature6")] },
    { slug: "begleitung", name: t("services.companion"), price: t("services.request"), description: t("services.companionText"), features: [t("services.feature7"), t("services.feature8"), t("services.feature9")] },
  ];
  const services = query.data?.length ? query.data.map((service, index) => ({ ...service, ...localizedServices[index] })) : localizedServices;
  return (
    <SiteShell>
       <PageIntro eyebrow={t("services.eyebrow")} title={t("services.title")} description={t("services.intro")} />
      <section className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8 lg:py-20">
         {query.isLoading ? <div className="grid gap-5 md:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse rounded-[22px] bg-[#d6e2e3]" data-testid={`skeleton-service-${item}`} />)}</div> : query.isError ? <div className="rounded-[22px] border border-[#edb8a9] bg-[#fff0eb] p-6 text-[#854334]" data-testid="error-services">{t("services.error")}</div> : <div className="grid gap-5 md:grid-cols-3">{services.map((service, index) => <article key={service.slug} className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-[22px] border p-7 transition-transform hover:-translate-y-1 ${index === 1 ? "border-[#23384a] bg-[#23384a] text-[#edf3f2]" : "border-[#cbdadc] bg-[#f5f8f7]"}`} data-testid={`card-service-${service.slug}`}><div className="flex items-start justify-between"><span className={`grid h-11 w-11 place-items-center rounded-2xl ${index === 1 ? "bg-[#f6a15a] text-[#23384a]" : "bg-[#d6e8e7] text-[#438a88]"}`}>{index === 0 ? <ClipboardList size={20} /> : index === 1 ? <FileSearch size={20} /> : <Route size={20} />}</span><span className={`font-mono-ui text-[10px] uppercase tracking-[.14em] ${index === 1 ? "text-[#f6a15a]" : "text-[#438a88]"}`}>{service.price}</span></div><h2 className="mt-12 font-display text-2xl font-bold tracking-[-.045em]">{service.name}</h2><p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-[#b9cbd0]" : "text-[#63777d]"}`}>{service.description}</p><ul className="mt-auto space-y-3 border-t border-current/15 pt-5">{service.features.map((feature) => <li key={feature} className="flex gap-2 text-xs font-semibold"><Check size={15} className={index === 1 ? "text-[#f6a15a]" : "text-[#438a88]"} />{feature}</li>)}</ul></article>)}</div>}
      </section>
      <section className="bg-[#d6e8e7]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-20">
          <div><SectionEyebrow>Was wir nicht tun</SectionEyebrow><h2 className="mt-4 max-w-md font-display text-4xl font-bold leading-[.98] tracking-[-.06em]">Wir verkaufen dir keine Gewissheit.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#5c717a]">Eine digitale Vorprüfung ersetzt keine technische Diagnose. Sie hilft dir aber, die Lage einzuschätzen und die richtige Frage zu stellen.</p></div>
          <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[20px] bg-[#eaf4f2] p-6"><ShieldCheck className="text-[#438a88]" size={22} /><p className="mt-6 font-display text-xl font-bold">Ehrlich markiert</p><p className="mt-2 text-sm leading-6 text-[#63777d]">Was wahrscheinlich ist, bleibt eine Einschätzung. Was geprüft werden muss, sagen wir genauso klar.</p></div><div className="rounded-[20px] bg-[#eaf4f2] p-6"><Home className="text-[#438a88]" size={22} /><p className="mt-6 font-display text-xl font-bold">Regional gedacht</p><p className="mt-2 text-sm leading-6 text-[#63777d]">Wir kennen die Wege, die Bedingungen und die Menschen in Thun und im Berner Oberland.</p></div></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24"><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><div className="rounded-[22px] bg-[#f6a15a] p-8 sm:p-10"><SectionEyebrow>Passt zu deiner Situation?</SectionEyebrow><h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[.96] tracking-[-.06em]">Beginne dort, wo du gerade bist.</h2><Link href="/problem-melden" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#23384a] px-5 py-3.5 text-sm font-extrabold text-[#edf3f2]" data-testid="link-services-report">Problem melden <ArrowRight size={17} /></Link></div><ContactBlock /></div></section>
    </SiteShell>
  );
}