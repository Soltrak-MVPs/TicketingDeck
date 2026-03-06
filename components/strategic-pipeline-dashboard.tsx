"use client"

import { useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type PipelineStage =
  | "generacion"
  | "elaboracion"
  | "aprobadas"
  | "desarrollo"
  | "implementadas"

type InitStatus =
  | "en-curso"
  | "nueva"
  | "avanzo"
  | "repriorizada"
  | "retrasada"
  | "observada"
  | "standby"

type PillarId = "proteccion" | "transformacion" | "nuevos" | "habilitadoras"

interface PipelineInitiative {
  id: string
  title: string
  leader: string
  stage: PipelineStage
  pillar: PillarId
  status: InitStatus
  investment?: string
  equipoCorp?: "TPI" | "RRHH" | null
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PILLARS: { id: PillarId; label: string; count: number; color: string; textColor: string; borderColor: string; lightBg: string }[] = [
  {
    id: "proteccion",
    label: "Protección y Optimización",
    count: 5,
    color: "#2d6a2d",
    textColor: "text-white",
    borderColor: "border-green-800",
    lightBg: "bg-green-900/10",
  },
  {
    id: "transformacion",
    label: "Transformación",
    count: 3,
    color: "#3a7a3a",
    textColor: "text-white",
    borderColor: "border-green-700",
    lightBg: "bg-green-800/10",
  },
  {
    id: "nuevos",
    label: "Nuevos Negocios",
    count: 1,
    color: "#4a9a4a",
    textColor: "text-white",
    borderColor: "border-green-600",
    lightBg: "bg-green-600/10",
  },
  {
    id: "habilitadoras",
    label: "Habilitadoras",
    count: 2,
    color: "#c9a227",
    textColor: "text-white",
    borderColor: "border-yellow-600",
    lightBg: "bg-yellow-500/10",
  },
]

const STAGES: { id: PipelineStage; label: string; sublabel?: string; funnelWidth: string; darkBg: string }[] = [
  {
    id: "generacion",
    label: "Generación de Iniciativas",
    funnelWidth: "w-full",
    darkBg: "bg-slate-700",
  },
  {
    id: "elaboracion",
    label: "Fichas en Elaboración",
    funnelWidth: "w-[95%]",
    darkBg: "bg-slate-600",
  },
  {
    id: "aprobadas",
    label: "Fichas Aprobadas",
    funnelWidth: "w-[80%]",
    darkBg: "bg-slate-600",
  },
  {
    id: "desarrollo",
    label: "En Desarrollo",
    sublabel: "Proyectos en marcha",
    funnelWidth: "w-[65%]",
    darkBg: "bg-slate-600",
  },
  {
    id: "implementadas",
    label: "Implementadas",
    sublabel: "Captura de Valor",
    funnelWidth: "w-[50%]",
    darkBg: "bg-slate-600",
  },
]

const STATUS_CONFIG: Record<InitStatus, { label: string; dot: string; textClass: string }> = {
  "en-curso":     { label: "En curso",       dot: "bg-emerald-500",  textClass: "text-emerald-700" },
  "nueva":        { label: "Nueva",           dot: "bg-blue-500",     textClass: "text-blue-700" },
  "avanzo":       { label: "Avanzó",          dot: "bg-sky-400",      textClass: "text-sky-700" },
  "repriorizada": { label: "Repriorizada",    dot: "bg-slate-400",    textClass: "text-slate-500 line-through" },
  "retrasada":    { label: "Retrasada",       dot: "bg-red-500",      textClass: "text-red-700" },
  "observada":    { label: "Observada",       dot: "bg-amber-400",    textClass: "text-amber-700" },
  "standby":      { label: "Stand by",        dot: "bg-slate-300",    textClass: "text-slate-400" },
}

const ALL_INITIATIVES: PipelineInitiative[] = [
  // Protección y Optimización
  {
    id: "1",
    title: "Mejorar los márgenes operativos directos por cliente",
    leader: "Christian N. / Juan C. Paz",
    stage: "elaboracion",
    pillar: "proteccion",
    status: "en-curso",
    equipoCorp: null,
  },
  {
    id: "2",
    title: "Simplificar el negocio (servicios, marcas, productos, talleres)",
    leader: "Carlos S.",
    stage: "elaboracion",
    pillar: "proteccion",
    status: "en-curso",
    equipoCorp: null,
  },
  {
    id: "3",
    title: "Ordenar la oferta de clientes",
    leader: "Jorge Céspedes",
    stage: "elaboracion",
    pillar: "proteccion",
    status: "en-curso",
    equipoCorp: null,
  },
  {
    id: "4",
    title: "Mejora de procesos: 1. Contabilidad, 2. ADV + Créditos, 3. Logísticos, 4. Módulo de Precios",
    leader: "Giancarlo F. / Brenilda C.",
    stage: "elaboracion",
    pillar: "proteccion",
    status: "en-curso",
    investment: "$450K",
    equipoCorp: "TPI",
  },
  {
    id: "5",
    title: "Implementar proceso de S&OP robusto",
    leader: "Brenilda C.",
    stage: "elaboracion",
    pillar: "proteccion",
    status: "en-curso",
    investment: "$80K",
    equipoCorp: null,
  },
  // Transformación
  {
    id: "6",
    title: "Implementar un proceso de ventas estándar",
    leader: "Carlos S.",
    stage: "elaboracion",
    pillar: "transformacion",
    status: "en-curso",
    equipoCorp: null,
  },
  {
    id: "7",
    title: "Definir nuevo modelo logístico e inicio de implementación",
    leader: "Brenilda C.",
    stage: "elaboracion",
    pillar: "transformacion",
    status: "en-curso",
    investment: "$650K",
    equipoCorp: "TPI",
  },
  {
    id: "8",
    title: "Nueva plataforma e-commerce",
    leader: "Jorge Céspedes",
    stage: "elaboracion",
    pillar: "transformacion",
    status: "en-curso",
    investment: "$150K",
    equipoCorp: "TPI",
  },
  // Nuevos Negocios
  {
    id: "9",
    title: "Giatrak 2.0",
    leader: "Christian N.",
    stage: "elaboracion",
    pillar: "nuevos",
    status: "en-curso",
    equipoCorp: "TPI",
  },
  // Habilitadoras
  {
    id: "10",
    title: "Plan de sucesión y Talento",
    leader: "Eduardo L.",
    stage: "elaboracion",
    pillar: "habilitadoras",
    status: "en-curso",
    equipoCorp: null,
  },
  {
    id: "11",
    title: "Desarrollar un plan para mejorar la Cultura",
    leader: "Eduardo L.",
    stage: "elaboracion",
    pillar: "habilitadoras",
    status: "en-curso",
    investment: "$20K",
    equipoCorp: "RRHH",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusDot({ status, size = "sm" }: { status: InitStatus; size?: "sm" | "md" }) {
  const { dot } = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-block rounded-full shrink-0 ${dot} ${size === "sm" ? "w-2 h-2" : "w-3 h-3"}`}
    />
  )
}

function EquipoBadge({ valor }: { valor: "TPI" | "RRHH" | null | undefined }) {
  if (!valor) return null
  return (
    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full border shrink-0
      ${valor === "TPI" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-violet-50 text-violet-700 border-violet-200"}`}>
      {valor}
    </span>
  )
}

function InitiativeChip({
  initiative,
  pillarColor,
}: {
  initiative: PipelineInitiative
  pillarColor: string
}) {
  return (
    <div className="flex items-start gap-1.5 group py-1 px-2 rounded-lg hover:bg-white/80 transition-colors">
      <StatusDot status={initiative.status} />
      <div className="flex-1 min-w-0">
        <p className="text-[10.5px] font-semibold text-slate-700 leading-snug line-clamp-2 group-hover:text-slate-900">
          {initiative.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-[9px] text-slate-400 truncate">{initiative.leader}</span>
          <EquipoBadge valor={initiative.equipoCorp} />
          {initiative.investment && (
            <span className="text-[9px] font-bold" style={{ color: pillarColor }}>
              {initiative.investment}
            </span>
          )}
        </div>
      </div>
      <button
        className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity border border-slate-300 text-slate-400 hover:border-slate-500 hover:text-slate-600"
        title="Ver detalle"
      >
        +
      </button>
    </div>
  )
}

function PillarHeader({ pillar }: { pillar: typeof PILLARS[0] }) {
  return (
    <div
      className="rounded-xl px-4 py-3 text-center border"
      style={{ background: pillar.color, borderColor: pillar.color }}
    >
      <p className="text-[12px] font-black text-white leading-tight">
        {pillar.label}
      </p>
      <p className="text-[10px] text-white/70 mt-0.5 font-semibold">
        ({pillar.count})
      </p>
    </div>
  )
}

function StageRow({
  stage,
  pillars,
  initiatives,
  isLast,
}: {
  stage: typeof STAGES[0]
  pillars: typeof PILLARS
  initiatives: PipelineInitiative[]
  isLast: boolean
}) {
  const countForStage = initiatives.filter((i) => i.stage === stage.id).length
  const isEmpty = countForStage === 0

  return (
    <div className={`grid gap-3 items-start ${!isLast ? "pb-4 border-b border-slate-200" : ""}`}
      style={{ gridTemplateColumns: "180px 1fr 1fr 1fr 1fr 52px" }}
    >
      {/* Stage label – funnel */}
      <div className="flex items-start justify-center pt-1">
        <div className={`${stage.funnelWidth} ${stage.darkBg} rounded-xl px-3 py-3 text-center transition-all`}>
          <p className="text-[11px] font-black text-white leading-tight">{stage.label}</p>
          {stage.sublabel && (
            <p className="text-[9px] text-white/60 mt-0.5 font-medium">{stage.sublabel}</p>
          )}
        </div>
      </div>

      {/* Per-pillar cells */}
      {pillars.map((pillar) => {
        const items = initiatives.filter(
          (i) => i.stage === stage.id && i.pillar === pillar.id
        )
        return (
          <div
            key={pillar.id}
            className={`rounded-xl border min-h-16 transition-colors
              ${items.length > 0
                ? `${pillar.lightBg} border-opacity-40`
                : "bg-slate-50/50 border-dashed border-slate-200"}
            `}
            style={items.length > 0 ? { borderColor: pillar.color + "40" } : {}}
          >
            {items.length > 0 ? (
              <div className="p-2 space-y-0.5">
                {items.map((init) => (
                  <InitiativeChip key={init.id} initiative={init} pillarColor={pillar.color} />
                ))}
              </div>
            ) : (
              <div className="h-full min-h-16 flex items-center justify-center">
                <span className="text-[10px] text-slate-300 font-medium">—</span>
              </div>
            )}
          </div>
        )
      })}

      {/* Count badge */}
      <div className="flex items-start justify-center pt-1">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all
            ${isEmpty
              ? "bg-slate-200 text-slate-500 border-slate-300"
              : "bg-slate-800 text-white border-slate-700 shadow-md"
            }`}
        >
          {countForStage}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function StrategicPipelineDashboard() {
  const [activeFilter, setActiveFilter] = useState<PillarId | "all">("all")
  const [activeStatus, setActiveStatus] = useState<InitStatus | "all">("all")

  const filtered = ALL_INITIATIVES.filter((i) => {
    const pillarOk = activeFilter === "all" || i.pillar === activeFilter
    const statusOk = activeStatus === "all" || i.status === activeStatus
    return pillarOk && statusOk
  })

  const totalInProgress = ALL_INITIATIVES.filter((i) => i.stage === "elaboracion").length
  const totalApproved   = ALL_INITIATIVES.filter((i) => i.stage === "aprobadas").length
  const totalDev        = ALL_INITIATIVES.filter((i) => i.stage === "desarrollo").length
  const totalDone       = ALL_INITIATIVES.filter((i) => i.stage === "implementadas").length
  const completionPct   = Math.round(((totalApproved + totalDev + totalDone) / ALL_INITIATIVES.length) * 100)

  return (
    <div className="space-y-6">

      {/* ── Title ── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
            <span className="text-white font-black text-sm">+</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              Soltrak — Pipeline de Iniciativas Estratégicas
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              {ALL_INITIATIVES.length} iniciativas · Versión Nov. 2025 · Todas prioridad 1 · Marzo 2026
            </p>
          </div>
        </div>

        {/* Soltrak badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-lg">
            <span className="font-black text-sm tracking-wide">SOLTRAK</span>
            <span className="font-black text-sm">+</span>
          </div>
        </div>
      </div>

      {/* ── Progress summary bar ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            { label: "Fichas en Elaboración", value: totalInProgress, total: ALL_INITIATIVES.length, color: "bg-slate-700" },
            { label: "Fichas Aprobadas",       value: totalApproved,   total: ALL_INITIATIVES.length, color: "bg-blue-500" },
            { label: "En Desarrollo",          value: totalDev,        total: ALL_INITIATIVES.length, color: "bg-amber-500" },
            { label: "Implementadas",          value: totalDone,       total: ALL_INITIATIVES.length, color: "bg-emerald-600" },
          ].map(({ label, value, total, color }) => (
            <div key={label} className="text-center">
              <p className="text-[22px] font-black text-slate-900 leading-none">{value}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{label}</p>
              <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${color}`}
                  style={{ width: `${(value / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-emerald-600 to-emerald-400 rounded-full transition-all"
              style={{ width: `${completionPct || 0}%` }}
            />
          </div>
          <span className="text-[11px] font-black text-slate-500 shrink-0">
            {completionPct}% completado del pipeline
          </span>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Leyenda:</span>
        {/* Gestión E&D badge */}
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 mr-1">
          Gestión E&D
        </span>
        {(Object.entries(STATUS_CONFIG) as [InitStatus, typeof STATUS_CONFIG[InitStatus]][]).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setActiveStatus(activeStatus === key ? "all" : key)}
            className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all
              ${activeStatus === key
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}
          >
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </button>
        ))}
      </div>

      {/* ── Pillar filters ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveFilter("all")}
          className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all
            ${activeFilter === "all"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}
        >
          Todos los pilares
        </button>
        {PILLARS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveFilter(activeFilter === p.id ? "all" : p.id)}
            className="text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all"
            style={
              activeFilter === p.id
                ? { background: p.color, color: "#fff", borderColor: p.color }
                : { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" }
            }
          >
            {p.label} ({p.count})
          </button>
        ))}
      </div>

      {/* ── Pipeline Matrix ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Matrix header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100">
          <div
            className="grid gap-3 items-end"
            style={{ gridTemplateColumns: "180px 1fr 1fr 1fr 1fr 52px" }}
          >
            {/* Etapas header */}
            <div className="rounded-xl bg-slate-900 px-4 py-3 text-center">
              <p className="text-[12px] font-black text-white tracking-wide">Etapas</p>
            </div>

            {/* Pillar headers */}
            {PILLARS.map((p) => (
              <PillarHeader key={p.id} pillar={p} />
            ))}

            {/* Count header */}
            <div className="rounded-xl bg-slate-100 px-2 py-3 text-center">
              <p className="text-[9px] font-black text-slate-500 leading-tight uppercase tracking-wide">N° por etapa</p>
            </div>
          </div>
        </div>

        {/* Stage rows */}
        <div className="px-5 py-4 space-y-4">
          {STAGES.map((stage, idx) => (
            <StageRow
              key={stage.id}
              stage={stage}
              pillars={PILLARS}
              initiatives={filtered}
              isLast={idx === STAGES.length - 1}
            />
          ))}
        </div>

        {/* Footer notes */}
        <div className="px-5 pb-5">
          <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              <strong className="text-slate-500">Notas:</strong>{" "}
              (1) Consultoría del área de Estrategia en el que participamos en la elaboración del caso de negocio.{" "}
              (2) Iniciativas con Equipo Corp asignado (TPI o RRHH) cuentan con soporte corporativo formal.{" "}
              (3) Las inversiones indicadas son estimadas y sujetas a aprobación de directorio.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom strip: pillar summary ── */}
      <div className="grid grid-cols-4 gap-4">
        {PILLARS.map((pillar) => {
          const items = ALL_INITIATIVES.filter((i) => i.pillar === pillar.id)
          const tpiCount = items.filter((i) => i.equipoCorp === "TPI").length
          const investment = items.reduce((s, i) => {
            if (!i.investment) return s
            const num = parseFloat(i.investment.replace(/[^0-9.]/g, ""))
            return s + (isNaN(num) ? 0 : num)
          }, 0)

          return (
            <div
              key={pillar.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              style={{ borderTopWidth: 3, borderTopColor: pillar.color }}
            >
              <p className="text-[11px] font-black text-slate-600 leading-tight mb-3">{pillar.label}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-slate-900">{items.length}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Iniciativas</p>
                </div>
                <div className="text-right space-y-1">
                  {tpiCount > 0 && (
                    <div>
                      <p className="text-[13px] font-black text-amber-600">{tpiCount} TPI</p>
                    </div>
                  )}
                  {investment > 0 && (
                    <p className="text-[11px] font-black" style={{ color: pillar.color }}>
                      ${investment >= 1000 ? `${(investment / 1000).toFixed(1)}M` : `${investment}K`}
                    </p>
                  )}
                </div>
              </div>

              {/* Mini progress per stage */}
              <div className="mt-3 space-y-1">
                {[
                  { stage: "elaboracion" as PipelineStage, label: "Elaboración", color: "bg-slate-600" },
                  { stage: "aprobadas"  as PipelineStage, label: "Aprobadas",   color: "bg-blue-500" },
                  { stage: "desarrollo" as PipelineStage, label: "Desarrollo",  color: "bg-amber-500" },
                  { stage: "implementadas" as PipelineStage, label: "Implementadas", color: "bg-emerald-500" },
                ].map(({ stage, label, color }) => {
                  const n = items.filter((i) => i.stage === stage).length
                  if (n === 0 && stage !== "elaboracion") return null
                  return (
                    <div key={stage} className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color} rounded-full`}
                          style={{ width: `${(n / items.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium w-14 shrink-0 text-right">
                        {label} {n}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
