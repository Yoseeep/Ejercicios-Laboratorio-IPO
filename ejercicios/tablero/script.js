import { barajarLista, posicionesArrayToGrid } from "./utils.js";

const botonInicio = document.getElementById('inicio');
const botonCancelar = document.getElementById('cancelar');
const header = document.getElementById('header');
const main = document.getElementById('main');
const inputTamañoTablero = document.getElementById('tamañoTablero');
const selectFormaFicha = document.getElementById('formaFicha');
const selectTamañoFicha = document.getElementById('tamañoFicha');
const finModal = document.getElementById('finModal');
const botonVolverAlMenu = document.getElementById('volverAlMenu');
const tablero = document.getElementById('tablero');
// Se actualizan:
let casillas = document.querySelectorAll('.tablero__casilla');
let fichas = document.querySelectorAll('.ficha');

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
    'color-1', // Rojo
    'color-2', // Azul
    'color-3', // Verde
    'color-4', // Amarillo
    'color-5', // Morado
    'color-6', // Naranja
    'color-7'  // Gris oscuro
];

/* Variables globales */
let formaFicha = 'circulo';
let tamañoTablero = document.documentElement.style.getPropertyValue('--tamañoTablero');
let tamañoFicha = document.documentElement.style.getPropertyValue('--tamañoFicha');
let coloresNecesarios = generaColoresNecesarios();
let posicionesTablero = [];

/* Event listeners */
botonInicio.addEventListener('click', inicio);
botonCancelar.addEventListener('click', cancelar);
botonVolverAlMenu.addEventListener('click', volverAlMenu);

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
    dibujaTablero();
    estableceFichas();
    estableceCasillas();
    estableceEventosFichas();
    estableceEventosCasillas();
    if (compruebaTableroCompleto()) setTimeout(mostrarFinModal, 350); // Por si acaso ya está completo

    ocultarHeader();
    mostrarMain();
}

function cancelar(){
    ocultarMain();
    mostrarHeader();
}

