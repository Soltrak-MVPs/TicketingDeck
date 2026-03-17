"use client"

import React, { useState, useMemo } from "react"

interface KPIDetail {
  nombre: string
  real: number | string
  meta: number | string
  unidad?: string
}

interface UnimaqInitiativa {
  id: number
  titulo: string
  avancePonderado: number
  estado: "verde" | "amarillo" | "rojo" | "gris"
  kpis: KPIDetail[]
  avanceKpiPrincipal: number
  avanceActividades: number
  liderNegocio: string
  gestionProyecto: string
}

const TL_CONFIG = {
  verde: { bg: "bg-emerald-500", label: "En curso", textColor: "text-emerald-700" },
  amarillo: { bg: "bg-amber-400", label: "Observada", textColor: "text-amber-700" },
  rojo: { bg: "bg-red-500", label: "Retrasada", textColor: "text-red-700" },
  gris: { bg: "bg-slate-300", label: "No iniciada", textColor: "text-slate-700" },
}

const UNIMAQ_DATA: UnimaqInitiativa[] = [
  {
    id: 1,
    titulo: "Cobertura y Gestión Comercial Prime y Soporte al Producto (foco en licitaciones, proyectos, saneamiento, provincias)",
    avancePonderado: 108,
    estado: "verde",
    avanceKpiPrincipal: 129,
    avanceActividades: 88,
    liderNegocio: "Gaetano P-F / Javier Barrón / Luis Loayza",
    gestionProyecto: "Richard Araujo (Ventas) | Marco Oliveros (Sucursales) | Javier Andrade (Aliados) | M. Huamán (Aftermarket)",
    kpis: [
      { nombre: "Tasa de visita sobre la cartera de clientes asignada >=95%", real: 54, meta: 60, unidad: "%" },
      { nombre: "Incrementar número total de visitas a clientes vs. 2025 (+13%, 56 visitas mensuales)", real: 20, meta: 13, unidad: "%" },
      { nombre: "Cobertura de empresas adjudicadas en licitaciones", real: 132, meta: 35, unidad: "%" },
      { nombre: "% Cumplimiento del Run Rate mensual (CAT - GCI)", real: 223, meta: 26, unidad: "%" },
      { nombre: "% Cumplimiento del Run Rate mensual (CAT - BCP)", real: 126, meta: 107, unidad: "" },
      { nombre: "% Cumplimiento del Run Rate mensual (CAT - PAV)", real: 2, meta: 5, unidad: "" },
      { nombre: "% Cumplimiento del Run Rate mensual (SEM)", real: 12, meta: 14, unidad: "" },
      { nombre: "% Cumplimiento del funnel oportunidades generadas por línea (Shacman)", real: 540, meta: 586, unidad: "" },
      { nombre: "Aftermarket: Cobertura efectiva (visitas que generan cotizaciones o venta / meta de visitas)", real: 1.64, meta: 1.6, unidad: "" },
      { nombre: "Aftermarket Ventas repuestos CI", real: 2.5, meta: 1.76, unidad: "" },
    ],
  },
  {
    id: 2,
    titulo: "Plan de crecimiento Shacman (Prime): Foco en clientes y mercado",
    avancePonderado: 124,
    estado: "verde",
    avanceKpiPrincipal: 182,
    avanceActividades: 67,
    liderNegocio: "Javier Barrón",
    gestionProyecto: "Javier Andrade",
    kpis: [
      { nombre: "Ventas (MM US)", real: 6.9, meta: 3.8, unidad: "MM" },
    ],
  },
  {
    id: 3,
    titulo: "Plan de crecimiento Shacman (Aftermarket): Mejoras en el soporte técnico e impulsar las ventas",
    avancePonderado: 0,
    estado: "gris",
    avanceKpiPrincipal: 176,
    avanceActividades: 0,
    liderNegocio: "Luis Loayza / Luis Pastorelli",
    gestionProyecto: "F. Morales (Soporte) | G. Valdivia (Comercial)",
    kpis: [
      { nombre: "Venta de repuestos Shacman USD", real: 41, meta: 20, unidad: "K" },
      { nombre: "NLS Servicio Shacman (%)", real: 75, meta: 51, unidad: "%" },
    ],
  },
  {
    id: 4,
    titulo: "Asegurar la captura de valor de Omnimaq Florida",
    avancePonderado: 0,
    estado: "rojo",
    avanceKpiPrincipal: 0,
    avanceActividades: 0,
    liderNegocio: "Gaetano P-F",
    gestionProyecto: "Walter Arteaga",
    kpis: [
      { nombre: "Venta total (USD)", real: 0, meta: 0, unidad: "K" },
    ],
  },
  {
    id: 5,
    titulo: "Planeamiento Estratégico Unimaq 2027-2031 Integral (incluye: CAT, Aliados, Mercado Industria, competencia asiática y nicho)",
    avancePonderado: 0,
    estado: "gris",
    avanceKpiPrincipal: 0,
    avanceActividades: 0,
    liderNegocio: "Alberto Parodi",
    gestionProyecto: "TBD",
    kpis: [],
  },
  {
    id: 6,
    titulo: "Ejecutar el proyecto de transformación",
    avancePonderado: 75,
    estado: "amarillo",
    avanceKpiPrincipal: 0,
    avanceActividades: 75,
    liderNegocio: "Emilio Valverde",
    gestionProyecto: "Julissa Rossi",
    kpis: [
      { nombre: "Implementación y captura de valor del 'Pre-entrega'", real: "TBD", meta: "TBD", unidad: "" },
      { nombre: "Implementación y captura de valor del 'Autonomía de las sucursales - Créditos'", real: "TBD", meta: "TBD", unidad: "" },
    ],
  },
]

