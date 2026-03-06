"use client"

import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts"

// ─── Data ─────────────────────────────────────────────────────────────────────

type EquipoCorp = "TPI" | "RRHH" | "No"
type PillarKey = "Optimiz." | "Transform" | "Nuevos Negocios" | "Habilitadores"

interface Initiative {
  id: string
  title: string
  priority: 1 | 2 | 3
  leader: string
  equipoCorp: EquipoCorp
  objetivo: string
  investment: string | null
  investmentUSD: number   // for chart (0 if not quantified)
  isSubitem?: boolean
  status: "on-track" | "at-risk" | "pending" | "in-progress"
}

interface Pillar {
  key: PillarKey
  color: string           // accent color
  bgLight: string
  borderColor: string
  icon: string
  initiatives: Initiative[]
}

const PILLARS: Pillar[] = [
  {
    key: "Optimiz.",
    color: "#9b111e",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    icon: "⚙️",
    initiatives: [
      {
        id: "1",
        title: "Mejorar los márgenes de contribución por cliente",
        priority: 1, leader: "Christian N. / Juan Carlos Paz", equipoCorp: "No",
        objetivo: "Incrementar el margen de contribución a 22% Q4-2026",
        investment: null, investmentUSD: 0, status: "in-progress",
      },
      {
        id: "2",
        title: "Simplificar el negocio (servicios, marcas, productos, talleres)",
        priority: 1, leader: "Carlos S.", equipoCorp: "No",
        objetivo: "Foco en ventas, reducción de costos e inventario",
        investment: null, investmentUSD: 0, status: "in-progress",
      },
      {
        id: "3",
        title: "Ordenar la oferta a clientes",
        priority: 1, leader: "Jorge Céspedes", equipoCorp: "No",
        objetivo: "Definir segmentos y su oferta de valor con rentabilidad",
        investment: null, investmentUSD: 0, status: "pending",
      },
      {
        id: "4",
        title: "Mejora de procesos",
        priority: 1, leader: "Giancarlo F. / Brenilda C.", equipoCorp: "TPI",
        objetivo: "Agilidad y reducción de costos",
        investment: "$450K", investmentUSD: 450, status: "in-progress",
      },
      {
        id: "4.1",
        title: "Proyecto Contabilidad",
        priority: 1, leader: "Giancarlo F.", equipoCorp: "TPI",
        objetivo: "Ahorro anual $65K",
        investment: "$150K SAP · -5 FTEs $20K", investmentUSD: 170, status: "in-progress",
        isSubitem: true,
      },
      {
        id: "4.2",
        title: "Proyecto ADV + Créditos",
        priority: 1, leader: "Giancarlo F.", equipoCorp: "TPI",
        objetivo: "Ahorro anual: $130K",
        investment: "$100K SAP · -10 FTEs $70K", investmentUSD: 170, status: "in-progress",
        isSubitem: true,
      },
      {
        id: "4.3",
        title: "Proyecto Logístico – Mejoras SAP y TMS",
        priority: 1, leader: "Brenilda C.", equipoCorp: "TPI",
        objetivo: "Gestión de fletes y distribución a clientes TMS",
        investment: "$100K", investmentUSD: 100, status: "pending",
        isSubitem: true,
      },
      {
        id: "4.4",
        title: "Proyecto Módulo de Precios",
        priority: 1, leader: "Giancarlo F.", equipoCorp: "TPI",
        objetivo: "Optimización de estructura de precios",
        investment: "$100K", investmentUSD: 100, status: "pending",
        isSubitem: true,
      },
      {
        id: "5",
        title: "Implementar un proceso de S&OP robusto",
        priority: 1, leader: "Brenilda C.", equipoCorp: "No",
        objetivo: "Mejorar OTIF y reducir inventario · Ahorro anual: $100K",
        investment: "$30K asesoría · $30K software · -5 FTEs $20K", investmentUSD: 80, status: "pending",
      },
    ],
  },
  {
    key: "Transform",
    color: "#2563eb",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: "🔄",
    initiatives: [
      {
        id: "6",
        title: "Implementar un proceso de ventas estándar",
        priority: 1, leader: "Carlos S.", equipoCorp: "No",
        objetivo: "Mejorar el desempeño de ventas",
        investment: null, investmentUSD: 0, status: "in-progress",
      },
      {
        id: "7",
        title: "Definir nuevo modelo logístico – Centralización y última milla",
        priority: 1, leader: "Brenilda C.", equipoCorp: "TPI",
        objetivo: "Mejor modelo B2C, provincias y centralización del almacén en Lima",
        investment: "$650K baja activo fijo · -20 FTEs (tercerizado)", investmentUSD: 650, status: "pending",
      },
      {
        id: "8",
        title: "Nueva plataforma e-commerce",
        priority: 1, leader: "Jorge Céspedes", equipoCorp: "TPI",
        objetivo: "Ventas 2026: S/ 1.5M",
        investment: "$100K–$200K", investmentUSD: 150, status: "in-progress",
      },
    ],
  },
  {
    key: "Nuevos Negocios",
    color: "#059669",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: "🚀",
    initiatives: [
      {
        id: "9",
        title: "Giatrak 2.0",
        priority: 1, leader: "Christian N.", equipoCorp: "TPI",
        objetivo: "Plataforma más robusta",
        investment: null, investmentUSD: 0, status: "in-progress",
      },
    ],
  },
  {
    key: "Habilitadores",
    color: "#7c3aed",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    icon: "🏛️",
    initiatives: [
      {
        id: "10",
        title: "Plan de sucesión y Talento",
        priority: 1, leader: "Eduardo L.", equipoCorp: "No",
        objetivo: "Desarrollo y retención de talento",
        investment: null, investmentUSD: 0, status: "pending",
      },
      {
        id: "11",
        title: "Desarrollar un plan para mejorar la Cultura",
        priority: 1, leader: "Eduardo L.", equipoCorp: "RRHH",
        objetivo: "Mejorar el ambiente laboral y el desempeño",
        investment: "$20K", investmentUSD: 20, status: "pending",
      },
    ],
  },
]

