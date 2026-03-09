"use client"

import { useState, useEffect } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

export type TrafficLight = "verde" | "amarillo" | "rojo" | "sin-datos"

export interface KpiRow {
  descripcion: string
  esPrincipal?: boolean
  real2025: string
  q1_26: string
  q2_26: string
  q3_26: string
  q4_26: string
  meta2026: string
  statusReal?: TrafficLight    // color del campo real2025
}

export interface HitoRow {
  descripcion: string
  fechaEsperada: string
  responsable: string
  status?: "completado" | "en-curso" | "pendiente" | "tbd"
}

export interface InitiativeFicha {
  id: string           // "1.1", "1.2", "2", etc.
  title: string
  pillar: string
  pillarColor: string
  avancePonderado: TrafficLight

  // ── Sección 1: Definición conceptual ──────────────────────────────────────
  descripcion: string
  racionalEstrategico: string
  riesgos: string[]
  impacto: string
  inversion: string

  // ── Sección 2: Objetivo y KPIs ────────────────────────────────────────────
  objetivo: string
  kpis: KpiRow[]

  // ── Sección 3: Equipo y actividades ───────────────────────────────────────
  sponsor: string
  liderProyecto: string
  gestionProyecto: string
  equipoProyecto: string
  frentesTrabajo: string
  hitos: HitoRow[]

