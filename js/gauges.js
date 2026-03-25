export function crearGauge(id, min, max) {

  const el = document.getElementById(id);

  if (!el) {
    console.error("Elemento no encontrado:", id);
    return;
  }

  el.className = "gauge";

  const cursor = document.createElement("div");
  cursor.className = "cursor";

  el.appendChild(cursor);

  let valorActual = 0;

  function animar(nuevoValor) {
    const diff = nuevoValor - valorActual;
    valorActual += diff * 0.1; // inercia

    let percent = ((valorActual - min) / (max - min)) * 100;
    percent = Math.max(0, Math.min(100, percent));

    cursor.style.bottom = percent + "%";

    requestAnimationFrame(() => animar(nuevoValor));
  }

  return {
    set(valor) {
      animar(valor);
    }
  };
}
