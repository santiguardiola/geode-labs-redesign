export type HeroStage = {
  id: string;
  image: string;
  mark?: string;
  graphic?: string;
  headline: string;
  body: string;
  items?: { label: string; x: string; y: string }[];
  cta?: string;
};

// Copy and labels are deliberately data-driven. Scroll logic only relies on order.
export const heroStages: HeroStage[] = [
  {
    id: "intro",
    image: "/assets/hero-final/stage-01-background.png",
    mark: "/assets/hero-final/stage-01-mark.png",
    headline: "Geode Labs",
    body: "Products and programs that grow Ethereum’s global talent.",
  },
  {
    id: "ecosystem",
    image: "/assets/hero-final/stage-02-background.png",
    mark: "/assets/hero-final/stage-02-mark.png",
    headline: "Ethereum Ecosystem",
    body: "A global network of communities, builders and infrastructure.",
  },
  {
    id: "build",
    image: "/assets/hero-final/stage-03-background.png",
    graphic: "/assets/hero-final/stage-03-orbit.png",
    headline: "What We\nBuild",
    body: "Products and programs that empower the Ethereum ecosystem.",
    items: [
      { label: "ETHStars", x: "49.965%", y: "30.625%" },
      { label: "Job Board", x: "31.354%", y: "58.646%" },
      { label: "Grants", x: "68.576%", y: "58.125%" },
      { label: "Local Ethereum", x: "49.965%", y: "84.792%" },
    ],
  },
  {
    id: "core",
    image: "/assets/hero-final/stage-04-background.png",
    mark: "/assets/hero-final/stage-04-mark.png",
    headline: "The Core",
    body: "Strengthening Ethereum through talent, coordination and long term alignment.",
    cta: "Explore the ecosystem",
  },
];
