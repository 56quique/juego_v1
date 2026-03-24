import { crearGauge } from "/js/gauge.js";

const g1 = crearGauge("vL1", 0, 300);
const g2 = crearGauge("vL2", 0, 300);
const g3 = crearGauge("vL3", 0, 300);

setInterval(() => {
  g1.set(220);
  g2.set(230);
  g3.set(210);
}, 1000);
