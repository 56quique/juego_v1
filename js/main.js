// main.js
import { crearGauge } from './gauge.js';

// =======================================
// RED - Tensión (V)
const vRedL1 = crearGauge("vRedL1", 0, 300, {
  unidad: "V", label: "L1",
  zonas: [
    { from: 0, to: 210, color: "red" },
    { from: 210, to: 240, color: "green" },
    { from: 240, to: 300, color: "red" }
  ]
});
const vRedL2 = crearGauge("vRedL2", 0, 300, {
  unidad: "V", label: "L2",
  zonas: [
    { from: 0, to: 210, color: "red" },
    { from: 210, to: 240, color: "green" },
    { from: 240, to: 300, color: "red" }
  ]
});
const vRedL3 = crearGauge("vRedL3", 0, 300, {
  unidad: "V", label: "L3",
  zonas: [
    { from: 0, to: 210, color: "red" },
    { from: 210, to: 240, color: "green" },
    { from: 240, to: 300, color: "red" }
  ]
});

// RED - Corriente (A)
const iRedL1 = crearGauge("iRedL1", 0, 150, {
  unidad: "A", label: "L1",
  zonas: [
    { from: 0, to: 50, color: "green" },
    { from: 50, to: 100, color: "yellow" },
    { from: 100, to: 150, color: "red" }
  ]
});
const iRedL2 = crearGauge("iRedL2", 0, 150, {
  unidad: "A", label: "L2",
  zonas: [
    { from: 0, to: 50, color: "green" },
    { from: 50, to: 100, color: "yellow" },
    { from: 100, to: 150, color: "red" }
  ]
});
const iRedL3 = crearGauge("iRedL3", 0, 150, {
  unidad: "A", label: "L3",
  zonas: [
    { from: 0, to: 50, color: "green" },
    { from: 50, to: 100, color: "yellow" },
    { from: 100, to: 150, color: "red" }
  ]
});

// GENERADOR - Tensión (V)
const vGenL1 = crearGauge("vGenL1", 0, 300, {
  unidad: "V", label: "L1",
  zonas: [
    { from: 0, to: 210, color: "red" },
    { from: 210, to: 240, color: "green" },
    { from: 240, to: 300, color: "red" }
  ]
});
const vGenL2 = crearGauge("vGenL2", 0, 300, {
  unidad: "V", label: "L2",
  zonas: [
    { from: 0, to: 210, color: "red" },
    { from: 210, to: 240, color: "green" },
    { from: 240, to: 300, color: "red" }
  ]
});
const vGenL3 = crearGauge("vGenL3", 0, 300, {
  unidad: "V", label: "L3",
  zonas: [
    { from: 0, to: 210, color: "red" },
    { from: 210, to: 240, color: "green" },
    { from: 240, to: 300, color: "red" }
  ]
});

// GENERADOR - Corriente (A)
const iGenL1 = crearGauge("iGenL1", 0, 150, {
  unidad: "A", label: "L1",
  zonas: [
    { from: 0, to: 50, color: "green" },
    { from: 50, to: 100, color: "yellow" },
    { from: 100, to: 150, color: "red" }
  ]
});
const iGenL2 = crearGauge("iGenL2", 0, 150, {
  unidad: "A", label: "L2",
  zonas: [
    { from: 0, to: 50, color: "green" },
    { from: 50, to: 100, color: "yellow" },
    { from: 100, to: 150, color: "red" }
  ]
});
const iGenL3 = crearGauge("iGenL3", 0, 150, {
  unidad: "A", label: "L3",
  zonas: [
    { from: 0, to: 50, color: "green" },
    { from: 50, to: 100, color: "yellow" },
    { from: 100, to: 150, color: "red" }
  ]
});

// =======================================
// SIMULACIÓN DE VALORES DINÁMICOS
// =======================================
function simularValores() {
  // RED Tensión
  vRedL1.set(Math.random() * 300);
  vRedL2.set(Math.random() * 300);
  vRedL3.set(Math.random() * 300);

  // RED Corriente
  iRedL1.set(Math.random() * 150);
  iRedL2.set(Math.random() * 150);
  iRedL3.set(Math.random() * 150);

  // GENERADOR Tensión
  vGenL1.set(Math.random() * 300);
  vGenL2.set(Math.random() * 300);
  vGenL3.set(Math.random() * 300);

  // GENERADOR Corriente
  iGenL1.set(Math.random() * 150);
  iGenL2.set(Math.random() * 150);
  iGenL3.set(Math.random() * 150);
}

// Actualizar valores cada 1 segundo
setInterval(simularValores, 1000);
