"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { heroStages } from "@/data/heroStages";

export function ImmersiveHero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!root.current) return;
    let revert = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
      const backgrounds = gsap.utils.toArray<HTMLElement>("[data-hero-bg]");
      const contents = gsap.utils.toArray<HTMLElement>("[data-hero-content]");
      const landingReveal = document.querySelector<HTMLElement>("[data-landing-reveal]");
      const landingNav = landingReveal?.querySelector<HTMLElement>(".nav");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const entryScales = [1, 1.03, 1.03, 1.02];
      const targetScales = [1.2, 1.2, 1.22, 1.3];
      gsap.set(backgrounds, { autoAlpha: 0, transformOrigin: "50% 50%" });
      backgrounds.forEach((bg, i) => gsap.set(bg, { scale: entryScales[i] }));
      gsap.set(contents, { autoAlpha: 0, y: 26 });
      gsap.set(backgrounds[0], { autoAlpha: 1 });
      gsap.set(contents[0], { autoAlpha: 1, y: 0 });
      if (landingReveal) gsap.set(landingReveal, { yPercent: 10 });
      const setLandingNavPinned = (pinned: boolean) => {
        if (!landingReveal || !landingNav || landingNav.classList.contains("is-persistent") === pinned) return;
        if (pinned) {
          landingReveal.classList.add("nav-pinned");
          landingNav.classList.add("is-persistent");
          document.body.append(landingNav);
        } else {
          landingNav.classList.remove("is-persistent");
          landingReveal.prepend(landingNav);
          landingReveal.classList.remove("nav-pinned");
        }
      };
      const timeline = gsap.timeline({
        onUpdate: () => {
          const time = timeline.time();
          setActive(time < 20 ? 0 : time < 42 ? 1 : time < 64 ? 2 : 3);
        },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: reduced ? 0.15 : 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (landingReveal && landingNav) setLandingNavPinned(self.progress >= .999); },
        },
      });
      const starts = [0, 18, 40, 62], ends = [22, 44, 66, 104];
      backgrounds.forEach((bg, i) => {
        if (!reduced) timeline.to(bg, { scale: targetScales[i], duration: ends[i] - starts[i], ease: "none" }, starts[i]);
        if (i) timeline.to(bg, { autoAlpha: 1, duration: 4, ease: "none" }, starts[i]);
        if (i < 3) timeline.to(bg, { autoAlpha: 0, duration: 4, ease: "none" }, starts[i + 1]);
      });
      [18, 40, 62].forEach((point, i) => {
        timeline.to(contents[i], { autoAlpha: 0, y: -20, duration: 3, ease: "none", overwrite: "auto" }, point);
        timeline.to(contents[i + 1], { autoAlpha: 1, y: 0, duration: 3, ease: "none", overwrite: "auto" }, point + 0.35);
      });
      timeline.to(contents[3], { autoAlpha: 0.42, y: -16, duration: 5, ease: "none", overwrite: "auto" }, 116);
      if (landingReveal) timeline.to(landingReveal, { yPercent: 0, duration: 12, ease: "none" }, 110);
      timeline.to({}, { duration: 18 }, 104);
      }, root);
      revert = () => ctx.revert();
    });
    return () => revert();
  }, []);

  return <section className="hero-scroll" ref={root} aria-label="Geode Labs introduction"><div className="hero-sticky">
    <div className="hero-backgrounds" aria-hidden="true">{heroStages.map((stage) => <img key={stage.id} data-hero-bg src={stage.image} alt="" className="hero-background" />)}<div className="hero-wash" /></div>
    <p className="hero-wordmark">GEODE LABS</p><div className="hero-progress" aria-label={`Stage ${active + 1} of 4`}>{heroStages.map((stage, i) => <span key={stage.id} className={i === active ? "hero-dot active" : "hero-dot"} />)}</div>
    {heroStages.map((stage, i) => <article key={stage.id} data-hero-content className="hero-content" aria-hidden={i !== active}><div className="hero-copy"><h1 className={i === 0 ? "hero-title hero-title-xl" : "hero-title"}>{stage.headline}</h1><p>{stage.body}</p>{stage.cta && <a href="#landing" className="hero-cta">{stage.cta}</a>}</div>{stage.items?.map((item) => <span key={item.label} className="hero-item" style={{ left: item.x, top: item.y }}>{item.label}</span>)}</article>)}
  </div></section>;
}
