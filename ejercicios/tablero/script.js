const botonInicio = document.getElementById('inicio');
const botonCancelar = document.getElementById('cancelar');
const header = document.getElementById('header');
const main = document.getElementById('main');

botonInicio.addEventListener('click', inicio);
botonCancelar.addEventListener('click',cancelar)


function inicio(){
    ocultarHeader();
    mostrarMain();
}

function cancelar(){
    ocultarMain();
    mostrarHeader();
}


function ocultarHeader() {
    header.classList.add('header--noVisible');
    header.classList.remove('header--visible');
}
function ocultarMain() {
    main.classList.add('main--noVisible');
    main.classList.remove('main--visible');
}
function mostrarHeader() {
    header.classList.add('header--visible');
    header.classList.remove('header--noVisible');
}
function mostrarMain() {
    main.classList.add('main--visible');
    main.classList.remove('main--noVisible');
}