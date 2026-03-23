class Gauge {
  constructor(canvas, max, zones) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.max = max;
    this.zones = zones;

    this.value = 0;
    this.target = 0;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  update(value) {
    this.target = Math.max(0, Math.min(this.max, value));
  }

  draw() {
    this.value += (this.target - this.value) * 0.08;

    const ctx = this.ctx;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;

    const cx = w / 2;
    const cy = h * 0.85;
    const r = Math.min(w, h) * 0.45;

    ctx.clearRect(0, 0, w, h);

    // ZONAS
    this.zones.forEach(z => {
      const start = Math.PI * (1 - z.from / this.max);
      const end = Math.PI * (1 - z.to / this.max);

      ctx.beginPath();
      ctx.arc(cx, cy, r, start, end, true);
      ctx.strokeStyle = z.color;
      ctx.lineWidth = 10;
      ctx.stroke();
    });

    // ESCALA
    for (let i = 0; i <= 10; i++) {
      const val = (this.max / 10) * i;
      const ang = Math.PI * (1 - val / this.max);

      const x1 = cx + Math.cos(ang) * (r - 10);
      const y1 = cy + Math.sin(ang) * (r - 10);
      const x2 = cx + Math.cos(ang) * r;
      const y2 = cy + Math.sin(ang) * r;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#e5e7eb";
      ctx.stroke();

      const tx = cx + Math.cos(ang) * (r - 25);
      const ty = cy + Math.sin(ang) * (r - 25);

      ctx.fillStyle = "#e5e7eb";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(Math.round(val), tx, ty);
    }

    // AGUJA
    const ang = Math.PI * (1 - this.value / this.max);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ang);

    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(r * 0.75, 0);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    // CENTRO
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
  }
}

// ZONAS
const voltZones = [
  { from: 0, to: 210, color: "#ef4444" },
  { from: 210, to: 240, color: "#22c55e" },
  { from: 240, to: 300, color: "#ef4444" }
];

const ampZones = [
  { from: 0, to: 120, color: "#22c55e" },
  { from: 120, to: 140, color: "#f59e0b" },
  { from: 140, to: 150, color: "#ef4444" }
];

// INSTANCIAS
const vRed = [
  new Gauge(document.getElementById("vRedL1"), 300, voltZones),
  new Gauge(document.getElementById("vRedL2"), 300, voltZones),
  new Gauge(document.getElementById("vRedL3"), 300, voltZones)
];

const iRed = [
  new Gauge(document.getElementById("iRedL1"), 150, ampZones),
  new Gauge(document.getElementById("iRedL2"), 150, ampZones),
  new Gauge(document.getElementById("iRedL3"), 150, ampZones)
];

const vGen = [
  new Gauge(document.getElementById("vGenL1"), 300, voltZones),
  new Gauge(document.getElementById("vGenL2"), 300, voltZones),
  new Gauge(document.getElementById("vGenL3"), 300, voltZones)
];

const iGen = [
  new Gauge(document.getElementById("iGenL1"), 150, ampZones),
  new Gauge(document.getElementById("iGenL2"), 150, ampZones),
  new Gauge(document.getElementById("iGenL3"), 150, ampZones)
];

// SIMULACIÓN
let t = 0;

function getData() {
  t += 0.02;

  const redOK = Math.sin(t) > -0.3;

  return {
    red: {
      v: redOK ? [220, 222, 218].map(v => v + Math.random()*5) : [0,0,0],
      a: redOK ? [60, 55, 65].map(a => a + Math.random()*5) : [0,0,0],
      kw: redOK ? 35 : 0,
      fp: redOK ? 0.92 : 0
    },
    gen: {
      v: !redOK ? [230, 231, 229] : [0,0,0],
      a: !redOK ? [50, 48, 52] : [0,0,0],
      kw: !redOK ? 28 : 0,
      fp: !redOK ? 0.95 : 0
    },
    state: redOK ? "RED" : "FALLA"
  };
}

// UI
function updateUI(data) {
  data.red.v.forEach((v, i) => vRed[i].update(v));
  data.red.a.forEach((a, i) => iRed[i].update(a));

  data.gen.v.forEach((v, i) => vGen[i].update(v));
  data.gen.a.forEach((a, i) => iGen[i].update(a));

  document.getElementById("kwRed").innerText = data.red.kw.toFixed(1);
  document.getElementById("fpRed").innerText = data.red.fp.toFixed(2);

  document.getElementById("kwGen").innerText = data.gen.kw.toFixed(1);
  document.getElementById("fpGen").innerText = data.gen.fp.toFixed(2);

  document.querySelectorAll(".state").forEach(e =>
    e.classList.remove("active", "alarm", "warning")
  );

  if (data.state === "RED") {
    document.getElementById("stateRed").classList.add("active");
  } else {
    document.getElementById("stateFail").classList.add("alarm");
  }
}

// LOOP
function loop() {
  const data = getData();

  updateUI(data);

  vRed.forEach(g => g.draw());
  iRed.forEach(g => g.draw());
  vGen.forEach(g => g.draw());
  iGen.forEach(g => g.draw());

  requestAnimationFrame(loop);
}

window.onload = loop;