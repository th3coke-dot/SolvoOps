"use client";

import { useEffect, useId, useRef, useState } from "react";
import "./BrandScene.css";

// Brand imagery only. No product, authentication or data dependencies.
const SKY_EDGE = 'M0 0H1280V247L1233 251L1198 231L1165 221L1122 215L1086 194L1046 170L1035 174L1007 207L983 215L961 211L949 220L940 229L929 231L918 249L902 268L886 284L862 307L832 288L805 285L784 276L769 279L746 297L734 289L718 284L706 288L690 298L671 303L642 302L608 306L584 315L554 317L534 324L512 313L494 305L474 285L451 277L426 272L385 269L347 273L327 272L311 250L295 230L280 224L259 209L235 206L205 203L181 190L160 182L135 178L99 173L60 165L0 155Z';

let decodedImages: Promise<void> | undefined;
function decodeSceneImages() {
  return decodedImages ??= Promise.all(['sunset.jpg', 'blue-hour.jpg', 'aurora-sky.webp', 'day-sky.webp'].map(name => {
    const image = new Image();
    image.decoding = 'async';
    image.src = `/scene/${name}`;
    return image.decode();
  })).then(() => undefined).catch(error => { decodedImages = undefined; throw error; });
}

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
    if (!motion || !visible) return;
    let cancelled = false;
    // Let the initial content and taps win the first frame. Reuse decoded images
    // when visitors move between the homepage and product pages.
    const load = () => {
      void decodeSceneImages().then(() => {
        if (!cancelled) setReady(true);
      }).catch(() => { if (!cancelled) setReady(false); });
    };
    const timer = window.setTimeout(load, 350);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [motion, visible]);
  useEffect(() => {
    let intersects = true;
    const sync = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersects = entry.isIntersecting; sync(); });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", sync); sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  const running = motion && ready && visible && !paused;
  const phases = motion && ready ? ['night', 'day', 'evening'] as const : ['night'] as const;
  return <>
    <div ref={root} className="brand-scene" data-running={running} data-motion={motion && ready} aria-hidden="true">
      <div key={replay} className="brand-scene__layers">
        {phases.map(phase => {
          const phaseId = `${id}-${phase}`;
          const sky = `/scene/${phase === 'night' ? 'aurora' : 'day'}-sky.webp`;
          const terrain = `/scene/${phase === 'evening' ? 'sunset' : 'blue-hour'}.jpg`;
          return <div key={phase} className={`brand-scene__phase brand-scene__${phase}`}>
            <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" focusable="false">
              <defs><clipPath id={`${phaseId}-sky`}><path d={SKY_EDGE}/></clipPath></defs>
              <image href={terrain} width="1280" height="720" className={phase === 'day' ? 'brand-scene__day-terrain' : undefined}/>
              {phase !== 'evening' && <image href={sky} width="1280" height="335" preserveAspectRatio="none" clipPath={`url(#${phaseId}-sky)`}/>}
            </svg>
            {/* Keep the shoreline clip fixed. Reflect the complete visible scene,
                rather than moving a second, roughly traced skyline over the photo. */}
            <div className="brand-scene__water-window">
              <div className="brand-scene__water">
                <svg viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <defs><clipPath id={`${phaseId}-water-sky`}><path d={SKY_EDGE}/></clipPath></defs>
                  <g transform="translate(0 802) scale(1 -1)">
                    <image href={terrain} width="1280" height="720" className={phase === 'day' ? 'brand-scene__day-terrain' : undefined}/>
                    {phase !== 'evening' && <image href={sky} width="1280" height="335" preserveAspectRatio="none" clipPath={`url(#${phaseId}-water-sky)`}/>}
                  </g>
                  <rect width="1280" height="720" fill="#041520" opacity=".28"/>
                </svg>
              </div>
            </div>
          </div>;
        })}
      </div>
      <div className="brand-scene__veil"/>
    </div>
    {motion && ready && <div className="brand-scene__controls" role="toolbar" aria-label="Scene playback">
      <button type="button" aria-label={`${paused ? "Resume" : "Pause"} scene`} onClick={() => setPaused(value => !value)}>{paused ? "Resume" : "Pause"}</button>
      <button type="button" aria-label="Replay scene" onClick={() => { setReplay(value => value + 1); setPaused(false); }}>Replay</button>
    </div>}
  </>;
}
