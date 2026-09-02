"use client";

import { useEffect } from "react";

type Reveal = {
  trigger: string;
  text?: string;
  textFrom?: Record<string, number>;
  media?: string;
  mediaFrom?: Record<string, number>;
};

const reveals: Reveal[] = [
  { trigger: ".intro", text: ".intro-copy > *", textFrom: { y: 60 }, media: ".intro-brand, .intro-metric", mediaFrom: { y: 48, scale: 0.97 } },
  { trigger: "#work", text: "#work .work-copy > *", textFrom: { x: 35, y: 54 }, media: "#work .work-media", mediaFrom: { y: 48, scale: 0.95 } },
  { trigger: "#grants", text: "#grants .work-copy > *", textFrom: { x: -35, y: 54 }, media: "#grants .work-media", mediaFrom: { y: 48, scale: 0.95 } },
  { trigger: "#local", text: "#local .work-copy > *", textFrom: { x: 35, y: 54 }, media: "#local .work-media", mediaFrom: { y: 48, scale: 0.95 } },
  { trigger: ".essays", text: ".essays-grid > div:first-child", textFrom: { x: -35, y: 56 }, media: ".essays-grid > .article-list", mediaFrom: { x: 35, y: 48, scale: 0.97 } },
  { trigger: ".support", text: ".support-card, .support-note", textFrom: { y: 62 } },
  { trigger: "footer", text: ".footer-main > *, .footer-bottom > *", textFrom: { y: 54 } },
];

export function LandingMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        reveals.forEach(({ trigger, text, textFrom, media, mediaFrom }) => {
          const triggerElement = document.querySelector<HTMLElement>(trigger);
          const textTargets = text ? gsap.utils.toArray<HTMLElement>(text) : [];
          const mediaTargets = media ? gsap.utils.toArray<HTMLElement>(media) : [];
          if (!triggerElement || (!textTargets.length && !mediaTargets.length)) return;

          if (textTargets.length) gsap.set(textTargets, { autoAlpha: 0, ...textFrom });
          if (mediaTargets.length) gsap.set(mediaTargets, { autoAlpha: 0, ...mediaFrom });

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: triggerElement, start: "top 80%", once: true },
          });

          if (textTargets.length) {
            timeline.to(textTargets, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.13,
            });
          }
          if (mediaTargets.length) {
            timeline.to(mediaTargets, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.08,
              ease: "power3.out",
              stagger: 0.12,
            }, textTargets.length ? "<0.14" : 0);
          }
        });
      });
      revert = () => ctx.revert();
    });
    return () => revert();
  }, []);

  return null;
}
