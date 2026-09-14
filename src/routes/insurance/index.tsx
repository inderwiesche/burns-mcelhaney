import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { agency, directoryProducts } from "@/data/site";
import { breadcrumbGraph, catalogGraph, JsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/insurance/")({
  component: InsuranceIndex,
  head: () =>
    pageHead({
      title: "Insurance in Pittsburg, TX | Auto, Home, Farm, Business | Burns McElhaney",
      description:
        "Insurance coverage from a Pittsburg, Texas agent: auto, home, poultry house and farm, business, life, renters, boat, motorcycle, RV, flood, and more. Germania and Progressive.",
      path: "/insurance",
      image: "/images/hero-pines.jpg",
    }),
});

function InsuranceIndex() {
  const groups = ["Personal", "Farm", "Commercial"] as const;
  return (
    <main>
      <JsonLd data={catalogGraph()} />
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "Coverage", path: "/insurance" },
        ])}
      />
      <PageHero
        eyebrow="Coverage"
        title="When it comes to insurance, we have you covered."
        lede="Personal, farm, and commercial policies placed with carriers that will actually write East Texas — including Germania and Progressive."
        image="/images/hero-pines.jpg"
        imageAlt="East Texas pine country farm road toward a white farmhouse"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {groups.map((group) => {
          const items = directoryProducts.filter((p) => p.category === group);
          if (items.length === 0) return null;
          return (
            <section key={group} className="mb-16 last:mb-0">
              <h2 className="font-display text-3xl font-medium">{group}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <Link
                    key={product.slug}
                    to="/insurance/$slug"
                    params={{ slug: product.slug }}
                    className="group overflow-hidden rounded-2xl bg-paper shadow-[var(--shadow-border)]"
                  >
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-xl font-medium">{product.title}</h3>
                      <p className="mt-2 text-sm text-ink-soft">{product.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <section className="border-t border-line bg-pine text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-medium">Not sure which policy you need?</h2>
            <p className="mt-2 text-paper/70">Describe the risk. We will tell you what we can place — and what we cannot.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
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
        </div>
      </section>
    </main>
  );
}
