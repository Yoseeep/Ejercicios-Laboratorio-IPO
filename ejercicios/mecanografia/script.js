/**********************************************************************/
/*  PROYECTO Mecanografía      */
import {recuperaElementoAleatorio, compruebaLetrasMal, creaPalabraReferencia}  from "./utils.js";

// Lista de palabras de referencia
const listaPalabras = ["hola", "teclado", "ordenador", "javascript", "programacion", "desarrollo", "computadora", "tecnologia", "internet", "software"];

// Elementos del DOM
const botonComienzoElem = document.getElementById('btnComienzo');
const palabraReferenciaElem = document.getElementById('referencia');
const palabraEntradaElem = document.getElementById('entrada');
const letrasCorrectasElem = document.getElementById('letrasCorrectas');
const tiempoElem = document.getElementById('tiempo');

// Variable para almacenar la palabra de referencia actual
let palabraReferencia = '';

let tiempo = 0;
// Inicia el temporizador
let miIntervalo = setInterval(() => {
    console.log('Contador: ${tiempo} segundos');
    tiempoElem.innerText = String(tiempo);
    tiempo++;

    if (tiempo >= 30) {
        clearInterval(miIntervalo);
        palabraEntradaElem.disabled = true;
        miIntervalo = 0;
        alert('¡Tiempo terminado! Has escrito ' + letrasCorrectasElem.innerHTML + ' letras correctamente.');
    }
}, 1000);

// Event listeners
botonComienzoElem.addEventListener('click', iniciarEjercicio);
palabraEntradaElem.addEventListener('input', comprobarEntrada);


// Función para iniciar el ejercicio
function iniciarEjercicio() {
    // Recupera una palabra aleatoria de la lista
    palabraReferencia = recuperaElementoAleatorio(listaPalabras);

    // Muestra la palabra de referencia en el DOM
    palabraReferenciaElem.innerHTML = palabraReferencia;
    palabraEntradaElem.value = '';
    letrasCorrectasElem.innerHTML = '0';
    palabraEntradaElem.disabled = false;
    palabraEntradaElem.focus();
}

// Función para comprobar la entrada del usuario
function comprobarEntrada() {
    const escrito = palabraEntradaElem.value;
    const { letrasMal, letrasBien } = compruebaLetrasMal(palabraReferencia, escrito);

    // Actualiza el número de letras correctas
    letrasCorrectasElem.innerHTML = String(letrasBien.length);

    // Actualiza la visualización de la palabra de referencia
    palabraReferenciaElem.innerHTML = creaPalabraReferencia(palabraReferencia, escrito);
    if (letrasMal.length === 0 && escrito.length === palabraReferencia.length) {
        palabraEntradaElem.disabled = true;

        /*alert('¡Felicidades! Has escrito la palabra correctamente.');*/
    }
}



