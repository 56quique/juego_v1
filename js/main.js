import { crearGauge } from './gauges.js'

/* =========================
   CREACIÓN DE GAUGES
========================= */

// TENSIÓN RED
const vRedL1 = crearGauge("vRedL1", 0, 300, "L1")
const vRedL2 = crearGauge("vRedL2", 0, 300, "L2")
const vRedL3 = crearGauge("vRedL3", 0, 300, "L3")

// CORRIENTE RED
const iRedL1 = crearGauge("iRedL1", 0, 150, "L1")
const iRedL2 = crearGauge("iRedL2", 0, 150, "L2")
const iRedL3 = crearGauge("iRedL3", 0, 150, "L3")

// TENSIÓN GENERADOR
const vGenL1 = crearGauge("vGenL1", 0, 300, "L1")
const vGenL2 = crearGauge("vGenL2", 0, 300, "L2")
const vGenL3 = crearGauge("vGenL3", 0, 300, "L3")

// CORRIENTE GENERADOR
const iGenL1 = crearGauge("iGenL1", 0, 150, "L1")
const iGenL2 = crearGauge("iGenL2", 0, 150, "L2")
const iGenL3 = crearGauge("iGenL3", 0, 150, "L3")

/* =========================
   AGRUPACIÓN
========================= */

const tensionRed = [vRedL1, vRedL2, vRedL3]
const corrienteRed = [iRedL1, iRedL2, iRedL3]

const tensionGen = [vGenL1, vGenL2, vGenL3]
const corrienteGen = [iGenL1, iGenL2, iGenL3]

/* =========================
   SIMULACIÓN
========================= */

setInterval(() => {

  // RED (normal)
  tensionRed.forEach(g => {
    g.set(210 + Math.random() * 20)
  })

  corrienteRed.forEach(g => {
    g.set(40 + Math.random() * 60)
  })

  // GENERADOR (apagado)
  tensionGen.forEach(g => {
    g.set(0)
  })

  corrienteGen.forEach(g => {
    g.set(0)
  })

}, 1000)
