export const agency = {
  name: "Burns McElhaney Agency",
  shortName: "Burns McElhaney",
  tagline: "Coverage that knows East Texas.",
  blurb:
    "We help consumers save money, we help businesses reduce risk, and we help families protect and preserve their financial future.",
  sinceLine: "Independent insurance on Lafayette Street since 1980.",
  phone: "(903) 856-3422",
  phoneHref: "tel:+19038563422",
  fax: "(903) 856-0647",
  email: "cammy@burnsmcelhaney.com",
  addressLine: "208 Lafayette Street",
  city: "Pittsburg",
  state: "TX",
  zip: "75686",
  fullAddress: "208 Lafayette Street, Pittsburg, TX 75686",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=208+Lafayette+Street+Pittsburg+TX+75686",
  mapsEmbed:
    "https://maps.google.com/maps?q=208+Lafayette+Street,+Pittsburg,+TX+75686&z=16&output=embed",
  foundedYear: 1980,
  renamedYear: 1998,
} as const;

export const google = {
  placeId: "ChIJb1v3aOz9NYYRKrKbxaxMNaM",
  rating: 4.8,
  reviewCount: 6,
  mapsPlace: "https://www.google.com/maps/place/?q=place_id:ChIJb1v3aOz9NYYRKrKbxaxMNaM",
  writeReview: "https://search.google.com/local/writereview?placeid=ChIJb1v3aOz9NYYRKrKbxaxMNaM",
} as const;

export const hours = [
  { days: "Monday – Thursday", time: "8:30am – 5:00pm", weekday: [1, 2, 3, 4] as const, closeHour: 17, closeMinute: 0 },
  { days: "Friday", time: "8:30am – 3:00pm", weekday: [5] as const, closeHour: 15, closeMinute: 0 },
  { days: "Saturday – Sunday", time: "Closed", weekday: [0, 6] as const, closeHour: 0, closeMinute: 0 },
] as const;

const TIMEZONE = "America/Chicago";
const OPEN_MINUTES = 8 * 60 + 30;

export function getOfficeStatus(now = new Date()): { open: boolean; label: string; today: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const minutes = hour * 60 + minute;

  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = map[weekday] ?? 0;
  const isWeekend = day === 0 || day === 6;
  const close = day === 5 ? 15 * 60 : 17 * 60;
  const today =
    day === 5 ? "Friday 8:30am – 3:00pm" : isWeekend ? "Closed for the weekend" : "Today 8:30am – 5:00pm";

  if (isWeekend || minutes < OPEN_MINUTES || minutes >= close) {
    return { open: false, label: "Currently closed", today };
  }
  return { open: true, label: "Open now", today };
}

export const team = [
  {
    name: "Cammy McElhaney",
    role: "Principal",
    years: "Joined 1998",
    bio: "Cammy came into the agency in 1998 and gave it the name it still carries. She is the person most families in town already know to call.",
    initial: "CM",
  },
  {
    name: "Lori Richardson",
    role: "Agent",
    years: "Joined 2004",
    bio: "Lori moved home from Dallas in 2004 to work alongside her sister. Two sisters, one office, and a shared stubbornness about doing right by the people who walk in.",
    initial: "LR",
  },
] as const;

export const carriers = [
  {
    name: "Germania Farm Mutual",
    image: "/images/carriers/germania.png",
    href: "https://www.germaniainsurance.com/",
  },
  {
    name: "Foremost",
    image: "/images/carriers/foremost.jpg",
    href: "https://www.foremost.com/",
  },
  {
    name: "Hagerty",
    image: "/images/carriers/hagerty.jpg",
    href: "https://www.hagerty.com/",
  },
  {
    name: "Insurors Indemnity",
    image: "/images/carriers/insurors.png",
    href: "https://www.insurorsindemnity.com/",
  },
  {
    name: "National Flood Insurance Program",
    image: "/images/carriers/nfip.jpg",
    href: "https://www.floodsmart.gov/",
  },
  {
    name: "Progressive",
    image: "/images/carriers/progressive.jpg",
    href: "https://www.progressive.com/",
  },
] as const;

export const testimonials = [
  {
    quote: "Cami is amazing. She's my go-to girl for everything insurance related.",
    name: "Rhea Medina",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Cammy is an excellent agent for the last ten or so years.",
    name: "Mary Huhman",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Nice, friendly, hometown people.",
    name: "Stephen Gass",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Everyone that works there is so pleasant. And I love how their office is furnished and decorated.",
    name: "Teri Yarbrough",
    source: "Google",
    rating: 5,
  },
] as const;

