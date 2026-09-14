import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/layout";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { agency, getOfficeStatus, hours } from "@/data/site";
import { breadcrumbGraph, JsonLd, pageHead, SERVICE_AREAS } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () =>
    pageHead({
      title: "Insurance Office in Pittsburg, TX | 208 Lafayette | Burns McElhaney",
      description:
        "Call (903) 856-3422 or visit 208 Lafayette Street, Pittsburg, TX 75686. Mon–Thu 8:30–5, Friday 8:30–3. Independent insurance agent for Camp County.",
      path: "/contact",
      image: "/images/office.jpg",
    }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const status = getOfficeStatus();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reply.trim() || !message.trim()) {
      setError("Name, a way to reach you, and a message — all three, please.");
      return;
    }
    setError("");
    const href = `mailto:${agency.email}?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(`${message}\n\n— ${name}\n${reply}`)}`;
    setSent(true);
    window.location.href = href;
  };

  return (
    <main>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="How can we help you today?"
        lede="Call, email, or walk in. The office is on Lafayette Street, a block off the square, and someone will pick up during posted hours."
        image="/images/office.jpg"
        imageAlt="Burns McElhaney office interior"
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium">
            <span className={status.open ? "size-1.5 rounded-full bg-forest" : "size-1.5 rounded-full bg-muted"} />
            {status.label}
          </p>
          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <Phone className="mt-0.5 size-5 text-forest" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Phone</p>
                <a href={agency.phoneHref} className="mt-1 block text-lg font-medium">
                  {agency.phone}
                </a>
                <p className="text-sm text-muted">Fax {agency.fax}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-0.5 size-5 text-forest" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Email</p>
                <a href={`mailto:${agency.email}`} className="mt-1 block text-lg font-medium">
                  {agency.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-0.5 size-5 text-forest" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Office</p>
                <p className="mt-1 text-lg font-medium">{agency.fullAddress}</p>
                <a href={agency.mapsUrl} className="text-sm text-forest underline-offset-4 hover:underline">
                  Get directions
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-0.5 size-5 text-forest" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Hours</p>
                <ul className="mt-1 space-y-1 text-ink-soft">
                  {hours.map((h) => (
                    <li key={h.days}>
                      <span className="font-medium text-ink">{h.days}</span> · {h.time}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-muted">After hours by appointment.</p>
              </div>
            </li>
          </ul>
          <p className="mt-8 text-sm text-ink-soft">
            We write coverage across {SERVICE_AREAS.join(", ")}.
          </p>
        </div>

        <div className="rounded-2xl bg-paper p-6 shadow-[var(--shadow-border)] sm:p-8">
          {sent ? (
            <div>
              <h2 className="font-display text-3xl font-medium">Message started.</h2>
              <p className="mt-3 text-ink-soft">
                If your email app opened, hit send. Otherwise call {agency.phone} and we will take it from there.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <h2 className="font-display text-3xl font-medium">Write the office</h2>
              <Field label="Your name" htmlFor="c-name">
                <Input id="c-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="Phone or email" htmlFor="c-reply">
                <Input id="c-reply" value={reply} onChange={(e) => setReply(e.target.value)} />
              </Field>
              <Field label="Message" htmlFor="c-message">
                <Textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} />
              </Field>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit">Send message</Button>
            </form>
          )}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
          <iframe
            title="Map of Burns McElhaney Agency at 208 Lafayette Street"
            src={agency.mapsEmbed}
            className="h-96 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
