"use client";

import { useEffect, useId, useRef, useState } from "react";
import "./BrandScene.css";

// Brand imagery only. No product, authentication or data dependencies.
// Static trace of the photo’s horizon; shared by the sky and its reflection.
const SKY_EDGE = 'M0 0H1280V247L1272 247L1271 248L1265 248L1264 249L1259 249L1258 250L1251 250L1250 251L1240 251L1239 252L1225 252L1223 250L1221 250L1217 247L1212 246L1210 244L1207 243L1206 242L1204 242L1201 240L1199 240L1192 236L1190 236L1188 234L1183 232L1182 231L1178 231L1175 228L1172 227L1171 226L1166 225L1165 224L1163 224L1158 221L1154 221L1153 220L1151 220L1150 219L1148 219L1143 216L1127 216L1126 215L1120 215L1115 212L1114 212L1110 208L1109 208L1108 207L1104 207L1103 206L1099 206L1096 204L1091 204L1087 201L1086 201L1084 198L1077 191L1076 191L1067 182L1066 180L1065 180L1062 177L1061 177L1060 176L1058 176L1056 174L1053 173L1052 172L1043 172L1040 175L1038 175L1033 180L1032 182L1024 190L1023 192L1022 192L1016 198L1013 203L1012 203L1007 208L1004 208L1003 209L1002 209L996 215L994 215L993 216L989 216L988 215L986 215L985 216L973 216L970 214L969 214L965 211L961 211L960 212L958 217L956 217L955 218L952 218L948 223L947 223L946 224L943 224L942 225L941 225L936 230L933 231L925 242L923 246L918 250L917 250L914 253L913 253L912 255L898 269L897 269L895 271L894 271L891 274L890 276L889 276L881 284L880 286L855 286L854 285L834 285L833 284L810 284L809 283L807 283L804 280L797 280L794 278L788 278L785 276L780 276L778 278L775 279L774 280L772 280L770 282L769 282L765 286L764 286L760 290L759 290L758 291L756 291L753 294L750 295L749 296L747 296L746 295L745 295L741 291L736 290L732 286L731 286L730 285L727 285L726 284L722 284L721 283L716 283L713 285L712 285L710 287L709 287L707 289L705 289L704 290L699 290L696 293L693 294L691 296L684 296L683 297L678 297L673 300L668 300L665 302L655 302L654 303L646 303L645 302L638 302L637 303L611 303L610 302L607 302L606 303L601 303L600 304L586 304L585 305L579 305L578 306L574 306L573 307L570 307L569 308L564 308L563 309L554 309L553 310L551 310L550 311L546 311L545 312L541 312L538 314L530 314L529 313L521 313L520 312L518 312L517 311L514 311L513 310L511 310L507 305L506 305L504 303L502 303L497 300L493 300L492 299L490 299L483 292L481 292L479 290L478 290L473 285L472 285L471 284L468 284L466 282L459 279L457 277L453 277L452 276L438 276L436 274L428 274L425 272L419 272L418 271L415 271L414 270L405 270L404 269L396 269L395 270L388 270L387 271L332 271L331 272L325 272L322 267L319 264L318 264L317 263L314 256L311 253L310 253L309 251L302 244L301 244L300 243L298 240L297 240L294 237L293 234L291 231L290 231L289 230L287 227L285 227L283 225L282 225L278 222L276 222L273 220L271 220L266 216L265 216L260 211L259 211L258 210L256 210L253 208L231 208L230 207L225 207L220 203L216 203L215 202L202 202L199 199L198 199L195 196L194 196L189 191L188 191L186 189L179 186L178 185L175 185L174 184L173 184L168 180L165 180L164 179L162 179L161 178L154 178L153 177L139 177L138 176L132 176L131 175L110 175L109 174L103 174L102 173L95 173L94 172L88 172L86 170L82 170L79 168L69 168L67 166L64 166L63 165L58 165L57 164L54 164L49 161L47 161L46 160L42 160L41 159L33 159L32 158L27 158L26 157L24 157L23 156L16 156L15 157L8 157L7 156L0 156Z';

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
