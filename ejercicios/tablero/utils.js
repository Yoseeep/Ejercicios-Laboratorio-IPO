export { barajarLista, posicionesArrayToGrid} ;


function barajarLista(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

function posicionesArrayToGrid(posicionesArray) { // posicionesArray = [ { fila: 1, columna: 1}, { fila: 1, columna: 2}, ... ]
    const filasAgrupadas = Object.groupBy(posicionesArray, posicion => posicion.fila);

    const gridAreasString = Object.values(filasAgrupadas)
        .map(posicionesFila => {
            const filaString = posicionesFila.map(p => `c${p.fila}${p.columna}`).join(' ');
            return `"${filaString}"`;
        })
        .join(' ');
    return gridAreasString;
}