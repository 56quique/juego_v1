class Gauge {
  constructor(canvas, max, zones, unit) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
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

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  update(v) {
    this.target = Math.max(0, Math.min(this.max, v));
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
    // FONDO SUAVE
    // =====================
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0);
    ctx.fillStyle = "#020617";
    ctx.fill();

    // =====================
    // ZONAS DE COLOR
    // =====================
    this.zones.forEach(z => {
      const start = Math.PI * (1 - z.from / this.max);
      const end = Math.PI * (1 - z.to / this.max);

      ctx.beginPath();
      ctx.arc(cx, cy, r, start, end, true);
      ctx.strokeStyle = z.color;
      ctx.lineWidth = 8;
      ctx.stroke();
    });

    // =====================
    // MARCAS FINAS
    // =====================
    for (let i = 0; i <= 50; i++) {
      const val = (this.max / 50) * i;
      const ang = Math.PI * (1 - val / this.max);

      const len = i % 5 === 0 ? 10 : 5;

      const x1 = cx + Math.cos(ang) * (r - len);
      const y1 = cy + Math.sin(ang) * (r - len);

      const x2 = cx + Math.cos(ang) * r;
      const y2 = cy + Math.sin(ang) * r;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // =====================
    // NÚMEROS
    // =====================
    for (let i = 0; i <= 10; i++) {
      const val = (this.max / 10) * i;
      const ang = Math.PI * (1 - val / this.max);

      const tx = cx + Math.cos(ang) * (r - 18);
      const ty = cy + Math.sin(ang) * (r - 18);

      ctx.fillStyle = "#e5e7eb";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(Math.round(val), tx, ty);
    }

    // =====================
    // AGUJA PRO
    // =====================
    const ang = Math.PI * (1 - this.value / this.max);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ang);

    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(r * 0.7, 0);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();

    // CENTRO
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#e5e7eb";
    ctx.fill();

    // =====================
    // VALOR
    // =====================
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.value.toFixed(0) + " " + this.unit, cx, cy - r * 0.3);
  }
}

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

function create3(prefix, max, zones, unit) {
  return [
    new Gauge(document.getElementById(prefix + "L1"), max, zones, unit),
    new Gauge(document.getElementById(prefix + "L2"), max, zones, unit),
    new Gauge(document.getElementById(prefix + "L3"), max, zones, unit)
  ];
}

const vRed = create3("vRed", 300, voltZones, "V");
const iRed = create3("iRed", 150, ampZones, "A");

const vGen = create3("vGen", 300, voltZones, "V");
const iGen = create3("iGen", 150, ampZones, "A");