import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { Button } from "@/components/ui";
import { agency } from "@/data/site";
import { pageHead } from "@/lib/seo";

type QuoteSearch = {
  type?: string;
};

export const Route = createFileRoute("/quote")({
  component: Quote,
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  head: () =>
    pageHead({
      title: "Request an Insurance Quote in Pittsburg, TX | Burns McElhaney",
      description:
        "Request an auto, home, farm, or business insurance quote from an independent Pittsburg, Texas agent. Call (903) 856-3422 or send a request to Burns McElhaney Agency.",
      path: "/quote",
    }),
});

function Quote() {
  const { type } = Route.useSearch();
  return (
    <main className="bg-canvas pt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Quote</p>
          <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">Tell us what you need. Cammy or Lori will call you back.</h1>
          <p className="mt-4 text-ink-soft">
            This is a request, not a binder. Someone at the Lafayette Street desk will look at it during office hours
            and reach you the way you asked.
          </p>
          <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
            <p className="text-sm font-medium text-ink">Faster to talk?</p>
            <Button asChild className="mt-3 w-full sm:w-auto">
              <a href={agency.phoneHref}>
                <Phone className="size-4" />
                {agency.phone}
              </a>
            </Button>
            <p className="mt-3 text-sm text-muted">Mon–Thu 8:30–5 · Friday 8:30–3</p>
          </div>
        </div>
        <QuoteForm initialType={type} />
      </div>
    </main>
  );
}
