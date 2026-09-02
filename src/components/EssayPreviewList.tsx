"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LandingMotion } from "@/components/LandingMotion";

export type EssayArticle = {
  title: string;
  category: string;
  href: string;
  image: string | null;
};

export const essayArticles: EssayArticle[] = [
  { title: "Argentina Ethereum Ecosystem Overview", category: "Regional adoption", href: "#", image: "/assets/essays/argentina.jpg" },
  { title: "June Roundup: Polymarket’s World Cup records", category: "Monthly update", href: "#", image: "/assets/essays/june-roundup.jpg" },
  { title: "Taiwan Ethereum Ecosystem Overview", category: "Regional adoption", href: "#", image: "/assets/essays/taiwan.jpg" },
  { title: "India Ethereum Ecosystem Overview", category: "Regional adoption", href: "#", image: "/assets/essays/india.jpg" },
  { title: "FOCIL 101", category: "Protocol", href: "#", image: "/assets/essays/focil-101.jpg" },
];

type CursorEvent = Pick<React.PointerEvent<HTMLAnchorElement>, "clientX" | "clientY">;

export function EssayPreviewList() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const placePreview = (clientX: number, clientY: number) => {
    setPosition({ x: clientX + 24, y: clientY - 100 });
  };

  const startTracking = (event: CursorEvent, article: EssayArticle) => {
    if (!article.image) return;
    if (article.image !== activeImage) setActiveImage(article.image);
    placePreview(event.clientX, event.clientY);
    setVisible(true);
  };

  const stopTracking = () => {
    setVisible(false);
  };

  useEffect(() => {
    setMounted(true);
    return undefined;
  }, []);

  const overlay = <div className="essay-preview" style={{ left: position.x, top: position.y, opacity: visible ? 1 : 0 }} aria-hidden="true">{activeImage && <img className="essay-preview-image is-current" src={activeImage} alt="" />}</div>;
  return <><LandingMotion /><div className="article-list">{essayArticles.map((article) => <a href={article.href} className="article" key={article.title} onMouseEnter={(event) => startTracking(event, article)} onMouseMove={(event) => placePreview(event.clientX, event.clientY)} onMouseLeave={stopTracking}><h3>{article.title}</h3><span>{article.category}</span><img src="/assets/arrow-up-right.svg" alt="" /></a>)}</div>{mounted && createPortal(overlay, document.body)}</>;
}