export function UnimaqStatusDashboard() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([1]))

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const stats = useMemo(() => {
    const verde = UNIMAQ_DATA.filter((i) => i.estado === "verde").length
    const amarillo = UNIMAQ_DATA.filter((i) => i.estado === "amarillo").length
    const rojo = UNIMAQ_DATA.filter((i) => i.estado === "rojo").length
    const gris = UNIMAQ_DATA.filter((i) => i.estado === "gris").length
    return { verde, amarillo, rojo, gris, total: UNIMAQ_DATA.length }
  }, [])

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white font-black text-base">U</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] font-black text-slate-900 leading-tight tracking-tight">
                  [Ejemplo] Unimaq — Status iniciativas
                </h1>
              </div>
              <p className="text-[12px] text-slate-500 mt-1 leading-snug max-w-2xl">
                El avance de las iniciativas es{" "}
                <span className="font-black text-emerald-600">{stats.verde}</span> en lo esperado,{" "}
                <span className="font-black text-amber-500">{stats.amarillo}</span> ligeramente retrasado
                {stats.rojo > 0 && (
                  <>, y <span className="font-black text-red-600">{stats.rojo}</span> retrasadas</>
                )}
                {stats.gris > 0 && (
                  <span className="text-slate-400"> · {stats.gris} no iniciadas</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-medium">Marzo 2026 · 1Q26 YTD</p>
              <p className="text-[10px] text-slate-400">{stats.total} iniciativas</p>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-xl">
              <span className="font-black text-sm tracking-wide">UNIMAQ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 w-10">N°</th>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300">Iniciativas 2026</th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">Avance Ponderado</th>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 min-w-64">KPI(s) principal(es)</th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">Avance KPI Feb-26 YTD</th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">Meta KPI Feb-26 YTD</th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">Avance KPI Principal</th>
                <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300 whitespace-nowrap">Avance Actividades</th>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300">Líder del Negocio</th>
                <th className="px-3 py-3 text-left text-[10px] font-black uppercase tracking-[0.12em] bg-slate-900 text-slate-300">Gestión del Proyecto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {UNIMAQ_DATA.map((init, idx) => {
                const isExpanded = expandedRows.has(init.id)
                const rowBg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                const tlCfg = TL_CONFIG[init.estado]

                return (
                  <React.Fragment key={init.id}>
                    <tr className={`${rowBg} hover:bg-blue-50/40 transition-colors group cursor-pointer`} onClick={() => toggleExpand(init.id)}>
                      {/* N° */}
                      <td className="px-3 py-2.5 text-center">
                        <span className="text-[11px] font-black text-slate-400">{init.id}</span>
                      </td>

                      {/* Title */}
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold transition-all ${isExpanded ? "text-slate-600 rotate-90" : "text-slate-400"}`}>
                            ▶
                          </span>
                          <p className="text-[11px] font-semibold leading-snug text-slate-800">{init.titulo}</p>
                        </div>
                      </td>

                      {/* Avance Ponderado */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center">
                          <div className="flex items-center justify-center">
                            <span className={`inline-block w-6 h-6 rounded-md border-2 ${tlCfg.bg} border-slate-400`} />
                          </div>
                        </div>
                      </td>

                      {/* KPI Principal summary */}
                      <td className="px-3 py-2.5 text-center">
                        <span className="text-[10px] font-bold text-slate-600">
                          {init.kpis.length > 0 ? `${init.kpis.length} KPIs` : "TBD"}
                        </span>
                      </td>

                      {/* Avance KPI */}
                      <td className="px-3 py-2.5 text-center">
                        <span className="text-[11px] font-bold text-slate-700">{init.avanceKpiPrincipal || "-"}</span>
                      </td>

                      {/* Meta KPI */}
                      <td className="px-3 py-2.5 text-center">
                        <span className="text-[11px] font-medium text-slate-600">—</span>
                      </td>

                      {/* Avance KPI Principal (semáforo) */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center">
                          <div className={`inline-block w-5 h-5 rounded-md border-2 ${tlCfg.bg} border-slate-400`} />
                        </div>
                      </td>

                      {/* Avance Actividades (semáforo) */}
                      <td className="px-3 py-2.5 text-center">
                        <div className="flex justify-center">
                          <div className={`inline-block w-5 h-5 rounded-md border-2 ${tlCfg.bg} border-slate-400`} />
                        </div>
                      </td>

                      {/* Líder */}
                      <td className="px-3 py-2.5 text-[10px] font-semibold text-slate-700">{init.liderNegocio}</td>

                      {/* Gestión */}
                      <td className="px-3 py-2.5 text-[10px] font-medium text-slate-600">{init.gestionProyecto}</td>
                    </tr>

                    {/* Expanded KPIs rows */}
                    {isExpanded && init.kpis.length > 0 && (
                      <>
                        <tr className="bg-slate-50">
                          <td colSpan={10} className="px-3 py-1.5 border-t-2 border-slate-200">
                            <span className="text-[9px] font-black text-slate-700 uppercase tracking-wider">📊 KPIs Detallados</span>
                          </td>
                        </tr>
                        {init.kpis.map((kpi, kpiIdx) => (
                          <tr key={`${init.id}-kpi-${kpiIdx}`} className="bg-white border-l-4 border-slate-200 hover:bg-slate-50 transition-colors">
                            <td className="px-3 py-2 text-center">
                              <span className="text-[9px] font-semibold text-slate-400">{kpiIdx + 1}</span>
                            </td>
                            <td className="px-3 py-2 text-[10px] font-semibold text-slate-700" colSpan={2}>
                              {kpi.nombre}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className="text-[10px] font-bold text-slate-700">{kpi.real}</span>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className="text-[10px] font-medium text-slate-600">{kpi.meta}</span>
                            </td>
                            <td colSpan={5} className="px-3 py-2" />
                          </tr>
                        ))}
                      </>
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
            Mostrando <strong className="text-slate-600">{UNIMAQ_DATA.length}</strong> iniciativas
          </p>
          <div className="flex items-center gap-4 text-[9px] text-slate-400">
            <span>Última actualización: Marzo 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}
