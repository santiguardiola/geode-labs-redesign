"use client";

import { useLayoutEffect, useRef } from "react";
import { heroStages } from "@/data/heroStages";

export function ImmersiveHero() {
  const root = useRef<HTMLElement>(null);
  const heroVisualStyles = `
    .hero-wash{background:transparent!important}
    .hero-content{right:auto;width:100vw;isolation:isolate;text-align:center}
    .hero-content::before{position:absolute;z-index:0;inset:0;content:"";background:rgba(4,6,23,.42);pointer-events:none}
    .hero-content-4::before{background:rgba(4,6,23,.34)}
    .hero-content>*{position:absolute;z-index:1}
    .hero-copy{position:absolute;inset:0;width:auto}
    .hero-copy .hero-title{position:absolute;left:50%;margin:0;transform:translate(-50%,-50%);color:#fff;text-align:center}
    .hero-copy p{position:absolute;left:50%;max-width:none;margin:0;transform:translate(-50%,-50%);color:#fff;text-align:center}
    .hero-stage-mark{object-fit:cover;pointer-events:none}
    .hero-stage-graphic{pointer-events:none}
    .hero-stage-1-canvas{position:absolute;z-index:1;top:50%;left:50%;width:1440px;height:960px;transform:translate(-50%,-50%) scale(var(--stage-1-scale,1));transform-origin:center;pointer-events:none}
.hero-content-1 .hero-stage-1-canvas .hero-stage-mark{position:absolute;top:352px;left:668px;width:104px;height:102px;transform:none}
    .hero-stage-1-canvas .hero-copy{position:absolute;inset:0;width:1440px;height:960px}
    .hero-stage-1-canvas .hero-copy .hero-title{top:503px;left:720px;width:650px;transform:translate(-50%,-50%)}
    .hero-stage-1-canvas .hero-copy p{top:580px;left:720.5px;width:367px;transform:translate(-50%,-50%)}
    .hero-stage-canvas{position:absolute;z-index:1;top:50%;left:50%;width:1440px;height:960px;transform:translate(-50%,-50%) scale(var(--hero-stage-scale,1));transform-origin:center}
    .hero-content-2 .hero-stage-2-canvas .hero-stage-mark{position:absolute;top:300px;left:672px;width:97px;height:97px;transform:none}
    .hero-stage-2-canvas .hero-copy{position:absolute;inset:0;width:1440px;height:960px}
    .hero-stage-2-canvas .hero-copy .hero-title{top:472px;left:720px;width:350px;transform:translate(-50%,-50%)}
    .hero-stage-2-canvas .hero-copy p{top:575px;left:720px;width:334px;transform:translate(-50%,-50%)}
    .hero-content-3 .hero-stage-3-canvas .hero-stage-graphic{position:absolute;top:165px;left:359px;width:721px;height:auto;transform:none;opacity:.8}
    .hero-stage-3-canvas .hero-copy{position:absolute;inset:0;width:1440px;height:960px}
    .hero-stage-3-canvas .hero-copy .hero-title{top:411px;left:719.5px;width:357px;transform:translateX(-50%);white-space:pre-line}
    .hero-stage-3-canvas .hero-copy p{top:546px;left:719.5px;width:337px;transform:translateX(-50%)}
    .hero-content-3 .hero-stage-3-canvas .hero-item{width:109px;transform:translateX(-50%);text-align:center}
    .hero-content-3 .hero-stage-3-canvas .hero-item-0{left:719.5px;top:294px}
    .hero-content-3 .hero-stage-3-canvas .hero-item-1{left:451.5px;top:563px}
    .hero-content-3 .hero-stage-3-canvas .hero-item-2{left:987.5px;top:558px}
    .hero-content-3 .hero-stage-3-canvas .hero-item-3{left:719.5px;top:814px}
    .hero-content-4 .hero-stage-4-canvas .hero-stage-mark{position:absolute;top:326px;left:648px;width:125px;height:123px;transform:none;opacity:.8}
    .hero-stage-4-canvas .hero-copy{position:absolute;inset:0;width:1440px;height:960px}
    .hero-stage-4-canvas .hero-copy .hero-title{top:464px;left:710px;width:760px;transform:translateX(-50%)}
    .hero-stage-4-canvas .hero-copy p{top:539px;left:710px;width:342px;transform:translateX(-50%)}
    .hero-content-4 .hero-stage-4-canvas .hero-cta{top:619px;left:710px;transform:translateX(-50%)}
    .hero-content-1 .hero-stage-mark{top:36.667%;left:50%;width:104px;height:102px;transform:translateX(-50%)}
    .hero-content-1 .hero-title{top:52.396%;width:650px}
    .hero-content-1 .hero-copy p{top:60.417%;left:50.035%;width:367px}
    .hero-content-2 .hero-stage-mark{top:31.25%;left:50.035%;width:97px;height:97px;transform:translateX(-50%)}
    .hero-content-2 .hero-title{top:49.167%;width:350px}
    .hero-content-2 .hero-copy p{top:59.896%;width:334px}
    .hero-content-3 .hero-stage-graphic{top:17.188%;left:49.965%;width:50.07%;height:auto;transform:translateX(-50%);opacity:.8}
    .hero-content-3 .hero-title{top:42.813%;left:49.965%;width:357px;transform:translateX(-50%);white-space:pre-line}
    .hero-content-3 .hero-copy p{top:56.875%;left:49.965%;width:337px;transform:translateX(-50%)}
    .hero-content-3 .hero-item{border:0;border-radius:0;background:transparent;padding:0;transform:translateX(-50%);color:#fff;font:400 14px/22px var(--sans);white-space:nowrap}
    .hero-content-4 .hero-stage-mark{top:33.958%;left:49.34%;width:125px;height:123px;transform:translateX(-50%);opacity:.8}
    .hero-content-4 .hero-title{top:48.333%;left:49.306%;width:760px;transform:translateX(-50%)}
    .hero-content-4 .hero-copy p{top:56.146%;left:49.306%;width:342px;transform:translateX(-50%)}
    .hero-content-4 .hero-cta{position:absolute;top:64.479%;left:49.306%;display:grid;gap:0;margin:0;transform:translateX(-50%);color:#fff;font:500 13px/18px var(--sans);letter-spacing:.1px;text-align:center;white-space:nowrap}
    .hero-content-4 .hero-cta-arrow{font:500 24px/30px var(--display);letter-spacing:-.2px}
    .hero-enter-site{position:fixed;z-index:5;bottom:48px;left:50%;display:inline-flex;align-items:center;gap:6px;color:#fff;font:400 13px/18px var(--sans);opacity:.72;transform:translateX(-50%);transition:opacity .28s ease}
    .hero-enter-site:hover{opacity:1}
    .hero-enter-site-arrow{display:inline-block;transition:transform .28s ease}
    .hero-enter-site:hover .hero-enter-site-arrow{transform:translateY(4px)}
  `;

  useLayoutEffect(() => {
    if (!root.current) return;
    let revert = () => {};
    let removeStageOneScaleListener = () => {};
    let removeStageCanvasScaleListener = () => {};
    let cancelled = false;
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
      const backgrounds = gsap.utils.toArray<HTMLElement>("[data-hero-bg]");
      const contents = gsap.utils.toArray<HTMLElement>("[data-hero-content]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-hero-dot]");
      const enterSite = root.current?.querySelector<HTMLElement>("[data-enter-site]");
      const stageOneCanvas = root.current?.querySelector<HTMLElement>("[data-stage-1-canvas]");
      const stageCanvases = root.current?.querySelectorAll<HTMLElement>("[data-stage-canvas]");
      const landingReveal = document.querySelector<HTMLElement>("[data-landing-reveal]");
      const landingNav = landingReveal?.querySelector<HTMLElement>(".nav");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const entryScales = [1, 1.03, 1.03, 1.02];
      const targetScales = [1.2, 1.2, 1.22, 1.3];
      const updateStageOneScale = () => {
        const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 960);
        stageOneCanvas?.style.setProperty("--stage-1-scale", String(scale));
      };
      updateStageOneScale();
      window.addEventListener("resize", updateStageOneScale);
      removeStageOneScaleListener = () => window.removeEventListener("resize", updateStageOneScale);
      const updateStageCanvasScale = () => {
        const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 960);
        stageCanvases?.forEach((canvas) => canvas.style.setProperty("--hero-stage-scale", String(scale)));
      };
      updateStageCanvasScale();
      window.addEventListener("resize", updateStageCanvasScale);
      removeStageCanvasScaleListener = () => window.removeEventListener("resize", updateStageCanvasScale);
      gsap.set(backgrounds, { autoAlpha: 0, transformOrigin: "50% 50%" });
      backgrounds.forEach((bg, i) => gsap.set(bg, { scale: entryScales[i] }));
      gsap.set(contents, { autoAlpha: 0, y: 24, pointerEvents: "none" });
      gsap.set(backgrounds[0], { autoAlpha: 1 });
      gsap.set(contents[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });
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
      let activeStage = 0;
      const updateStageState = (time: number) => {
        const nextStage = time < 20 ? 0 : time < 42 ? 1 : time < 64 ? 2 : 3;
        if (nextStage === activeStage) return;
        activeStage = nextStage;
        if (enterSite) {
          enterSite.setAttribute("aria-hidden", String(nextStage !== 0));
          enterSite.style.pointerEvents = nextStage === 0 ? "auto" : "none";
          enterSite.style.opacity = nextStage === 0 ? ".72" : "0";
        }
        dots.forEach((dot, index) => dot.classList.toggle("active", index === nextStage));
        contents.forEach((content, index) => content.setAttribute("aria-hidden", String(index !== nextStage)));
      };
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: reduced ? 0.15 : 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (landingReveal && landingNav) setLandingNavPinned(self.progress >= .999); },
        },
      });
      dots.forEach((dot, index) => dot.classList.toggle("active", index === 0));
      contents.forEach((content, index) => content.setAttribute("aria-hidden", String(index !== 0)));
      const starts = [0, 18, 40, 62], ends = [22, 44, 66, 104];
      backgrounds.forEach((bg, i) => {
        if (!reduced) timeline.to(bg, { scale: targetScales[i], duration: ends[i] - starts[i], ease: "none" }, starts[i]);
        if (i) timeline.to(bg, { autoAlpha: 1, duration: 4, ease: "none" }, starts[i]);
        if (i < 3) timeline.to(bg, { autoAlpha: 0, duration: 4, ease: "none" }, starts[i + 1]);
      });
      [18, 40, 62].forEach((point, i) => {
        timeline.to(contents[i], { autoAlpha: 0, y: -20, pointerEvents: "none", duration: 3, ease: "none" }, point);
        timeline.to(contents[i + 1], { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 3, ease: "none" }, point + 0.35);
      });
      timeline.to(contents[3], { autoAlpha: 0.42, y: -16, pointerEvents: "none", duration: 5, ease: "none" }, 116);
      if (landingReveal) timeline.to(landingReveal, { yPercent: 0, duration: 12, ease: "none" }, 110);
      timeline.to({}, { duration: 18 }, 104);
      timeline.eventCallback("onUpdate", () => updateStageState(timeline.time()));
      }, root);
      revert = () => {
        removeStageOneScaleListener();
        removeStageCanvasScaleListener();
        ctx.revert();
      };
    });
    return () => { cancelled = true; revert(); };
  }, []);

  return <section className="hero-scroll" ref={root} aria-label="Geode Labs introduction"><style>{heroVisualStyles}</style><div className="hero-sticky">
    <div className="hero-backgrounds" aria-hidden="true">{heroStages.map((stage, i) => <img key={stage.id} data-hero-bg src={stage.image} alt="" className="hero-background" decoding="async" fetchPriority={i === 0 ? "high" : "auto"} />)}<div className="hero-wash" /></div>
    <div className="hero-progress" aria-label="Hero progress">{heroStages.map((stage, i) => <span key={stage.id} data-hero-dot className={i === 0 ? "hero-dot active" : "hero-dot"} />)}</div>
    <a className="hero-enter-site" data-enter-site href="#landing"><span>Enter site</span><span className="hero-enter-site-arrow" aria-hidden="true">↓</span></a>
    {heroStages.map((stage, i) => <article key={stage.id} data-hero-content className={`hero-content hero-content-${i + 1}`} aria-hidden={i !== 0}>
      {i === 0 ? <div className="hero-stage-1-canvas" data-stage-1-canvas>
        {stage.mark && <img src={stage.mark} alt="" className="hero-stage-mark" aria-hidden="true" />}
        <div className="hero-copy"><h1 className="hero-title hero-title-xl">{stage.headline}</h1><p>{stage.body}</p></div>
      </div> : <div className={`hero-stage-canvas hero-stage-${i + 1}-canvas`} data-stage-canvas>
        {stage.graphic && <img src={stage.graphic} alt="" className="hero-stage-graphic" aria-hidden="true" />}
        {stage.mark && <img src={stage.mark} alt="" className="hero-stage-mark" aria-hidden="true" />}
        <div className="hero-copy"><h1 className="hero-title">{stage.headline}</h1><p>{stage.body}</p>{stage.cta && <a href="#landing" className="hero-cta"><span>{stage.cta}</span><span className="hero-cta-arrow" aria-hidden="true">↓</span></a>}</div>
        {stage.items?.map((item, itemIndex) => <span key={item.label} className={`hero-item hero-item-${itemIndex}`}>{item.label}</span>)}
  </div>}
    </article>)}
  </div></section>;
}