// Investment chart data (main initiatives only, excluding subitems)
const INVESTMENT_CHART = [
  { nombre: "Modelo Log.", usd: 650, pilar: "Transform" },
  { nombre: "Mejora Proc.", usd: 450, pilar: "Optimiz." },
  { nombre: "Proy. Contab.", usd: 170, pilar: "Optimiz." },
  { nombre: "Proy. ADV", usd: 170, pilar: "Optimiz." },
  { nombre: "E-commerce", usd: 150, pilar: "Transform" },
  { nombre: "Proy. Log.", usd: 100, pilar: "Optimiz." },
  { nombre: "Proy. Precios", usd: 100, pilar: "Optimiz." },
  { nombre: "S&OP", usd: 80, pilar: "Optimiz." },
  { nombre: "Cultura", usd: 20, pilar: "Habilitadores" },
]

const PILAR_COLORS: Record<string, string> = {
  "Optimiz.": "#9b111e",
  "Transform": "#2563eb",
  "Nuevos Negocios": "#059669",
  "Habilitadores": "#7c3aed",
}

// Leaders summary
const LEADERS_SUMMARY = [
  { name: "Brenilda C.", count: 4, pilars: ["Optimiz.", "Transform"] },
  { name: "Giancarlo F.", count: 4, pilars: ["Optimiz."] },
  { name: "Carlos S.", count: 2, pilars: ["Optimiz.", "Transform"] },
  { name: "Jorge Céspedes", count: 2, pilars: ["Optimiz.", "Transform"] },
  { name: "Eduardo L.", count: 2, pilars: ["Habilitadores"] },
  { name: "Christian N.", count: 2, pilars: ["Optimiz.", "Nuevos Negocios"] },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] shrink-0">
        {children}
      </p>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}

function StatusBadge({ status }: { status: Initiative["status"] }) {
  const cfg = {
    "on-track":   { label: "En curso",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    "at-risk":    { label: "En riesgo",   cls: "bg-amber-50 text-amber-700 border-amber-200" },
    "pending":    { label: "Pendiente",   cls: "bg-slate-50 text-slate-500 border-slate-200" },
    "in-progress":{ label: "En progreso", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  }
  const { label, cls } = cfg[status]
  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${cls}`}>
      {label}
    </span>
  )
}

function EquipoBadge({ valor }: { valor: EquipoCorp }) {
  if (valor === "No") return null
  const cls =
    valor === "TPI"  ? "bg-amber-50 text-amber-700 border border-amber-200" :
    valor === "RRHH" ? "bg-violet-50 text-violet-700 border border-violet-200" : ""
  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${cls}`}>
      {valor}
    </span>
  )
}

