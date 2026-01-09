// Cambiar foto de perfil
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('fotoPerfil');
  const preview = document.getElementById('preview');

  if (!input || !preview) return;

  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

// Modal de perfil
function abrirPerfil() {
  const modal = document.getElementById('modalPerfil');
  if (modal) modal.style.display = 'flex';
}

function cerrarPerfil() {
  const modal = document.getElementById('modalPerfil');
  if (modal) modal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const nombre = localStorage.getItem("usuario");

  if (nombre) {
    document.getElementById("nombreUsuario").textContent = nombre;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const bioGuardada = localStorage.getItem("bioUsuario");
  const bio = document.getElementById("bioUsuario");

  if (bioGuardada) {
    bio.textContent = bioGuardada;
  }
});

function guardarBio() {
  const bio = document.getElementById("bioUsuario").textContent;
  localStorage.setItem("bioUsuario", bio);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".perfil__card").forEach(card => {
    const id = card.dataset.card;

    const title = localStorage.getItem(`${id}_title`);
    const text = localStorage.getItem(`${id}_text`);

    if (title) card.querySelector(".card__title").textContent = title;
    if (text) card.querySelector(".card__text").textContent = text;
  });
});

function guardarCard(id) {
  const card = document.querySelector(`[data-card="${id}"]`);

  const title = card.querySelector(".card__title").textContent;
  const text = card.querySelector(".card__text").textContent;

  localStorage.setItem(`${id}_title`, title);
  localStorage.setItem(`${id}_text`, text);
}

const inputFoto = document.getElementById("fotoPerfil");
const preview = document.getElementById("preview");

/* CARGAR IMAGEN GUARDADA */
document.addEventListener("DOMContentLoaded", () => {
  const imagenGuardada = localStorage.getItem("fotoPerfil");

  if (imagenGuardada) {
    preview.src = imagenGuardada;
  }
});

/* GUARDAR IMAGEN */
inputFoto.addEventListener("change", () => {
  const file = inputFoto.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const base64 = reader.result;
    preview.src = base64;
    localStorage.setItem("fotoPerfil", base64);
  };

  reader.readAsDataURL(file);
});
