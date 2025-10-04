// Funciones auxiliares

export function recuperaElementoAleatorio(array) {
  // Numero de elementos en el array
  const size = array.length;

  // Numero real aleatorio entre 0 y size
  const indiceRealAleatorio = Math.random() * size;

  // Redondeo del número real obtenido al entero más próximo
  // para que se corresponda con una posición (indice) correcta.
  const indiceAleatorio = Math.floor(indiceRealAleatorio);

  // Devuelve el elemento del array ubicado en el indice aleatorio
  return array[indiceAleatorio];
}



export function compruebaLetras(referencia, escrito) {
    // Comprueba que las letras escritas coinciden con las de referencia
    // Devuelve un array con las listas mal escritas y otro array con las bien escritas
    const letrasMal = [];
    const letrasBien = [];

    for (let i = 0; i < referencia.length; i++) {
      if (escrito[i] !== referencia[i]) {
        letrasMal.push(referencia[i]);
      } else {
        letrasBien.push(referencia[i]);
      }
    }
    return { letrasMal, letrasBien };
}

export function creaPalabraReferencia(referencia, escrito) {
    // Crea una sucesión de span envolviendo las letras de la referencia con las clases bienEscrita, malEscrita o sinEscribir
    let referenciaHTML = '';
    for (let i = 0; i < referencia.length; i++) {
        let clase = 'sinEscribir';
        if (i < escrito.length) {
            clase = (escrito[i] === referencia[i]) ? 'bienEscrita' : 'malEscrita';
        }
        referenciaHTML += `<span class="${clase}">${referencia[i]}</span>`;
    }
    return referenciaHTML;
}
