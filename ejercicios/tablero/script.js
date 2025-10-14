const botonInicio = document.getElementById('inicio');
const header = document.getElementById('header');

botonInicio.addEventListener('click', desplazarElementos);

function desplazarElementos() {
    header.classList.add('header--noVisible');
    header.classList.remove('header--visible');
}