  // ── Meta ──────────────────────────────────────────────────────────────────
  version?: string
  ultimaActualizacion?: string
  notas?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — FICHA 1.1
// ─────────────────────────────────────────────────────────────────────────────

export const FICHAS: InitiativeFicha[] = [
  {
    id: "1.1",
    title: "Mejorar los márgenes por cliente L+N",
    pillar: "Protección y Optimización",
    pillarColor: "#9b111e",
    avancePonderado: "amarillo",

    descripcion:
      "Incrementar el margen operativo directo de Lubes (B2B y B2C, Neumáticos y Filtros al Q4-2026).\nAlcance: Todos los clientes con márgenes de contribución negativos o bajo la política. 15% de los clientes (80) con margen operativo negativo.",

    racionalEstrategico:
      "Es importante contar con una política de precios consistente por volumen de compra.\nHay clientes con un gasto muy alto.\nEmisión de letras de clientes de baja facturación.",

    riesgos: [
      "Pérdida de clientes al corregir precios",
      "Incapacidad de bajar costos de servir por compromisos asumidos",
      "Alinear con una segmentación de nivel de servicio y política de márgenes",
      "Disponibilidad del reporte de margen por cliente",
      "Alinear a la FFVV para ejecutar",
    ],

    impacto: "¿Cuánto EBIT incremental va a traer la iniciativa?",
    inversion: "N/A",

    objetivo:
      "Incrementar el margen operativo directo al Q4-2026 para Lubes B2B: 5.93%, Lubes B2C: 7.63%, Neumáticos: 5.38%, Filtros: 10.51%",

    kpis: [
      {
        descripcion: "Margen operativo directo lubes B2B",
        esPrincipal: true,
        real2025: "xx%",
        q1_26: "4.5%",
        q2_26: "5%",
        q3_26: "5.5%",
        q4_26: "5.93%",
        meta2026: "5.93%",
        statusReal: "rojo",
      },
      {
        descripcion: "Margen operativo directo lubes B2C",
        esPrincipal: true,
        real2025: "xx%",
        q1_26: "6.5%",
        q2_26: "7%",
        q3_26: "7.5%",
        q4_26: "7.63%",
        meta2026: "7.63%",
        statusReal: "rojo",
      },
      {
        descripcion: "Margen operativo directo neumáticos",
        esPrincipal: true,
        real2025: "xx%",
        q1_26: "4.50%",
        q2_26: "5%",
        q3_26: "5.38%",
        q4_26: "5.38%",
        meta2026: "5.38%",
        statusReal: "rojo",
      },
      {
        descripcion: "Margen operativo directo filtros",
        esPrincipal: true,
        real2025: "xx%",
        q1_26: "9.5%",
        q2_26: "10%",
        q3_26: "10.51%",
        q4_26: "10.51%",
        meta2026: "10.51%",
        statusReal: "rojo",
      },
      {
        descripcion: "Cantidad de clientes con margen operativo directo negativo B2B",
        esPrincipal: false,
        real2025: "37",
        q1_26: "20",
        q2_26: "17",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Cantidad de clientes con margen operativo directo negativo B2C",
        esPrincipal: false,
        real2025: "17",
        q1_26: "17",
        q2_26: "0",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Cantidad de clientes margen operativo directo negativo filtros",
        esPrincipal: false,
        real2025: "8",
        q1_26: "4",
        q2_26: "4",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Cantidad de clientes margen operativo directo negativo neumáticos",
        esPrincipal: false,
        real2025: "18",
        q1_26: "9",
        q2_26: "9",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Reducir la cantidad de letras emitidas en el año en lubes B2C (-50% sobre la línea base)",
        esPrincipal: false,
        real2025: "100%",
        q1_26: "100%",
        q2_26: "75%",
        q3_26: "50%",
        q4_26: "50%",
        meta2026: "50%",
      },
    ],

    sponsor: "Carlos Sanchez",
    liderProyecto: "Juan Carlos Paz",
    gestionProyecto: "M. Neciosup",
    equipoProyecto:
      "F. Miñan, R. Urrunaga, G. Ocaña y M. Neciosup, Control de Gestión y Producto",
    frentesTrabajo: "Finanzas, Comercial, Producto y Logística",

    hitos: [
      {
        descripcion: "Análisis de cartera clientes B2C (Ventas menores a $500)",
        fechaEsperada: "Dic-25",
        responsable: "F. Miñan",
        status: "completado",
      },
      {
        descripcion: "Análisis de rentabilidad por cliente",
        fechaEsperada: "Ene-26",
        responsable: "M. Neciosup",
        status: "completado",
      },
      {
        descripcion: "Análisis a detalle de costo operativo por tamaño de cliente",
        fechaEsperada: "Ene-26",
        responsable: "M. Neciosup",
        status: "completado",
      },
      {
        descripcion:
          "Análisis de impacto en las ventas y créditos por la reducción de emisión de letras",
        fechaEsperada: "TBD",
        responsable: "TBD",
        status: "tbd",
      },
      {
        descripcion: "Definir margen por categoría cliente B2B/B2C (tamaño)",
        fechaEsperada: "Ene-26",
        responsable: "R. Urrunaga / F. Miñan",
        status: "en-curso",
      },
      {
        descripcion: "Corrección desvíos Gastos operativos",
        fechaEsperada: "Mar-26",
        responsable: "R. Urrunaga / F. Miñan / G. Ocaña",
        status: "en-curso",
      },
      {
        descripcion:
          "Incremento precios por fases Lubes B2B. Fase 1: +3% / Fase 2: +4%",
        fechaEsperada: "Feb/Jun-26",
        responsable: "R. Urrunaga",
        status: "en-curso",
      },
      {
        descripcion:
          "Traslado ventas canal digital B2B y B2C Filtros y Lubes (menores a $500)",
        fechaEsperada: "Feb-26",
        responsable: "F. Miñan / G. Ocaña",
        status: "en-curso",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  {
    id: "1.2",
    title: "Mejorar los márgenes por cliente - SI",
    pillar: "Protección y Optimización",
    pillarColor: "#9b111e",
    avancePonderado: "amarillo",

    descripcion:
      "Incrementar el margen operativo directo a 9.6% Q4-2026.\nAlcance: Todos los clientes de contribución negativa o bajo la política. 15% de los clientes (434) con margen negativo y 100% de los clientes e-commerce.\nDisminución de la emisión de letras de clientes de baja facturación.",

    racionalEstrategico:
      "Es importante contar con una política de precios consistente por volumen de compra.\nLa causa más frecuente del margen negativo es el Mg bruto bajo en clientes con un gasto muy alto.\nLa mayor concentración de clientes negativos está en los clientes más pequeños.",

    riesgos: [
      "Pérdida de clientes al corregir precios",
      "Incapacidad de bajar costos de servir por compromisos políticos",
      "Alinear con una segmentación a nivel de servicio o política de servicio a clientes",
      "Disponibilidad del reporte de margen por cliente",
      "Alinear a la FFVV para ejecutar",
    ],

    impacto: "¿Cuánto EBIT incremental va a traer la iniciativa?",
    inversion: "Horas hombre del equipo.",

    objetivo: "Incrementar el margen operativo directo a 9.6% Q4-2026",

    kpis: [
      {
        descripcion: "Margen operativo directo",
        esPrincipal: true,
        real2025: "6.3%",
        q1_26: "9%",
        q2_26: "9%",
        q3_26: "9%",
        q4_26: "9.6%",
        meta2026: "9.6%",
        statusReal: "rojo",
      },
      {
        descripcion: "Reducción de clientes negativos B2B (margen de contribución)",
        esPrincipal: false,
        real2025: "139",
        q1_26: "50",
        q2_26: "30",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Reducción de clientes negativos B2C (margen de contribución)",
        esPrincipal: false,
        real2025: "238",
        q1_26: "100",
        q2_26: "50",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Mejorar rentabilidad en B2B de clientes bajo margen (De 0 a 2%)",
        esPrincipal: false,
        real2025: "46",
        q1_26: "0",
        q2_26: "0",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Mejorar rentabilidad en B2C en clientes de bajo margen (De 0 a 2%)",
        esPrincipal: false,
        real2025: "35",
        q1_26: "20",
        q2_26: "5",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
      {
        descripcion: "Clientes con % Ratio de Fletes/Gastos B2C mayor a 2%",
        esPrincipal: false,
        real2025: "110",
        q1_26: "70",
        q2_26: "30",
        q3_26: "0",
        q4_26: "0",
        meta2026: "0",
      },
    ],

    sponsor: "Carlos Sanchez",
    liderProyecto: "Christian N.",
    gestionProyecto: "TBD",
    equipoProyecto:
      "Supervisores de ventas, Control de Gestión y Producto",
    frentesTrabajo: "Finanzas, Comercial, Producto / Logística",

    hitos: [
      {
        descripcion: "Diagnóstico, Análisis de rentabilidad por cliente, identificando causas",
        fechaEsperada: "Ene-26",
        responsable: "Jefatura comercial",
        status: "completado",
      },
      {
        descripcion: "Corrección de recargos logísticos para clientes B2C con ratio de fletes > 2%",
        fechaEsperada: "Mar-26",
        responsable: "Comercial/Producto/Logística",
        status: "en-curso",
      },
      {
        descripcion: "Corrección de gastos operativos que afectan la rentabilidad B2C & B2B",
        fechaEsperada: "Mar-26",
        responsable: "Control de gestión",
        status: "en-curso",
      },
      {
        descripcion:
          "Ejecutar plan de revisión o depuración de cartera con clientes B2B & B2C de margen negativo y bajo (0-2%)",
        fechaEsperada: "May-26",
        responsable: "Producto & Logística",
        status: "pendiente",
      },
      {
        descripcion:
          "Continuar con el Cross-selling de productos de alto margen para diluir costos en clientes B2C & B2B de bajo desempeño",
        fechaEsperada: "May-26",
        responsable: "Jefatura comercial",
        status: "pendiente",
      },
      {
        descripcion:
          "Optimizar rutas de distribución y consolidación de carga para reducir gastos directos operativos en el canal B2C",
        fechaEsperada: "May-26",
        responsable: "G. Esli",
        status: "pendiente",
      },
      {
        descripcion:
          "Automatizar controles de descuentos y bonificaciones comerciales para evitar fugas de margen en la venta nueva",
        fechaEsperada: "May-26",
        responsable: "G. Esli",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  {
    id: "2",
    title: "Simplificar el negocio (servicios, marcas, productos, talleres)",
    pillar: "Transformación y Crecimiento",
    pillarColor: "#2563eb",
    avancePonderado: "amarillo",

    descripcion:
      "Cerrar negocios, productos, servicios u operaciones, sin escala o rentabilidad, reducir transacciones para hacer más eficientes los procesos, reducir inventarios y operaciones complejas.",

    racionalEstrategico:
      "Eliminar o reducir los modelos operativos complejos que no generan rentabilidad: consignaciones, productos con transformación, personalizados, etiquetados, operaciones en clientes.\nEliminar los negocios, talleres, marcas, familias, y SKUs que no cumplan con los criterios de relevancia. Reducir redundancias.\nMejorar el enfoque y asegurar la asignación de recursos a negocios rentables.",

    riesgos: [
      "Resistencia del equipo de ventas a descartar negocios",
      "Pérdida de ventas/ clientes / marcas actuales o con potencial futuro",
      "Comunicación adecuada a clientes actuales de esta propuesta de valor al cliente",
    ],

    impacto: "¿Cuánto ahorro ($) va a traer la iniciativa en el 2026?",
    inversion: "Horas hombre del equipo.",

    objetivo:
      "Cerrar negocios, productos, servicios u operaciones, sin escala o rentabilidad, reducir transacciones para hacer más eficientes los procesos, reducir inventarios y operaciones complejas.",

    kpis: [
      {
        descripcion: "Rentabilidad mínima por negocio (definir el objetivo mínimo de margen)",
        esPrincipal: false,
        real2025: "TBD",
        q1_26: "TBD",
        q2_26: "TBD",
        q3_26: "TBD",
        q4_26: "TBD",
        meta2026: "TBD",
      },
      {
        descripcion: "Reducción de familias/SKUs sobre la línea base",
        esPrincipal: true,
        real2025: "TBD",
        q1_26: "TBD",
        q2_26: "TBD",
        q3_26: "TBD",
        q4_26: "TBD",
        meta2026: "TBD",
      },
      {
        descripcion: "Número de modelos evaluados",
        esPrincipal: false,
        real2025: "TBD",
        q1_26: "TBD",
        q2_26: "TBD",
        q3_26: "TBD",
        q4_26: "TBD",
        meta2026: "TBD",
      },
      {
        descripcion: "Número de modelos cerrados",
        esPrincipal: false,
        real2025: "TBD",
        q1_26: "TBD",
        q2_26: "TBD",
        q3_26: "TBD",
        q4_26: "TBD",
        meta2026: "TBD",
      },
    ],

    sponsor: "Ronald Orrego",
    liderProyecto: "Carlos Sánchez",
    gestionProyecto: "TBD",
    equipoProyecto: "JC. Paz / Christian Novoa, Finanzas",
    frentesTrabajo: "Finanzas, Logística y Producto",

    hitos: [
      {
        descripcion: "Definición de mínimos de ventas/ rentabilidad",
        fechaEsperada: "Mar-26",
        responsable: "CS | GF",
        status: "en-curso",
      },
      {
        descripcion: "Evaluación de modelos de negocio y definición de on/off",
        fechaEsperada: "May-26",
        responsable: "CS | GF",
        status: "pendiente",
      },
      {
        descripcion: "Plan de salidas o mejoras",
        fechaEsperada: "Dic-26",
        responsable: "CS | CN | JC. Paz",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  // ─────────────────────────────────────────────────────────────────────────
  // FICHA 3
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "3",
    title: "Ordenar la oferta a clientes",
    pillar: "Protección y Optimización",
    pillarColor: "#9b111e",
    avancePonderado: "amarillo",

    descripcion:
      "Optimizar la efectividad de nuestras estrategias comerciales y operativas.\nAlcance: Todas las líneas de negocio: Lubricantes, Seg. Industrial y Neumáticos. Dividido en 5 etapas: 1) Diagnóstico, 2) Análisis de data, 3) Definición y aprobación de criterios y segmentos con su propuesta de valor, 4) Adopción y operativización de la segmentación, 5) Captura de valor y seguimiento de las estrategias en base en la segmentación.",

    racionalEstrategico:
      "Contar con una oferta comercial de acuerdo a la relevancia, potencial y necesidades de nuestros clientes para ofrecerles mayor valor al costo correcto para lograr el margen objetivo.",

    riesgos: [
      "Falta de consenso para unificar criterios",
      "Falta de adopción",
      "Pérdida de clientes / ventas",
      "Posible sobre-segmentación o subsegmentación",
    ],

    impacto:
      "¿Cuál es el impacto potencial cuantificado (ahorros o ventas incrementales en $) por la mejora en el margen bruto?",
    inversion: "N/A",

    objetivo:
      "Optimizar la efectividad de nuestras estrategias comerciales y operativas enfocando recursos. Propuesta de segmentación interna (criterios: volumen, complejidad de atención, rentabilidad) y de mercado (entendimiento de las necesidades de compra B2B vs B2C).",

    kpis: [
      {
        descripcion: "% de clientes con segmentación actualizada en ERP y CRM",
        esPrincipal: false,
        real2025: "-",
        q1_26: "75%",
        q2_26: "100%",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
      {
        descripcion: "% Carteras actualizadas en función de la nueva segmentación",
        esPrincipal: false,
        real2025: "-",
        q1_26: "75%",
        q2_26: "100%",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
      {
        descripcion: "% de Cumplimiento de los tiempos de entrega prometidos por segmento",
        esPrincipal: false,
        real2025: "-",
        q1_26: "-",
        q2_26: "50%",
        q3_26: "75%",
        q4_26: "100%",
        meta2026: "100%",
      },
      {
        descripcion: "% de cumplimiento de objetivos de rentabilidad por segmento",
        esPrincipal: false,
        real2025: "-",
        q1_26: "-",
        q2_26: "-",
        q3_26: "50%",
        q4_26: "100%",
        meta2026: "100%",
      },
      {
        descripcion: "% de categorías con margen bruto de 20% o más (por negocio)",
        esPrincipal: true,
        real2025: "TBD",
        q1_26: "TBD",
        q2_26: "TBD",
        q3_26: "TBD",
        q4_26: "TBD",
        meta2026: "75%",
        statusReal: "sin-datos",
      },
      {
        descripcion: "NLS Total Soltrak",
        esPrincipal: false,
        real2025: "58%",
        q1_26: "60%",
        q2_26: "62%",
        q3_26: "65%",
        q4_26: "70%",
        meta2026: "70%",
      },
    ],

    sponsor: "Carlos Sánchez",
    liderProyecto: "Jorge Céspedes",
    gestionProyecto: "Raúl Urrunaga (L+N), SI (TBD)",
    equipoProyecto: "Christian N. / JC. Paz., Supply / Finanzas",
    frentesTrabajo: "Marketing, Producto, Finanzas, Logística y Comercial",

    hitos: [
      {
        descripcion: "Diagnóstico segmentación actual y su aplicación operativa",
        fechaEsperada: "Feb-26",
        responsable: "J. Céspedes",
        status: "completado",
      },
      {
        descripcion: "Actualizar definiciones de criterios de segmentación",
        fechaEsperada: "Feb-26",
        responsable: "J. Céspedes | CN | JC. Paz",
        status: "completado",
      },
      {
        descripcion: "Definir y aprobar nuevos segmentos, perfiles de clientes, standard offer y propuesta de valor",
        fechaEsperada: "Mar-26",
        responsable: "J. Céspedes | CN | JC. Paz | GF | LOG",
        status: "en-curso",
      },
      {
        descripcion: "Reestructurar procesos y org a nuevo modelo de segmentación",
        fechaEsperada: "Mar-26",
        responsable: "J. Céspedes | CN | JC. Paz | GF | LOG",
        status: "en-curso",
      },
      {
        descripcion: "Actualizar segmentación de clientes en ERP, CRM y otros",
        fechaEsperada: "Mar-26",
        responsable: "J. Céspedes | CN | JC. Paz | GF | LOG",
        status: "en-curso",
      },
      {
        descripcion: "Definición del portafolio óptimo",
        fechaEsperada: "Abr-26",
        responsable: "J. Céspedes | CN | JC. Paz",
        status: "pendiente",
      },
      {
        descripcion: "Implementación de propuesta de valor (standard offer)",
        fechaEsperada: "Ago-26",
        responsable: "LOG | GF",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  // ─────────────────────────────────────────────────────────────────────────
  // FICHA 4.1
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "4.1",
    title: "Mejora de procesos: Proyecto Contabilidad",
    pillar: "Habilitadores",
    pillarColor: "#7c3aed",
    avancePonderado: "amarillo",

    descripcion:
      "Mejorar las 9 procesos contables para ser eficiente en los recursos y cumplir con los tiempos de cierre. Reduciendo las operaciones manuales y cumpliendo las normas contables y tributarias.",

    racionalEstrategico:
      "Ser más ágil en los cierres de estados financieros.",

    riesgos: [
      "No contar con equipo dedicado al 100% en pruebas SAP (Negocio y corporativo)",
      "Dificultad para encontrar conocimiento técnico del equipo proveedor TI.",
    ],

    impacto:
      "¿Cuál es el ahorro estimado anualizado en $ por la implementación?\n- Reducción de 5 FTEs $20K (liquidaciones)",
    inversion: "Inv. OPEX $150K SAP, Consultor TPI",

    objetivo:
      "Mejorar las 9 procesos contables para ser eficiente en los recursos y cumplir con los tiempos de cierre.",

    kpis: [
      {
        descripcion: "Implementación de los 9 proyectos (TBD)",
        esPrincipal: true,
        real2025: "-",
        q1_26: "0",
        q2_26: "0",
        q3_26: "0",
        q4_26: "9",
        meta2026: "9",
        statusReal: "sin-datos",
      },
      {
        descripcion: "Reducción de días de cierre",
        esPrincipal: false,
        real2025: "12",
        q1_26: "12",
        q2_26: "10",
        q3_26: "9",
        q4_26: "8",
        meta2026: "8",
      },
      {
        descripcion: "Reducción de personal",
        esPrincipal: false,
        real2025: "0",
        q1_26: "0",
        q2_26: "0",
        q3_26: "0",
        q4_26: "5",
        meta2026: "5",
      },
    ],

    sponsor: "Carlos Sánchez",
    liderProyecto: "G. Florida",
    gestionProyecto: "TBD",
    equipoProyecto: "Contabilidad, MC&Data., TPI",
    frentesTrabajo: "TPI Corp, TI Soltrak, Contabilidad",

    hitos: [
      {
        descripcion: "Revisar las mejoras con el corporativo (TPI + Cont)",
        fechaEsperada: "Feb-26",
        responsable: "Conta / MC&P",
        status: "completado",
      },
      {
        descripcion: "Análisis de flujo de trabajo",
        fechaEsperada: "Feb-26",
        responsable: "Conta / MC&P",
        status: "completado",
      },
      {
        descripcion: "Contratar con un consultor SAP - Contabilidad",
        fechaEsperada: "Mar-26",
        responsable: "Conta / MC&P/TPI",
        status: "en-curso",
      },
      {
        descripcion: "Revisión del equipo de MC & Data - Soluciones SAP / No SAP",
        fechaEsperada: "Jun-26",
        responsable: "Conta / MC&P/TPI",
        status: "pendiente",
      },
      {
        descripcion: "Priorización de implementación",
        fechaEsperada: "Jul-26",
        responsable: "Conta / MC&P/TPI",
        status: "pendiente",
      },
      {
        descripcion: "Implementación - Baja Complejidad",
        fechaEsperada: "Dic-26",
        responsable: "Conta / MC&P/TPI",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  // ─────────────────────────────────────────────────────────────────────────
  // FICHA 4.2
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "4.2",
    title: "Mejora de procesos: Proyecto (ADV + Créditos)",
    pillar: "Habilitadores",
    pillarColor: "#7c3aed",
    avancePonderado: "amarillo",

    descripcion:
      "Mejorar las procesos operativos para ser eficiente en el order to cash, reduciendo el costo de operación a través de menos transacciones e implementación de automatizaciones.",

    racionalEstrategico:
      "- Reducir el costo de operación (reducción de transacciones y automatizaciones)\n- Incrementar el nivel de servicio.",

    riesgos: [
      "Dificultad para contar con equipo dedicado al proyecto (Equipo Corp TPI)",
      "Complejidad en nuestros procesos (Reglas, roles, procedimientos)",
      "Pricing.",
    ],

    impacto:
      "Ahorro anual de $78K en el 2026 y de $130K en el 2027\nReducción de 10 FTEs $70K (liquidaciones)",
    inversion: "Inv. $100K SAP, Consultor TPI",

    objetivo:
      "Mejorar las procesos operativos para ser eficiente en el order to cash.",

    kpis: [
      {
        descripcion: "Ahorro anual: $130K",
        esPrincipal: true,
        real2025: "$0",
        q1_26: "-",
        q2_26: "$26K",
        q3_26: "$52K",
        q4_26: "$78K",
        meta2026: "$78K",
        statusReal: "sin-datos",
      },
      {
        descripcion: "Reducción de Personal",
        esPrincipal: false,
        real2025: "-",
        q1_26: "2",
        q2_26: "4",
        q3_26: "6",
        q4_26: "10",
        meta2026: "10",
      },
    ],

    sponsor: "Carlos Sánchez",
    liderProyecto: "G. Florida",
    gestionProyecto: "TBD",
    equipoProyecto: "Mejora Continua, ADV y Créditos, TPI",
    frentesTrabajo: "TPI Corp, TI Soltrak, Contabilidad, Comercial y Producto",

    hitos: [
      {
        descripcion: "Análisis de flujo de trabajo",
        fechaEsperada: "Mar-26",
        responsable: "MC&P/ADV y CxC",
        status: "en-curso",
      },
      {
        descripcion: "Proyecto de gestor documental - Automatización de procesos (en proceso actualmente)",
        fechaEsperada: "Mar-26",
        responsable: "MC&P y GF",
        status: "en-curso",
      },
      {
        descripcion: "Definir el nuevo perfil del gestor de cobranza",
        fechaEsperada: "Abr-26",
        responsable: "MC&P - TPI corp.",
        status: "pendiente",
      },
      {
        descripcion: "Reducción de las emisión de letras: lineamientos con el negocio",
        fechaEsperada: "Jun-26",
        responsable: "MC&P y Negocio",
        status: "pendiente",
      },
      {
        descripcion: "Reducción de las emisión de letras: evaluación de Implementación software en SAP",
        fechaEsperada: "Sep-26",
        responsable: "MC&P - TPI corp.",
        status: "pendiente",
      },
      {
        descripcion: "Mejora de tiempos en los procesos de gestión de pedidos (Pool de mejoras levantadas del diagnóstico - ADV y Comercial)",
        fechaEsperada: "Ago-26",
        responsable: "MC&P - TPI corp.",
        status: "pendiente",
      },
      {
        descripcion: "Automatización de Orden de compra (proyectos con Equipo de Analítica de la corp. - Mejoras No SAP)",
        fechaEsperada: "Dic-26",
        responsable: "Data Soltrak y Corp.",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  {
    id: "4.3",
    title: "Mejora de procesos: Proyecto Logístico",
    pillar: "Habilitadores",
    pillarColor: "#7c3aed",
    avancePonderado: "amarillo",

    descripcion:
      "Mejorar la gestión de fletes y distribución a clientes mediante un TMS (Transportation Management System).",

    racionalEstrategico:
      "Alcance: ejecución eficiente y la visibilidad completa de la última milla a través del TMS (Planificación, Seguimiento, confirmación digital, liquidación documentaria).\n\nNo Alcance: Liquidación de fletes por punto logística de entrada, mejoras en WMS Almacén, Hardware avanzados.",

    riesgos: [
      "Fallo en la Integración con Sistemas ERP / SAP",
      "Imprecisión de Datos Maestros",
      "Resistencia al cambio / baja adopción",
      "Soluciones tecnológicas no cumplen con el 100% de requerimientos",
    ],

    impacto: "Reducción de costos proyectada S/. -100K (ahorro) para 2027",
    inversion: "Inv. $100K (TMS $40K y mejoras en SAP $60K) + OPEX: TBD (Licencias TMS)",

    objetivo:
      "Mejorar la gestión de fletes y distribución a clientes mediante un TMS para incrementar eficiencia operativa y reducir costos de última milla.",

    kpis: [
      {
        descripcion: "Presentación y aprobación de proyectos y mejoras SAP",
        esPrincipal: false,
        real2025: "-",
        q1_26: "Feb",
        q2_26: "-",
        q3_26: "-",
        q4_26: "-",
        meta2026: "Feb-26",
      },
      {
        descripcion: "Implementación del TMS",
        esPrincipal: true,
        real2025: "-",
        q1_26: "-",
        q2_26: "-",
        q3_26: "-",
        q4_26: "Dic",
        meta2026: "Set-26",
      },
      {
        descripcion: "Reducción del costo de flete de venta (última milla)",
        esPrincipal: true,
        real2025: "S/. 4.5M",
        q1_26: "-",
        q2_26: "-",
        q3_26: "-",
        q4_26: "-5% (S/40K)",
        meta2026: "-5%",
        statusReal: "amarillo",
      },
      {
        descripcion: "Incrementar el Vehicle Utilization Rate (VUR)",
        esPrincipal: false,
        real2025: "NA",
        q1_26: "-",
        q2_26: "-",
        q3_26: "-",
        q4_26: "80% - 85%",
        meta2026: "80% - 85%",
      },
      {
        descripcion: "Índice de uso de TMS para planificación de rutas",
        esPrincipal: false,
        real2025: "NA",
        q1_26: "-",
        q2_26: "-",
        q3_26: "-",
        q4_26: "85% - 90%",
        meta2026: "85% - 90%",
      },
      {
        descripcion: "Reducción en porcentaje de incidencias en despacho con responsabilidad logística",
        esPrincipal: false,
        real2025: "1.10%",
        q1_26: "-",
        q2_26: "-",
        q3_26: "-",
        q4_26: "0.8%",
        meta2026: "0.8%",
      },
    ],

    sponsor: "Carlos Sánchez",
    liderProyecto: "Brenilda Coronel",
    gestionProyecto: "TPI - MC&Data",
    equipoProyecto: "Fernando Díaz (Equipo Core), TPI Corp, MC&P",
    frentesTrabajo: "Logística, TI (TPI Corp), Finanzas",

    hitos: [
      {
        descripcion: "Presentación y aprobación de proyectos y mejoras en SAP",
        fechaEsperada: "Ene-26",
        responsable: "FD / BC / CS",
        status: "completado",
      },
      {
        descripcion: "Implementación de los proyectos aprobados en SAP",
        fechaEsperada: "Feb-Jun-26",
        responsable: "TPI Corp / MC&P / FD",
        status: "en-curso",
      },
      {
        descripcion: "Definir el alcance del proyecto TMS en base de prioridades del negocio",
        fechaEsperada: "Feb-May-26",
        responsable: "FD / BC",
        status: "en-curso",
      },
      {
        descripcion: "Evaluar más opciones tecnológicas locales para TMS",
        fechaEsperada: "Feb-May-26",
        responsable: "FD / GE",
        status: "en-curso",
      },
      {
        descripcion: "Preparación y Levantamiento de Requisitos TMS",
        fechaEsperada: "Mar-May-26",
        responsable: "FD / GE",
        status: "en-curso",
      },
      {
        descripcion: "Evaluación y Selección de Proveedor TMS",
        fechaEsperada: "Abr-May-26",
        responsable: "FD / GE",
        status: "pendiente",
      },
      {
        descripcion: "Diseño, Configuración e Integración TMS",
        fechaEsperada: "Jun-Sep-26",
        responsable: "TPI Corp / MC&P / FD",
        status: "pendiente",
      },
      {
        descripcion: "Pruebas y Piloto TMS",
        fechaEsperada: "Oct-Nov-26",
        responsable: "TPI Corp / MC&P / FD",
        status: "pendiente",
      },
      {
        descripcion: "Go Live TMS",
        fechaEsperada: "Dic-26",
        responsable: "TPI Corp / MC&P / FD",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  {
    id: "4.4",
    title: "Mejora de procesos: Proyecto Modelo de Precios",
    pillar: "Habilitadores",
    pillarColor: "#7c3aed",
    avancePonderado: "amarillo",

    descripcion:
      "Implementar un sistema de precios compatible con SAP y el modelo de negocios para reducir la complejidad del proceso de toma de pedidos y reducir los errores.",

    racionalEstrategico:
      "1. Modelo de precios en el SAP\n2. Precios de todos los negocios\n3. Asegurar coherencia entre los canales\n4. Asegurar el balance correcto entre competitividad y márgenes esperados",

    riesgos: [
      "Equipo dedicado al proyecto",
      "Equipo Corp TPI",
      "Segmentación",
      "SAP",
    ],

    impacto: "Reducción de complejidad en toma de pedidos y errores operativos",
    inversion: "Inv. $100K + Consultor",

    objetivo:
      "Implementar un sistema de precios compatible con SAP y el modelo de negocios para reducir la complejidad del proceso de toma de pedidos y reducir los errores.",

    kpis: [
      {
        descripcion: "Presentación del diagnóstico del Modelo de precios",
        esPrincipal: false,
        real2025: "-",
        q1_26: "100%",
        q2_26: "-",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
      {
        descripcion: "Definición del modelo de precios",
        esPrincipal: true,
        real2025: "-",
        q1_26: "100%",
        q2_26: "-",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
      {
        descripcion: "Definición de los márgenes óptimos (por segmentos)",
        esPrincipal: true,
        real2025: "-",
        q1_26: "100%",
        q2_26: "-",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
      {
        descripcion: "Definición de las mejoras internas (horas hombre por proceso)",
        esPrincipal: false,
        real2025: "-",
        q1_26: "100%",
        q2_26: "-",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
      {
        descripcion: "Implementación de la herramientas",
        esPrincipal: true,
        real2025: "-",
        q1_26: "-",
        q2_26: "100%",
        q3_26: "-",
        q4_26: "-",
        meta2026: "100%",
      },
    ],

    sponsor: "Carlos Sánchez",
    liderProyecto: "G Florida",
    gestionProyecto: "TPI Focorp",
    equipoProyecto: "MC&Data, Mktg, Negocios (Producto)",
    frentesTrabajo: "Producto, Marketing, Data, TI (TPI Focorp)",

    hitos: [
      {
        descripcion: "Análisis Interno (Diagnóstico del pricing actual)",
        fechaEsperada: "Ene-Feb-26",
        responsable: "GF | CN | JO",
        status: "completado",
      },
      {
        descripcion: "Análisis Externo (Valor y Competitividad) (Consultor)",
        fechaEsperada: "Feb-Abr-26",
        responsable: "GF | CN | JO",
        status: "en-curso",
      },
      {
        descripcion: "Benchmark del modelo de precios (Consultor)",
        fechaEsperada: "Abr-May-26",
        responsable: "GF | CN | JO",
        status: "pendiente",
      },
      {
        descripcion: "Definición de implementación tecnológica (SAP o Satélite)",
        fechaEsperada: "Abr-May-26",
        responsable: "GF | CN | JO / TPI Corp",
        status: "pendiente",
      },
      {
        descripcion: "Desarrollo y Simulación de la Herramienta",
        fechaEsperada: "May-Jun-26",
        responsable: "GF | CN | JO / TPI Corp",
        status: "pendiente",
      },
      {
        descripcion: "Implementación Mejoras internas (Piloto y Adopción)",
        fechaEsperada: "Jun-Ago-26",
        responsable: "GF | CN | JO / TPI Corp",
        status: "pendiente",
      },
      {
        descripcion: "Monitoreo y Operación Sostenible",
        fechaEsperada: "Jun-Dic-26",
        responsable: "GF | CN | JO / TPI Corp",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // FICHA 5
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "5",
    title: "Implementar un proceso de S&OP robusto",
    pillar: "Habilitadores",
    pillarColor: "#7c3aed",
    avancePonderado: "amarillo",

    descripcion:
      "Implementar el proceso para una gestión óptima del inventario.",

    racionalEstrategico: "xx",

    riesgos: [
      "Resistencia en la adopción de roles y responsabilidades",
      "Falta de disciplina",
      "Dificultad en la obtención de información con calidad y a tiempo de los clientes",
    ],

    impacto: "xx",
    inversion: "U$30k (asesoría) + U$60K (Software)",

    objetivo:
      "Implementar el proceso para una gestión óptima del inventario. Reducir el inventario (MTS) en xx% vs 2025.",

    kpis: [
      {
        descripcion: "Reducir el inventario (soles) - MTS",
        esPrincipal: true,
        real2025: "85M",
        q1_26: "-",
        q2_26: "80M",
        q3_26: "75M",
        q4_26: "75M",
        meta2026: "75M",
        statusReal: "sin-datos",
      },
      {
        descripcion: "Rotación de inventario",
        esPrincipal: false,
        real2025: "2.7x",
        q1_26: "-",
        q2_26: "3.3x",
        q3_26: "3.3x",
        q4_26: "3.3x",
        meta2026: "3.3x",
      },
      {
        descripcion: "Forecast Accuracy",
        esPrincipal: false,
        real2025: "60%",
        q1_26: "60%",
        q2_26: "63%",
        q3_26: "68%",
        q4_26: "75%",
        meta2026: "75%",
      },
    ],

    sponsor: "Carlos Sánchez",
    liderProyecto: "Brenilda Coronel",
    gestionProyecto: "TBD",
    equipoProyecto: "Carolina Flores, G. Espinal, TPI, Supply, FFVV",
    frentesTrabajo: "TPI Corp, TI Soltrak, Logística, Producto, Finanzas",

    hitos: [
      {
        descripcion: "Contratación del consultor",
        fechaEsperada: "Ene-26",
        responsable: "",
        status: "completado",
      },
      {
        descripcion: "Kick-off del proyecto",
        fechaEsperada: "Feb-26",
        responsable: "",
        status: "completado",
      },
      {
        descripcion: "1.1. Revisión de RFP y criterios de selección de consultor",
        fechaEsperada: "Ene-26",
        responsable: "C. Flores",
        status: "completado",
      },
      {
        descripcion: "1.2. Evaluación y definición del consultor/proveedor",
        fechaEsperada: "Mar-26",
        responsable: "G. Espinal",
        status: "en-curso",
      },
      {
        descripcion: "1.3. Consultoría y recomendaciones de mejoras procesos y software",
        fechaEsperada: "Jun-26",
        responsable: "Consultor",
        status: "pendiente",
      },
      {
        descripcion: "1.4. Implementación de las recomendaciones (mejoras de procesos S&OP, roles, responsabilidades y cultura)",
        fechaEsperada: "Dic-26",
        responsable: "Eq. Negocio y Soporte",
        status: "pendiente",
      },
      {
        descripcion: "2.1. Revisión de RFP y criterios de selección de software SOP",
        fechaEsperada: "Abr-26",
        responsable: "C. Flores",
        status: "pendiente",
      },
      {
        descripcion: "2.2. Evaluación y definición de proveedor",
        fechaEsperada: "Jun-26",
        responsable: "G. Espinal",
        status: "pendiente",
      },
      {
        descripcion: "2.3. Arranque, levantamiento de información y periodo de prueba (first test)",
        fechaEsperada: "Ago-26",
        responsable: "C. Flores",
        status: "pendiente",
      },
      {
        descripcion: "2.4. Implementación software y go live",
        fechaEsperada: "Dic-26",
        responsable: "C. Flores",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // FICHA 6
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "6",
    title: "Implementar un proceso de ventas estándar",
    pillar: "Habilitadores",
    pillarColor: "#7c3aed",
    avancePonderado: "amarillo",

    descripcion:
      "Definir un proceso formal y robusto de ventas, estándar para todas las líneas de negocio que asegure el mejor resultado posible de forma consistente.\nRevisar el proceso actual incluido el CRM en cada negocio y definir el estándar a implementar en: prospección, gestión de cuentas y modelo de gestión de la fuerza de ventas.\nImplementación a nivel de disciplina, indicadores de gestión relacionados implementados y objetivos de desempeño para ventas.",

    racionalEstrategico: "xx",

    riesgos: [
      "Resistencia del equipo de ventas a la adopción de la disciplina",
      "Exceso de carga administrativa",
    ],

    impacto: "xx",
    inversion: "Horas hombre del equipo.",

    objetivo:
      "Definir un proceso formal y robusto de ventas, estándar para todas las líneas de negocio que asegure el mejor resultado posible de forma consistente. Implementar a nivel de disciplina.",

    kpis: [
      {
        descripcion: "Definición del proceso estándar y el alcance",
        esPrincipal: false,
        real2025: "NA",
        q1_26: "X",
        q2_26: "",
        q3_26: "",
        q4_26: "",
        meta2026: "100%",
      },
      {
        descripcion: "Implementación del proceso de prospección",
        esPrincipal: false,
        real2025: "NA",
        q1_26: "",
        q2_26: "X",
        q3_26: "",
        q4_26: "",
        meta2026: "100%",
      },
      {
        descripcion: "Implementación del proceso de Gestión de cuentas",
        esPrincipal: false,
        real2025: "NA",
        q1_26: "",
        q2_26: "X",
        q3_26: "",
        q4_26: "",
        meta2026: "100%",
      },
      {
        descripcion: "Implementación del proceso de gestión",
        esPrincipal: true,
        real2025: "NA",
        q1_26: "",
        q2_26: "",
        q3_26: "X",
        q4_26: "",
        meta2026: "100%",
        statusReal: "sin-datos",
      },
    ],

    sponsor: "Ronald O.",
    liderProyecto: "Carlos Sánchez",
    gestionProyecto: "TBD",
    equipoProyecto: "JC. Paz / Christian Novoa, J. Céspedes",
    frentesTrabajo: "xx",

    hitos: [
      {
        descripcion: "Evaluación del proceso actual",
        fechaEsperada: "Feb-26",
        responsable: "CS",
        status: "completado",
      },
      {
        descripcion: "Definición del estándar a implementar",
        fechaEsperada: "Mar-26",
        responsable: "CS",
        status: "en-curso",
      },
      {
        descripcion: "Implementación del proceso",
        fechaEsperada: "May-26",
        responsable: "CS",
        status: "pendiente",
      },
      {
        descripcion: "Implementación de indicadores de desempeño de FV",
        fechaEsperada: "Ago-26",
        responsable: "CS",
        status: "pendiente",
      },
    ],

    version: "Nov. 2025",
    ultimaActualizacion: "Marzo 2026",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const TL_CONFIG = {
  verde:       { bg: "bg-emerald-500", border: "border-emerald-600", label: "En curso",  text: "text-emerald-700", light: "bg-emerald-50 border-emerald-200" },
  amarillo:    { bg: "bg-amber-400",   border: "border-amber-500",   label: "Observada", text: "text-amber-600",   light: "bg-amber-50 border-amber-200" },
  rojo:        { bg: "bg-red-500",     border: "border-red-600",     label: "Retrasada", text: "text-red-700",     light: "bg-red-50 border-red-200" },
  "sin-datos": { bg: "bg-slate-300",   border: "border-slate-400",   label: "Sin datos", text: "text-slate-500",   light: "bg-slate-50 border-slate-200" },
}

const HITO_STATUS = {
  completado: { label: "Completado", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  "en-curso":  { label: "En curso",  cls: "bg-blue-50 text-blue-700 border-blue-200" },
  pendiente:   { label: "Pendiente", cls: "bg-slate-50 text-slate-500 border-slate-200" },
  tbd:         { label: "TBD",       cls: "bg-amber-50 text-amber-600 border-amber-200" },
}

function SectionHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center shrink-0">
        <span className="text-[10px] font-black text-white">{number}</span>
      </div>
      <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-wider">{title}</h3>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}

function FieldBlock({ n, label, children, className = "" }: {
  n: number
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        <div className="w-4 h-4 rounded bg-slate-600 flex items-center justify-center shrink-0">
          <span className="text-[9px] font-black text-white">{n}</span>
        </div>
        <span className="text-[10px] font-black text-white uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-[11px] text-slate-700 leading-relaxed">{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FICHA DETAIL VIEW
// ─────────────────────────────────────────────────────────────────────────────

function FichaDetail({ ficha }: { ficha: InitiativeFicha }) {
  const tlCfg = TL_CONFIG[ficha.avancePonderado]

  return (
    <div className="space-y-6">

      {/* ── Ficha header ── */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div
          className="flex items-center gap-4 px-5 py-3"
          style={{ background: ficha.pillarColor }}
        >
          <div className="rounded-lg bg-white/20 px-3 py-1.5 shrink-0">
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">Ficha de Iniciativa</p>
          </div>
          <h2 className="text-[17px] font-black text-white tracking-tight flex-1">
            {ficha.id}. {ficha.title}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-white/70 font-medium">Pilar:</span>
            <span className="text-[10px] font-black text-white">{ficha.pillar}</span>
            <div className={`ml-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${tlCfg.light}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${tlCfg.bg}`} />
              <span className={`text-[10px] font-bold ${tlCfg.text}`}>{tlCfg.label}</span>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: Definición conceptual ── */}
        <div className="bg-slate-700 px-4 py-2">
          <p className="text-[11px] font-black text-white uppercase tracking-wider">
            Definición conceptual y dimensiones preliminares
          </p>
        </div>

        <div className="bg-slate-50 px-4 py-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: "2fr 1.5fr 2fr 1.2fr 0.8fr" }}>
            {/* Descripción */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 bg-slate-700 px-3 py-2">
                <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">1</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wide">Descripción</span>
              </div>
              <div className="px-3 py-3 text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                {ficha.descripcion}
              </div>
            </div>

            {/* Racional estratégico */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 bg-slate-700 px-3 py-2">
                <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">2</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wide">Racional estratégico</span>
              </div>
              <div className="px-3 py-3 text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                {ficha.racionalEstrategico}
              </div>
            </div>

            {/* Riesgos */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 bg-slate-700 px-3 py-2">
                <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">3</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wide">Riesgos</span>
              </div>
              <ul className="px-3 py-3 space-y-1.5">
                {ficha.riesgos.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                    <span className="mt-1 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impacto */}
            <div className="rounded-xl border border-red-200 bg-red-50/40 overflow-hidden">
              <div className="flex items-center gap-1.5 bg-slate-700 px-3 py-2">
                <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">4</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wide">Impacto</span>
              </div>
              <div className="px-3 py-3 text-[11px] text-red-600 italic leading-relaxed font-medium">
                {ficha.impacto}
              </div>
            </div>

            {/* Inversión */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 bg-slate-700 px-3 py-2">
                <div className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">5</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-wide">Inversión</span>
              </div>
              <div className="px-3 py-3 text-[12px] font-black text-slate-800">
                {ficha.inversion}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Objetivo y KPIs ── */}
        <div className="bg-slate-700 px-4 py-2">
          <p className="text-[11px] font-black text-white uppercase tracking-wider">
            Objetivo y KPIs de cumplimiento
          </p>
        </div>

        <div className="bg-white overflow-x-auto">
          <table className="w-full border-collapse text-[10.5px]">
            <thead>
              <tr>
                <th
                  className="border border-slate-200 bg-slate-700 text-white px-3 py-2 text-left font-black text-[10px] uppercase tracking-wide min-w-40"
                  rowSpan={2}
                >
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[9px] font-black">6</span>
                    Objetivo
                  </div>
                </th>
                <th
                  className="border border-slate-200 bg-slate-700 text-white px-3 py-2 text-left font-black text-[10px] uppercase tracking-wide min-w-60"
                  rowSpan={2}
                >
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[9px] font-black">7</span>
                    KPIs de resultados al 2026
                  </div>
                </th>
                <th className="border border-slate-200 bg-slate-600 text-white px-3 py-2 text-center font-black text-[10px] uppercase tracking-wide w-24" rowSpan={2}>
                  KPI Principal<br />(marcar X)
                </th>
                <th className="border border-slate-200 bg-slate-600 text-white px-3 py-2 text-center font-black text-[10px] uppercase tracking-wide w-20" rowSpan={2}>
                  Real 2025<br />(Base)
                </th>
                <th className="border border-slate-200 bg-slate-500 text-white px-3 py-2 text-center font-black text-[10px] uppercase tracking-wide" colSpan={4}>
                  Avance esperado de KPIs
                </th>
                <th className="border border-slate-200 bg-slate-700 text-white px-3 py-2 text-center font-black text-[10px] uppercase tracking-wide w-16" rowSpan={2}>
                  Meta<br />2026
                </th>
              </tr>
              <tr>
                {["1Q26 YTD", "2Q26 YTD", "3Q26 YTD", "4Q26 YTD"].map((q) => (
                  <th key={q} className="border border-slate-200 bg-slate-500 text-white px-2 py-1.5 text-center font-black text-[10px] w-16">
                    {q}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ficha.kpis.map((kpi, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                  {idx === 0 && (
                    <td
                      className="border border-slate-200 px-3 py-2 text-slate-700 text-[11px] leading-relaxed align-top"
                      rowSpan={ficha.kpis.length}
                    >
                      <p className="text-[10.5px] text-slate-600 leading-relaxed">
                        {ficha.objetivo}
                      </p>
                    </td>
                  )}
                  <td className="border border-slate-200 px-3 py-2 text-slate-700 leading-snug">
                    {kpi.descripcion}
                  </td>
                  <td className="border border-slate-200 px-3 py-2 text-center">
                    {kpi.esPrincipal && (
                      <span
                        className="font-black text-[13px]"
                        style={{ color: ficha.pillarColor }}
                      >
                        X
                      </span>
                    )}
                  </td>
                  <td className="border border-slate-200 px-3 py-2 text-center">
                    <span className={`font-bold ${kpi.statusReal === "rojo" ? "text-red-500" : "text-slate-700"}`}>
                      {kpi.real2025}
                    </span>
                  </td>
                  {[kpi.q1_26, kpi.q2_26, kpi.q3_26, kpi.q4_26].map((v, qi) => (
                    <td key={qi} className="border border-slate-200 px-3 py-2 text-center font-medium text-slate-700">
                      {v}
                    </td>
                  ))}
                  <td className="border border-slate-200 px-3 py-2 text-center font-black text-slate-800">
                    {kpi.meta2026}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── SECTION 3: Equipo y actividades ── */}
        <div className="bg-slate-700 px-4 py-2">
          <p className="text-[11px] font-black text-white uppercase tracking-wider">
            Equipo de trabajo, frentes y principales actividades
          </p>
        </div>

        <div className="bg-white overflow-x-auto">
          <table className="w-full border-collapse text-[10.5px]">
            <thead>
              <tr>
                <th className="border border-slate-200 bg-slate-700 text-white px-3 py-2 text-left font-black text-[10px] uppercase tracking-wide w-44">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[9px] font-black">8</span>
                    Equipo de Trabajo
                  </div>
                </th>
                <th className="border border-slate-200 bg-slate-700 text-white px-3 py-2 text-left font-black text-[10px] uppercase tracking-wide w-36">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[9px] font-black">9</span>
                    Frentes de Trabajo
                  </div>
                </th>
                <th className="border border-slate-200 bg-slate-700 text-white px-3 py-2 text-left font-black text-[10px] uppercase tracking-wide">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center text-[9px] font-black">10</span>
                    Principales hitos de avance
                  </div>
                </th>
                <th className="border border-slate-200 bg-slate-600 text-white px-3 py-2 text-center font-black text-[10px] uppercase tracking-wide w-28">
                  Fecha esperada de finalización
                </th>
                <th className="border border-slate-200 bg-slate-600 text-white px-3 py-2 text-left font-black text-[10px] uppercase tracking-wide w-40">
                  Responsable
                </th>
                <th className="border border-slate-200 bg-slate-600 text-white px-3 py-2 text-center font-black text-[10px] uppercase tracking-wide w-24">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {ficha.hitos.map((hito, idx) => {
                const statusCfg = HITO_STATUS[hito.status ?? "pendiente"]
                const isTbd = hito.status === "tbd"
                return (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    {idx === 0 && (
                      <td
                        className="border border-slate-200 px-3 py-3 align-top"
                        rowSpan={ficha.hitos.length}
                      >
                        <ul className="space-y-1.5 text-[11px] text-slate-600">
                          <li><span className="font-bold text-slate-800">Sponsor:</span> {ficha.sponsor}</li>
                          <li><span className="font-bold text-slate-800">Líder del proyecto:</span>{" "}
                            <span style={{ color: ficha.pillarColor }} className="font-bold">{ficha.liderProyecto}</span>
                          </li>
                          <li><span className="font-bold text-slate-800">Gestión del proyecto:</span> {ficha.gestionProyecto}</li>
                          <li>
                            <span className="font-bold text-slate-800">Equipo del proyecto:</span>{" "}
                            {ficha.equipoProyecto}
                          </li>
                        </ul>
                      </td>
                    )}
                    {idx === 0 && (
                      <td
                        className="border border-slate-200 px-3 py-3 align-middle text-center"
                        rowSpan={ficha.hitos.length}
                      >
                        <div
                          className="inline-block rounded-lg px-3 py-2 text-[11px] font-black text-white text-center"
                          style={{ background: ficha.pillarColor }}
                        >
                          {ficha.frentesTrabajo}
                        </div>
                      </td>
                    )}
                    <td className={`border border-slate-200 px-3 py-2 leading-snug ${isTbd ? "text-amber-600 font-semibold" : "text-slate-700"}`}>
                      {hito.descripcion}
                    </td>
                    <td className={`border border-slate-200 px-3 py-2 text-center font-bold ${isTbd ? "text-amber-600" : "text-slate-700"}`}>
                      {hito.fechaEsperada}
                    </td>
                    <td className={`border border-slate-200 px-3 py-2 ${isTbd ? "text-amber-600 font-bold" : "text-slate-700"}`}>
                      {hito.responsable}
                    </td>
                    <td className="border border-slate-200 px-3 py-2 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusCfg.cls}`}>
                        {statusCfg.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <p className="text-[10px] text-slate-400">
            Versión: <strong>{ficha.version}</strong>
            {ficha.ultimaActualizacion && (
              <> · Última actualización: <strong>{ficha.ultimaActualizacion}</strong></>
            )}
          </p>
          <div className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded-lg">
            <span className="font-black text-[11px] tracking-wide">SOLTRAK</span>
            <span className="font-black text-[11px]">+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD MINI (para el panel de selección)
// ─────────────────────────────────────────────────────────────────────────────

function FichaMiniCard({
  ficha,
  isActive,
  onClick,
}: {
  ficha: InitiativeFicha
  isActive: boolean
  onClick: () => void
}) {
  const tlCfg = TL_CONFIG[ficha.avancePonderado]
  const completedHitos = ficha.hitos.filter((h) => h.status === "completado").length
  const pct = Math.round((completedHitos / ficha.hitos.length) * 100)

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-xl border-2 px-3 py-3 transition-all
        ${isActive
          ? "border-transparent shadow-md"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"}
      `}
      style={isActive ? { background: ficha.pillarColor + "12", borderColor: ficha.pillarColor } : {}}
    >
      <div className="flex items-start gap-2">
        <span
          className="text-[11px] font-black px-2 py-0.5 rounded-lg shrink-0 text-white mt-0.5"
          style={{ background: "#9b111e" }}
        >
          {ficha.id}
        </span>
        <div className="flex-1 min-w-0">
          <p
            className={`text-[11px] font-bold leading-snug line-clamp-2 ${isActive ? "text-slate-900" : "text-slate-700"}`}
          >
            {ficha.title}
          </p>
          <p className="text-[9px] text-slate-400 mt-0.5">{ficha.pillar}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${tlCfg.bg}`} />
              <span className={`text-[9px] font-semibold ${tlCfg.text}`}>{tlCfg.label}</span>
            </div>
            <span className="text-[9px] text-slate-400 font-medium">{completedHitos}/{ficha.hitos.length} hitos</span>
          </div>
          {/* mini progress */}
          <div className="mt-1.5 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: ficha.pillarColor }}
            />
          </div>
        </div>
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function InitiativeFichaDashboard({ initialFichaId }: { initialFichaId?: string } = {}) {
  const [selectedId, setSelectedId] = useState<string>(initialFichaId ?? FICHAS[0]?.id ?? "")
  const [searchQuery, setSearchQuery] = useState("")

  // Auto-select when navigated from the initiatives dashboard
  useEffect(() => {
    if (initialFichaId) setSelectedId(initialFichaId)
  }, [initialFichaId])

  const filtered = FICHAS.filter((f) =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.id.includes(searchQuery) ||
    f.pillar.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedFicha = FICHAS.find((f) => f.id === selectedId) ?? FICHAS[0]

  const totalHitos = FICHAS.reduce((s, f) => s + f.hitos.length, 0)
  const completedHitos = FICHAS.reduce(
    (s, f) => s + f.hitos.filter((h) => h.status === "completado").length, 0
  )

  return (
    <div className="flex gap-5 h-full" style={{ minHeight: "calc(100vh - 120px)" }}>

      {/* ── Left sidebar: ficha list ── */}
      <div className="w-64 shrink-0 flex flex-col gap-3">

        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">📋</span>
            <h2 className="text-[13px] font-black text-slate-800">Fichas de Iniciativa</h2>
          </div>
          <p className="text-[10px] text-slate-400">
            {FICHAS.length} {FICHAS.length === 1 ? "ficha" : "fichas"} · {completedHitos}/{totalHitos} hitos completados
          </p>
          {/* global progress */}
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${Math.round((completedHitos / totalHitos) * 100)}%` }}
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Buscar ficha..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-400 focus:ring-1 ring-slate-200 transition placeholder:text-slate-300"
          />
        </div>

        {/* Fichas list */}
        <div className="flex flex-col gap-2 overflow-y-auto flex-1 pb-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[11px] text-slate-400 italic">
              Sin resultados
            </div>
          ) : (
            filtered.map((ficha) => (
              <FichaMiniCard
                key={ficha.id}
                ficha={ficha}
                isActive={selectedId === ficha.id}
                onClick={() => setSelectedId(ficha.id)}
              />
            ))
          )}

          {/* Próximas fichas placeholder */}
          <div className="mt-2 rounded-xl border-2 border-dashed border-slate-200 px-3 py-4 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Próximas fichas se irán<br />agregando aquí
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {[
                { id: "1.2", label: "Simplificar el negocio" },
              ].map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 text-left opacity-40"
                >
                  <span className="text-[9px] font-black bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">
                    {p.id}
                  </span>
                  <span className="text-[9px] text-slate-400 line-clamp-1">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content: ficha detail ── */}
      <div className="flex-1 min-w-0 overflow-y-auto pb-8">
        {selectedFicha ? (
          <FichaDetail ficha={selectedFicha} />
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-400 text-sm italic">
            Selecciona una ficha del panel izquierdo
          </div>
        )}
      </div>
    </div>
  )
}
