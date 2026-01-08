function validar() {
    let tituloDeLaTarea = document.getElementById("titulo");
    let descripcionTarea = document.getElementById("Descripcion")
    let TituloError = document.getElementById("error");
    let DescripcionError = document.getElementById("error1");
    let selector = document.getElementById("selector");

    let validacionTitulo = tituloDeLaTarea.value.trim();
    let validacionDescripcion = descripcionTarea.value.trim();
    let validacionselector = selector.value.trim();

    console.log(validacionTitulo);
    console.log(validacionDescripcion);
    console.log(validacionselector);

// pongo que la variable este en vacia
    TituloError.textContent = "";
    DescripcionError.textContent = "";



    if (validacionTitulo === "" ) {
        TituloError.textContent = "el campo no puede estar vacio";

        }
    if (validacionDescripcion === "") {
        DescripcionError.textContent = "el campo no puede estar vacio"
    }
        
}

