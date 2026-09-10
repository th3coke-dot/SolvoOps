"use client";

import { useEffect, useId, useRef, useState } from "react";
import "./BrandScene.css";

// Brand imagery only. No product, authentication or data dependencies.
const SKY_EDGE = 'M0 0H1280V247L1233 251L1198 231L1165 221L1122 215L1086 194L1046 170L1035 174L1007 207L983 215L961 211L949 220L940 229L929 231L918 249L902 268L886 284L862 307L832 288L805 285L784 276L769 279L746 297L734 289L718 284L706 288L690 298L671 303L642 302L608 306L584 315L554 317L534 324L512 313L494 305L474 285L451 277L426 272L385 269L347 273L327 272L311 250L295 230L280 224L259 209L235 206L205 203L181 190L160 182L135 178L99 173L60 165L0 155Z';

export function BrandScene() {
  const id = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [replay, setReplay] = useState(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; addEventListener?: (name: string, fn: () => void) => void; removeEventListener?: (name: string, fn: () => void) => void } }).connection;
    const sync = () => setMotion(!media.matches && !connection?.saveData);
    sync();
    media.addEventListener("change", sync);
    connection?.addEventListener?.("change", sync);
    return () => { media.removeEventListener("change", sync); connection?.removeEventListener?.("change", sync); };
  }, []);
  useEffect(() => {
    if (!motion) return;
    let cancelled = false;
    Promise.all(["sunset.jpg", "blue-hour.jpg", "aurora-sky.webp", "day-sky.webp"].map(name => {
      const image = new Image(); image.src = `/scene/${name}`; return image.decode();
    })).then(() => { if (!cancelled) setReady(true); }).catch(() => { if (!cancelled) setReady(false); });
    return () => { cancelled = true; };
  }, [motion]);
  useEffect(() => {
    let intersects = true;
    const sync = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting; sync(); });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", sync); sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  const running = motion && ready && visible && !paused;
  const clip = (name: string) => `url(#${id}-${name})`;
  const photo = (src: string, className?: string) => <image href={`/scene/${src}`} width="1280" height="720" className={className} />;
  const scene = (phase: "night" | "day" | "evening") => <>
    {photo(phase === "evening" ? "sunset.jpg" : "blue-hour.jpg", phase === "day" ? "brand-scene__day-terrain" : undefined)}
    {phase !== "evening" && <>
      <g clipPath={clip("sky")}><image href={`/scene/${phase === "night" ? "aurora" : "day"}-sky.webp`} width="1280" height="335" preserveAspectRatio="none" /></g>
      <g clipPath={clip("reflection")} opacity={phase === "night" ? .4 : .3}>
        <image href={`/scene/${phase === "night" ? "aurora" : "day"}-sky.webp`} width="1280" height="335" preserveAspectRatio="none" transform="translate(0 802) scale(1 -1)" />
      </g>
    </>}
  </>;
  return <>
    <div ref={root} className="brand-scene" data-running={running} data-motion={motion && ready}>
      <svg key={replay} viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <clipPath id={`${id}-sky`}><path d={SKY_EDGE}/></clipPath>
          <clipPath id={`${id}-reflection`}><path d={SKY_EDGE} transform="translate(0 802) scale(1 -1)"/></clipPath>
          <clipPath id={`${id}-water`}><rect y="414" width="1280" height="306"/></clipPath>
          <filter id={`${id}-ripple`} x="-1%" y="-2%" width="102%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency=".008 .12" numOctaves="1" seed="8" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        {(["night", ...(motion && ready ? ["day", "evening"] : [])] as const).map(phase => <g key={phase} className={`brand-scene__phase brand-scene__${phase}`}>
          {scene(phase as "night" | "day" | "evening")}
          <g clipPath={clip("water")}><g clipPath={clip("reflection")}>
            <g className="brand-scene__water" filter={clip("ripple")}>{scene(phase as "night" | "day" | "evening")}</g>
          </g></g>
        </g>)}
      </svg>
      <div className="brand-scene__veil"/>
    </div>
    {motion && ready && <div className="brand-scene__controls" role="toolbar" aria-label="Scene playback">
      <button type="button" aria-label={`${paused ? "Resume" : "Pause"} scene`} onClick={() => setPaused(!paused)}>{paused ? "Resume" : "Pause"}</button>
      <button type="button" aria-label="Replay scene" onClick={() => { setReplay(replay + 1); setPaused(false); }}>Replay</button>
    </div>}
  </>;
}
