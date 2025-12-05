const NUM_FILAS = 5;
const NUM_LUCES_POR_FILA = 10;
const INTERVALO_MS = 1000; // 1 segundo
const appRoot = document.getElementById('app');

// Colores HEX de alta luminosidad para simular mejor las luces.
const COLOR_ROJO = '#f82020ff';      // Rojo vibrante
const COLOR_VERDE = '#00ff40ff';     // Verde neón brillante
const COLOR_AZUL = '#0099ffff';      // Azul eléctrico
const COLOR_AMARILLO = '#FFFF00';  // Amarillo puro
const COLOR_BLANCO = '#FFFFFF';    // Blanco brillante

// 5 arrays de colores, uno para cada fila en cada paso de la animación.
const PATRONES_DE_LUZ = [
    // Patrón 1
    [COLOR_ROJO, COLOR_VERDE, COLOR_ROJO, COLOR_VERDE, COLOR_ROJO, COLOR_VERDE, COLOR_ROJO, COLOR_VERDE, COLOR_ROJO, COLOR_VERDE],
    // Patrón 2
    [COLOR_AZUL, COLOR_AMARILLO, COLOR_AZUL, COLOR_AMARILLO, COLOR_AZUL, COLOR_AMARILLO, COLOR_AZUL, COLOR_AMARILLO, COLOR_AZUL, COLOR_AMARILLO],
    // Patrón 3
    [COLOR_VERDE, COLOR_VERDE, COLOR_ROJO, COLOR_ROJO, COLOR_VERDE, COLOR_VERDE, COLOR_ROJO, COLOR_ROJO, COLOR_VERDE, COLOR_VERDE],
    // Patrón 4
    [COLOR_AZUL, COLOR_BLANCO, COLOR_ROJO, COLOR_AZUL, COLOR_BLANCO, COLOR_ROJO, COLOR_AZUL, COLOR_BLANCO, COLOR_ROJO, COLOR_AZUL],
    // Patrón 5
    [COLOR_AMARILLO, COLOR_AMARILLO, COLOR_AMARILLO, COLOR_AMARILLO, COLOR_AMARILLO, COLOR_VERDE, COLOR_VERDE, COLOR_VERDE, COLOR_VERDE, COLOR_VERDE]
];

// Combinación de los 5 patrones que se aplicarán a las 5 filas en un mismo instante.
const METAPATRONES = [
    // Cada fila tiene su propio patrón individual
    [PATRONES_DE_LUZ[0], PATRONES_DE_LUZ[1], PATRONES_DE_LUZ[2], PATRONES_DE_LUZ[3], PATRONES_DE_LUZ[4]],
  
    [PATRONES_DE_LUZ[1], PATRONES_DE_LUZ[1], PATRONES_DE_LUZ[1], PATRONES_DE_LUZ[1], PATRONES_DE_LUZ[1]],
  
    [PATRONES_DE_LUZ[4], PATRONES_DE_LUZ[3], PATRONES_DE_LUZ[2], PATRONES_DE_LUZ[1], PATRONES_DE_LUZ[0]],
  
    [PATRONES_DE_LUZ[0], PATRONES_DE_LUZ[2], PATRONES_DE_LUZ[0], PATRONES_DE_LUZ[2], PATRONES_DE_LUZ[0]]
];


let indiceMetapatronActual = 0;
let timeoutId = null;


/**
 * @function crearLuces
 * Genera el título y los 5 contenedores de luces, cada uno con 10 divs de luces.
 */
function crearLuces() {
    // Título
    const h1 = document.createElement('h1');
    h1.textContent = '🎄 Asignación: Luces Navideñas Animadas';
    appRoot.appendChild(h1);

        const h3 = document.createElement('h3');
    h3.textContent = 'JavaScript Básico y Manipulación del DOM';
    appRoot.appendChild(h3);

    // Generar las 5 filas de luces
    for (let j = 0; j < NUM_FILAS; j++) {
        const filaContainer = document.createElement('div');
        filaContainer.classList.add('fila-luces');
        filaContainer.id = `fila-${j}`; // ID para manipular la fila completa
        appRoot.appendChild(filaContainer);

        // Generar las 10 luces dentro de cada fila
        for (let i = 0; i < NUM_LUCES_POR_FILA; i++) {
            const luz = document.createElement('div');
            luz.classList.add('luz');
            luz.id = `luz-f${j}-i${i}`; // ID único: f(fila)-i(índice)
            filaContainer.appendChild(luz);
        }
    }
}

/**
 * @function actualizarFila
 * Cambia los colores y el brillo de una fila específica.
 * @param {number} indiceFila - Índice de la fila (0 a 4).
 * @param {string[]} patron - Array de 10 colores para aplicar.
 */
function actualizarFila(indiceFila, patron) {
    for (let i = 0; i < NUM_LUCES_POR_FILA; i++) {
        const luzElement = document.getElementById(`luz-f${indiceFila}-i${i}`);
        if (luzElement) {
            const color = patron[i];
            luzElement.style.backgroundColor = color;
            luzElement.style.boxShadow = `0 0 15px ${color}, 0 0 8px rgba(255, 255, 255, 0.99)`;
        }
    }
}

/**
 * @function animarLuces
 * Lógica principal de animación: aplica un Metapatrón completo a las 5 filas y programa el siguiente.
 */
function animarLuces() {
    // Obtener el Metapatrón actual (un array que contiene 5 arrays de color)
    const metapatronActual = METAPATRONES[indiceMetapatronActual];

    // Aplicar los 5 patrones del Metapatrón a las 5 filas
    for (let j = 0; j < NUM_FILAS; j++) {
        actualizarFila(j, metapatronActual[j]);
    }

    // Actualiza el contador del patrón
    const contador = document.getElementById('contador-patron');
    if (contador) {
        contador.textContent = `Metapatrón: ${indiceMetapatronActual + 1} / ${METAPATRONES.length}`;
    }

    // Mover al siguiente Metapatrón (ciclando)
    indiceMetapatronActual = (indiceMetapatronActual + 1) % METAPATRONES.length;

    // Llamada recursiva usando setTimeout para crear un ciclo infinito
    timeoutId = setTimeout(animarLuces, INTERVALO_MS);
}

/**
 * @function iniciarAnimacion
 * Función de inicio que se ejecuta al cargar el script.
 */
function iniciarAnimacion() {
    crearLuces();
    animarLuces();
}

// Iniciar la aplicación al cargar el script
iniciarAnimacion(); 