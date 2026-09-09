import type { ComponentType } from 'react'
import type { CinematicExampleKind } from '../content/cinematic'

type ProductExampleProps = {
  kind: CinematicExampleKind
  label: string
}

const EXAMPLE_BY_KIND: Record<CinematicExampleKind, ComponentType> = {
  plan: PlanExample,
  find: FindExample,
  bid: BidExample,
}

export function ProductExample({ kind, label }: ProductExampleProps) {
  const Illustration = EXAMPLE_BY_KIND[kind]
  return (
    <figure className={`product-example product-example--${kind}`}>
      <figcaption>{label}</figcaption>
      <Illustration />
    </figure>
  )
}

const PANEL = 'rgba(6, 20, 24, 0.42)'
const RULE = 'rgba(246, 250, 247, 0.12)'
const GRID = 'rgba(246, 250, 247, 0.07)'
const LABEL = 'rgba(197, 212, 207, 0.72)'
const GOLD = '#d4a24c'
const AURORA = '#79dcd3'

function ColumnLabel({ x, children }: { x: number; children: string }) {
  return (
    <text x={x} y={17} fill={LABEL} fontSize="7.5" letterSpacing="1.3">
      {children}
    </text>
  )
}

const PLAN_ROWS = [
  { y: 42, task: 86, ink: 0.85, barX: 168, barW: 52, bar: AURORA, barOpacity: 0.85 },
  { y: 62, task: 72, ink: 0.6, barX: 194, barW: 62, bar: GOLD, barOpacity: 0.85 },
  { y: 82, task: 80, ink: 0.46, barX: 212, barW: 46, bar: AURORA, barOpacity: 0.45 },
  { y: 102, task: 62, ink: 0.34, barX: 244, barW: 50, bar: '#f6faf7', barOpacity: 0.26 },
]

function PlanExample() {
  return (
    <svg
      viewBox="0 0 320 130"
      role="img"
      aria-label="Example plan with tasks, owners and a timeline"
    >
      <rect width="320" height="130" rx="8" fill={PANEL} />
      <ColumnLabel x={14}>TASK</ColumnLabel>
      <ColumnLabel x={112}>OWNER</ColumnLabel>
      <ColumnLabel x={166}>TIMELINE</ColumnLabel>
      <line x1="12" y1="25" x2="308" y2="25" stroke={RULE} strokeWidth="1" />
      {[166, 201, 236, 271, 306].map((x) => (
        <line key={x} x1={x} y1="30" x2={x} y2="116" stroke={GRID} strokeWidth="1" />
      ))}
      {PLAN_ROWS.map((row) => (
        <g key={row.y}>
          <rect
            x="14"
            y={row.y - 4}
            width={row.task}
            height="8"
            rx="2"
            fill="#f6faf7"
            opacity={row.ink}
          />
          <circle cx="118" cy={row.y} r="4.5" fill="#f6faf7" opacity={row.ink * 0.55} />
          <rect
            x="127"
            y={row.y - 3}
            width="22"
            height="6"
            rx="3"
            fill="#f6faf7"
            opacity="0.2"
          />
          <rect
            x={row.barX}
            y={row.y - 4}
            width={row.barW}
            height="8"
            rx="4"
            fill={row.bar}
            opacity={row.barOpacity}
          />
        </g>
      ))}
      <path d="M298 96 L304 102 L298 108 L292 102 Z" fill={GOLD} />
    </svg>
  )
}

const FIND_NODES = [
  { cx: 42, cy: 52, r: 4 },
  { cx: 78, cy: 32, r: 3.5 },
  { cx: 114, cy: 50, r: 4.5 },
  { cx: 36, cy: 98, r: 3.5 },
  { cx: 112, cy: 102, r: 5 },
]

const FIND_SHORTLIST = [
  { y: 42, name: 104, evidence: 3, pip: GOLD },
  { y: 70, name: 88, evidence: 2, pip: AURORA },
  { y: 98, name: 96, evidence: 1, pip: 'rgba(197, 212, 207, 0.55)' },
]

