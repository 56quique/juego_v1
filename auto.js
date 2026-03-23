// =======================
// GAUGE CLASS
// =======================

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
    this.target = value;
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

    // =====================
    // ZONAS DE COLOR
    // =====================
    this.zones.forEach(zone => {
      const start = Math.PI * (1 - zone.from / this.max);
      const end = Math.PI * (1 - zone.to / this.max);

      ctx.beginPath();
      ctx.arc(cx, cy, r, start, end, true);
      ctx.strokeStyle = zone.color;
      ctx.lineWidth = 10;
      ctx.stroke();
    });

    // =====================
    // ESCALA (marcas)
    // =====================
    for (let i = 0; i <= this.max; i += this.max / 10) {
      const angle = Math.PI * (1 - i / this.max);

      const x1 = cx + Math.cos(angle) * (r - 10);
      const y1 = cy + Math.sin(angle) * (r - 10);

      const x2 = cx + Math.cos(angle) * r;
      const y2 = cy + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 2;
      ctx.stroke();

      // números
      const tx = cx + Math.cos(angle) * (r - 25);
      const ty = cy + Math.sin(angle) * (r - 25);

      ctx.fillStyle = "#e5e7eb";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(Math.round(i), tx, ty);
    }

    // =====================
    // AGUJA
    // =====================
    const angle = Math.PI * (1 - this.value / this.max);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(r * 0.75, 0);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    // =====================
    // CENTRO
    // =====================
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    // =====================
    // VALOR NUMÉRICO
    // =====================
    ctx.fillStyle = "#e5e7eb";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.value.toFixed(0), cx, cy - r * 0.3);
  }
}

// =======================
// INSTANCIAS
// =======================

// TENSIÓN
const voltZones = [
  { from: 0, to: 210, color: "#ef4444" },
  { from: 210, to: 240, color: "#22c55e" },
  { from: 240, to: 300, color: "#ef4444" }
];

// CORRIENTE
const ampZones = [
  { from: 0, to: 120, color: "#22c55e" },
  { from: 120, to: 140, color: "#f59e0b" },
  { from: 140, to: 150, color: "#ef4444" }
];

// INSTANCIAS
const gVoltRed = new Gauge(document.getElementById("gaugeVoltRed"), 300, voltZones);
const gAmpRed = new Gauge(document.getElementById("gaugeAmpRed"), 150, ampZones);

const gVoltGen = new Gauge(document.getElementById("gaugeVoltGen"), 300, voltZones);
const gAmpGen = new Gauge(document.getElementById("gaugeAmpGen"), 150, ampZones);

// =======================
// UI UPDATE
// =======================

function updateUI(data) {

  gVoltRed.update(data.red.v);
  gAmpRed.update(data.red.a);

  gVoltGen.update(data.gen.v);
  gAmpGen.update(data.gen.a);

  document.getElementById("kwRed").innerText = data.red.kw.toFixed(1);
  document.getElementById("fpRed").innerText = data.red.fp.toFixed(2);

  document.getElementById("kwGen").innerText = data.gen.kw.toFixed(1);
  document.getElementById("fpGen").innerText = data.gen.fp.toFixed(2);

  document.querySelectorAll(".state").forEach(e => e.classList.remove("active"));

  if (data.state === "RED") document.getElementById("stateRed").classList.add("active");
  if (data.state === "FALLA") document.getElementById("stateFail").classList.add("alarm");
}

// =======================
// LOOP
// =======================

function loop() {
  const data = getData();

  updateUI(data);

  gVoltRed.draw();
  gAmpRed.draw();
  gVoltGen.draw();
  gAmpGen.draw();

  requestAnimationFrame(loop);
}

loop();
