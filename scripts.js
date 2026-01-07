const contenedor = document.getElementById("contenedor");
const contenedorEliminados = document.getElementById("contenedorEliminados");

const btnCrear = document.getElementById("btnCrear");

const filtro = document.getElementById("filtro");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnMostrarTodos = document.getElementById("btnMostrarTodos");

const btnEliminarSeleccionados = document.getElementById("btnEliminarSeleccionados");
const btnEditarSeleccionados = document.getElementById("btnEditarSeleccionados");

function random1a10() {
  return Math.floor(Math.random() * 10) + 1;
}

btnCrear.addEventListener("click", () => {
  const cuadrado = document.createElement("div");
  cuadrado.classList.add("cuadrado");

  const n = random1a10();
  cuadrado.dataset.id = String(n);

  // Número (arriba)
  const labelNum = document.createElement("span");
  labelNum.classList.add("cuad-id");
  labelNum.textContent = n;

  // Fecha (abajo): hoy + 1..5 días aleatorio
  const diasExtra = Math.floor(Math.random() * 5) + 1; // 1..5 [web:254]
  const fecha = new Date(); // hoy [web:246]
  fecha.setDate(fecha.getDate() + diasExtra); // suma días [web:249]

  const labelFecha = document.createElement("span");
  labelFecha.classList.add("cuad-fecha");
  // Formato simple (puedes cambiarlo): YYYY-MM-DD
  labelFecha.textContent = fecha.toISOString().slice(0, 10);

  // Guardar fecha también en dataset por si luego la necesitas
  cuadrado.dataset.fecha = labelFecha.textContent;

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.classList.add("chk");

  cuadrado.append(labelNum, chk, labelFecha);
  contenedor.appendChild(cuadrado);
});


btnFiltrar.addEventListener("click", (e) => {
  e.preventDefault();

  const valor = String(filtro.value).trim();
  const cuadrados = contenedor.querySelectorAll(".cuadrado");
  console.log("valor:", valor);
  console.log("nums:", [...cuadrados].map(c => c.querySelector(".cuad-id")?.textContent));


  cuadrados.forEach(c => {
    const num = c.querySelector(".cuad-id")?.textContent?.trim() || "";
    const ocultar = (valor !== "" && num !== valor);
    c.classList.toggle("oculto", ocultar); // [web:54]
  });
});



btnMostrarTodos.addEventListener("click", () => {
  contenedor.querySelectorAll(".cuadrado").forEach(c => c.classList.remove("oculto"));
  filtro.value = "";
});

// click en el cuadrado = seleccionar/deseleccionar (NO borra)
contenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("chk")) return;

  const cuadrado = e.target.closest(".cuadrado");
  if (!cuadrado) return;

  const chk = cuadrado.querySelector(".chk");
  chk.checked = !chk.checked;
});

// ✅ CAMBIO: ya no elimina, ahora MUEVE al contenedor de eliminados
btnEliminarSeleccionados.addEventListener("click", () => {
  const marcados = contenedor.querySelectorAll(".chk:checked");

  marcados.forEach(chk => {
    const cuadrado = chk.closest(".cuadrado");
    if (!cuadrado) return;

    // Si estaba oculto por filtro, que se vea en "eliminados"
    cuadrado.classList.remove("oculto");

    // gris
    cuadrado.classList.add("eliminado");

    // opcional: desmarcar y bloquear checkbox en eliminados
    chk.checked = false;
    chk.disabled = true;

    // mover (appendChild mueve el nodo) [web:185]
    contenedorEliminados.appendChild(cuadrado);
  });
});

btnEditarSeleccionados.addEventListener("click", () => {
  const marcados = contenedor.querySelectorAll(".chk:checked");
  if (marcados.length === 0) return;

  const nuevo = prompt("Escribe el nuevo número:");
  if (nuevo === null) return;

  const valor = nuevo.trim();
  if (valor === "") return;

  marcados.forEach(chk => {
    const cuadrado = chk.closest(".cuadrado");
    if (!cuadrado) return;

    cuadrado.dataset.id = valor;

    const spanNum = cuadrado.querySelector(".cuad-id");
    if (spanNum) spanNum.textContent = valor;
  });
});

