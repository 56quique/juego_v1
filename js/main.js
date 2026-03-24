import { crearGauge } from "./gauge.js";

document.addEventListener("DOMContentLoaded", () => {

  const vL1 = crearGauge("vL1", 0, 300, {
    unidad: "V",
    label: "L1",
    zonas: [
      { from: 0, to: 210, color: "red" },
      { from: 210, to: 240, color: "lime" },
      { from: 240, to: 300, color: "red" }
    ]
  });

  const vL2 = crearGauge("vL2", 0, 300, {
    unidad: "V",
    label: "L2",
    zonas: [
      { from: 0, to: 210, color: "red" },
      { from: 210, to: 240, color: "lime" },
      { from: 240, to: 300, color: "red" }
    ]
  });

  const vL3 = crearGauge("vL3", 0, 300, {
    unidad: "V",
    label: "L3",
    zonas: [
      { from: 0, to: 210, color: "red" },
      { from: 210, to: 240, color: "lime" },
      { from: 240, to: 300, color: "red" }
    ]
  });

  setInterval(() => {
    vL1.set(220 + Math.random()*20);
    vL2.set(210 + Math.random()*30);
    vL3.set(230 + Math.random()*10);
  }, 1000);

});
