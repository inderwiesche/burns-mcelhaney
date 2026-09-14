import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { agency, products } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button, Field, Input, Textarea } from "./ui";

const quoteTypes = [
  { id: "auto", label: "Auto" },
  { id: "home", label: "Home" },
  { id: "farm", label: "Farm & poultry" },
  { id: "business", label: "Business" },
  { id: "life", label: "Life" },
  { id: "boat", label: "Boat" },
  { id: "rv", label: "RV" },
  { id: "other", label: "Something else" },
] as const;

type QuoteType = (typeof quoteTypes)[number]["id"];

type Draft = {
  types: QuoteType[];
  name: string;
  phone: string;
  email: string;
  zip: string;
  notes: string;
  preferred: "call" | "email" | "either";
};

const empty: Draft = {
  types: [],
  name: "",
  phone: "",
  email: "",
  zip: "75686",
  notes: "",
  preferred: "call",
};

function isQuoteType(value: string): value is QuoteType {
  return quoteTypes.some((t) => t.id === value);
}

function mailBody(draft: Draft) {
  const labels = draft.types
    .map((id) => quoteTypes.find((t) => t.id === id)?.label)
    .filter(Boolean)
    .join(", ");
  return [
    `Quote request from the Burns McElhaney website`,
    ``,
    `Name: ${draft.name}`,
    `Phone: ${draft.phone || "—"}`,
    `Email: ${draft.email || "—"}`,
    `ZIP: ${draft.zip}`,
    `Coverage: ${labels || "—"}`,
    `Preferred contact: ${draft.preferred}`,
    ``,
    `Notes:`,
    draft.notes || "—",
  ].join("\n");
}

function seedFromType(type?: string): Draft {
  if (!type) return empty;
  if (isQuoteType(type)) return { ...empty, types: [type] };
  const product = products.find((p) => p.slug === type);
  return {
    ...empty,
    types: ["other"],
    notes: product ? `Looking for ${product.title.toLowerCase()} insurance.` : "",
  };
}

export function QuoteForm({ initialType }: { initialType?: string }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(() => seedFromType(initialType));
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bma-quote-draft");
      if (!raw) return;
      const stored = JSON.parse(raw) as Partial<Draft>;
      setDraft((current) => ({
        ...empty,
        ...stored,
        types: current.types.length ? current.types : stored.types ?? [],
        notes: current.notes ? current.notes : stored.notes ?? "",
      }));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: Draft) => {
    setDraft(next);
    try {
      localStorage.setItem("bma-quote-draft", JSON.stringify(next));
    } catch {
      /* ignore quota */
    }
  };

  const toggleType = (id: QuoteType) => {
    const types = draft.types.includes(id) ? draft.types.filter((t) => t !== id) : [...draft.types, id];
    persist({ ...draft, types });
    setError("");
  };

  const next = () => {
    if (step === 0 && draft.types.length === 0) {
      setError("Pick at least one kind of coverage.");
      return;
    }
    if (step === 1) {
      if (!draft.name.trim()) {
        setError("We need a name so we know who to ask for.");
        return;
      }
      if (!draft.phone.trim() && !draft.email.trim()) {
        setError("Leave a phone number or an email.");
        return;
      }
    }
    setError("");
    setStep((s) => s + 1);
  };

  const submit = () => {
    const labels = draft.types.map((id) => quoteTypes.find((t) => t.id === id)?.label).join(", ");
    const href = `mailto:${agency.email}?subject=${encodeURIComponent(`Quote request: ${labels}`)}&body=${encodeURIComponent(mailBody(draft))}`;
    try {
      localStorage.setItem("bma-quote-last", JSON.stringify({ ...draft, at: Date.now() }));
    } catch {
      /* ignore */
    }
    setSent(true);
    window.location.href = href;
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-paper p-6 shadow-[var(--shadow-border)] sm:p-10">
        <div className="flex size-12 items-center justify-center rounded-lg bg-sage text-pine">
          <Check className="size-6" />
        </div>
        <h2 className="mt-5 font-display text-3xl font-medium">We have it. We will call you.</h2>
        <p className="mt-3 max-w-lg text-ink-soft">
          If your email app opened, send the draft. If it did not, call the office — that is still the fastest way
          through.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={agency.phoneHref}>
              <Phone className="size-4" />
              {agency.phone}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Back to the front porch</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-paper p-5 shadow-[var(--shadow-border)] sm:p-8">
      <ol className="mb-8 grid grid-cols-3 gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
        {["Coverage", "About you", "Send"].map((label, i) => (
          <li key={label} className={cn("border-b-2 pb-2", i <= step ? "border-forest text-forest" : "border-line")}>
            0{i + 1} {label}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div>
          <h2 className="font-display text-3xl font-medium">What do you need looked at?</h2>
          <p className="mt-2 text-ink-soft">Select everything that applies. We will sort the rest on the call.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quoteTypes.map((type) => {
              const on = draft.types.includes(type.id);
              const product = products.find((p) => p.slug === type.id);
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "min-h-24 rounded-xl border px-4 py-4 text-left transition-[border-color,background-color] duration-150",
                    on ? "border-forest bg-sage/40 text-pine" : "border-line bg-canvas hover:border-line-strong",
                  )}
                >
                  <span className="block font-display text-lg font-medium">{type.label}</span>
                  {product ? <span className="mt-1 block text-xs text-muted">{product.category}</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-5">
          <h2 className="font-display text-3xl font-medium">How do we find you?</h2>
          <Field label="Your name" htmlFor="name">
            <Input
              id="name"
              autoComplete="name"
              value={draft.name}
              onChange={(e) => persist({ ...draft, name: e.target.value })}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone" htmlFor="phone">
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={draft.phone}
                onChange={(e) => persist({ ...draft, phone: e.target.value })}
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={draft.email}
                onChange={(e) => persist({ ...draft, email: e.target.value })}
              />
            </Field>
          </div>
          <Field label="ZIP" htmlFor="zip">
            <Input
              id="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              value={draft.zip}
              onChange={(e) => persist({ ...draft, zip: e.target.value })}
              className="max-w-40"
            />
          </Field>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-ink-soft">Preferred contact</legend>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["call", "Call me"],
                  ["email", "Email me"],
                  ["either", "Either is fine"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => persist({ ...draft, preferred: id })}
                  className={cn(
                    "min-h-11 rounded-md border px-4 text-sm",
                    draft.preferred === id
                      ? "border-forest bg-sage/40 text-pine"
                      : "border-line bg-canvas hover:border-line-strong",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          <h2 className="font-display text-3xl font-medium">Anything we should know?</h2>
          <p className="text-ink-soft">
            Current carrier, a claim last year, a teenage driver, how many houses — whatever will save time on the call.
          </p>
          <Field label="Notes (optional)" htmlFor="notes">
            <Textarea
              id="notes"
              value={draft.notes}
              onChange={(e) => persist({ ...draft, notes: e.target.value })}
              placeholder="Example: two vehicles, homeowners in 75686, looking at a broiler house package."
            />
          </Field>
          <div className="rounded-xl bg-canvas px-4 py-4 text-sm text-ink-soft">
            <p className="font-medium text-ink">We will reach you as {draft.name || "—"}.</p>
            <p className="mt-1">
              {draft.types.map((id) => quoteTypes.find((t) => t.id === id)?.label).join(", ") || "No coverage selected"}
              {draft.phone ? ` · ${draft.phone}` : ""}
              {draft.email ? ` · ${draft.email}` : ""}
            </p>
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-5 text-sm text-danger">{error}</p> : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <Button type="button" onClick={next}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="button" onClick={submit}>
            Send quote request
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
