export function crearGauge(id, min, max) {

  const el = document.getElementById(id);

  el.className = "gauge";

  const cursor = document.createElement("div");
  cursor.className = "cursor";

  el.appendChild(cursor);

  return {
    set(valor) {
      const percent = ((valor - min) / (max - min)) * 100;
      cursor.style.bottom = percent + "%";
    }
  };
}