export type Product = {
  slug: string;
  title: string;
  category: "Personal" | "Farm" | "Commercial";
  featured?: boolean;
  image: string;
  imageAlt: string;
  eyebrow: string;
  summary: string;
  intro: string;
  bullets: string[];
  note?: string;
  seoTitle: string;
  seoDescription: string;
  directory?: boolean;
};

export const products: Product[] = [
  {
    slug: "auto",
    title: "Auto",
    category: "Personal",
    featured: true,
    image: "/images/pickup.jpg",
    imageAlt: "Pickup truck on a rural East Texas pine road at dusk",
    eyebrow: "Cars, trucks & farm vehicles",
    summary: "Liability, collision, comprehensive, and the extras that matter on Farm-to-Market roads.",
    intro:
      "Get an auto quote from the office on Lafayette Street and you may save hundreds a year. It takes a few minutes to find out. We write personal autos, farm trucks, and the vehicles that live between town and the chicken houses.",
    bullets: [
      "Bodily injury and property damage liability",
      "Collision and comprehensive",
      "Uninsured / underinsured motorists",
      "Medical payments or PIP",
      "Roadside assistance and rental reimbursement",
      "Multi-car and home + auto bundling",
    ],
    note: "Texas requires liability coverage. We will tell you plainly what the state requires and what is actually worth buying.",
    seoTitle: "Auto Insurance Agent in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Independent auto insurance quotes in Pittsburg and Camp County. Cars, farm trucks, Progressive and Germania. Call (903) 856-3422.",
  },
  {
    slug: "home",
    title: "Home",
    category: "Personal",
    featured: true,
    image: "/images/homestead.jpg",
    imageAlt: "White East Texas cottage with a wraparound porch",
    eyebrow: "Houses, contents & liability",
    summary: "Dwelling, belongings, additional living expenses, and the liability that comes with a yard, a dog, and company.",
    intro:
      "Your house is likely the largest thing you will ever own. We match dwelling limits to what it would actually cost to rebuild in Camp County — not a round number from a website — and we talk through wind, hail, trees, and the things standard policies quietly exclude.",
    bullets: [
      "Dwelling and other structures",
      "Personal property and loss of use",
      "Personal liability and medical payments",
      "Scheduled valuables when you need them",
      "Bundles with auto for a better rate",
    ],
    note: "Flood is not in a standard homeowners policy. If you are near a creek or in a floodplain, ask us about a separate flood policy.",
    seoTitle: "Home Insurance Agent in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Home insurance for Pittsburg, TX houses — dwelling, contents, wind, hail, and liability. Independent quotes from a Lafayette Street agency.",
  },
  {
    slug: "farm",
    title: "Poultry house & farm",
    category: "Farm",
    featured: true,
    image: "/images/farm-poultry.jpg",
    imageAlt: "East Texas poultry houses at dawn with morning mist",
    eyebrow: "The specialty that built this agency",
    summary: "Broiler houses, barns, equipment, farm liability, and the trucks that keep a Northeast Texas farm running.",
    intro:
      "Pittsburg sits in poultry country. We have been writing farm and poultry-house coverage since Benny opened a Germania agency in 1980. If you have houses, a shop, equipment, or livestock, this is not a policy you want written by someone who has never stood in a broiler house.",
    bullets: [
      "Poultry house and farm buildings",
      "Farm personal property and equipment",
      "Farm liability and premises",
      "Farm auto and trailers",
      "Barns, shops, and outbuildings",
      "Packages that can sit beside a homeowners policy",
    ],
    note: "Farm risks vary house to house. Call with a short description of the operation and we will tell you what we can place — and what we cannot.",
    seoTitle: "Poultry House & Farm Insurance Agent | Pittsburg, TX",
    seoDescription:
      "Poultry house and farm insurance in Camp County. Broiler houses, barns, equipment, and farm liability from a Pittsburg Germania agency since 1980.",
  },
  {
    slug: "business",
    title: "Business",
    category: "Commercial",
    featured: true,
    image: "/images/downtown.jpg",
    imageAlt: "Pittsburg, Texas Main Street — brick storefronts and the town water tower on Jefferson Street",
    eyebrow: "Main Street & contractors",
    summary: "General liability, commercial property, commercial auto, and packages built for shops that actually sit on Lafayette, Quitman, and Jefferson.",
    intro:
      "The right commercial coverage at a rate a small business can live with is the difference between a bad week and a closed door. We place policies for shops, trades, offices, and the operations that keep Pittsburg working.",
    bullets: [
      "General liability",
      "Commercial property",
      "Commercial auto",
      "Business owner’s package (BOP)",
      "Professional liability / E&O",
      "Commercial umbrella",
    ],
    note: "Most Main Street shops and small offices are a business owner’s package — property, liability, and interruption together. That package is listed here on purpose. Ask us if a BOP is the right form for the shop.",
    seoTitle: "Business Insurance Agent in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Commercial insurance for Pittsburg Main Street shops, contractors, and offices — general liability, property, BOP, and commercial auto.",
  },
  {
    slug: "life",
    title: "Life",
    category: "Personal",
    image: "/images/cover-life.jpg",
    imageAlt: "Two empty rocking chairs on an East Texas porch at dusk",
    eyebrow: "Income, family & farm succession",
    summary: "Term and permanent life so a family, a farm, or a business does not have to guess what happens next.",
    intro:
      "Life insurance is not a product we pitch. It is a conversation about who depends on you — a spouse, a note on the land, a partner in a shop. We keep the language plain and the illustrations honest.",
    bullets: [
      "Term life for a defined need",
      "Permanent coverage when that is the right tool",
      "Mortgage and farm-note protection",
      "Simple beneficiary and amount planning",
    ],
    seoTitle: "Life Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Term and permanent life insurance in Pittsburg, Texas — family income, farm notes, and succession planning from Cammy McElhaney and Lori Richardson.",
  },
  {
    slug: "renters",
    title: "Renters",
    category: "Personal",
    image: "/images/cover-renters.jpg",
    imageAlt: "Furnished rental apartment living room with moving boxes by the window",
    eyebrow: "Apartments & rented houses",
    summary: "Your landlord’s policy covers the building. It does not cover your things, or you, if someone is hurt in your unit.",
    intro:
      "Renters insurance is inexpensive, and it is the policy most people skip until a fire, a theft, or a lawsuit makes the point. We can usually quote it in the same conversation as auto.",
    bullets: [
      "Personal property",
      "Loss of use / additional living expenses",
      "Personal liability",
      "Often bundled with auto",
    ],
    seoTitle: "Renters Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Renters insurance in Pittsburg, TX for apartments and leased houses. Contents, liability, and loss of use — often quoted with auto.",
  },
  {
    slug: "boat",
    title: "Boat",
    category: "Personal",
    image: "/images/cover-boat.jpg",
    imageAlt: "Aluminum bass boat with outboard motor tied to a wooden dock on an East Texas pine lake",
    eyebrow: "Lakes, motors & liability",
    summary: "Coverage for the boat you keep on Lake Bob Sandlin, Lake O’ the Pines, or the trailer in the shop.",
    intro:
      "East Texas weekends happen on the water. Boat policies cover the hull, the motor, liability, and the trailer — and they are not the same as the liability on your auto card.",
    bullets: [
      "Hull and motor",
      "Liability and medical payments",
      "Trailers and equipment",
      "Fishing and pleasure craft",
    ],
    seoTitle: "Boat Insurance near Lake Bob Sandlin | Pittsburg, TX",
    seoDescription:
      "Boat insurance for Lake Bob Sandlin, Lake O’ the Pines, and East Texas trailers. Hull, motor, liability, and trailer coverage from Pittsburg.",
  },
  {
    slug: "motorcycle",
    title: "Motorcycle",
    category: "Personal",
    image: "/images/cover-motorcycle.jpg",
    imageAlt: "Cruiser motorcycle parked on a two-lane East Texas pine highway at golden hour",
    eyebrow: "Bikes, scooters & dirt bikes",
    summary: "Street bikes, scooters, and off-road machines that do not belong on a standard auto policy.",
    intro:
      "We place motorcycle and specialty recreation coverage, including dirt bikes and scooters. If it has two wheels and a motor, start here.",
    bullets: [
      "Liability and physical damage",
      "Uninsured motorists",
      "Accessories and gear where available",
      "Dirt bike and scooter options",
    ],
    seoTitle: "Motorcycle Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Motorcycle, scooter, and dirt bike insurance in Pittsburg, Texas. Liability, physical damage, and uninsured motorists from an independent agent.",
  },
  {
    slug: "atv",
    title: "ATV",
    category: "Personal",
    image: "/images/cover-atv.jpg",
    imageAlt: "Four-wheel ATV parked on a pine-needle trail in East Texas woods",
    eyebrow: "Four-wheelers & side-by-sides",
    summary: "Farm ATVs, hunting machines, and the recreational vehicles that live in the barn.",
    intro:
      "An ATV on a farm is a tool. An ATV on a trail is recreation. Either way, the liability is real, and a homeowners policy often will not take you as far as you think.",
    bullets: [
      "Liability for premises and trails",
      "Physical damage",
      "Farm and recreational use",
      "Side-by-sides and UTVs",
    ],
    seoTitle: "ATV Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "ATV and side-by-side insurance in Camp County — farm four-wheelers, hunting machines, and trail use. Independent quotes in Pittsburg, TX.",
  },
  {
    slug: "rv",
    title: "RV",
    category: "Personal",
    image: "/images/cover-rv.jpg",
    imageAlt: "Class C motorhome parked on gravel at an East Texas pine campground",
    eyebrow: "Motorhomes, travel trailers & campers",
    summary: "Full-timers, weekend campers, and the trailer you pull to the lake.",
    intro:
      "RV coverage is its own policy for a reason — liability, the unit itself, and personal belongings on the road. We will match the policy to how you actually use it.",
    bullets: [
      "Motorhomes and travel trailers",
      "Liability and comprehensive",
      "Campers and toy haulers",
      "Personal effects on the road",
    ],
    seoTitle: "RV Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "RV, motorhome, and travel trailer insurance in Pittsburg, Texas. Liability, the unit, and belongings on the road — quoted locally.",
  },
  {
    slug: "umbrella",
    title: "Umbrella",
    category: "Personal",
    image: "/images/cover-umbrella.jpg",
    imageAlt: "East Texas farmhouse and barn under a dramatic thunderhead",
    eyebrow: "Extra liability, above the rest",
    summary: "A million dollars more of liability sitting over auto, home, and often farm — for people with something to protect.",
    intro:
      "If you own land, run a farm, keep a pond, or just have more to lose than a standard auto limit will cover, an umbrella is the quietest, cheapest peace of mind we sell.",
    bullets: [
      "Excess liability over auto and home",
      "Often available over farm and other policies",
      "Defense costs when you need them",
      "Typically sold in million-dollar layers",
    ],
    seoTitle: "Umbrella Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Personal umbrella insurance in Pittsburg, TX — extra liability over auto, home, and farm for landowners and families with more to protect.",
  },
  {
    slug: "flood",
    title: "Flood",
    category: "Personal",
    image: "/images/cover-flood.jpg",
    imageAlt: "East Texas creek over its banks after rain, water around a fence and mailbox",
    eyebrow: "The coverage homeowners policies skip",
    summary: "Flood is excluded from standard home and renters policies. Separate coverage exists — from NFIP and from a few private markets.",
    intro:
      "Creeks rise in Camp County. If your mortgage requires flood, or if you simply live close to water, we will walk you through a flood quote instead of hoping the homeowners policy will stretch.",
    bullets: [
      "National Flood Insurance Program (NFIP)",
      "Private flood where it is a better fit",
      "Building and contents options",
      "Waiting periods apply — do not wait for the forecast",
    ],
    seoTitle: "Flood Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Flood insurance in Camp County, TX. NFIP and private flood for creeks, floodplains, and homes that a homeowners policy will not cover.",
  },
  {
    slug: "bop",
    title: "Business owner’s package",
    category: "Commercial",
    directory: false,
    image: "/images/cover-bop.jpg",
    imageAlt: "Occupied brick bakery-cafe storefront with display case and tables visible through the windows",
    eyebrow: "Property + liability, in one",
    summary: "A BOP bundles the basic property and liability a small business needs, usually for less than buying the pieces apart.",
    intro:
      "Most Main Street shops and small offices are a BOP risk. The package typically includes business personal property, liability, and business interruption — the policy that pays you if a fire or storm shuts the doors.",
    bullets: [
      "Property and general liability together",
      "Business interruption",
      "Priced for small and mid-size firms",
      "Endorsements for the way you actually operate",
    ],
    seoTitle: "Business Owner’s Policy (BOP) | Pittsburg, TX",
    seoDescription:
      "Business owner’s package insurance in Pittsburg, Texas — property, liability, and business interruption in one policy for Main Street shops.",
  },
  {
    slug: "landlords",
    title: "Landlords",
    category: "Commercial",
    image: "/images/cover-landlords.jpg",
    imageAlt: "Brick duplex with two front doors and two mailboxes on a quiet East Texas street",
    eyebrow: "Rental houses & duplexes",
    summary: "A dwelling you rent out is not a homeowners policy. Landlord coverage protects the building, lost rent, and the liability of being a landlord.",
    intro:
      "If you rent a house in Pittsburg or Mount Pleasant, the policy has to follow the use. We write landlord dwelling coverage so a tenant’s claim does not land on a policy that was never meant for it.",
    bullets: [
      "Dwelling and other structures",
      "Loss of rents",
      "Landlord liability",
      "Single-family and small multi-unit",
    ],
    seoTitle: "Landlord Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Landlord and rental dwelling insurance in Pittsburg and Mount Pleasant. Building, loss of rents, and landlord liability — not a homeowners policy.",
  },
  {
    slug: "builders-risk",
    title: "Builders risk",
    category: "Commercial",
    image: "/images/cover-builders.jpg",
    imageAlt: "Pickup tailgate with blueprints and a hard hat at an East Texas house under construction",
    eyebrow: "Houses and jobs under construction",
    summary:
      "A builders risk policy covers the structure while it is being built — materials, theft, fire, and weather — until it is ready for a regular property policy.",
    intro:
      "A homeowners or commercial property policy is not written for a jobsite. If you are building a house, adding on, or putting up a shop, builders risk is the coverage that follows the work until the keys are handed over.",
    bullets: [
      "The building while it is going up",
      "Materials on site and in transit where available",
      "Fire, theft, wind, and other named causes",
      "Owner-builders and contractor jobs",
    ],
    seoTitle: "Builders Risk Insurance in Pittsburg, TX | Burns McElhaney",
    seoDescription:
      "Builders risk insurance in Pittsburg, Texas for houses and shops under construction. Materials, theft, fire, and weather until the job is finished.",
  },
  {
    slug: "bonds",
    title: "Bonds",
    category: "Commercial",
    image: "/images/cover-bonds.jpg",
    imageAlt: "Desk with a Texas vehicle title, executor papers, and a notary stamp",
    eyebrow: "Lost titles, executor, probate & information",
    summary:
      "Not a construction bond. These are the surety bonds people need at the courthouse and the tax office — lost titles, executor, administrator, and information bonds.",
    intro:
      "If you lost a vehicle title, if a court named you executor or administrator of an estate, or if an agency is asking for an information bond, call us with the requirement. We will tell you what kind it is and whether we can place it.",
    bullets: [
      "Lost title bonds",
      "Executor and administrator bonds",
      "Information and miscellaneous court bonds",
      "Bring the letter or the form — we will read it with you",
    ],
    seoTitle: "Lost Title, Executor & Surety Bonds | Pittsburg, TX",
    seoDescription:
      "Lost title, executor, administrator, and information bonds in Pittsburg, Texas. Not contractor bonds — courthouse and title surety from Burns McElhaney.",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
export const directoryProducts = products.filter((p) => p.directory !== false);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const faqs = [
  {
    q: "Do I have to come into the office?",
    a: "No. Call or email and we will start a quote from here. Plenty of people still walk in at 208 Lafayette — that is welcome too. Appointments after hours are available.",
  },
  {
    q: "Which companies do you write?",
    a: "Germania and Progressive, among others. We are an independent agency, which means we are not stuck with one company’s appetite or one company’s price.",
  },
  {
    q: "Do you write Germania insurance in Pittsburg?",
    a: "Yes. This office started as a Germania agency in 1980. We still write Germania for auto, home, farm, and more — and we will tell you when another market is a better fit.",
  },
  {
    q: "Can I get a Progressive quote from you?",
    a: "Yes. Progressive is one of the carriers we place, especially for auto, motorcycle, boat, and RV. Call (903) 856-3422 and we will run it alongside the other markets we have.",
  },
  {
    q: "Do you only insure people who live in Pittsburg?",
    a: "No. We write coverage across Camp County and the surrounding East Texas towns — Mount Pleasant, Daingerfield, Omaha, Leesburg, Gilmer, Winnsboro, Hughes Springs, and Naples among them.",
  },
  {
    q: "Can you look at the policy I already have?",
    a: "Yes. Bring the declarations page — or take a photo of it — and we will tell you what you have, what you are missing, and whether we can do better.",
  },
  {
    q: "Do you really write poultry houses?",
    a: "Yes. Farm and poultry-house coverage is a core part of this agency, not a side note. Have a short description of the operation ready when you call.",
  },
  {
    q: "What if I need to file a claim at night?",
    a: "Call the office line and we will help you reach the carrier. For true emergencies, we will also make sure you have the after-hours claim number on your card.",
  },
];

export const nav = [
  { to: "/insurance" as const, label: "Coverage" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

