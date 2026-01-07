const contenedor = document.getElementById("contenedor");
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

  // Guardar el identificador en data-id
  cuadrado.dataset.id = String(n);

  const labelNum = document.createElement("span");
  labelNum.classList.add("cuad-id");      // ✅ CLAVE para que Editar lo encuentre
  labelNum.textContent = n;

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.classList.add("chk");

  cuadrado.append(labelNum, chk);
  contenedor.appendChild(cuadrado);
});

btnFiltrar.addEventListener("click", () => {
  const valor = filtro.value.trim();
  const cuadrados = contenedor.querySelectorAll(".cuadrado");

  cuadrados.forEach(c => {
    const id = c.dataset.id;
    const ocultar = (valor !== "" && id !== valor);
    c.classList.toggle("oculto", ocultar);
  });
});
btnMostrarTodos.addEventListener("click", () => {
  contenedor.querySelectorAll(".cuadrado").forEach(c => {
    c.classList.remove("oculto"); // quita la clase que los oculta [web:35]
  });

  // opcional: limpiar el input del filtro
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

btnEliminarSeleccionados.addEventListener("click", () => {
  const marcados = contenedor.querySelectorAll(".chk:checked");
  marcados.forEach(chk => chk.closest(".cuadrado")?.remove());
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

    // Cambia el id (data-id)
    cuadrado.dataset.id = valor;

    // Cambia el número visible
    const spanNum = cuadrado.querySelector(".cuad-id"); // ahora sí existe [web:137]
    if (spanNum) spanNum.textContent = valor;
  });
});

