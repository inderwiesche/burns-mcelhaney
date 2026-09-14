import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { agency, getProduct, products } from "@/data/site";
import { JsonLd, pageHead, productGraph } from "@/lib/seo";

export const Route = createFileRoute("/insurance/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({
          title: loaderData.product.seoTitle,
          description: loaderData.product.seoDescription,
          path: `/insurance/${loaderData.product.slug}`,
          image: loaderData.product.image,
          imageAlt: loaderData.product.imageAlt,
        })
      : pageHead({
          title: "Insurance | Burns McElhaney Agency | Pittsburg, TX",
          description: "Independent insurance in Pittsburg, Texas — auto, home, farm, and business.",
          path: "/insurance",
        }),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  return (
    <main>
      <JsonLd data={productGraph(product)} />
      <PageHero
        eyebrow={product.eyebrow}
        title={`${product.title} insurance in Pittsburg, Texas.`}
        lede={product.summary}
        image={product.image}
        imageAlt={product.imageAlt}
      />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <li>
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/insurance" className="hover:text-ink">
              Coverage
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg leading-relaxed text-ink-soft">{product.intro}</p>
          <ul className="mt-8 space-y-3">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-ink">
                <Check className="mt-0.5 size-5 shrink-0 text-forest" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {product.note ? (
            <p className="mt-8 rounded-xl bg-paper px-5 py-4 text-sm text-ink-soft shadow-[var(--shadow-border)]">
              {product.note}
            </p>
          ) : null}
        </div>
        <aside className="h-fit rounded-2xl bg-pine p-6 text-paper sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage">Get a quote</p>
          <h2 className="mt-3 font-display text-3xl font-medium">Ask Cammy or Lori to look at it.</h2>
          <p className="mt-3 text-sm text-paper/75">
            Send a request or call the office. You get the desk on Lafayette — not a call center.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="invert">
              <Link to="/quote" search={{ type: product.slug }}>
                Request this quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="invertOutline">
              <a href={agency.phoneHref}>{agency.phone}</a>
            </Button>
          </div>
        </aside>
      </section>
      {related.length > 0 ? (
        <section className="border-t border-line bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-medium">Related coverage</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/insurance/$slug"
                  params={{ slug: item.slug }}
                  className="overflow-hidden rounded-2xl border border-line bg-canvas hover:border-line-strong"
                >
                  <img src={item.image} alt={item.imageAlt} className="aspect-16/10 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-display text-xl font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
