"use client"

import React, { useState, useMemo, useRef, useEffect } from "react"
import { FICHAS, type InitiativeFicha, type KpiRow, type HitoRow } from "./initiative-ficha-dashboard"

// ─── Types ────────────────────────────────────────────────────────────────────

type TrafficLight = "verde" | "amarillo" | "rojo" | "sin-datos"

interface StatusInitiative {
  id: number
  title: string
  pillar: string
  avancePonderado: TrafficLight
  kpiPrincipal: string
  avanceKpi: string        // editable – actual YTD value
  metaKpi: string          // editable – target YTD value
  avanceKpiColor: TrafficLight
  avanceActividades: TrafficLight
  liderNegocio: string
  gestionProyecto: string  // editable – PM name
  notas: string            // expandable
  fichaId: string | null   // ID de la ficha ("1.1", "2", etc.)
  // Manual override flags
  manualAvancePonderado?: boolean
  manualAvanceKpiColor?: boolean
  manualAvanceActividades?: boolean
}

type SortField = "id" | "title" | "avancePonderado" | "liderNegocio" | "avanceKpiColor" | "avanceActividades"
type SortDir = "asc" | "desc"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TL_CYCLE: TrafficLight[] = ["verde", "amarillo", "rojo", "sin-datos"]

const TL_CONFIG: Record<TrafficLight, { bg: string; border: string; label: string; dot: string; badge: string }> = {
  verde:      { bg: "bg-emerald-500",  border: "border-emerald-600", label: "En curso",   dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  amarillo:   { bg: "bg-amber-400",    border: "border-amber-500",   label: "Observada",  dot: "bg-amber-400",   badge: "bg-amber-50 text-amber-700 border-amber-200" },
  rojo:       { bg: "bg-red-500",      border: "border-red-600",     label: "Retrasada",  dot: "bg-red-500",     badge: "bg-red-50 text-red-700 border-red-200" },
  "sin-datos":{ bg: "bg-slate-300",    border: "border-slate-400",   label: "Sin datos",  dot: "bg-slate-300",   badge: "bg-slate-50 text-slate-500 border-slate-200" },
}

function nextStatus(current: TrafficLight): TrafficLight {
  const idx = TL_CYCLE.indexOf(current)
  return TL_CYCLE[(idx + 1) % TL_CYCLE.length]
}

function tlRank(t: TrafficLight): number {
  return { rojo: 0, amarillo: 1, verde: 2, "sin-datos": 3 }[t]
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_DATA: StatusInitiative[] = [
  {
    id: 1,  title: "Mejorar márgenes por cliente (Lubricantes y Neumáticos)",
    pillar: "Protección y Optimización",
    avancePonderado: "amarillo", kpiPrincipal: "Margen contribución %",
    avanceKpi: "-", metaKpi: "22%", avanceKpiColor: "rojo",
    avanceActividades: "verde", liderNegocio: "JC. Paz", gestionProyecto: "", notas: "",
    fichaId: "1.1",
  },
  {
    id: 2,  title: "Mejorar márgenes por cliente (Seguridad Industrial)",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "Margen contribución %",
    avanceKpi: "-", metaKpi: "22%", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "C. Novoa", gestionProyecto: "", notas: "",
    fichaId: "1.2",
  },
  {
    id: 3,  title: "Simplificar el negocio",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "# SKUs / marcas activas",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "C. Sanchez", gestionProyecto: "", notas: "",
    fichaId: "2",
  },
  {
    id: 4,  title: "Ordenar la oferta a clientes",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "Segmentos definidos",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "J. Céspedes", gestionProyecto: "", notas: "",
    fichaId: "3",
  },
  {
    id: 5,  title: "Mejora de procesos: Proyecto Contabilidad",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "Ahorro anual ($K)",
    avanceKpi: "-", metaKpi: "$65K", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "G. Florida", gestionProyecto: "", notas: "",
    fichaId: "4.1",
  },
  {
    id: 6,  title: "Mejora de procesos: Proyecto ADV + Créditos",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "Ahorro anual ($K)",
    avanceKpi: "-", metaKpi: "$130K", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "G. Florida", gestionProyecto: "", notas: "",
    fichaId: "4.2",
  },
  {
    id: 7,  title: "Mejora de procesos: Proyecto logístico",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "OTIF %",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "B. Coronel", gestionProyecto: "", notas: "",
    fichaId: "4.3",
  },
  {
    id: 8,  title: "Mejora de procesos: Modelo de precios",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "Módulo implementado",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "G. Florida", gestionProyecto: "", notas: "",
    fichaId: "4.4",
  },
  {
    id: 9,  title: "Implementar proceso de S&OP robusto",
    pillar: "Protección y Optimización",
    avancePonderado: "sin-datos", kpiPrincipal: "OTIF / Inv. Excesivo",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "B. Coronel", gestionProyecto: "", notas: "",
    fichaId: "5",
  },
  {
    id: 10, title: "Definir nuevo modelo de almacenaje y distribución",
    pillar: "Transformación",
    avancePonderado: "sin-datos", kpiPrincipal: "Modelo definido",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "B. Coronel", gestionProyecto: "", notas: "",
    fichaId: "7",
  },
  {
    id: 11, title: "Nueva plataforma E-commerce",
    pillar: "Transformación",
    avancePonderado: "sin-datos", kpiPrincipal: "Ventas online (S/)",
    avanceKpi: "-", metaKpi: "S/ 1.5M", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "J. Céspedes", gestionProyecto: "", notas: "",
    fichaId: "8",
  },
  {
    id: 12, title: "Giatrak 2.0",
    pillar: "Nuevos Negocios",
    avancePonderado: "sin-datos", kpiPrincipal: "Plataforma operativa",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "C. Novoa", gestionProyecto: "", notas: "",
    fichaId: null,
  },
  {
    id: 13, title: "Plan para mejorar la Cultura",
    pillar: "Habilitadoras",
    avancePonderado: "sin-datos", kpiPrincipal: "Índice clima laboral",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "E. Lescano", gestionProyecto: "", notas: "",
    fichaId: "11",
  },
  {
    id: 14, title: "Implementar un proceso para ventas estándar",
    pillar: "Transformación",
    avancePonderado: "sin-datos", kpiPrincipal: "Adopción proceso ventas",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "C. Sanchez", gestionProyecto: "", notas: "",
    fichaId: "6",
  },
  {
    id: 15, title: "Plan de talento y sucesión",
    pillar: "Habilitadoras",
    avancePonderado: "sin-datos", kpiPrincipal: "Posiciones críticas cubiertas",
    avanceKpi: "-", metaKpi: "-", avanceKpiColor: "sin-datos",
    avanceActividades: "sin-datos", liderNegocio: "E. Lescano", gestionProyecto: "", notas: "",
    fichaId: "10",
  },
]

// ─── Traffic Light Button (clickable cycle) ───────────────────────────────────

function TLButton({
  value,
  onChange,
  size = "md",
  readonly = false,
}: {
  value: TrafficLight
  onChange?: (v: TrafficLight) => void
  size?: "sm" | "md" | "lg"
  readonly?: boolean
}) {
  const cfg = TL_CONFIG[value]
  const sizeClass = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6"
  return (
    <button
      onClick={readonly ? undefined : () => onChange?.(nextStatus(value))}
      title={readonly ? cfg.label : `${cfg.label} · Clic para cambiar`}
      className={`
        ${sizeClass} rounded-md border-2 ${cfg.bg} ${cfg.border}
        ${readonly ? "cursor-default" : "cursor-pointer hover:opacity-80 hover:scale-110"}
        transition-all shrink-0
      `}
    />
  )
}

// ─── Inline editable text ─────────────────────────────────────────────────────

function EditableCell({
  value,
  onChange,
  placeholder = "—",
  className = "",
  multiline = false,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  multiline?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) ref.current?.focus()
  }, [editing])

  const commit = () => {
    setEditing(false)
    onChange(draft.trim() || placeholder === "—" ? draft.trim() : placeholder)
  }

  if (editing) {
    const shared = {
      ref,
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) commit()
        if (e.key === "Escape") { setDraft(value); setEditing(false) }
      },
      className: `w-full text-[11px] bg-white border border-blue-400 rounded px-1.5 py-0.5 outline-none text-slate-800 ${className}`,
    }
    return multiline
      ? <textarea {...(shared as any)} rows={2} />
      : <input {...(shared as any)} />
  }

  return (
    <span
      onClick={() => { setDraft(value); setEditing(true) }}
      title="Clic para editar"
      className={`
        text-[11px] cursor-text px-1.5 py-0.5 rounded hover:bg-blue-50 hover:ring-1 ring-blue-200
        transition-all min-w-7.5 inline-block text-slate-700 ${className}
        ${!value || value === "-" ? "text-slate-300 italic" : ""}
      `}
    >
      {value || placeholder}
    </span>
  )
}

