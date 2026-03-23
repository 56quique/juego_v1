// =======================
// GAUGE CLASS
// =======================

class Gauge {
  constructor(canvas, max) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.max = max;
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
    // inercia
    this.value += (this.target - this.value) * 0.1;

    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const r = Math.min(w, h) / 2;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2, h * 0.8);

    // arco base
    ctx.beginPath();
    ctx.arc(0, 0, r, Math.PI, 0);
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 10;
    ctx.stroke();

    // aguja
    const angle = Math.PI * (1 - this.value / this.max);

    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r * 0.8, 0);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }
}

// =======================
// INSTANCIAS
// =======================

const gVoltRed = new Gauge(document.getElementById("gaugeVoltRed"), 300);
const gAmpRed = new Gauge(document.getElementById("gaugeAmpRed"), 150);

const gVoltGen = new Gauge(document.getElementById("gaugeVoltGen"), 300);
const gAmpGen = new Gauge(document.getElementById("gaugeAmpGen"), 150);

// =======================
// SIMULACIÓN
// =======================

let state = "RED";
let t = 0;

function getData() {
  t += 0.05;

  let redOK = Math.sin(t) > -0.2;

  if (!redOK) state = "FALLA";
  else state = "RED";

  return {
    red: {
      v: redOK ? 220 + Math.random() * 10 : 0,
      a: redOK ? 50 + Math.random() * 20 : 0,
      kw: redOK ? 10 : 0,
      fp: redOK ? 0.9 : 0
    },
    gen: {
      v: !redOK ? 230 : 0,
      a: !redOK ? 40 : 0,
      kw: !redOK ? 8 : 0,
      fp: !redOK ? 0.95 : 0
    },
    state
  };
}

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
