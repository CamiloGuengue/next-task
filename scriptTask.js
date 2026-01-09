document.addEventListener("DOMContentLoaded", () => {
  // ====== refs principales ======
  const contenedor = document.getElementById("contenedor");
  const btnCrearTarea = document.getElementById("btnCrearTarea");

  const btnAlta = document.getElementById("btnAlta");
  const btnMedia = document.getElementById("btnMedia");
  const btnBaja = document.getElementById("btnBaja");
  const btnTodas = document.getElementById("task");
  const btnFecha = document.getElementById("btnFecha");


  // ====== validar ======
  function validar() {
    const tituloEl = document.getElementById("titulo");
    const descEl = document.getElementById("Descripcion");
    const selectorEl = document.getElementById("selector");

    const errTitulo = document.getElementById("error");
    const errDesc = document.getElementById("error1");
    const errSel = document.getElementById("errorSelector");

    const titulo = tituloEl.value.trim();
    const descripcion = descEl.value.trim();
    const prioridad = selectorEl.value.trim();

    errTitulo.textContent = "";
    errDesc.textContent = "";
    errSel.textContent = "";

    let ok = true;
    if (titulo === "") { errTitulo.textContent = "El campo no puede estar vacío"; ok = false; }
    if (descripcion === "") { errDesc.textContent = "El campo no puede estar vacío"; ok = false; }
    if (prioridad === "") { errSel.textContent = "Selecciona una prioridad"; ok = false; }

    if (!ok) return null;
    return { titulo, descripcion, prioridad };
  }

  // ====== crear tarea ======
  function crearTarea(data) {
  const card = document.createElement("div");
  card.classList.add("task-card", "tarea-card");

  const prio = String(data.prioridad).toLowerCase();
  card.dataset.prioridad = prio;

  const diasExtra = Math.floor(Math.random() * 5) + 1;
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + diasExtra);
  const fechaTxt = fecha.toISOString().slice(0, 10);
  card.dataset.fecha = fechaTxt;

  if (prio === "alta") card.classList.add("prio-alta");
  else if (prio === "media") card.classList.add("prio-media");
  else if (prio === "baja") card.classList.add("prio-baja");

  // (Opcional) id único para el checkbox y su label
  const checkId = `chk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  card.innerHTML = `
    <input type="checkbox" class="chk" id="${checkId}" />

    <div class="d-flex justify-content-between align-items-start mb-2">
      <span class="task-category" style="color: #9f94c9;">My Task</span>
      <span class="card-menu">⋯</span>
    </div>

    <h3 class="task-title">${data.titulo}</h3>
    <p class="task-description">${data.descripcion}</p>

    <div class="task-date">
      <i class="bi bi-calendar3"></i>
      ${fechaTxt}
    </div>

    <div class="Alta">
      <p>Prioridad: ${data.prioridad}</p>
    </div>
  `;

  return card;
}


  // ✅ IMPORTANTE: elimina este bloque que tenías (creabas "tarea" pero no lo usabas)
  // const tarea = document.createElement("div") ...

  btnCrearTarea?.addEventListener("click", () => {
    const data = validar();
    if (!data) return;
    contenedor.appendChild(crearTarea(data));
  });

  // ====== filtros prioridad ======
  function filtrarPorPrioridad(prio) {
    document.querySelectorAll(".tarea-card").forEach(t => {
      const p = (t.dataset.prioridad || "").toLowerCase();
      t.classList.toggle("oculto", p !== prio);
    });
  }

  btnAlta?.addEventListener("click", () => filtrarPorPrioridad("alta"));
  btnMedia?.addEventListener("click", () => filtrarPorPrioridad("media"));
  btnBaja?.addEventListener("click", () => filtrarPorPrioridad("baja"));

  btnTodas?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".tarea-card").forEach(t => t.classList.remove("oculto"));
  });

  // ====== filtro fecha (UI dinámica) ======
  let panelFecha = null;

  btnFecha?.addEventListener("click", (e) => {
    e.preventDefault();

    if (!panelFecha) {
      panelFecha = document.createElement("div");
      panelFecha.style.marginTop = "8px";

      const input = document.createElement("input");
      input.type = "date";
      input.className = "form-control mb-2";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-primary btn-sm";
      btn.textContent = "Filtrar";

      btn.addEventListener("click", () => {
        const fechaBuscada = input.value;
        if (!fechaBuscada) return;

        document.querySelectorAll(".tarea-card").forEach(t => {
          const fechaTarea = (t.dataset.fecha || "").trim();
          t.classList.toggle("oculto", fechaTarea !== fechaBuscada);
        });
      });

      panelFecha.append(input, btn);
      btnFecha.insertAdjacentElement("afterend", panelFecha);
    }

    panelFecha.style.display = (panelFecha.style.display === "none" ? "block" : "none");
  });

  // ====== PROFILE modal ======
// ====== PROFILE modal (custom) ======
const modalPerfil = document.getElementById("modalPerfil");

// si tienes un botón en el index para abrir el perfil:
const btnAbrirPerfil = document.getElementById("btnAbrirPerfil"); // ponle ese id a tu botón

function abrirPerfil() {
  if (!modalPerfil) return;
  modalPerfil.hidden = false;
}

function cerrarPerfil() {
  if (!modalPerfil) return;
  modalPerfil.hidden = true;
}

// para que funcione con tus onclick="abrirPerfil()" / onclick="cerrarPerfil()"
window.abrirPerfil = abrirPerfil;
window.cerrarPerfil = cerrarPerfil;

// opcional: abrir con un botón sin inline onclick
btnAbrirPerfil?.addEventListener("click", abrirPerfil);

// opcional: cerrar con Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarPerfil();
});
const btnEliminar = document.getElementById("btnEliminar"); // tu id real

btnEliminar?.addEventListener("click", () => {
  const marcados = contenedor.querySelectorAll(".chk:checked"); // solo checked [web:30]

  marcados.forEach(chk => {
    const card = chk.closest(".tarea-card");
    if (!card) return;

    card.classList.add("eliminado"); // gris [web:70]
    card.classList.add("oculto");    // oculto [web:70]

    chk.checked = false; // opcional: lo desmarca
  });
});
const btnTema = document.getElementById("btnTema");

function setTema(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
}

const guardado = localStorage.getItem("theme");
setTema(guardado || "light");

btnTema?.addEventListener("click", () => {
  const actual = document.documentElement.getAttribute("data-bs-theme") || "light";
  setTema(actual === "dark" ? "light" : "dark");
});






});


