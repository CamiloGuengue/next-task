function validar() {
  const tituloDeLaTarea = document.getElementById("titulo");
  const descripcionTarea = document.getElementById("Descripcion");
  const TituloError = document.getElementById("error");
  const DescripcionError = document.getElementById("error1");
  const selector = document.getElementById("selector");

  const titulo = tituloDeLaTarea.value.trim();
  const descripcion = descripcionTarea.value.trim();
  const prioridad = selector.value.trim();

  TituloError.textContent = "";
  DescripcionError.textContent = "";

  let ok = true;

  if (titulo === "") {
    TituloError.textContent = "el campo no puede estar vacio";
    ok = false;
  }
  if (descripcion === "") {
    DescripcionError.textContent = "el campo no puede estar vacio";
    ok = false;
  }

  if (!ok) return null;

  return { titulo, descripcion, prioridad };
}


const contenedor = document.getElementById("contenedor");
const contenedorEliminados = document.getElementById("contenedorEliminados");

const btnCrear = document.getElementById("btnCrear");

const filtro = document.getElementById("filtro");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnMostrarTodos = document.getElementById("btnMostrarTodos");

const btnEliminarSeleccionados = document.getElementById("btnEliminarSeleccionados");
const btnEditarSeleccionados = document.getElementById("btnEditarSeleccionados");


btnCrear.addEventListener("click", () => {
  const data = validar();
  if (!data) return;

  const cuadrado = document.createElement("div");
  cuadrado.classList.add("cuadrado");

  // ID (usa el título como id lógico, o cámbialo si quieres un número)
  cuadrado.dataset.id = data.titulo;
  cuadrado.dataset.descripcion = data.descripcion;
  cuadrado.dataset.prioridad = data.prioridad;

  // Título visible
  const labelNum = document.createElement("span");
  labelNum.classList.add("cuad-id");
  labelNum.textContent = data.titulo;

  // Descripción visible
  const labelDesc = document.createElement("span");
  labelDesc.classList.add("cuad-desc");
  labelDesc.textContent = data.descripcion;

  //prioridad visible
  const labelPrioridad = document.createElement("span");
  labelPrioridad.classList.add("cuad-prioridad");
  labelPrioridad.textContent = data.prioridad;


  

  // Fecha (como ya la tenías)
  const diasExtra = Math.floor(Math.random() * 5) + 1;
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + diasExtra);

  const labelFecha = document.createElement("span");
  labelFecha.classList.add("cuad-fecha");
  labelFecha.textContent = fecha.toISOString().slice(0, 10);
  cuadrado.dataset.fecha = labelFecha.textContent;

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.classList.add("chk");

  cuadrado.append(labelNum, chk, labelDesc, labelFecha,labelPrioridad);
  contenedor.appendChild(cuadrado);
});




btnFiltrar.addEventListener("click", (e) => {
  e.preventDefault();

  const valor = String(filtro.value).trim();
  const cuadrados = contenedor.querySelectorAll(".cuadrado");


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

