import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { agency, team } from "@/data/site";
import { breadcrumbGraph, JsonLd, pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: About,
  head: () =>
    pageHead({
      title: "About the Agency | Insurance in Pittsburg, TX | Burns McElhaney",
      description:
        "Meet the independent insurance agents at 208 Lafayette Street in Pittsburg, Texas. Family office since 1980. Germania, Progressive, and more.",
      path: "/about",
      image: "/images/family-tractor.jpg",
      imageAlt: "The Burns McElhaney family on a tractor in front of a blue farmhouse",
    }),
});

const timeline = [
  {
    year: "1980",
    title: "Benny Burns opens the office",
    copy: "A Germania agency on Lafayette Street. Benny’s insurance life had started decades earlier, at 18. Pittsburg got a hometown office that knew farm and family business as well as auto.",
  },
  {
    year: "1998",
    title: "Cammy comes home to the books",
    copy: "Benny’s daughter Cammy joined in 1998 and gave the agency the name it still carries. The work did not change. The sign did.",
  },
  {
    year: "2004",
    title: "Lori leaves Dallas",
    copy: "Lori Richardson moved back from Dallas to work alongside her sister. Two generations, one office, and a shared idea that you answer the phone like the person on the other end is family.",
  },
  {
    year: "Today",
    title: "Still independent, still here",
    copy: "Germania, Progressive, and the other markets we need. Auto, home, life, business, and the poultry-house work that never did fit a call center. If you are not thrilled with your current insurance, contact us today.",
  },
];

function About() {
  return (
    <main>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Burns McElhaney Agency",
          url: `${SITE_URL}/about`,
          mainEntity: { "@id": `${SITE_URL}/#agency` },
        }}
      />
      <PageHero
        eyebrow="The agency"
        title="A family office on Lafayette Street."
        lede="Since 1998 our insurance agency has served Pittsburg and the surrounding Texas communities by protecting the people we work with just like we protect our own family members."
        image="/images/family-tractor.jpg"
        imageAlt="The Burns McElhaney family on a tractor in front of a blue farmhouse"
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-lg leading-relaxed text-ink-soft">
          We take great pride in the quality of service we provide. Whether you need help filing a claim, processing a
          payment, or just understanding the coverage you already have — we will be there. We know our clients and we
          know insurance, so you get the peace of mind that comes with an agency that can help regardless of how big,
          small, unique, or specific the need is.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          With the years of experience in this office, there is not much we have not seen. You never know when that is
          going to come in handy.
        </p>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Timeline</p>
          <h2 className="mt-3 font-display text-4xl font-medium">Forty-plus years in the same town.</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <li key={item.year} className="rounded-2xl border border-line bg-canvas p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-forest">{item.year}</p>
                <h3 className="mt-3 font-display text-2xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">The team</p>
        <h2 className="mt-3 font-display text-4xl font-medium">Who is here.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {team.map((person) => (
            <article key={person.name} className="rounded-2xl bg-paper p-6 shadow-[var(--shadow-border)]">
              <div className="flex size-14 items-center justify-center rounded-lg bg-pine font-display text-lg text-paper">
                {person.initial}
              </div>
              <h3 className="mt-5 font-display text-2xl font-medium">{person.name}</h3>
              <p className="text-sm text-muted">
                {person.role} · {person.years}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{person.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-pine-deep text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-medium">How can we help you today?</h2>
            <p className="mt-2 text-paper/70">Call the office or send a quote request. Either works.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="invert">
              <Link to="/quote">
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="invertOutline">
              <a href={agency.phoneHref}>{agency.phone}</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
