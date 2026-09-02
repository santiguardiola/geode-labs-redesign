export type HeroStage = {
  id: string;
  image: string;
  headline: string;
  body: string;
  items?: { label: string; x: string; y: string }[];
  cta?: string;
};

// Copy and labels are deliberately data-driven. Scroll logic only relies on order.
export const heroStages: HeroStage[] = [
  { id: "intro", image: "/assets/hero-01.jpg", headline: "Geode Labs", body: "Products and programs that grow Ethereum’s global talent." },
  { id: "everywhere", image: "/assets/hero-02.jpg", headline: "Ethereum grows everywhere.", body: "Through people, communities, and builders distributed around the world." },
  { id: "ecosystem", image: "/assets/hero-03.jpg", headline: "We build for the ecosystem.", body: "Connecting talent with opportunities, funding, and local communities.", items: [
    { label: "ETHStars", x: "62.5%", y: "22.9%" }, { label: "Ethereum Job Board", x: "70.1%", y: "44.8%" },
    { label: "Grant Program", x: "56.9%", y: "68.8%" }, { label: "Local Ethereum", x: "77.1%", y: "77.1%" },
  ] },
  { id: "core", image: "/assets/hero-04.jpg", headline: "Growing Ethereum’s global talent.", body: "Geode Labs strengthens Ethereum through talent, coordination, and long-term ecosystem development.", cta: "Explore the ecosystem ↓" },
];
