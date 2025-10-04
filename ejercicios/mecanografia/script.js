/**********************************************************************/
/*  PROYECTO Mecanografía      */
import {recuperaElementoAleatorio, compruebaLetras, creaPalabraReferencia}  from "./utils.js";

// Lista de palabras de referencia
const listaPalabras = ["hola", "teclado", "ordenador", "javascript", "programación", "desarrollo", "computadora", "tecnología", "internet", "software"];

// Elementos del DOM
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

// Inicia el temporizador
/* let miIntervalo = setInterval(() => {
    tiempo++;
    console.log(`Contador: ${tiempo} segundos`);
    tiempoElem.innerText = String(tiempo);

    if (tiempo >= 30) {
        clearInterval(miIntervalo);
        palabraEntradaElem.disabled = true;
        miIntervalo = 0;
        //alert('¡Tiempo terminado! Has escrito ' + letrasCorrectasElem.innerHTML + ' letras correctamente.');
    }
}, 1000); */

function iniciaTemporizador() {
    temporizador = setInterval(() => {
        if (tiempo >= tiempoMaximo-1) {
            paraTemporizador();
        }
        tiempo++;
        console.log(`Contador: ${tiempo} segundos`);
        tiempoElem.innerText = String(tiempo);
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
async function iniciarTest() {
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

        /*alert('¡Felicidades! Has escrito la palabra correctamente.');*/
    }
}



