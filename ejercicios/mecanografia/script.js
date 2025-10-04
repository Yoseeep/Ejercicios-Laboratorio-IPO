/**********************************************************************/
/*  PROYECTO Mecanografía      */
import {recuperaElementoAleatorio, compruebaLetras, creaPalabraReferencia}  from "./utils.js";

// Lista de palabras de referencia
const listaPalabras = ["hola", "teclado", "ordenador", "JavaScript", "programación", "desarrollo", "computadora", "tecnología", "internet", "software", "Yo soy tu padre"];

// Elementos del DOM
const testElem = document.getElementById('test');
const botonComienzoElem = document.getElementById('btnComienzo');
const palabraReferenciaElem = document.getElementById('referencia');
const palabraEntradaElem = document.getElementById('entrada');
const letrasCorrectasElem = document.getElementById('letrasCorrectas');
const tiempoElem = document.getElementById('tiempo');

// Variables globales
let palabraReferencia = '';
let tiempoMaximo = 20; // Tiempo máximo en segundos
let tiempo = 0;
let temporizador = null;

// Event listeners
botonComienzoElem.addEventListener('click', iniciarTest);
palabraEntradaElem.addEventListener('input', comprobarEntrada);
window.addEventListener("keydown", (tecla) => {
    if (tecla.code === 'Enter') iniciarTest();
})

// Funciones del temporizador
function iniciaTemporizador() {
    palabraEntradaElem.disabled = false;
    temporizador = setInterval(() => {
        tiempo++;
        console.log(`Contador: ${tiempo} segundos`);
        tiempoElem.innerText = String(tiempo);
        if (tiempo >= tiempoMaximo) {
            paraTemporizador();
            alert('¡Tiempo terminado!');
        }
    }, 1000);
}

function paraTemporizador() {
    clearInterval(temporizador);
    palabraEntradaElem.disabled = true;
}

function reiniciaTemporizador() {
    tiempo = 0;
    tiempoElem.innerText = String(tiempo);
    if (temporizador != null) {
        clearInterval(temporizador);
        temporizador = null;
    }
}


// Función para iniciar el ejercicio
function iniciarTest() {
    // Muestra el área de test
    testElem.classList.remove('test--sinComenzar');

    // Recupera una palabra aleatoria de la lista
    palabraReferencia = recuperaElementoAleatorio(listaPalabras);

    // Muestra la palabra de referencia en el DOM
    palabraReferenciaElem.innerHTML = palabraReferencia;
    palabraEntradaElem.value = '';
    letrasCorrectasElem.innerHTML = '0';
    palabraEntradaElem.disabled = false;
    palabraEntradaElem.focus();


    // Reinicia y comienza el temporizador (con límite de tiempo)
    reiniciaTemporizador();
    iniciaTemporizador();
    console.log(tiempo);
}

// Función para comprobar la entrada del usuario
function comprobarEntrada() {
    const escrito = palabraEntradaElem.value;
    const { letrasMal, letrasBien } = compruebaLetras(palabraReferencia, escrito);

    // Actualiza el número de letras correctas
    letrasCorrectasElem.innerHTML = String(letrasBien.length);

    // Actualiza la visualización de la palabra de referencia
    palabraReferenciaElem.innerHTML = creaPalabraReferencia(palabraReferencia, escrito);
    if (letrasMal.length === 0 && escrito.length === palabraReferencia.length) {
        paraTemporizador();
    }
}



