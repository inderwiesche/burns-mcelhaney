import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui";
import {
  agency,
  carriers,
  faqs,
  featuredProducts,
  getOfficeStatus,
  google,
  testimonials,
} from "@/data/site";
import { agencyGraph, JsonLd, pageHead } from "@/lib/seo";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead({
      title: "Insurance Agent in Pittsburg, TX | Auto, Home & Farm | Burns McElhaney",
      description:
        "Independent insurance agent in Pittsburg, Texas. Auto, home, poultry house, farm, and business. Germania and Progressive. Cammy McElhaney at 208 Lafayette. Call (903) 856-3422.",
      path: "/",
      image: "/images/flag.jpg",
      imageAlt: "American flag on a lawn under a summer sky",
    }),
});

function OpenBadge() {
  const [status, setStatus] = useState(() => getOfficeStatus());
  useEffect(() => {
    setStatus(getOfficeStatus());
    const id = window.setInterval(() => setStatus(getOfficeStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-pine-deep/40 px-3 py-1 text-xs font-medium text-paper">
      <span className={status.open ? "size-1.5 rounded-full bg-sage" : "size-1.5 rounded-full bg-paper/40"} />
      {status.label} · {status.today}
    </span>
  );
}

function Home() {
  return (
    <main>
      <JsonLd data={agencyGraph()} />

      <section className="relative isolate min-h-[70svh] overflow-hidden bg-pine-deep text-paper md:min-h-[88svh]">
        <img
          src="/images/flag.jpg"
          alt="American flag on a lawn under a summer sky"
          width={1920}
          height={1308}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-top outline-none md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/80 via-black/30 to-black/25" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-center px-4 py-28 sm:px-6 md:min-h-[88svh] md:justify-end md:pb-16 md:pt-28">
          <OpenBadge />
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-sage">
            Independent insurance · Pittsburg, Texas
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
            Coverage that knows East Texas.
          </h1>
          <p className="mt-5 max-w-xl text-base text-paper/80 sm:text-lg">
            You will talk to Cammy McElhaney or Lori Richardson — auto, home, farm, and business from 208 Lafayette.
            Germania, Progressive, and whoever else the risk actually needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="invert">
              <Link to="/quote">
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="invertOutline">
              <a href={agency.phoneHref}>
                <Phone className="size-4" />
                {agency.phone}
              </a>
            </Button>
          </div>
          <dl className="mt-10 grid gap-6 border-t border-paper/15 pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-sage">Since</dt>
              <dd className="mt-1 font-display text-2xl">1980</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-sage">On Google</dt>
              <dd className="mt-1 font-display text-2xl">
                <a href={google.mapsPlace} className="hover:underline">
                  {google.rating} from neighbors
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-sage">Markets</dt>
              <dd className="mt-1 font-display text-2xl">Germania & Progressive</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">How we help</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium sm:text-5xl">
          We are in the business of helping people.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Save money", d: "Shop the carriers we already represent — including Germania and Progressive — instead of hoping one company’s price is the only price." },
            { n: "02", t: "Reduce risk", d: "Businesses, farms, and poultry houses need more than a downloaded form. We write the coverage to the operation." },
            { n: "03", t: "Protect the future", d: "Families, farms, and shops stay standing when a claim, a death, or a storm shows up. That is the whole job." },
          ].map((item) => (
            <article key={item.n} className="rounded-2xl bg-paper p-6 shadow-[var(--shadow-border)] sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{item.n}</p>
              <h3 className="mt-4 font-display text-2xl font-medium">{item.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.d}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-12 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Coverage</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">What we place.</h2>
          </div>
          <Link to="/insurance" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-forest">
            See all coverage
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              to="/insurance/$slug"
              params={{ slug: product.slug }}
              className="group overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)]"
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                width={1728}
                height={1152}
                className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{product.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-medium">{product.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{product.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The family</p>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
              Since 1998 we have protected Pittsburg like our own.
            </h2>
            <p className="mt-5 text-ink-soft">
              You will talk to Cammy McElhaney or Lori Richardson. Benny opened the Germania desk in 1980; Cammy came
              home in 1998 and Lori left Dallas in 2004 to sit beside her sister. If you are not thrilled with your
              current insurance, that is a reason to call.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/about">
                  The whole story
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
          <img
            src="/images/family-tractor.jpg"
            alt="The Burns McElhaney family on a tractor in front of a blue farmhouse"
            className="aspect-4/3 w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Carriers</p>
        <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
          We’re proud to represent great insurance carriers like:
        </h2>
        <p className="mt-4 max-w-2xl text-ink-soft">
          We work for you, not one company. These are markets we already write — and we will shop others when the risk
          needs it.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {carriers.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-32 items-center justify-center rounded-2xl bg-paper px-6 py-8 shadow-[var(--shadow-border)]"
            >
              <img src={c.image} alt={c.name} className="max-h-16 w-auto max-w-full object-contain outline-none" />
            </a>
          ))}
        </div>
      </section>

      <section className="bg-pine-deep text-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage">From Camp County</p>
          <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">What neighbors wrote on Google.</h2>
          <p className="mt-4 max-w-2xl text-paper/70">
            {google.rating} out of 5 from {google.reviewCount} Google reviews — the words below are theirs.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-paper/10 bg-pine p-6 sm:p-8">
                <div className="flex gap-0.5 text-sage" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 font-display text-xl leading-snug text-paper/95">“{t.quote}”</p>
                <footer className="mt-5 text-sm text-sage">
                  {t.name} · {t.source}
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="invert">
              <Link to="/quote">
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="invertOutline">
              <a href={agency.phoneHref}>
                <Phone className="size-4" />
                {agency.phone}
              </a>
            </Button>
          </div>
          <a
            href={google.writeReview}
            className="mt-5 inline-flex min-h-11 items-center text-sm text-paper/55 underline-offset-4 hover:text-sage hover:underline"
          >
            Already with the office? Leave a Google review.
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Questions</p>
        <h2 className="mt-3 font-display text-4xl font-medium">Questions we get.</h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                {item.q}
                <span className="text-muted group-open:hidden">+</span>
                <span className="hidden text-muted group-open:inline">–</span>
              </summary>
              <p className="mt-2 max-w-2xl pb-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-medium">Call the desk, or send a request.</h2>
            <ul className="mt-8 space-y-4 text-ink-soft">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 text-forest" />
                <span>
                  {agency.fullAddress}
                  <br />
                  <a href={agency.mapsUrl} className="text-forest underline-offset-4 hover:underline">
                    Directions
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 text-forest" />
                <a href={agency.phoneHref} className="hover:underline">
                  {agency.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 text-forest" />
                <span>
                  Mon–Thu 8:30am – 5:00pm
                  <br />
                  Friday 8:30am – 3:00pm
                </span>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={agency.phoneHref}>
                  <Phone className="size-4" />
                  Call now
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/quote">Request a quote</Link>
              </Button>
            </div>
          </div>
          <iframe
            title="Map of Burns McElhaney Agency"
            src={agency.mapsEmbed}
            className="h-80 w-full rounded-2xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
