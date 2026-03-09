"use client"

import { useState, useMemo } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts"

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority     = "Alta" | "Media" | "Baja"
type Status       = "En curso" | "Por iniciar" | "Pausada" | "Completada"
type Semaforo     = "verde" | "amarillo" | "rojo" | "sin-datos"
type Pillar       = "Protección y Optimización" | "Transformación y Crecimiento" | "Habilitadores" | "Nuevos Negocios"

interface Initiative {
  id:           string
  name:         string
  pillar:       Pillar
  pillarColor:  string
  progress:     number
  budget:       number
  real:         number
  responsible:  string
  sponsor:      string
  start:        string
  end:          string
  priority:     Priority
  status:       Status
  semaforo:     Semaforo
  devDays:      number
  fichaId:      string | null   // id en initiative-ficha-dashboard
  fichaTitle:   string | null
  hitosTotal:   number
  hitosOk:      number
  kpiPrincipal: string | null
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIATIVES: Initiative[] = [
  {
    id: "INI-001", name: "Mejorar márgenes por cliente",
    pillar: "Protección y Optimización", pillarColor: "#9b111e",
    progress: 45, budget: 0, real: 0,
    responsible: "Christian N.", sponsor: "Carlos Sánchez",
    start: "2026-01-15", end: "2026-06-30",
    priority: "Alta", status: "En curso", semaforo: "amarillo", devDays: 120,
    fichaId: "1.1", fichaTitle: "Mejorar los márgenes L+N",
    hitosTotal: 6, hitosOk: 2,
    kpiPrincipal: "Margen bruto L+N ≥ 20%",
  },
  {
    id: "INI-002", name: "Simplificar el negocio",
    pillar: "Transformación y Crecimiento", pillarColor: "#1e293b",
    progress: 30, budget: 0, real: 0,
    responsible: "Carlos S.", sponsor: "Carlos Sánchez",
    start: "2026-01-20", end: "2026-08-31",
    priority: "Alta", status: "En curso", semaforo: "amarillo", devDays: 150,
    fichaId: "2", fichaTitle: "Simplificar el negocio",
    hitosTotal: 5, hitosOk: 1,
    kpiPrincipal: "Reducción SKUs activos",
  },
  {
    id: "INI-003", name: "Ordenar la oferta a clientes",
    pillar: "Protección y Optimización", pillarColor: "#9b111e",
    progress: 10, budget: 0, real: 0,
    responsible: "Jorge C.", sponsor: "Carlos Sánchez",
    start: "2026-02-01", end: "2026-07-31",
    priority: "Alta", status: "Por iniciar", semaforo: "amarillo", devDays: 90,
    fichaId: "3", fichaTitle: "Ordenar la oferta a clientes",
    hitosTotal: 7, hitosOk: 2,
    kpiPrincipal: "% categorías margen bruto ≥ 20%",
  },
  {
    id: "INI-004", name: "Mejora de procesos (SAP)",
    pillar: "Habilitadores", pillarColor: "#374151",
    progress: 55, budget: 450000, real: 180000,
    responsible: "Giancarlo F.", sponsor: "Carlos Sánchez",
    start: "2026-01-10", end: "2026-09-30",
    priority: "Alta", status: "En curso", semaforo: "amarillo", devDays: 180,
    fichaId: "4.1", fichaTitle: "Proyecto Contabilidad",
    hitosTotal: 6, hitosOk: 2,
    kpiPrincipal: "Implementación 9 proyectos SAP",
  },
  {
    id: "INI-005", name: "S&OP robusto",
    pillar: "Habilitadores", pillarColor: "#374151",
    progress: 25, budget: 90000, real: 12000,
    responsible: "Brenilda C.", sponsor: "Carlos Sánchez",
    start: "2026-02-15", end: "2026-12-31",
    priority: "Alta", status: "En curso", semaforo: "amarillo", devDays: 200,
    fichaId: "5", fichaTitle: "Implementar proceso S&OP robusto",
    hitosTotal: 10, hitosOk: 3,
    kpiPrincipal: "Inventario MTS ≤ 75M soles",
  },
  {
    id: "INI-006", name: "Proceso de ventas estándar",
    pillar: "Habilitadores", pillarColor: "#374151",
    progress: 40, budget: 0, real: 0,
    responsible: "Carlos S.", sponsor: "Ronald O.",
    start: "2026-01-15", end: "2026-08-31",
    priority: "Media", status: "En curso", semaforo: "amarillo", devDays: 80,
    fichaId: "6", fichaTitle: "Implementar proceso ventas estándar",
    hitosTotal: 4, hitosOk: 1,
    kpiPrincipal: "Implementación proceso gestión",
  },
  {
    id: "INI-007", name: "Nuevo modelo logístico",
    pillar: "Habilitadores", pillarColor: "#374151",
    progress: 20, budget: 650000, real: 85000,
    responsible: "Brenilda C.", sponsor: "Carlos Sánchez",
    start: "2026-02-01", end: "2026-12-31",
    priority: "Alta", status: "Por iniciar", semaforo: "amarillo", devDays: 240,
    fichaId: "4.3", fichaTitle: "Proyecto Logístico (TMS)",
    hitosTotal: 6, hitosOk: 1,
    kpiPrincipal: "OTIF ≥ 85%",
  },
  {
    id: "INI-008", name: "Nueva plataforma e-commerce",
    pillar: "Transformación y Crecimiento", pillarColor: "#1e293b",
    progress: 60, budget: 150000, real: 90000,
    responsible: "Jorge C.", sponsor: "Carlos Sánchez",
    start: "2025-11-01", end: "2026-06-30",
    priority: "Alta", status: "En curso", semaforo: "verde", devDays: 160,
    fichaId: null, fichaTitle: null,
    hitosTotal: 5, hitosOk: 3,
    kpiPrincipal: null,
  },
  {
    id: "INI-009", name: "Giatrak 2.0",
    pillar: "Nuevos Negocios", pillarColor: "#6b7280",
    progress: 35, budget: 0, real: 0,
    responsible: "Christian N.", sponsor: "Carlos Sánchez",
    start: "2025-12-01", end: "2026-09-30",
    priority: "Media", status: "En curso", semaforo: "amarillo", devDays: 200,
    fichaId: null, fichaTitle: null,
    hitosTotal: 4, hitosOk: 1,
    kpiPrincipal: null,
  },
  {
    id: "INI-010", name: "Plan de Sucesión y Talento",
    pillar: "Habilitadores", pillarColor: "#374151",
    progress: 25, budget: 0, real: 0,
    responsible: "Eduardo L.", sponsor: "Eduardo L.",
    start: "2026-02-01", end: "2026-12-31",
    priority: "Media", status: "Por iniciar", semaforo: "amarillo", devDays: 220,
    fichaId: null, fichaTitle: null,
    hitosTotal: 4, hitosOk: 0,
    kpiPrincipal: null,
  },
  {
    id: "INI-011", name: "Desarrollar plan de Cultura",
    pillar: "Habilitadores", pillarColor: "#374151",
    progress: 20, budget: 20000, real: 5000,
    responsible: "Eduardo L.", sponsor: "Eduardo L.",
    start: "2026-02-15", end: "2026-11-30",
    priority: "Baja", status: "Por iniciar", semaforo: "sin-datos", devDays: 180,
    fichaId: null, fichaTitle: null,
    hitosTotal: 3, hitosOk: 0,
    kpiPrincipal: null,
  },
]

// ─── Palettes ─────────────────────────────────────────────────────────────────

const PRIORITY_CFG: Record<Priority, { color: string }> = {
  Alta:  { color: "#9b111e" },
  Media: { color: "#374151" },
  Baja:  { color: "#64748b" },
}

const STATUS_CFG: Record<Status, { label: string; cls: string }> = {
  "En curso":    { label: "En curso",    cls: "bg-[#9b111e]/10 text-[#9b111e] border-[#9b111e]/20"    },
  "Por iniciar": { label: "Por iniciar", cls: "bg-slate-50  text-slate-500  border-slate-200"   },
  "Pausada":     { label: "Pausada",     cls: "bg-slate-200 text-slate-600 border-slate-300"   },
  "Completada":  { label: "Completada",  cls: "bg-slate-900 text-white border-slate-950"},
}

const SEMAFORO_CFG: Record<Semaforo, { dot: string; label: string; text: string }> = {
  verde:      { dot: "bg-slate-700",  label: "En curso",  text: "text-slate-700" },
  amarillo:   { dot: "bg-amber-400",   label: "Observada", text: "text-amber-600"   },
  rojo:       { dot: "bg-[#9b111e]",  label: "Retrasada", text: "text-[#9b111e]"     },
  "sin-datos":{ dot: "bg-slate-300",   label: "Sin datos", text: "text-slate-400"   },
}

const PILLAR_SHORT: Record<Pillar, string> = {
  "Protección y Optimización": "P&O",
  "Transformación y Crecimiento": "T&C",
  "Habilitadores": "HAB",
  "Nuevos Negocios": "N.N.",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatUSD(n: number) {
  if (n === 0) return "—"
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ icon, label, value, sub, accent }: {
  icon: string; label: string; value: string | number; sub: string; accent: string
}) {
  return (
    <div className={`rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex flex-col gap-2 border-l-4`}
      style={{ borderLeftColor: accent }}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.14em] leading-tight">{label}</p>
      </div>
      <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">{value}</p>
      <p className="text-[10px] text-slate-400 leading-tight">{sub}</p>
    </div>
  )
}

function LightTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs shadow-lg min-w-32">
      {label && <p className="font-bold text-slate-600 mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.fill ?? p.color ?? "#334155" }} className="font-semibold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

// ─── Initiative Card ──────────────────────────────────────────────────────────

function InitiativeCard({
  item,
  onNavigate,
}: {
  item: Initiative
  onNavigate: (fichaId: string) => void
}) {
  const prioColor   = PRIORITY_CFG[item.priority].color
  const semaforoCfg = SEMAFORO_CFG[item.semaforo]
  const statusCfg   = STATUS_CFG[item.status]
  const hasficha    = !!item.fichaId
  const hitosPct    = item.hitosTotal > 0
    ? Math.round((item.hitosOk / item.hitosTotal) * 100)
    : 0

  const progressColor =
    item.progress >= 70 ? "#1e293b" :
    item.progress >= 40 ? "#9b111e" : "#6b7280"

  return (
    <div
      className={`relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200
        ${hasficha ? "hover:shadow-md hover:border-slate-300 cursor-pointer group" : ""}`}
      onClick={() => hasficha && onNavigate(item.fichaId!)}
      style={{ borderLeft: `4px solid ${item.pillarColor}` }}
    >
      {/* ── Top row ── */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          {/* ID + Name */}
          <div className="flex items-start gap-2 min-w-0">
            <span
              className="text-[9px] font-black shrink-0 px-1.5 py-0.5 rounded-md mt-0.5 font-mono"
              style={{ background: "#9b111e18", color: "#9b111e" }}
            >
              {item.id}
            </span>
            <p className={`text-[12px] font-bold text-slate-800 leading-snug ${hasficha ? "group-hover:text-[#9b111e] transition-colors" : ""}`}>
              {item.name}
            </p>
          </div>
          {/* Status */}
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border shrink-0 uppercase tracking-wide ${statusCfg.cls}`}>
            {statusCfg.label}
          </span>
        </div>

        {/* Pillar + Priority row */}
        <div className="flex items-center gap-2 mt-1.5 mb-3">
          <span
            className="text-[9px] font-black px-2 py-0.5 rounded-full"
            style={{ background: item.pillarColor + "15", color: item.pillarColor }}
          >
            {PILLAR_SHORT[item.pillar]}
          </span>
          <span className="text-[9px] text-slate-400">{item.pillar}</span>
          <span
            className="ml-auto text-[9px] font-black px-2 py-0.5 rounded-full border"
            style={{ background: prioColor + "12", color: prioColor, borderColor: prioColor + "30" }}
          >
            {item.priority}
          </span>
        </div>

        {/* ── Progress bar ── */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide">Avance</span>
            <span className="text-[10px] font-black" style={{ color: progressColor }}>{item.progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${item.progress}%`, background: progressColor }}
            />
          </div>
        </div>

        {/* ── KPI principal ── */}
        {item.kpiPrincipal && (
          <div className="mb-3 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
            <p className="text-[9px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">KPI Principal</p>
            <p className="text-[10px] font-semibold text-slate-700 leading-snug">{item.kpiPrincipal}</p>
          </div>
        )}

        {/* ── Meta row ── */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Sponsor */}
          <div className="bg-slate-50 rounded-lg px-2 py-1.5">
            <p className="text-[8px] text-slate-400 uppercase font-semibold mb-0.5">Sponsor</p>
            <p className="text-[9px] font-bold text-slate-700 leading-snug truncate">{item.sponsor}</p>
          </div>
          {/* Líder */}
          <div className="bg-slate-50 rounded-lg px-2 py-1.5">
            <p className="text-[8px] text-slate-400 uppercase font-semibold mb-0.5">Líder</p>
            <p className="text-[9px] font-bold text-slate-700 leading-snug truncate">{item.responsible}</p>
          </div>
          {/* Fecha */}
          <div className="bg-slate-50 rounded-lg px-2 py-1.5">
            <p className="text-[8px] text-slate-400 uppercase font-semibold mb-0.5">Fecha fin</p>
            <p className="text-[9px] font-bold text-slate-700">{item.end.slice(0, 7)}</p>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between"
        style={{ background: item.pillarColor + "06" }}
      >
        {/* Hitos */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${semaforoCfg.dot}`} />
            <span className={`text-[9px] font-semibold ${semaforoCfg.text}`}>{semaforoCfg.label}</span>
          </div>
          <span className="text-slate-200">·</span>
          <span className="text-[9px] text-slate-400 font-medium">{item.hitosOk}/{item.hitosTotal} hitos</span>
          {/* Hitos mini dots */}
          <div className="flex gap-0.5">
            {Array.from({ length: Math.min(item.hitosTotal, 8) }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i < item.hitosOk ? item.pillarColor : "#e2e8f0" }}
              />
            ))}
            {item.hitosTotal > 8 && <span className="text-[8px] text-slate-400">+{item.hitosTotal - 8}</span>}
          </div>
        </div>

        {/* Budget / Ver ficha */}
        <div className="flex items-center gap-2">
          {item.budget > 0 && (
            <span className="text-[9px] text-slate-400 font-medium">{formatUSD(item.budget)}</span>
          )}
          {hasficha ? (
            <span
              className="text-[9px] font-black text-white px-2 py-1 rounded-lg transition-all"
              style={{ background: "#9b111e" }}
            >
              Ver ficha →
            </span>
          ) : (
            <span className="text-[9px] text-slate-300 font-medium">Sin ficha aún</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function StrategicInitiativesDashboard({
  onNavigateToFicha,
}: {
  onNavigateToFicha?: (fichaId: string) => void
}) {
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all")
  const [filterStatus, setFilterStatus]     = useState<Status | "all">("all")

  // ── KPIs ───────────────────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    const total       = INITIATIVES.length
    const avgProgress = Math.round(INITIATIVES.reduce((s, i) => s + i.progress, 0) / total)
    const budgetTotal = INITIATIVES.reduce((s, i) => s + i.budget, 0)
    const realTotal   = INITIATIVES.reduce((s, i) => s + i.real, 0)
    const deviation   = budgetTotal > 0 ? Math.round((realTotal / budgetTotal) * 100) : 28
    const avgDevDays  = Math.round(INITIATIVES.reduce((s, i) => s + i.devDays, 0) / total)
    const withFichas  = INITIATIVES.filter((i) => i.fichaId).length
    return { total, avgProgress, budgetTotal, realTotal, deviation, avgDevDays, withFichas }
  }, [])

  // ── Filtered list ──────────────────────────────────────────────────────────
  const visible = useMemo(() => INITIATIVES.filter((i) => {
    const okPrio   = filterPriority === "all" || i.priority === filterPriority
    const okStatus = filterStatus   === "all" || i.status   === filterStatus
    return okPrio && okStatus
  }), [filterPriority, filterStatus])

  // ── Chart: responsible ─────────────────────────────────────────────────────
  const responsibleData = useMemo(() => {
    const map: Record<string, number> = {}
    INITIATIVES.forEach((i) => { map[i.responsible] = (map[i.responsible] ?? 0) + 1 })
    return Object.entries(map).map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  }, [])

  // ── Chart: pillar ──────────────────────────────────────────────────────────
  const pillarData = useMemo(() => {
    const map: Record<string, { count: number; color: string }> = {}
    INITIATIVES.forEach((i) => {
      const key = PILLAR_SHORT[i.pillar]
      if (!map[key]) map[key] = { count: 0, color: i.pillarColor }
      map[key].count++
    })
    return Object.entries(map).map(([name, v]) => ({ name, count: v.count, color: v.color }))
      .sort((a, b) => b.count - a.count)
  }, [])

  // ── Chart: status ──────────────────────────────────────────────────────────
  const statusData = useMemo(() => {
    const map: Partial<Record<Status, number>> = {}
    INITIATIVES.forEach((i) => { map[i.status] = (map[i.status] ?? 0) + 1 })
    const colors: Record<Status, string> = {
      "En curso": "#9b111e", "Por iniciar": "#6b7280", "Pausada": "#374151", "Completada": "#111827",
    }
    return (Object.entries(map) as [Status, number][]).map(([name, value]) => ({
      name, value, color: colors[name],
    }))
  }, [])

  // ── Routing ────────────────────────────────────────────────────────────────
  function handleNavigate(fichaId: string) {
    onNavigateToFicha?.(fichaId)
  }

  return (
    <div className="space-y-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#9b111e] animate-pulse" />
            <span className="text-[10px] font-black text-[#9b111e]/70 uppercase tracking-[0.18em]">
              Portafolio Estratégico
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Iniciativas Estratégicas 2026
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Soltrak · {kpis.total} iniciativas · {kpis.withFichas} con ficha detallada
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="inline-flex items-center gap-1.5 bg-[#9b111e] text-white text-[11px] font-black px-3 py-1.5 rounded-lg tracking-wide">
            SOLTRAK · 2026
          </span>
          <p className="text-[10px] text-slate-400 mt-1.5">Marzo 2026</p>
        </div>
      </div>

      {/* ── 6 KPI Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard icon="🎯" label="Total Iniciativas"    value={kpis.total}                       sub="Portafolio 2026"        accent="#9b111e" />
        <KpiCard icon="📊" label="Avance Global"        value={`${kpis.avgProgress}%`}           sub="Promedio de progreso"   accent="#7f0e18" />
        <KpiCard icon="💼" label="Inversión Ppto."      value={formatUSD(kpis.budgetTotal)}       sub="Total proyectado"       accent="#6b7280" />
        <KpiCard icon="💸" label="Inversión Real"        value={formatUSD(kpis.realTotal)}         sub="Ejecutado a la fecha"  accent="#1e293b" />
        <KpiCard icon="📐" label="Desviación Real"      value={`${kpis.deviation}%`}             sub="Real vs Presupuesto"   accent={kpis.deviation > 80 ? "#9b111e" : "#6b7280"} />
        <KpiCard icon="⏳" label="Tiempo Desarrollo"    value={`${kpis.avgDevDays}d`}            sub="Promedio por iniciativa" accent="#374151" />
      </div>

      {/* ── Filters ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">Prioridad:</span>
        {(["all", "Alta", "Media", "Baja"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setFilterPriority(p)}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all"
            style={
              filterPriority === p
                ? { background: p === "all" ? "#1e293b" : PRIORITY_CFG[p]?.color, color: "#fff", borderColor: "transparent" }
                : { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" }
            }
          >
            {p === "all" ? "Todas" : p}
          </button>
        ))}
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 mr-1">Estado:</span>
        {(["all", "En curso", "Por iniciar", "Pausada", "Completada"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all"
            style={
              filterStatus === s
                ? { background: "#1e293b", color: "#fff", borderColor: "transparent" }
                : { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" }
            }
          >
            {s === "all" ? "Todos" : s}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-slate-400 font-medium">
          {visible.length} de {INITIATIVES.length} iniciativas
        </span>
      </div>

      {/* ── Layout: cards + sidebar charts ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ── Initiative Cards — scrollable (7 cols) ───────────────────────── */}
        <div className="lg:col-span-7">
          <div className="overflow-y-auto pr-1" style={{ maxHeight: "calc(100vh - 320px)" }}>
            {visible.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-slate-400 text-[13px] font-medium">No hay iniciativas con ese filtro</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-4">
                {visible.map((item) => (
                  <InitiativeCard key={item.id} item={item} onNavigate={handleNavigate} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar: charts — sticky (5 cols) ────────────────────────────── */}
        <div className="lg:col-span-5 sticky top-6 self-start flex flex-col gap-4">

          {/* Status card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] font-bold text-slate-800">Estado del Portafolio</p>
                <p className="text-[9px] text-slate-400">Distribución por estado</p>
              </div>
              <span className="text-[13px] font-black text-white bg-[#9b111e] w-7 h-7 rounded-lg flex items-center justify-center leading-none">
                {kpis.total}
              </span>
            </div>

            {/* Stacked overview bar */}
            <div className="flex h-2.5 rounded-full overflow-hidden mb-4 gap-px">
              {statusData.map((d) => (
                <div
                  key={d.name}
                  className="transition-all"
                  style={{
                    width: `${(d.value / kpis.total) * 100}%`,
                    background: d.color,
                  }}
                />
              ))}
            </div>

            {/* Per-status rows */}
            <div className="space-y-3">
              {statusData.map((d) => {
                const pct = Math.round((d.value / kpis.total) * 100)
                return (
                  <div key={d.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                        <span className="text-[10px] text-slate-700 font-semibold">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-slate-400 font-medium">{pct}%</span>
                        <span
                          className="text-[10px] font-black w-5 text-right"
                          style={{ color: d.color }}
                        >
                          {d.value}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: d.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pillar bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold text-slate-800 mb-0.5">Por Pilar Estratégico</p>
            <p className="text-[9px] text-slate-400 mb-2">Iniciativas por pilar</p>
            <ResponsiveContainer width="100%" height={135}>
              <BarChart data={pillarData} margin={{ top: 2, right: 8, left: -26, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip content={<LightTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar dataKey="count" name="Iniciativas" radius={[4, 4, 0, 0]} maxBarSize={32}>
                  {pillarData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Responsible bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold text-slate-800 mb-0.5">Por Responsable</p>
            <p className="text-[9px] text-slate-400 mb-2">Carga de liderazgo</p>
            <ResponsiveContainer width="100%" height={185}>
              <BarChart data={responsibleData} margin={{ top: 0, right: 8, left: 0, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#374151", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} width={82} />
                <Tooltip content={<LightTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar dataKey="count" name="Iniciativas" radius={[0, 4, 4, 0]} maxBarSize={14}>
                  {responsibleData.map((_, i) => (
                    <Cell key={i} fill={["#9b111e","#1e293b","#374151","#6b7280","#7f0e18","#0f172a"][i % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  )
}
