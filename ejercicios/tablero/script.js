import { barajarLista } from "./utils.js";

const botonInicio = document.getElementById('inicio');
const botonCancelar = document.getElementById('cancelar');
const header = document.getElementById('header');
const main = document.getElementById('main');
const inputTamañoTablero = document.getElementById('tamañoTablero');
const selectFormaFicha = document.getElementById('formaFicha');
const selectTamañoFicha = document.getElementById('tamañoFicha');
const tablero = document.getElementById('tablero');


const formasFichas = {
    'circulo': '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"icon icon-tabler icons-tabler-filled icon-tabler-circle\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z\" /></svg>',
    'cuadrado': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-square"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3z" /></svg>',
    'triangulo': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-triangle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.67a2.914 2.914 0 0 0 -2.492 1.403l-8.11 13.537a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503 -4.371l-8.116 -13.546a2.917 2.917 0 0 0 -2.494 -1.408z" /></svg>',
    'hexagono': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-hexagon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.425 1.414l-6.775 3.996a3.21 3.21 0 0 0 -1.65 2.807v7.285a3.226 3.226 0 0 0 1.678 2.826l6.695 4.237c1.034 .57 2.22 .57 3.2 .032l6.804 -4.302c.98 -.537 1.623 -1.618 1.623 -2.793v-7.284l-.005 -.204a3.223 3.223 0 0 0 -1.284 -2.39l-.107 -.075l-.007 -.007a1.074 1.074 0 0 0 -.181 -.133l-6.776 -3.995a3.33 3.33 0 0 0 -3.216 0z" /></svg>'
}

const tamañosFichas = {
    'pequeña': '50px',
    'mediana': '100px',
    'grande': '140px'
}

const coloresFichas = [
    '#e74c3c', // Rojo
    '#3498db', // Azul
    '#2ecc71', // Verde
    '#edc223', // Amarillo
    '#9b59b6', // Morado
    '#ea7919', // Naranja
    '#34495e'  // Gris oscuro
];

/* Variables globales */
let formaFicha = 'circulo';
let tamañoTablero = document.documentElement.style.getPropertyValue('--tamañoTablero');
let tamañoFicha = document.documentElement.style.getPropertyValue('--tamañoFicha');
let coloresNecesarios = generaColoresNecesarios();

/* Event listeners */
botonInicio.addEventListener('click', inicio);
botonCancelar.addEventListener('click', cancelar);


inputTamañoTablero.addEventListener('change',validaTamañoTablero);
inputTamañoTablero.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        validaTamañoTablero();
        tamañoTablero = inputTamañoTablero.value;
        inputTamañoTablero.blur();
        inputTamañoTablero.value = tamañoTablero;
    }
})

/* Validaciones */
function validaTamañoTablero() {
    if ( Number(inputTamañoTablero.value) < Number(inputTamañoTablero.min) ) {
        inputTamañoTablero.value = inputTamañoTablero.min;
    }
    if ( Number(inputTamañoTablero.value) > Number(inputTamañoTablero.max) ) {
        inputTamañoTablero.value = inputTamañoTablero.max;
    }
    tamañoTablero = inputTamañoTablero.value;
}



/* Funciones principales */

function inicio(){
    estableceTamañoTablero();
    estableTamañoFicha();
    estableceFormaFichas();
    coloresNecesarios = generaColoresNecesarios();
    dibujaTablero();
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


function estableceTamañoTablero() {
    tamañoTablero = inputTamañoTablero.value;
    document.documentElement.style.setProperty('--tamañoTablero', tamañoTablero);
}

function estableTamañoFicha() {
    tamañoFicha = tamañosFichas[ selectTamañoFicha.value ];
    document.documentElement.style.setProperty('--tamañoFicha', tamañoFicha);
    console.log(selectTamañoFicha.value);
}

function estableceFormaFichas() {
    formaFicha = selectFormaFicha.value;
    console.log(formaFicha);
}

function dibujaTablero() {
    tablero.innerHTML = "";


    for (let i = 0; i < tamañoTablero * tamañoTablero; i++){
        let formatoPieza =
            `<div class="tablero__casilla glassmorphism__secondary"> 
            <div class="ficha" draggable="true"> 
               ${formasFichas[formaFicha]}  
            </div> 
        </div>`;
        tablero.innerHTML += formatoPieza;
    };
}

function generaColoresNecesarios() {
    let coloresPosibles = coloresFichas.slice(0, tamañoTablero);
    let colores = [];
    for (let color of coloresPosibles) {
        for (let i = 0; i < Number(tamañoTablero); i++) {
            colores.push(color);
        }
    };
    return barajarLista(colores);
}
