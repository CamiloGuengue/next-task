const contenedor = document.getElementById("contenedor");
const btnCrear = document.getElementById("btnCrear");

function random1a10() {
  return Math.floor(Math.random() * 10) + 1; // 1..10 [web:191][web:192]
}

btnCrear.addEventListener("click", () => {
  const cuadrado = document.createElement("div");
  cuadrado.classList.add("cuadrado");

  cuadrado.textContent = random1a10(); // mostrar número [web:200]

  contenedor.appendChild(cuadrado);
});

// si ya estabas usando delegación para borrar:
contenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("cuadrado")) {
    e.target.remove();
  }
});
