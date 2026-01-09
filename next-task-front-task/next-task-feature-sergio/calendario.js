let fecha = new Date();

function renderCalendario() {
  const calendario = document.getElementById("calendario");
  const mesActual = document.getElementById("mesActual");
  if (!calendario || !mesActual) return;

  calendario.innerHTML = "";
  mesActual.textContent = fecha.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const y = fecha.getFullYear();
  const m = fecha.getMonth();
  const dias = new Date(y, m + 1, 0).getDate();

  for (let d = 1; d <= dias; d++) {
    const div = document.createElement("div");
    div.className = "dia";
    div.innerHTML = `<strong>${d}</strong>`;

    const key = `${y}-${m}-${d}`;
    const ev = localStorage.getItem(key);
    if (ev) div.innerHTML += `<div class="evento">${ev}</div>`;

    div.addEventListener("click", () => {
      const t = prompt("Evento:");
      if (t) {
        localStorage.setItem(key, t);
        renderCalendario();
      }
    });

    calendario.appendChild(div);
  }
}

function cambiarMes(v) {
  fecha.setMonth(fecha.getMonth() + v);
  renderCalendario();
}

document.addEventListener("DOMContentLoaded", () => {
  const modalEl = document.getElementById("modalCalendario");
  const prev = document.getElementById("calPrev");
  const next = document.getElementById("calNext");

  prev?.addEventListener("click", () => cambiarMes(-1));
  next?.addEventListener("click", () => cambiarMes(1));

  // Renderiza cuando el modal ya se abrió (Bootstrap)
  modalEl?.addEventListener("shown.bs.modal", () => {
    renderCalendario();
  });
});
