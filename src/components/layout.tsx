import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { agency, directoryProducts, google, nav } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui";

function useSolidHeader(overlay: boolean) {
  const [solid, setSolid] = useState(!overlay);
  useEffect(() => {
    if (!overlay) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);
  return solid;
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/";
  const solid = useSolidHeader(overlay);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,backdrop-filter] duration-200",
        solid
          ? "border-b border-line bg-canvas/95 text-ink backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-paper",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-h-11 items-center gap-2.5">
          <img src="/logo.svg" alt="" className="size-9 outline-none sm:size-10" />
          <span className="leading-tight">
            <span className="block font-display text-base font-medium tracking-tight sm:text-lg">
              Burns McElhaney
            </span>
            <span
              className={cn(
                "block text-xs font-medium uppercase tracking-[0.16em]",
                solid ? "text-muted" : "text-paper/70",
              )}
            >
              Independent Insurance
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium",
                solid ? "hover:bg-paper" : "hover:bg-paper/10",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={agency.phoneHref}
            className={cn(
              "hidden min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium sm:inline-flex",
              solid ? "text-forest hover:bg-paper" : "text-paper hover:bg-paper/10",
            )}
          >
            <Phone className="size-4" />
            {agency.phone}
          </a>
          <Button asChild size="sm" variant={solid ? "solid" : "invert"} className="hidden md:inline-flex">
            <Link to="/quote">Get a quote</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          className={cn(
            "border-t lg:hidden",
            solid ? "border-line bg-canvas" : "border-paper/15 bg-pine-deep text-paper",
          )}
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-12 items-center border-b border-current/10 text-base font-medium last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <a href={agency.phoneHref} className="mt-3 flex min-h-12 items-center gap-2 text-base font-medium">
              <Phone className="size-4" />
              {agency.phone}
            </a>
            <Button asChild className="mt-3">
              <Link to="/quote">Get a quote</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-pine-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="" className="size-9 outline-none" />
            <span className="font-display text-xl font-medium">Burns McElhaney Agency</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">{agency.blurb}</p>
          <p className="mt-3 text-sm text-paper/55">{agency.sinceLine}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage">Visit</p>
          <p className="mt-3 text-sm leading-relaxed">
            {agency.addressLine}
            <br />
            {agency.city}, {agency.state} {agency.zip}
          </p>
          <a
            href={agency.mapsUrl}
            className="mt-2 inline-flex min-h-11 items-center text-sm text-sage underline-offset-4 hover:underline"
          >
            Get directions
          </a>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage">Hours</p>
          <p className="mt-3 text-sm leading-relaxed">
            Mon–Thu 8:30am – 5:00pm
            <br />
            Friday 8:30am – 3:00pm
            <br />
            Weekend closed
          </p>
          <div className="mt-4 flex flex-col items-start">
            <a href={agency.phoneHref} className="inline-flex min-h-11 items-center text-sm text-sage">
              {agency.phone}
            </a>
            <a href={`mailto:${agency.email}`} className="inline-flex min-h-11 items-center text-sm text-sage">
              {agency.email}
            </a>
            <a
              href={google.mapsPlace}
              className="inline-flex min-h-11 items-center text-sm text-sage underline-offset-4 hover:underline"
            >
              Google reviews
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-paper/10 px-4 py-8 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage">Coverage in Pittsburg, TX</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {directoryProducts.map((p) => (
            <li key={p.slug}>
              <Link
                to="/insurance/$slug"
                params={{ slug: p.slug }}
                className="inline-flex min-h-11 items-center text-sm text-paper/70 hover:text-paper"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-paper/45 sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Burns McElhaney Agency. Independent insurance, Pittsburg, Texas.</p>
          <p>Quotes are requests, not binders. Coverage is subject to underwriting.</p>
        </div>
      </div>
    </footer>
  );
}

export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="outline">
          <a href={agency.phoneHref}>
            <Phone className="size-4" />
            Call
          </a>
        </Button>
        <Button asChild>
          <Link to="/quote">Get a quote</Link>
        </Button>
      </div>
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-canvas text-ink">
      <SiteHeader />
      <div className="flex-1 pb-24 md:pb-0">{children}</div>
      <SiteFooter />
      <MobileCallBar />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate min-h-[52vh] overflow-hidden bg-pine-deep pt-16 text-paper sm:min-h-[58vh]">
      <img src={image} alt={imageAlt} className="absolute inset-0 size-full object-cover outline-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/70 to-pine-deep/35" />
      <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-paper/80 sm:text-lg">{lede}</p>
      </div>
    </section>
  );
}
