class Gauge {
  constructor(id, max, zones, unit) {
    this.canvas = document.getElementById(id);

    if (!this.canvas) {
      console.error("No existe:", id);
      return;
    }

    this.ctx = this.canvas.getContext("2d");
    this.max = max;
    this.zones = zones;
    this.unit = unit;

    this.value = 0;
    this.target = 0;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;

    this.ctx.scale(dpr, dpr);
  }

  update(v) {
    this.target = Math.max(0, Math.min(this.max, v));
  }

  draw() {
    this.value += (this.target - this.value) * 0.1;

    const ctx = this.ctx;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;

    const cx = w / 2;
    const cy = h * 0.8;
    const r = Math.min(w, h) * 0.45;

    ctx.clearRect(0, 0, w, h);

    // arco
    this.zones.forEach(z => {
      const start = Math.PI * (1 - z.from / this.max);
      const end = Math.PI * (1 - z.to / this.max);

      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI, 0, false);
      ctx.strokeStyle = z.color;
      ctx.lineWidth = 6;
      ctx.stroke();
    });

    // aguja
    const ang = Math.PI + (Math.PI * this.value / this.max);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ang);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r * 0.7, 0);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // valor
    ctx.fillStyle = "#22c55e";
    ctx.textAlign = "center";
    ctx.fillText(this.value.toFixed(0) + " " + this.unit, cx, cy - r * 0.4);
  }
}

// ZONAS
const voltZones = [
  { from: 0, to: 210, color: "red" },
  { from: 210, to: 240, color: "green" },
  { from: 240, to: 300, color: "red" }
];

const ampZones = [
  { from: 0, to: 120, color: "green" },
  { from: 120, to: 140, color: "orange" },
  { from: 140, to: 150, color: "red" }
];

// CREAR
const gauges = [
  new Gauge("vRedL1", 300, voltZones, "V"),
  new Gauge("vRedL2", 300, voltZones, "V"),
  new Gauge("vRedL3", 300, voltZones, "V"),

  new Gauge("iRedL1", 150, ampZones, "A"),
  new Gauge("iRedL2", 150, ampZones, "A"),
  new Gauge("iRedL3", 150, ampZones, "A"),

  new Gauge("vGenL1", 300, voltZones, "V"),
  new Gauge("vGenL2", 300, voltZones, "V"),
  new Gauge("vGenL3", 300, voltZones, "V"),

  new Gauge("iGenL1", 150, ampZones, "A"),
  new Gauge("iGenL2", 150, ampZones, "A"),
  new Gauge("iGenL3", 150, ampZones, "A")
];

// SIMULACION
setInterval(() => {
  gauges.forEach(g => g?.update(Math.random() * g.max));
}, 500);

// LOOP
function loop() {
  gauges.forEach(g => g?.draw());
  requestAnimationFrame(loop);
}

loop();