import { crearGauge } from './gauges.js'

const vRedL1 = crearGauge("vRedL1", 0, 300, "L1")

// simulación
setInterval(() => {
  const valor = 200 + Math.random() * 40
  vRedL1.set(valor)
}, 1000)