// ─── Column header with sort ──────────────────────────────────────────────────

function SortTH({
  children,
  field,
  sortField,
  sortDir,
  onSort,
  className = "",
}: {
  children: React.ReactNode
  field: SortField
  sortField: SortField
  sortDir: SortDir
  onSort: (f: SortField) => void
  className?: string
}) {
  const active = sortField === field
  return (
    <th
      onClick={() => onSort(field)}
      className={`
        px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em]
        cursor-pointer select-none hover:bg-slate-800 transition-colors whitespace-nowrap
        ${active ? "bg-slate-800 text-white" : "bg-slate-900 text-slate-300"}
        ${className}
      `}
    >
      <div className="flex items-center gap-1">
        {children}
        <span className="text-[9px] opacity-60">
          {active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </div>
    </th>
  )
}

// ─── Expanded Ficha Detail Component ──────────────────────────────────────────

function ExpandedFichaDetail({
  row,
  ficha,
  pillarColor,
  updateRow,
  allData,
}: {
  row: StatusInitiative
  ficha: InitiativeFicha | undefined
  pillarColor: string
  updateRow: (id: number, patch: Partial<StatusInitiative>) => void
  allData: StatusInitiative[]
}) {
  if (!ficha) {
    return (
      <tr className="bg-slate-50/50">
        <td className="pl-4 py-2" />
        <td colSpan={11} className="px-3 py-3">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Notas / Observaciones</p>
              <EditableCell
                value={row.notas}
                onChange={(v) => updateRow(row.id, { notas: v })}
                placeholder="Clic para agregar notas sobre esta iniciativa..."
                multiline
                className="w-full block text-slate-600"
              />
            </div>
            <div className="shrink-0 space-y-2 pt-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 w-24">Avance Pond.</span>
                <TLButton value={row.avancePonderado} onChange={(v) => updateRow(row.id, { avancePonderado: v })} size="lg" />
                <span className={`text-[10px] font-bold ${TL_CONFIG[row.avancePonderado].badge} px-2 py-0.5 rounded-full border`}>
                  {TL_CONFIG[row.avancePonderado].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 w-24">Avance KPI</span>
                <TLButton value={row.avanceKpiColor} onChange={(v) => updateRow(row.id, { avanceKpiColor: v })} size="lg" />
                <span className={`text-[10px] font-bold ${TL_CONFIG[row.avanceKpiColor].badge} px-2 py-0.5 rounded-full border`}>
                  {TL_CONFIG[row.avanceKpiColor].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 w-24">Act. Proyecto</span>
                <TLButton value={row.avanceActividades} onChange={(v) => updateRow(row.id, { avanceActividades: v })} size="lg" />
                <span className={`text-[10px] font-bold ${TL_CONFIG[row.avanceActividades].badge} px-2 py-0.5 rounded-full border`}>
                  {TL_CONFIG[row.avanceActividades].label}
                </span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    )
  }

  // Ficha exists - show full detail
  const HITO_STATUS_CFG: Record<string, { label: string; cls: string; dot: string }> = {
    completado: { label: "Completado", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    "en-curso": { label: "En curso", cls: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
    pendiente: { label: "Pendiente", cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-400" },
    tbd: { label: "TBD", cls: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-300" },
  }

  // Find related initiatives
  const getRelatedInitiatives = () => {
    const related: StatusInitiative[] = []
    
    // Get ficha family (e.g., "4" from "4.1", "4.2", "4.3")
    const fichaFamily = row.fichaId?.split('.')[0]
    
    allData.forEach((initiative) => {
      // Skip the current row
      if (initiative.id === row.id) return
      
      // Check if related by:
      // 1. Same ficha family (e.g., 4.1, 4.2, 4.3, 4.4)
      const initFichaFamily = initiative.fichaId?.split('.')[0]
      const isSameFichaFamily = fichaFamily && initFichaFamily === fichaFamily
      
      // 2. Same pillar
      const isSamePillar = initiative.pillar === row.pillar
      
      // 3. Same leader
      const isSameLeader = initiative.liderNegocio === row.liderNegocio
      
      // Add if any relationship exists (prioritize ficha family)
      if (isSameFichaFamily || (isSamePillar && isSameLeader)) {
        related.push(initiative)
      }
    })
    
    // Sort: ficha family first, then by pillar, then by id
    return related.sort((a, b) => {
      const aFichaFamily = a.fichaId?.split('.')[0]
      const bFichaFamily = b.fichaId?.split('.')[0]
      const isFichaFamily = fichaFamily && aFichaFamily === fichaFamily
      const bIsFichaFamily = fichaFamily && bFichaFamily === fichaFamily
      
      if (isFichaFamily && !bIsFichaFamily) return -1
      if (!isFichaFamily && bIsFichaFamily) return 1
      
      return a.id - b.id
    })
  }
  
  const relatedInitiatives = getRelatedInitiatives()

  return (
    <tr className="bg-linear-to-br from-slate-50 to-blue-50/30">
      <td className="pl-4 py-2" />
      <td colSpan={11} className="px-4 py-5">
        <div className="space-y-4">
          {/* Header with title and status badges */}
          <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-200">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-1 h-6 rounded-full"
                  style={{ background: pillarColor }}
                />
                <h3 className="text-[13px] font-black text-slate-900">{ficha.title}</h3>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: pillarColor + "18", color: pillarColor }}
                >
                  {ficha.pillar}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed whitespace-pre-line">
                {ficha.descripcion}
              </p>
            </div>
            <div className="shrink-0 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 w-24">Avance Pond.</span>
                <TLButton value={row.avancePonderado} onChange={(v) => updateRow(row.id, { avancePonderado: v, manualAvancePonderado: true })} size="lg" />
                <span className={`text-[10px] font-bold ${TL_CONFIG[row.avancePonderado].badge} px-2 py-0.5 rounded-full border`}>
                  {TL_CONFIG[row.avancePonderado].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 w-24">Avance KPI</span>
                <TLButton value={row.avanceKpiColor} onChange={(v) => updateRow(row.id, { avanceKpiColor: v, manualAvanceKpiColor: true })} size="lg" />
                <span className={`text-[10px] font-bold ${TL_CONFIG[row.avanceKpiColor].badge} px-2 py-0.5 rounded-full border`}>
                  {TL_CONFIG[row.avanceKpiColor].label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 w-24">Act. Proyecto</span>
                <TLButton value={row.avanceActividades} onChange={(v) => updateRow(row.id, { avanceActividades: v, manualAvanceActividades: true })} size="lg" />
                <span className={`text-[10px] font-bold ${TL_CONFIG[row.avanceActividades].badge} px-2 py-0.5 rounded-full border`}>
                  {TL_CONFIG[row.avanceActividades].label}
                </span>
              </div>
            </div>
          </div>

          {/* Main content - 2 column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Racional estratégico */}
              <div className="bg-white rounded-xl border border-slate-200 p-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  📋 Racional Estratégico
                </h4>
                <p className="text-[10px] text-slate-600 leading-relaxed whitespace-pre-line">
                  {ficha.racionalEstrategico}
                </p>
              </div>

              {/* Riesgos */}
              {ficha.riesgos && ficha.riesgos.length > 0 && (
                <div className="bg-white rounded-xl border border-red-200 p-3">
                  <h4 className="text-[10px] font-black text-red-400 uppercase tracking-wider mb-2">
                    ⚠️ Riesgos Identificados
                  </h4>
                  <ul className="space-y-1">
                    {ficha.riesgos.map((riesgo, i) => (
                      <li key={i} className="text-[10px] text-slate-600 leading-relaxed flex gap-2">
                        <span className="text-red-400 shrink-0">•</span>
                        <span>{riesgo}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impacto e Inversión */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl border border-emerald-200 p-3">
                  <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-wider mb-1">
                    💰 Impacto
                  </h4>
                  <p className="text-[10px] text-slate-600 leading-snug">{ficha.impacto}</p>
                </div>
                <div className="bg-white rounded-xl border border-blue-200 p-3">
                  <h4 className="text-[9px] font-black text-blue-600 uppercase tracking-wider mb-1">
                    💵 Inversión
                  </h4>
                  <p className="text-[10px] text-slate-600 leading-snug">{ficha.inversion}</p>
                </div>
              </div>

              {/* Equipo */}
              <div className="bg-white rounded-xl border border-slate-200 p-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  👥 Equipo del Proyecto
                </h4>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 w-28 shrink-0">Sponsor:</span>
                    <span className="font-semibold text-slate-700">{ficha.sponsor}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 w-28 shrink-0">Líder Proyecto:</span>
                    <span className="font-semibold text-slate-700">{ficha.liderProyecto}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 w-28 shrink-0">Gestión Proyecto:</span>
                    <span className="font-semibold text-slate-700">{ficha.gestionProyecto}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 w-28 shrink-0">Equipo:</span>
                    <span className="text-slate-600">{ficha.equipoProyecto}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 w-28 shrink-0">Frentes:</span>
                    <span className="text-slate-600">{ficha.frentesTrabajo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Objetivo */}
              <div className="bg-white rounded-xl border border-blue-200 p-3">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-2">
                  🎯 Objetivo
                </h4>
                <p className="text-[10px] text-slate-700 leading-relaxed font-medium">
                  {ficha.objetivo}
                </p>
              </div>

              {/* KPIs */}
              <div className="bg-white rounded-xl border border-slate-200 p-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  📊 KPIs
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-[9px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-1.5 pr-2 font-black text-slate-500 uppercase">KPI</th>
                        <th className="text-center px-1 py-1.5 font-black text-slate-500 uppercase">2025</th>
                        <th className="text-center px-1 py-1.5 font-black text-slate-500 uppercase">Q1-26</th>
                        <th className="text-center px-1 py-1.5 font-black text-slate-500 uppercase">Q2-26</th>
                        <th className="text-center px-1 py-1.5 font-black text-slate-500 uppercase">Q3-26</th>
                        <th className="text-center px-1 py-1.5 font-black text-slate-500 uppercase">Q4-26</th>
                        <th className="text-center px-1 py-1.5 font-black text-slate-500 uppercase">Meta</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ficha.kpis.map((kpi, i) => (
                        <tr key={i} className={kpi.esPrincipal ? "bg-blue-50/50" : ""}>
                          <td className="py-1.5 pr-2">
                            <div className="flex items-center gap-1">
                              {kpi.esPrincipal && <span className="text-blue-600">★</span>}
                              <span className={kpi.esPrincipal ? "font-bold text-slate-700" : "text-slate-600"}>
                                {kpi.descripcion}
                              </span>
                            </div>
                          </td>
                          <td className="text-center px-1 py-1.5 font-semibold text-slate-600">{kpi.real2025}</td>
                          <td className="text-center px-1 py-1.5 text-slate-600">{kpi.q1_26}</td>
                          <td className="text-center px-1 py-1.5 text-slate-600">{kpi.q2_26}</td>
                          <td className="text-center px-1 py-1.5 text-slate-600">{kpi.q3_26}</td>
                          <td className="text-center px-1 py-1.5 text-slate-600">{kpi.q4_26}</td>
                          <td className="text-center px-1 py-1.5 font-black text-slate-700">{kpi.meta2026}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Hitos */}
              <div className="bg-white rounded-xl border border-slate-200 p-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  📌 Hitos del Proyecto
                </h4>
                <div className="space-y-2">
                  {ficha.hitos.map((hito, i) => {
                    const statusCfg = HITO_STATUS_CFG[hito.status || "tbd"]
                    return (
                      <div key={i} className="flex items-start gap-2 border-l-2 border-slate-200 pl-2 py-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                            <span className="text-[10px] font-semibold text-slate-700 leading-tight">
                              {hito.descripcion}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[9px] text-slate-500 ml-4">
                            <span>📅 {hito.fechaEsperada}</span>
                            <span>👤 {hito.responsable}</span>
                            <span className={`px-1.5 py-0.5 rounded-full border text-[8px] font-bold ${statusCfg.cls}`}>
                              {statusCfg.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Notas adicionales */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
            <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-wider mb-2">
              📝 Notas / Observaciones Adicionales
            </h4>
            <EditableCell
              value={row.notas}
              onChange={(v) => updateRow(row.id, { notas: v })}
              placeholder="Clic para agregar notas adicionales sobre el status actual de la iniciativa..."
              multiline
              className="w-full block text-slate-700"
            />
          </div>

          {/* Related initiatives section */}
          {relatedInitiatives.length > 0 && (
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider">
                  🔗 Iniciativas Relacionadas
                </span>
                <span className="text-[9px] font-bold text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full">
                  {relatedInitiatives.length}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {relatedInitiatives.map((relInit) => {
                  const relFicha = FICHAS.find((f) => f.id === relInit.fichaId)
                  const PILLAR_COLORS: Record<string, string> = {
                    "Protección y Optimización": "#9b111e",
                    "Transformación": "#2563eb",
                    "Nuevos Negocios": "#059669",
                    "Habilitadoras": "#7c3aed",
                  }
                  const relPillarColor = PILLAR_COLORS[relInit.pillar] ?? "#64748b"
                  const fichaFamily = row.fichaId?.split('.')[0]
                  const relFichaFamily = relInit.fichaId?.split('.')[0]
                  const isSameFamiliy = fichaFamily && relFichaFamily === fichaFamily

                  return (
                    <div
                      key={relInit.id}
                      className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-0.5 h-4 rounded-full"
                              style={{ background: relPillarColor }}
                            />
                            <span className="text-[10px] font-bold text-slate-700 leading-tight">
                              {relInit.title}
                            </span>
                            {isSameFamiliy && (
                              <span className="text-[8px] font-black text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-full">
                                MISMO GRUPO
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: relPillarColor + "18", color: relPillarColor }}
                            >
                              {relInit.pillar}
                            </span>
                            {relInit.fichaId && (
                              <span className="text-[8px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                                Ficha {relInit.fichaId}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <TLButton value={relInit.avancePonderado} readonly size="sm" />
                          <TLButton value={relInit.avanceKpiColor} readonly size="sm" />
                          <TLButton value={relInit.avanceActividades} readonly size="sm" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        {/* KPI Principal */}
                        <div className="flex items-start gap-2 text-[9px]">
                          <span className="text-slate-400 shrink-0 w-16">KPI:</span>
                          <span className="font-semibold text-slate-600">{relInit.kpiPrincipal}</span>
                        </div>

                        {/* Avances */}
                        <div className="flex items-center gap-3 text-[9px]">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400">Avance:</span>
                            <span className="font-bold text-slate-600">{relInit.avanceKpi}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400">Meta:</span>
                            <span className="font-bold text-slate-600">{relInit.metaKpi}</span>
                          </div>
                        </div>

                        {/* Team */}
                        <div className="flex items-center gap-2 text-[9px] pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1">
                            <span
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black text-white"
                              style={{ background: relPillarColor }}
                            >
                              {relInit.liderNegocio.split(".")[0][0]}
                            </span>
                            <span className="text-slate-600 font-medium">{relInit.liderNegocio}</span>
                          </div>
                          {relInit.gestionProyecto && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500">PM: {relInit.gestionProyecto}</span>
                            </>
                          )}
                        </div>

                        {/* Ficha details if available */}
                        {relFicha && (
                          <div className="bg-slate-50 rounded p-2 text-[9px] text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-700">Objetivo:</span> {relFicha.objetivo.substring(0, 100)}
                            {relFicha.objetivo.length > 100 && "..."}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-[9px] text-purple-600 mt-3 italic">
                ℹ️ Iniciativas relacionadas por mismo pilar, líder o grupo de proyecto
              </p>
            </div>
          )}

          {/* Footer metadata */}
          <div className="flex items-center justify-between text-[9px] text-slate-400 pt-2 border-t border-slate-200">
            <span>Ficha ID: {ficha.id} · Versión: {ficha.version || "—"}</span>
            <span>Última actualización: {ficha.ultimaActualizacion || "—"}</span>
          </div>
        </div>
      </td>
    </tr>
  )
}

// ─── Auto-Calculation Functions ──────────────────────────────────────────────

/**
 * Calcula el avance de actividades basándose en el estado de los hitos
 */
function calculateActivityProgress(ficha: InitiativeFicha | undefined): TrafficLight {
  if (!ficha || !ficha.hitos || ficha.hitos.length === 0) {
    return "sin-datos"
  }

  const total = ficha.hitos.length
  const completados = ficha.hitos.filter(h => h.status === "completado").length
  const enCurso = ficha.hitos.filter(h => h.status === "en-curso").length
  const porcentaje = (completados / total) * 100

  // Verde: 80%+ completados
  // Amarillo: 50%-79% completados O hay actividades en curso
  // Rojo: <50% completados y sin actividades en curso
  if (porcentaje >= 80) return "verde"
  if (porcentaje >= 50 || enCurso > 0) return "amarillo"
  return "rojo"
}

/**
 * Calcula el avance del KPI principal basándose en el progreso real vs meta
 */
function calculateKpiProgress(ficha: InitiativeFicha | undefined): { color: TrafficLight; avance: string; meta: string } {
  if (!ficha || !ficha.kpis || ficha.kpis.length === 0) {
    return { color: "sin-datos", avance: "-", meta: "-" }
  }

  // Buscar el KPI principal
  const kpiPrincipal = ficha.kpis.find(k => k.esPrincipal) || ficha.kpis[0]
  
  // Usar statusReal si existe, si no calcular con base en Q1
  const color = kpiPrincipal.statusReal || "sin-datos"
  const avance = kpiPrincipal.q1_26 || kpiPrincipal.real2025 || "-"
  const meta = kpiPrincipal.meta2026 || "-"

  return { color, avance, meta }
}

/**
 * Calcula el avance ponderado (60% actividades + 40% KPI)
 */
function calculateWeightedProgress(actividadesColor: TrafficLight, kpiColor: TrafficLight): TrafficLight {
  // Si ambos son sin-datos, retornar sin-datos
  if (actividadesColor === "sin-datos" && kpiColor === "sin-datos") {
    return "sin-datos"
  }

  // Convertir colores a puntuación (verde=3, amarillo=2, rojo=1, sin-datos=0)
  const scoreMap = { verde: 3, amarillo: 2, rojo: 1, "sin-datos": 0 }
  const actScore = scoreMap[actividadesColor]
  const kpiScore = scoreMap[kpiColor]

  // Si uno es sin-datos, usar sólo el otro
  if (actividadesColor === "sin-datos") return kpiColor
  if (kpiColor === "sin-datos") return actividadesColor

  // Calcular promedio ponderado (60% actividades, 40% KPI)
  const weighted = (actScore * 0.6) + (kpiScore * 0.4)

  // Convertir puntuación a color
  if (weighted >= 2.5) return "verde"
  if (weighted >= 1.5) return "amarillo"
  return "rojo"
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function StrategicStatusDashboard() {
  const [data, setData] = useState<StatusInitiative[]>(INITIAL_DATA)
  const [filterStatus, setFilterStatus] = useState<TrafficLight | "all">("all")
  const [filterPillar, setFilterPillar] = useState<string>("all")
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [expandedActivities, setExpandedActivities] = useState<Set<number>>(new Set())
  const [sortField, setSortField] = useState<SortField>("id")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [showLegend, setShowLegend] = useState(true)

  // ── Updaters ────────────────────────────────────────────────────────────────
  const updateRow = (id: number, patch: Partial<StatusInitiative>) => {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleActivities = (id: number) => {
    setExpandedActivities((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // ── Auto-calculate values from FICHAS ────────────────────────────────────────
  const enrichedData = useMemo(() => {
    return data.map(initiative => {
      const ficha = FICHAS.find(f => f.id === initiative.fichaId)
      
      if (!ficha) {
        // Si no hay ficha, mantener valores originales
        return initiative
      }

      // Calcular avances automáticamente solo si no fueron modificados manualmente
      const avanceActividades = initiative.manualAvanceActividades 
        ? initiative.avanceActividades 
        : calculateActivityProgress(ficha)
      
      const kpiInfo = calculateKpiProgress(ficha)
      const avanceKpiColor = initiative.manualAvanceKpiColor 
        ? initiative.avanceKpiColor 
        : kpiInfo.color
      
      const avancePonderado = initiative.manualAvancePonderado 
        ? initiative.avancePonderado 
        : calculateWeightedProgress(avanceActividades, avanceKpiColor)

      return {
        ...initiative,
        avancePonderado,
        avanceKpi: kpiInfo.avance,
        metaKpi: kpiInfo.meta,
        avanceKpiColor,
        avanceActividades,
      }
    })
  }, [data])

  // ── Sort ────────────────────────────────────────────────────────────────────
  const handleSort = (field: SortField) => {
    setSortDir((prev) => (sortField === field ? (prev === "asc" ? "desc" : "asc") : "asc"))
    setSortField(field)
  }

  // ── Derived state ────────────────────────────────────────────────────────────
  const pillars = useMemo(() => {
    return ["all", ...Array.from(new Set(enrichedData.map((d) => d.pillar)))]
  }, [enrichedData])

  const sorted = useMemo(() => {
    const base = enrichedData.filter((r) => {
      const statusMatch = filterStatus === "all" || r.avancePonderado === filterStatus
      const pillarMatch = filterPillar === "all" || r.pillar === filterPillar
      return statusMatch && pillarMatch
    })
    return [...base].sort((a, b) => {
      let va: number | string = a[sortField as keyof StatusInitiative] as any
      let vb: number | string = b[sortField as keyof StatusInitiative] as any
      if (sortField === "avancePonderado" || sortField === "avanceKpiColor" || sortField === "avanceActividades") {
        va = tlRank(va as TrafficLight)
        vb = tlRank(vb as TrafficLight)
      }
      if (typeof va === "number") return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number)
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
  }, [enrichedData, filterStatus, filterPillar, sortField, sortDir])

  // ── Summary stats ────────────────────────────────────────────────────────────
  const total = enrichedData.length
  const countVerde    = enrichedData.filter((r) => r.avancePonderado === "verde").length
  const countAmarillo = enrichedData.filter((r) => r.avancePonderado === "amarillo").length
  const countRojo     = enrichedData.filter((r) => r.avancePonderado === "rojo").length
  const countSinDatos = enrichedData.filter((r) => r.avancePonderado === "sin-datos").length
  const pctVerde    = Math.round((countVerde / total) * 100)
  const pctAmarillo = Math.round((countAmarillo / total) * 100)
  const pctRojo     = Math.round((countRojo / total) * 100)

  // ── Pillar colors ────────────────────────────────────────────────────────────
  const PILLAR_COLORS: Record<string, string> = {
    "Protección y Optimización": "#9b111e",
    "Transformación":             "#2563eb",
    "Nuevos Negocios":            "#059669",
    "Habilitadoras":              "#7c3aed",
  }

  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white font-black text-base">+</span>
            </div>
            <div>
              <h1 className="text-[17px] font-black text-slate-900 leading-tight tracking-tight">
                Soltrak — Status de Iniciativas (Directorio)
              </h1>
              <p className="text-[12px] text-slate-500 mt-1 leading-snug max-w-2xl">
                El avance de las iniciativas es{" "}
                <span className="font-black text-emerald-600">{pctVerde}%</span> en lo esperado,{" "}
                <span className="font-black text-amber-500">{pctAmarillo}%</span> ligeramente retrasado
                {countRojo > 0 && (
                  <>, y <span className="font-black text-red-600">{pctRojo}%</span> retrasadas</>
                )}
                {countRojo === 0 && (
                  <span className="text-slate-400"> · Sin iniciativas retrasadas</span>
                )}
                {countSinDatos > 0 && (
                  <span className="text-slate-400"> · {countSinDatos} sin datos aún</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-medium">Marzo 2026 · 1Q26 YTD</p>
              <p className="text-[10px] text-slate-400">{total} iniciativas activas</p>
            </div>
            <div className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-2 rounded-xl">
              <span className="font-black text-sm tracking-wide">SOLTRAK</span>
              <span className="font-black text-sm">+</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            {countVerde > 0 && (
              <div className="bg-emerald-500 transition-all" style={{ width: `${pctVerde}%` }} title={`En curso: ${countVerde}`} />
            )}
            {countAmarillo > 0 && (
              <div className="bg-amber-400 transition-all" style={{ width: `${pctAmarillo}%` }} title={`Observada: ${countAmarillo}`} />
            )}
            {countRojo > 0 && (
              <div className="bg-red-500 transition-all" style={{ width: `${pctRojo}%` }} title={`Retrasada: ${countRojo}`} />
            )}
            {countSinDatos > 0 && (
              <div className="bg-slate-200 transition-all flex-1" title={`Sin datos: ${countSinDatos}`} />
            )}
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            {[
              { label: "En curso",  count: countVerde,    color: "bg-emerald-500" },
              { label: "Observada", count: countAmarillo, color: "bg-amber-400" },
              { label: "Retrasada", count: countRojo,     color: "bg-red-500" },
              { label: "Sin datos", count: countSinDatos, color: "bg-slate-200 border border-slate-300" },
            ].map(({ label, count, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="font-semibold">{label}</span>
                <span className="font-black text-slate-700">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters row ── */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status filter */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-1">Estado:</span>
          {([["all", "Todos"], ["verde", "En curso"], ["amarillo", "Observada"], ["rojo", "Retrasada"], ["sin-datos", "Sin datos"]] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilterStatus(val as TrafficLight | "all")}
              className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all
                ${filterStatus === val
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"}`}
            >
              {val !== "all" && (
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${TL_CONFIG[val as TrafficLight].dot}`} />
              )}
              {label}
            </button>
          ))}
        </div>

        {/* Pillar filter */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-1">Pilar:</span>
          {pillars.map((p) => (
            <button
              key={p}
              onClick={() => setFilterPillar(p)}
              className="text-[10px] font-bold px-2 py-1 rounded-lg border transition-all"
              style={
                filterPillar === p
                  ? { background: p === "all" ? "#1e293b" : (PILLAR_COLORS[p] ?? "#1e293b"), color: "#fff", borderColor: "transparent" }
                  : { background: "#fff", color: "#64748b", borderColor: "#e2e8f0" }
              }
            >
              {p === "all" ? "Todos" : p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowLegend(!showLegend)}
          className="ml-auto text-[10px] font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:border-slate-400 transition-all text-slate-500"
        >
          {showLegend ? "Ocultar leyenda" : "Ver leyenda"}
        </button>

        {/* Export hint */}
        <p className="text-[10px] text-slate-300 font-medium italic">
          Clic en semáforos para cambiar estado · Clic en texto para editar
        </p>
      </div>

      {/* ── Legend ── */}
      {showLegend && (
        <div className="flex items-center gap-6 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl flex-wrap">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leyenda:</span>
          {(Object.entries(TL_CONFIG) as [TrafficLight, typeof TL_CONFIG[TrafficLight]][]).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded ${cfg.bg} border ${cfg.border}`} />
              <span className="text-[10px] font-semibold text-slate-600">{cfg.label}</span>
            </div>
          ))}
          <span className="text-[10px] text-slate-400">· Los semáforos son interactivos: clic para cambiar estado · Texto subrayado es editable</span>
        </div>
      )}

      {/* ── Table ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <SortTH field="id" sortField={sortField} sortDir={sortDir} onSort={handleSort} className="w-10 text-center">N°</SortTH>
                <SortTH field="title" sortField={sortField} sortDir={sortDir} onSort={handleSort} className="min-w-55">Iniciativas 2026</SortTH>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">
                  Pilar
                </th>
                <SortTH field="avancePonderado" sortField={sortField} sortDir={sortDir} onSort={handleSort} className="text-center whitespace-nowrap">
                  Avance<br />Ponderado
                </SortTH>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap min-w-32">
                  KPI Principal
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">
                  Avance KPI<br />1Q26 YTD
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">
                  Meta KPI<br />1Q26 YTD
                </th>
                <SortTH field="avanceKpiColor" sortField={sortField} sortDir={sortDir} onSort={handleSort} className="text-center whitespace-nowrap">
                  Avance KPI<br />Principal
                </SortTH>
                <SortTH field="avanceActividades" sortField={sortField} sortDir={sortDir} onSort={handleSort} className="text-center whitespace-nowrap">
                  Avance<br />Actividades
                </SortTH>
                <SortTH field="liderNegocio" sortField={sortField} sortDir={sortDir} onSort={handleSort} className="whitespace-nowrap">
                  Líder del<br />Negocio
                </SortTH>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">
                  Gestión del<br />Proyecto
                </th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 w-10">
                  +
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-sm text-slate-400 italic">
                    No hay iniciativas con los filtros seleccionados
                  </td>
                </tr>
              )}
              {sorted.map((row, idx) => {
                const isExpanded = expandedRows.has(row.id)
                const isActivitiesExpanded = expandedActivities.has(row.id)
                const pillarColor = PILLAR_COLORS[row.pillar] ?? "#64748b"
                const rowBg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                const ficha = FICHAS.find((f) => f.id === row.fichaId)
                const hasActivities = ficha && ficha.hitos && ficha.hitos.length > 0

                return (
                  <React.Fragment key={row.id}>
                    <tr
                      className={`${rowBg} hover:bg-blue-50/40 transition-colors group`}
                    >
                      {/* N° */}
                      <td className="px-3 py-2.5 text-center">
                        <span className="text-[11px] font-black text-slate-400">{row.id}</span>
                      </td>

                      {/* Title */}
                      <td className="px-3 py-2.5">
                        <button
                          onClick={() => hasActivities && toggleActivities(row.id)}
                          className={`text-left w-full ${
                            hasActivities
                              ? "cursor-pointer hover:text-blue-600 transition-colors"
                              : "cursor-default"
                          }`}
                          disabled={!hasActivities}
                          title={hasActivities ? `Clic para ${isActivitiesExpanded ? "contraer" : "expandir"} actividades` : undefined}
                        >
                          <div className="flex items-center gap-2">
                            {hasActivities && (
                              <span className={`text-[10px] font-bold transition-all ${
                                isActivitiesExpanded ? "text-blue-600 rotate-90" : "text-blue-500"
                              }`}>
                                ▶
                              </span>
                            )}
                            <p className={`text-[11px] font-semibold leading-snug flex-1 ${
                              hasActivities ? "text-slate-800 group-hover:text-blue-700" : "text-slate-800"
                            }`}>
                              {row.title}
                            </p>
                            {hasActivities && (
                              <span className="text-[8px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full shrink-0">
                                {ficha.hitos.length} act.
                              </span>
                            )}
                          </div>
                        </button>
                      </td>

                      {/* Pillar */}
                      <td className="px-3 py-2.5">
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ background: pillarColor + "18", color: pillarColor }}
                        >
                          {row.pillar}
                        </span>
                      </td>

                      {/* Avance ponderado */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center">
                          <TLButton
                            value={row.avancePonderado}
                            onChange={(v) => updateRow(row.id, { avancePonderado: v, manualAvancePonderado: true })}
                          />
                        </div>
                      </td>

                      {/* KPI principal */}
                      <td className="px-3 py-2.5">
                        <EditableCell
                          value={row.kpiPrincipal}
                          onChange={(v) => updateRow(row.id, { kpiPrincipal: v })}
                          placeholder="Definir KPI"
                          className="font-medium"
                        />
                      </td>

                      {/* Avance KPI YTD */}
                      <td className="px-3 py-2.5 text-center">
                        <EditableCell
                          value={row.avanceKpi}
                          onChange={(v) => updateRow(row.id, { avanceKpi: v })}
                          placeholder="-"
                          className="text-center font-bold text-slate-700"
                        />
                      </td>

                      {/* Meta KPI YTD */}
                      <td className="px-3 py-2.5 text-center">
                        <EditableCell
                          value={row.metaKpi}
                          onChange={(v) => updateRow(row.id, { metaKpi: v })}
                          placeholder="-"
                          className="text-center font-medium"
                        />
                      </td>

                      {/* Avance KPI color */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center">
                          <TLButton
                            value={row.avanceKpiColor}
                            onChange={(v) => updateRow(row.id, { avanceKpiColor: v, manualAvanceKpiColor: true })}
                          />
                        </div>
                      </td>

                      {/* Avance actividades */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center">
                          <TLButton
                            value={row.avanceActividades}
                            onChange={(v) => updateRow(row.id, { avanceActividades: v, manualAvanceActividades: true })}
                          />
                        </div>
                      </td>

                      {/* Líder negocio */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white shrink-0"
                            style={{ background: pillarColor }}
                          >
                            {row.liderNegocio.split(".")[0][0]}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">{row.liderNegocio}</span>
                        </div>
                      </td>

                      {/* Gestión proyecto */}
                      <td className="px-3 py-2.5">
                        <EditableCell
                          value={row.gestionProyecto}
                          onChange={(v) => updateRow(row.id, { gestionProyecto: v })}
                          placeholder="Asignar PM"
                          className="text-slate-500"
                        />
                      </td>

                      {/* Expand */}
                      <td className="px-3 py-2.5 text-center">
                        <button
                          onClick={() => toggleExpand(row.id)}
                          title={isExpanded ? "Colapsar" : "Ver notas"}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-black transition-all
                            ${isExpanded
                              ? "bg-blue-600 border-blue-600 text-white"
                              : "border-slate-300 text-slate-400 hover:border-blue-400 hover:text-blue-500 opacity-0 group-hover:opacity-100"
                            }`}
                        >
                          {isExpanded ? "−" : "+"}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded activities/hitos rows */}
                    {isActivitiesExpanded && ficha && ficha.hitos && ficha.hitos.length > 0 && (
                      <>
                        <tr className="bg-blue-100/30">
                          <td colSpan={12} className="px-3 py-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-black text-blue-700 uppercase tracking-wider">
                                📋 Actividades y Procesos
                              </span>
                              <span className="text-[8px] text-blue-600 font-semibold">
                                {ficha.hitos.filter(h => h.status === "completado").length} de {ficha.hitos.length} completadas
                              </span>
                            </div>
                          </td>
                        </tr>
                        {ficha.hitos.map((hito, hitoIdx) => {
                          const HITO_STATUS_CFG: Record<string, { label: string; cls: string; dot: string; tlValue: TrafficLight }> = {
                            completado: { label: "Completado", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", tlValue: "verde" },
                            "en-curso": { label: "En curso", cls: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500", tlValue: "amarillo" },
                            pendiente: { label: "Pendiente", cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-400", tlValue: "amarillo" },
                            tbd: { label: "TBD", cls: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-300", tlValue: "sin-datos" },
                          }
                          const statusCfg = HITO_STATUS_CFG[hito.status || "tbd"]
                          
                          return (
                            <tr key={`${row.id}-hito-${hitoIdx}`} className="bg-blue-50/20 border-l-4 border-blue-400 hover:bg-blue-50/40 transition-colors">
                              {/* Activity number */}
                              <td className="px-3 py-2.5 text-center">
                                <div className="flex flex-col items-center gap-0.5">
                                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black text-white ${statusCfg.dot}`}>
                                    {hitoIdx + 1}
                                  </span>
                                </div>
                              </td>

                              {/* Activity description */}
                              <td className="px-3 py-2.5" colSpan={2}>
                                <div className="pl-4">
                                  <p className="text-[10px] font-semibold text-slate-700 leading-tight mb-1">
                                    {hito.descripcion}
                                  </p>
                                  <div className="flex items-center gap-2 text-[8px] text-slate-500">
                                    <span className="font-medium">📅 {hito.fechaEsperada}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Status badge */}
                              <td className="px-3 py-2.5 text-center">
                                <div className="flex justify-center">
                                  <TLButton value={statusCfg.tlValue} readonly size="sm" />
                                </div>
                              </td>

                              {/* Responsable in KPI column */}
                              <td className="px-3 py-2.5" colSpan={3}>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[8px] text-slate-400">Responsable:</span>
                                  <span className="text-[9px] font-semibold text-slate-700">{hito.responsable}</span>
                                </div>
                              </td>

                              {/* Empty columns for alignment */}
                              <td className="px-3 py-2.5"></td>
                              <td className="px-3 py-2.5"></td>
                              
                              {/* Status label */}
                              <td className="px-3 py-2.5" colSpan={2}>
                                <span className={`text-[8px] font-bold px-2 py-1 rounded-full border inline-block ${statusCfg.cls}`}>
                                  {statusCfg.label}
                                </span>
                              </td>
                              
                              {/* Empty expand button space */}
                              <td className="px-3 py-2.5"></td>
                            </tr>
                          )
                        })}
                        {/* Summary row */}
                        <tr className="bg-blue-100/30 border-t-2 border-blue-300">
                          <td colSpan={12} className="px-3 py-1.5">
                            <div className="flex items-center justify-between text-[9px]">
                              <div className="flex items-center gap-3">
                                <span className="text-blue-700 font-bold">
                                  Total: {ficha.hitos.length} actividades
                                </span>
                                <span className="text-slate-500">
                                  Equipo: {ficha.equipoProyecto}
                                </span>
                              </div>
                              <button
                                onClick={() => toggleActivities(row.id)}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                              >
                                ✕ Contraer
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}

                    {/* Expanded notes row */}
                    {isExpanded && (
                      <ExpandedFichaDetail
                        row={row}
                        ficha={FICHAS.find((f) => f.id === row.fichaId)}
                        pillarColor={pillarColor}
                        updateRow={updateRow}
                        allData={data}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-[10px] text-slate-400">
            Mostrando <strong className="text-slate-600">{sorted.length}</strong> de {total} iniciativas
            {filterStatus !== "all" && ` · Filtrado por: ${TL_CONFIG[filterStatus].label}`}
            {filterPillar !== "all" && ` · Pilar: ${filterPillar}`}
          </p>
          <div className="flex items-center gap-4 text-[9px] text-slate-400">
            <span>Última actualización: Marzo 2026</span>
            <span>·</span>
            <span>Versión Nov. 2025</span>
          </div>
        </div>
      </div>

      {/* ── Pillar summary strip ── */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(PILLAR_COLORS).map(([pillar, color]) => {
          const items = data.filter((d) => d.pillar === pillar)
          const v = items.filter((i) => i.avancePonderado === "verde").length
          const a = items.filter((i) => i.avancePonderado === "amarillo").length
          const r = items.filter((i) => i.avancePonderado === "rojo").length
          const s = items.filter((i) => i.avancePonderado === "sin-datos").length
          return (
            <div
              key={pillar}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              style={{ borderTopWidth: 3, borderTopColor: color }}
              onClick={() => setFilterPillar(filterPillar === pillar ? "all" : pillar)}
            >
              <p className="text-[11px] font-black text-slate-700 leading-tight mb-3">{pillar}</p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: items.length }).map((_, i) => {
                  const item = items[i]
                  return (
                    <div
                      key={i}
                      className={`flex-1 h-3 rounded-sm ${TL_CONFIG[item.avancePonderado].bg} border ${TL_CONFIG[item.avancePonderado].border}`}
                      title={`${item.title}: ${TL_CONFIG[item.avancePonderado].label}`}
                    />
                  )
                })}
              </div>
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                <span>{items.length} iniciativas</span>
                <div className="flex gap-1.5">
                  {v > 0 && <span className="text-emerald-600">{v}✓</span>}
                  {a > 0 && <span className="text-amber-500">{a}⚠</span>}
                  {r > 0 && <span className="text-red-600">{r}✗</span>}
                  {s > 0 && <span className="text-slate-400">{s}—</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