function volverAlMenu(){
    ocultarFinModal();
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

function ocultarFinModal() {
    finModal.classList.add('main__modal--noVisible');
    finModal.classList.remove('main__modal--visible');
}

function mostrarHeader() {
    header.classList.add('header--visible');
    header.classList.remove('header--noVisible');
}

function mostrarMain() {
    main.classList.add('main--visible');
    main.classList.remove('main--noVisible');
}

function mostrarFinModal() {
    finModal.classList.add('main__modal--visible');
    finModal.classList.remove('main__modal--noVisible');
}


function estableceTamañoTablero() {
    tamañoTablero = inputTamañoTablero.value;
    document.documentElement.style.setProperty('--tamañoTablero', tamañoTablero);
}

function estableTamañoFicha() {
    tamañoFicha = tamañosFichas[ selectTamañoFicha.value ];
    document.documentElement.style.setProperty('--tamañoFicha', tamañoFicha);
    console.log(selectTamañoFicha.value); //lo puedo quitar
}

function estableceFormaFichas() {
    formaFicha = selectFormaFicha.value;
    console.log(formaFicha); //lo puedo quitar
}

function dibujaTablero() {
    tablero.innerHTML = "";
    coloresNecesarios = generaColoresNecesarios();
    posicionesTablero = generaCasillasPosibles();
    tablero.style.gridTemplateAreas = posicionesArrayToGrid(posicionesTablero);

    for (let posicion of posicionesTablero) {
        let colorFicha = coloresNecesarios.pop();
        let formatoPieza =
            `<div class="tablero__casilla glassmorphism__secondary" data-drop data-filacasilla ="${posicion.fila}" data-columnacasilla="${posicion.columna}">
            <div class="ficha ${colorFicha}" draggable="true" data-color="${colorFicha}" data-filaficha="${posicion.fila}" data-columnaficha="${posicion.columna}"> 
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
    let coloresBarajados = barajarLista(colores);
    while (compruebaColoresOrdenados(coloresBarajados)) {
        coloresBarajados = barajarLista(coloresBarajados);
    }
    return coloresBarajados;
}

function generaCasillasPosibles() {
    const casillas = [];
    for (let fila = 1; fila <= tamañoTablero; fila++) {
        for (let columna = 1; columna <= tamañoTablero; columna++) {
            casillas.push({ fila, columna });
        }
    }
    return casillas;
}

function estableceFichas() {
    fichas = document.querySelectorAll('.ficha');
}

function estableceCasillas() {
    casillas = document.querySelectorAll('.tablero__casilla');
}

function estableceEventosFichas(){
    fichas.forEach(ficha => {
        ficha.addEventListener('dragstart',dragstartFicha);
        ficha.addEventListener('dragend',dragendFicha);
    })
}

function estableceEventosCasillas(){
    casillas.forEach(casilla => {
        casilla.addEventListener('dragover',dragoverCasilla);
        casilla.addEventListener('dragleave',dragleaveCasilla);
        casilla.addEventListener('drop',dropCasilla);
    })
}

function dragstartFicha(e) {
    console.log('dragstart', e.target);
    e.currentTarget.classList.toggle('ficha--dragstart');

    const dragstartPosicion = {
        filaficha: e.currentTarget.dataset.filaficha,
        columnaficha: e.currentTarget.dataset.columnaficha
    };
    const dragstartPosicionJSON = JSON.stringify(dragstartPosicion);
    e.dataTransfer.setData("application/json", dragstartPosicionJSON);
}

function dragendFicha(e) {
    /*console.log('dragend', e.target);*/
    e.target.classList.toggle('ficha--dragstart');
}

function dragoverCasilla(e) {
    e.preventDefault();
    /*console.log('dragover', e.target);*/
    e.currentTarget.classList.add('tablero__casilla--dragover');
}

function dragleaveCasilla(e) {
    /*console.log('dragleave', e.target);*/
    e.currentTarget.classList.remove('tablero__casilla--dragover');
}

function dropCasilla(e) {
    e.preventDefault();
    console.log('dragdrop', e.target);
    e.currentTarget.classList.remove('tablero__casilla--dragover');

    const dragstartPosicionJSON = e.dataTransfer.getData("application/json");
    const dragstartPosicion = JSON.parse(dragstartPosicionJSON);
    const dropPosicion = {
        filacasilla: e.currentTarget.dataset.filacasilla,
        columnacasilla: e.currentTarget.dataset.columnacasilla
    };

    const fichaOrigen = document.querySelector(`.ficha[data-filaficha="${dragstartPosicion.filaficha}"][data-columnaficha="${dragstartPosicion.columnaficha}"]`);
    const fichaDestino = document.querySelector(`.ficha[data-filaficha="${dropPosicion.filacasilla}"][data-columnaficha="${dropPosicion.columnacasilla}"]`);
    intercambiaFichas(fichaOrigen, fichaDestino);

    estableceFichas(); //Actualizamos
    if (compruebaTableroCompleto()) setTimeout(mostrarFinModal, 350);
}

function intercambiaFichas(fichaOrigen, fichaDestino) {
    const filaOrigen = fichaOrigen.dataset.filaficha;
    const columnaOrigen = fichaOrigen.dataset.columnaficha;
    const filaDestino = fichaDestino.dataset.filaficha;
    const columnaDestino = fichaDestino.dataset.columnaficha;

    fichaOrigen.dataset.filaficha = filaDestino;
    fichaOrigen.dataset.columnaficha = columnaDestino;
    fichaDestino.dataset.filaficha = filaOrigen;
    fichaDestino.dataset.columnaficha = columnaOrigen;

    const padreOrigen = fichaOrigen.parentElement;
    const padreDestino = fichaDestino.parentElement;

    padreOrigen.appendChild(fichaDestino);
    padreDestino.appendChild(fichaOrigen);
}

function compruebaTableroCompleto() {
    let tableroCorrecto = true;
    const agrupadasPorFila = Object.values(
        Object.groupBy( fichas, ficha => ficha.dataset.filaficha )
    );
    let colorFila = null;
    for (let fila of agrupadasPorFila) {
        for (let elemento = 0; elemento < fila.length; elemento++) {
            const ficha = fila[elemento];
            if (elemento === 0) {
                colorFila = ficha.dataset.color;
            } else {
                if (ficha.dataset.color !== colorFila) {
                    tableroCorrecto = false;
                    break;
                }
            }
        }
    }
    return tableroCorrecto;
}


function compruebaColoresOrdenados(listaColores) {
    const n = Number(tamañoTablero);
    if (!Number.isFinite(n) || n <= 0) return false;

    for (let i = 0; i < listaColores.length; i += n) {
        const referencia = listaColores[i];
        for (let j = 1; j < n; j++) {
            if (listaColores[i + j] !== referencia) return false;
        }
    }
    return true;
}



