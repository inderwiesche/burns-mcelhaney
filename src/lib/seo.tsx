import { agency, faqs, google, products, testimonials, type Product } from "@/data/site";

export const SITE_URL = "https://www.burnsmcelhaney.com";
export const GEO = { latitude: 32.9954, longitude: -94.9658 };
export const SERVICE_AREAS = [
  "Pittsburg, TX",
  "Camp County, TX",
  "Mount Pleasant, TX",
  "Daingerfield, TX",
  "Omaha, TX",
  "Leesburg, TX",
  "Gilmer, TX",
  "Winnsboro, TX",
  "Hughes Springs, TX",
  "Naples, TX",
];

const SAME_AS = [
  google.mapsPlace,
  "https://www.alignable.com/pittsburg-tx/burns-mcelhaney-agency-2",
  "https://www.chamberofcommerce.com/united-states/texas/pittsburg/insurance-company/2001504424-burns-mcelhaney-agency",
];

export function pageHead({
  title,
  description,
  path,
  image = "/og.jpg",
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}) {
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: agency.name },
      { name: "geo.region", content: "US-TX" },
      { name: "geo.placename", content: "Pittsburg, Texas" },
      { name: "geo.position", content: `${GEO.latitude};${GEO.longitude}` },
      { name: "ICBM", content: `${GEO.latitude}, ${GEO.longitude}` },
      { property: "og:type", content: path === "/" ? "website" : "article" },
      { property: "og:site_name", content: agency.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: imageAlt ?? title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function agencyGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["InsuranceAgency", "LocalBusiness"],
        "@id": `${SITE_URL}/#agency`,
        name: agency.name,
        legalName: agency.name,
        alternateName: ["Burns McElhaney", "Germania Insurance Pittsburg TX"],
        url: SITE_URL,
        telephone: agency.phone,
        email: agency.email,
        faxNumber: agency.fax,
        image: `${SITE_URL}/og.jpg`,
        logo: `${SITE_URL}/logo.svg`,
        priceRange: "$$",
        foundingDate: "1980",
        slogan: agency.tagline,
        description:
          "Independent insurance agency in Pittsburg, Texas. Auto, home, poultry house, farm, and business coverage. Germania, Progressive, and other carriers. Family office at 208 Lafayette Street since 1980.",
        address: {
          "@type": "PostalAddress",
          streetAddress: agency.addressLine,
          addressLocality: agency.city,
          addressRegion: agency.state,
          postalCode: agency.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        hasMap: google.mapsPlace,
        sameAs: SAME_AS,
        areaServed: SERVICE_AREAS.map((name) => ({ "@type": "AdministrativeArea", name })),
        knowsAbout: [
          "Auto insurance Pittsburg TX",
          "Homeowners insurance Pittsburg TX",
          "Poultry house insurance",
          "Farm insurance Camp County",
          "Germania Insurance",
          "Progressive Insurance",
          "Commercial insurance Pittsburg TX",
          "Business owner's policy",
          "Life insurance",
        ],
        employee: [
          {
            "@type": "Person",
            name: "Cammy McElhaney",
            jobTitle: "Principal",
            worksFor: { "@id": `${SITE_URL}/#agency` },
          },
          {
            "@type": "Person",
            name: "Lori Richardson",
            jobTitle: "Agent",
            worksFor: { "@id": `${SITE_URL}/#agency` },
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "08:30",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "08:30",
            closes: "15:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(google.rating),
          reviewCount: String(google.reviewCount),
          bestRating: "5",
          worstRating: "1",
        },
        review: testimonials.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewBody: t.quote,
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(t.rating),
            bestRating: "5",
          },
          publisher: { "@type": "Organization", name: t.source },
        })),
        potentialAction: [
          {
            "@type": "CommunicateAction",
            name: "Request a quote",
            target: `${SITE_URL}/quote`,
          },
          {
            "@type": "CommunicateAction",
            name: "Call the office",
            target: agency.phoneHref,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Insurance products in Pittsburg, TX",
          itemListElement: products.map((p, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: {
              "@type": "Service",
              name: `${p.title} insurance Pittsburg TX`,
              url: `${SITE_URL}/insurance/${p.slug}`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: agency.name,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#agency` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export function productGraph(product: Product) {
  const url = `${SITE_URL}/insurance/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${product.title} insurance in Pittsburg, TX`,
        serviceType: `${product.title} insurance`,
        description: product.seoDescription,
        url,
        image: `${SITE_URL}${product.image}`,
        provider: { "@id": `${SITE_URL}/#agency` },
        areaServed: SERVICE_AREAS.map((name) => ({ "@type": "AdministrativeArea", name })),
        brand: [
          { "@type": "Brand", name: "Germania" },
          { "@type": "Brand", name: "Progressive" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Coverage", item: `${SITE_URL}/insurance` },
          { "@type": "ListItem", position: 3, name: product.title, item: url },
        ],
      },
    ],
  };
}

export function breadcrumbGraph(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

export function catalogGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Insurance coverage in Pittsburg, TX",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.title} insurance`,
      url: `${SITE_URL}/insurance/${p.slug}`,
    })),
  };
}
