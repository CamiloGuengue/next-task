/* MODALES */
function abrirPerfil() {
  modalPerfil.style.display = "flex";
}
function cerrarPerfil() {
  modalPerfil.style.display = "none";
}
function abrirCalendario() {
  modalCalendario.style.display = "flex";
}
function cerrarCalendario() {
  modalCalendario.style.display = "none";
}

/* CALENDARIO */
let fecha = new Date();

function renderCalendario() {
    calendario.innerHTML = "";
    mesActual.textContent = fecha.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
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
    div.onclick = () => {
    const t = prompt("Evento:");
    if (t) {
        localStorage.setItem(key, t);
        renderCalendario();
        }
        };
    calendario.appendChild(div);
}
}

function cambiarMes(v) {
    fecha.setMonth(fecha.getMonth() + v);
    renderCalendario();
}