function FindExample() {
  return (
    <svg
      viewBox="0 0 320 130"
      role="img"
      aria-label="Example partner network beside a ranked shortlist with evidence markers"
    >
      <rect width="320" height="130" rx="8" fill={PANEL} />
      <ColumnLabel x={14}>NETWORK</ColumnLabel>
      <ColumnLabel x={166}>SHORTLIST</ColumnLabel>
      <line x1="12" y1="25" x2="308" y2="25" stroke={RULE} strokeWidth="1" />
      <line x1="156" y1="30" x2="156" y2="116" stroke={GRID} strokeWidth="1" />
      <circle cx="76" cy="72" r="26" fill="none" stroke={AURORA} strokeOpacity="0.14" />
      <circle cx="76" cy="72" r="44" fill="none" stroke={AURORA} strokeOpacity="0.09" />
      {FIND_NODES.map((node) => (
        <line
          key={`link-${node.cx}-${node.cy}`}
          x1="76"
          y1="72"
          x2={node.cx}
          y2={node.cy}
          stroke={AURORA}
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      ))}
      {FIND_NODES.map((node) => (
        <circle
          key={`node-${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={AURORA}
          opacity="0.7"
        />
      ))}
      <circle cx="76" cy="72" r="6.5" fill={GOLD} />
      {FIND_SHORTLIST.map((row) => (
        <g key={row.y}>
          <circle cx="172" cy={row.y - 2} r="5.5" fill="none" stroke={row.pip} strokeWidth="1.3" />
          <rect
            x="186"
            y={row.y - 6}
            width={row.name}
            height="7"
            rx="2"
            fill="#f6faf7"
            opacity="0.55"
          />
          {[0, 1, 2].map((slot) => (
            <rect
              key={slot}
              x={186 + slot * 11}
              y={row.y + 5}
              width="8"
              height="4"
              rx="2"
              fill={slot < row.evidence ? AURORA : '#f6faf7'}
              opacity={slot < row.evidence ? 0.65 : 0.16}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}

const BID_ROWS = [
  { y: 44, requirement: 118, state: 'met' },
  { y: 74, requirement: 102, state: 'review' },
  { y: 104, requirement: 112, state: 'open' },
] as const

function BidStateGlyph({ y, state }: { y: number; state: (typeof BID_ROWS)[number]['state'] }) {
  switch (state) {
    case 'met':
      return (
        <path
          d={`M138 ${y - 1} l3.5 3.5 L148 ${y - 5}`}
          fill="none"
          stroke={AURORA}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )
    case 'review':
      return (
        <circle cx="143" cy={y - 1} r="5" fill="none" stroke={GOLD} strokeWidth="1.5" />
      )
    case 'open':
      return (
        <circle
          cx="143"
          cy={y - 1}
          r="5"
          fill="none"
          stroke="rgba(197, 212, 207, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      )
    default: {
      const exhaustive: never = state
      return exhaustive
    }
  }
}

function BidExample() {
  return (
    <svg
      viewBox="0 0 320 130"
      role="img"
      aria-label="Example tender document with extracted requirements, evidence and review state"
    >
      <rect width="320" height="130" rx="8" fill={PANEL} />
      <ColumnLabel x={14}>TENDER</ColumnLabel>
      <ColumnLabel x={134}>REQUIREMENT</ColumnLabel>
      <ColumnLabel x={246}>EVIDENCE</ColumnLabel>
      <line x1="12" y1="25" x2="308" y2="25" stroke={RULE} strokeWidth="1" />
      <rect
        x="14"
        y="32"
        width="96"
        height="84"
        rx="4"
        fill="#f6faf7"
        opacity="0.05"
      />
      <rect
        x="14"
        y="32"
        width="96"
        height="84"
        rx="4"
        fill="none"
        stroke={RULE}
        strokeWidth="1"
      />
      {[42, 52, 62, 82, 92, 102].map((y, index) => (
        <rect
          key={y}
          x="22"
          y={y}
          width={index % 3 === 2 ? 52 : 80}
          height="4"
          rx="2"
          fill="#f6faf7"
          opacity="0.2"
        />
      ))}
      <rect x="22" y="70" width="78" height="6" rx="2" fill={GOLD} opacity="0.5" />
      <path
        d="M104 73 C118 73 122 50 132 46"
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      {BID_ROWS.map((row) => (
        <g key={row.y}>
          <BidStateGlyph y={row.y} state={row.state} />
          <rect
            x="156"
            y={row.y - 7}
            width={row.requirement}
            height="6"
            rx="2"
            fill="#f6faf7"
            opacity="0.45"
          />
          <rect
            x="156"
            y={row.y + 3}
            width="46"
            height="9"
            rx="4.5"
            fill="none"
            stroke={AURORA}
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <rect x="163" y={row.y + 6} width="24" height="3" rx="1.5" fill={AURORA} opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}