function InitiativeRow({ initiative, accentColor }: { initiative: Initiative; accentColor: string }) {
  return (
    <div
      className={`
        flex items-start gap-3 py-3 px-3 rounded-xl hover:bg-slate-50 transition-colors group
        ${initiative.isSubitem ? "ml-5 border-l-2 border-slate-100 pl-4" : ""}
      `}
    >
      {/* ID badge */}
      <span
        className="text-[10px] font-black shrink-0 w-8 h-6 rounded-lg flex items-center justify-center mt-0.5"
        style={{ background: accentColor + "15", color: accentColor }}
      >
        {initiative.id}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-[12px] font-semibold text-slate-800 leading-snug ${initiative.isSubitem ? "text-slate-600" : ""}`}>
            {initiative.title}
          </p>
          <div className="flex items-center gap-1.5 shrink-0">
            <EquipoBadge valor={initiative.equipoCorp} />
            <StatusBadge status={initiative.status} />
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{initiative.objetivo}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[10px] text-slate-400">
            <span className="font-semibold text-slate-500">👤</span> {initiative.leader}
          </span>
          {initiative.investment && (
            <span className="text-[10px] font-semibold" style={{ color: accentColor }}>
              💰 {initiative.investment}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const mainCount = pillar.initiatives.filter((i) => !i.isSubitem).length
  const tpiCount  = pillar.initiatives.filter((i) => i.equipoCorp === "TPI").length
  const totalInvestment = pillar.initiatives.reduce((s, i) => s + i.investmentUSD, 0)

  return (
    <div className={`rounded-2xl border ${pillar.borderColor} bg-white shadow-sm overflow-hidden`}>
      {/* Header */}
      <div className={`px-5 py-4 ${pillar.bgLight} border-b ${pillar.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{pillar.icon}</span>
            <div>
              <h3 className="text-[13px] font-black text-slate-800 tracking-tight">{pillar.key}</h3>
              <p className="text-[10px] text-slate-400 font-medium">{mainCount} iniciativas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {tpiCount > 0 && (
              <div className="text-center">
                <p className="text-lg font-black text-amber-600">{tpiCount}</p>
                <p className="text-[9px] text-amber-500 font-bold uppercase">TPI</p>
              </div>
            )}
            {totalInvestment > 0 && (
              <div className="text-center">
                <p className="text-[13px] font-black" style={{ color: pillar.color }}>
                  ${totalInvestment >= 1000 ? `${(totalInvestment / 1000).toFixed(1)}M` : `${totalInvestment}K`}
                </p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Inversión</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Initiatives list */}
      <div className="px-3 py-2 divide-y divide-slate-50">
        {pillar.initiatives.map((initiative) => (
          <InitiativeRow key={initiative.id} initiative={initiative} accentColor={pillar.color} />
        ))}
      </div>
    </div>
  )
}

function LightTooltipInvestment({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-slate-600 mb-1">{label}</p>
      <p className="font-semibold text-slate-700">${payload[0].value}K</p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function StrategicInitiativesDashboard() {
  const [activePillar, setActivePillar] = useState<PillarKey | "all">("all")

  const totalInitiatives = PILLARS.reduce(
    (s, p) => s + p.initiatives.filter((i) => !i.isSubitem).length, 0
  )
  const totalTPI = PILLARS.reduce(
    (s, p) => s + p.initiatives.filter((i) => i.equipoCorp === "TPI").length, 0
  )
  const totalInvestmentK = PILLARS.reduce(
    (s, p) => s + p.initiatives.reduce((ps, i) => ps + i.investmentUSD, 0), 0
  )
  const inProgressCount = PILLARS.reduce(
    (s, p) => s + p.initiatives.filter((i) => i.status === "in-progress").length, 0
  )

  const visiblePillars =
    activePillar === "all" ? PILLARS : PILLARS.filter((p) => p.key === activePillar)

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Iniciativas Estratégicas 2026
          </h1>
          <p className="text-sm text-slate-400 mt-0.5 font-medium">
            Soltrak · Versión Nov. 2025 · Todas las iniciativas son Prioridad 1
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg tracking-wide uppercase">
            <span className="text-base">S</span> SOLTRAK
          </span>
          <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Marzo 2026</p>
        </div>
      </div>

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: "🎯",
            label: "Iniciativas Totales",
            value: totalInitiatives,
            sub: "Todas prioridad 1",
            border: "border-l-4 border-l-red-500",
          },
          {
            icon: "💼",
            label: "Con Equipo Corp",
            value: `${totalTPI} TPI`,
            sub: "+1 RRHH asignados",
            border: "border-l-4 border-l-amber-400",
          },
          {
            icon: "💰",
            label: "Inversión Total",
            value: `$${(totalInvestmentK / 1000).toFixed(2)}M`,
            sub: "Inversiones cuantificadas",
            border: "border-l-4 border-l-emerald-500",
          },
          {
            icon: "⚡",
            label: "En Progreso",
            value: inProgressCount,
            sub: `${totalInitiatives - inProgressCount} pendientes`,
            border: "border-l-4 border-l-blue-500",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className={`rounded-2xl bg-white border border-slate-200 ${kpi.border} p-5 shadow-sm flex flex-col gap-2`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{kpi.icon}</span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                {kpi.label}
              </p>
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              {kpi.value}
            </p>
            <p className="text-[11px] text-slate-400">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Pillar filter ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActivePillar("all")}
          className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all
            ${activePillar === "all"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}
        >
          Todos los pilares
        </button>
        {PILLARS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePillar(activePillar === p.key ? "all" : p.key)}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all`}
            style={
              activePillar === p.key
                ? { background: p.color, color: "#fff", borderColor: p.color }
                : { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" }
            }
          >
            {p.icon} {p.key}
          </button>
        ))}
      </div>

      {/* ── Pillar Cards Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {visiblePillars.map((pillar) => (
          <PillarCard key={pillar.key} pillar={pillar} />
        ))}
      </div>

      {/* ── Bottom Row: Investment Chart + Leaders ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Investment bar chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-[13px] font-bold text-slate-800">Inversión por Iniciativa (USD K)</p>
          <p className="text-[11px] text-slate-400 mt-0.5 mb-4">
            Solo iniciativas con inversión cuantificada
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={INVESTMENT_CHART}
              layout="vertical"
              margin={{ left: 0, right: 20, top: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}K`}
              />
              <YAxis
                type="category"
                dataKey="nombre"
                width={90}
                tick={{ fontSize: 10, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<LightTooltipInvestment />} />
              <Bar dataKey="usd" radius={[0, 6, 6, 0]} barSize={14}>
                {INVESTMENT_CHART.map((entry, index) => (
                  <Cell key={index} fill={PILAR_COLORS[entry.pilar] ?? "#94a3b8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {Object.entries(PILAR_COLORS).map(([key, color]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-[10px] font-medium text-slate-500">{key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaders card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-4">
          <div>
            <p className="text-[13px] font-bold text-slate-800">Líderes de Iniciativas</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Carga por responsable</p>
          </div>
          <div className="space-y-3">
            {LEADERS_SUMMARY.map((leader) => {
              const pct = Math.round((leader.count / totalInitiatives) * 100)
              return (
                <div key={leader.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">
                        {leader.name.split(" ")[0][0]}{leader.name.split(" ").slice(-1)[0][0]}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-700">{leader.name}</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-500">{leader.count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: PILAR_COLORS[leader.pilars[0]] ?? "#9b111e",
                      }}
                    />
                  </div>
                  <div className="flex gap-1 mt-1">
                    {leader.pilars.map((p) => (
                      <span
                        key={p}
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: PILAR_COLORS[p] + "18", color: PILAR_COLORS[p] }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Equipo Corp summary */}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Soporte Equipo Corp
            </p>
            <div className="flex gap-2">
              {[
                { key: "TPI",  count: totalTPI,    color: "bg-amber-50 text-amber-700 border-amber-200" },
                { key: "RRHH", count: 1,           color: "bg-violet-50 text-violet-700 border-violet-200" },
                { key: "Sin EC", count: PILLARS.reduce((s, p) => s + p.initiatives.filter((i) => i.equipoCorp === "No").length, 0), color: "bg-slate-50 text-slate-500 border-slate-200" },
              ].map((ec) => (
                <div
                  key={ec.key}
                  className={`flex-1 rounded-xl border text-center py-2.5 ${ec.color}`}
                >
                  <p className="text-lg font-black">{ec.count}</p>
                  <p className="text-[9px] font-bold uppercase">{ec.key}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
