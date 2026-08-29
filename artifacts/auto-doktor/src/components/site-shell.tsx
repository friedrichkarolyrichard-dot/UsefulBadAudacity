import { ArrowUpRight, ChevronRight, Clock3, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useI18n, type Locale } from "@/lib/i18n";

export function Logo() {
  const { t } = useI18n();
  return (
    <Link href="/" className="group inline-flex items-center gap-3" data-testid="link-logo">
      <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#f6a15a] text-[#23384a] shadow-[0_5px_0_#d97b38] transition-transform group-hover:-translate-y-0.5" data-testid="logo-mark">
        <Wrench size={20} strokeWidth={2.5} />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[18px] font-bold tracking-[-.04em] text-[#eaf0f1]">AUTO DOKTOR</span>
         <span className="mt-1 block font-mono-ui text-[9px] uppercase tracking-[.18em] text-[#9eafb8]">{t("brand.region")}</span>
      </span>
    </Link>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { locale, setLocale, t } = useI18n();
  const active = (path: string) => location === path;
  return (
    <div className="page-grain min-h-[100dvh] bg-[#eaf0f1] text-[#23384a]">
      <header className="relative z-10 border-b border-[#d3dfe1] bg-[#23384a]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 lg:px-8">
          <Logo />
           <nav className="hidden items-center gap-1 md:flex" aria-label={t("nav.home")}>
            {[
               ["/", t("nav.home")],
               ["/services", t("nav.services")],
               ["/kontakt", t("nav.contact")],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${active(href) ? "bg-[#314b5f] text-[#f6a15a]" : "text-[#b9c7cc] hover:bg-[#314b5f] hover:text-[#f3f6f5]"}`}
                data-testid={`link-nav-${label.toLowerCase()}`}
              >
                {label}
              </Link>
            ))}
          </nav>
           <div className="flex items-center gap-2">
             <div className="hidden items-center gap-0.5 rounded-full border border-[#527080] p-0.5 sm:flex" aria-label={t("language.label")}>
               {(["de", "en", "hu"] as Locale[]).map((item) => <button type="button" key={item} onClick={() => setLocale(item)} className={`rounded-full px-2 py-1 font-mono-ui text-[9px] font-bold uppercase tracking-[.08em] transition-colors ${locale === item ? "bg-[#f6a15a] text-[#23384a]" : "text-[#b9c7cc] hover:text-[#f3f6f5]"}`} aria-pressed={locale === item}>{item}</button>)}
             </div>
             <Link href="/problem-melden" className="group inline-flex items-center gap-2 rounded-full bg-[#f6a15a] px-4 py-2.5 text-[12px] font-extrabold text-[#23384a] shadow-[0_4px_0_#d97b38] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_0_#d97b38]" data-testid="link-header-problem">
               {t("nav.report")} <ArrowUpRight size={15} />
             </Link>
           </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-[#23384a] text-[#d5e1e3]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div>
            <Logo />
             <p className="mt-6 max-w-sm text-sm leading-6 text-[#a7bbc2]">{t("footer.tagline")}</p>
             <div className="mt-6 flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#f6a15a]"><span className="h-2 w-2 rounded-full bg-[#62c7a1]" /> {t("footer.response")}</div>
          </div>
          <div>
             <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[#849da8]">{t("footer.direct")}</p>
            <div className="mt-4 grid gap-3 text-sm">
               <Link href="/problem-melden" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-problem">{t("nav.report")}</Link>
               <Link href="/services" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-services">{t("nav.services")}</Link>
               <Link href="/kontakt" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-contact">{t("footer.region")}</Link>
            </div>
          </div>
          <div>
             <p className="font-mono-ui text-[10px] uppercase tracking-[.18em] text-[#849da8]">{t("footer.legal")}</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/datenschutz" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-privacy">Datenschutz</Link>
              <Link href="/impressum" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-imprint">Impressum</Link>
              <Link href="/agb" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-terms">AGB</Link>
               <Link href="/ai-disclaimer" className="transition-colors hover:text-[#f6a15a]" data-testid="link-footer-ai">{t("footer.ai")}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#3b5262]">
          <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 px-5 py-5 text-[11px] text-[#849da8] sm:flex-row lg:px-8">
            <span data-testid="text-footer-copyright">© {new Date().getFullYear()} AUTO DOKTOR</span>
            <span data-testid="text-footer-location">Thun, Bern · Schweiz</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`font-mono-ui text-[10px] font-medium uppercase tracking-[.2em] ${light ? "text-[#f6a15a]" : "text-[#438a88]"}`}>{children}</p>;
}

export function TrustStrip() {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[#d3dfe1] pt-5 text-[11px] font-bold text-[#5c717a]">
      <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#438a88]" /> {t("trust.noRemoteDiagnosis")}</span>
      <span className="inline-flex items-center gap-2"><Clock3 size={15} className="text-[#438a88]" /> {t("trust.response")}</span>
      <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#438a88]" /> {t("trust.region")}</span>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <section className="border-b border-[#d3dfe1] bg-[#eaf0f1]">
      <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.7rem,6vw,5.5rem)] font-bold leading-[.96] tracking-[-.065em] text-[#23384a]">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#5c717a]">{description}</p>
      </div>
    </section>
  );
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-1 text-sm font-bold text-[#438a88] transition-colors hover:text-[#23384a]" data-testid="link-back"><ChevronRight size={16} className="rotate-180" />{children}</Link>;
}

export function ContactBlock() {
  const { t } = useI18n();
  return (
    <div className="rounded-[22px] bg-[#d6e8e7] p-6 sm:p-8">
      <SectionEyebrow>{t("contact.eyebrow")}</SectionEyebrow>
      <h3 className="mt-3 font-display text-2xl font-bold tracking-[-.04em]">{t("contact.title")}</h3>
      <p className="mt-3 text-sm leading-6 text-[#4f676f]">{t("contact.text")}</p>
      <a href="tel:+41332270000" className="mt-6 inline-flex items-center gap-2 font-mono-ui text-sm font-medium text-[#23384a]" data-testid="link-phone-contact"><Phone size={16} /> +41 33 227 00 00</a>
    </div>
  );
}