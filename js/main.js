import { crearGauge } from "./gauge.js";

const g1 = crearGauge("vL1", 0, 300);
const g2 = crearGauge("vL2", 0, 300);
const g3 = crearGauge("vL3", 0, 300);

// Simulación con variación realista
setInterval(() => {
  g1.set(210 + Math.random() * 30);
  g2.set(220 + Math.random() * 20);
  g3.set(200 + Math.random() * 40);
}, 1000);
