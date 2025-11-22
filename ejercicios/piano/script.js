const settings__menu = document.getElementById('settings__menu');
const settings__closer = document.getElementById('settings__closer-btn');
const settings__opener = document.getElementById('settings__opener-btn');
const settings__darkMode = document.getElementById('settings__dark-mode');
const octaves__more = document.getElementById('setting-octaves__plus-btn');
const octaves__less = document.getElementById('settings-octaves__minus-btn');
const num_octaves = document.getElementById('input-octaves');
const piano = document.getElementById('piano');
const waveform_select = document.getElementById('waveform-select');

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
// Mapeo de frecuencias base (Octava 4):
const noteFrequencies = {
    'c': 261.63, 'c#': 277.18,
    'd': 293.66, 'd#': 311.13,
    'e': 329.63,
    'f': 349.23, 'f#': 369.99,
    'g': 392.00, 'g#': 415.30,
    'a': 440.00, 'a#': 466.16,
    'b': 493.88
};
const activeOscillators = {};

generatePiano(Number(num_octaves.value));



// Settings menu open/close
settings__opener.addEventListener('click', () => {
    settings__menu.classList.toggle('settings-menu--hidden');
    settings__menu.classList.replace('settings-menu--closing', 'settings-menu--opening');
});

settings__closer.addEventListener('click', () => {
    settings__menu.classList.replace('settings-menu--opening', 'settings-menu--closing');
    setTimeout(() => {
        settings__menu.classList.toggle('settings-menu--hidden');
    }, 300);
});

// Dark mode toggle
settings__darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Octaves input number control
octaves__more.addEventListener('click', () => {
    if (Number(num_octaves.value) === 1) {
        octaves__less.disabled = false;
    }
    if (Number(num_octaves.value) < 7) {
        num_octaves.value = Number(num_octaves.value) +  1;
        document.documentElement.style.setProperty('--numOctaves', num_octaves.value);
        generatePiano(Number(num_octaves.value));
    }
    if (Number(num_octaves.value) === 7) {
        octaves__more.disabled = true;
    }
});

octaves__less.addEventListener('click', () => {
    if (Number(num_octaves.value) === 7) {
        octaves__more.disabled = false;
    }
    if (Number(num_octaves.value) > 1) {
        num_octaves.value = Number(num_octaves.value) -  1;
        document.documentElement.style.setProperty('--numOctaves', num_octaves.value);
        generatePiano(Number(num_octaves.value));
    }
    if (Number(num_octaves.value) === 1) {
        octaves__less.disabled = true;
    }
});

/*function generatePiano(numOctaves) {
    numOctaves = Number(numOctaves) || 1;
    document.documentElement.style.setProperty('--numWhiteKeys', String(numOctaves * 7));
    let numWhiteKeys = numOctaves * 7;
    let max_width_white_keys = document.documentElement.style.getPropertyValue('--max-width-white-keys') || '10rem';
    let max_width_white_keys__digit = Array.from(max_width_white_keys).filter(caracter => '0123456789.'.includes(caracter)).join('');
    let max_width_white_keys__unit = Array.from(max_width_white_keys).filter(caracter => !'0123456789.'.includes(caracter)).join('');
    piano.style.maxWidth = `${numWhiteKeys * max_width_white_keys__digit}${max_width_white_keys__unit}`;
    piano.innerHTML = '';

    const startOctave = 3;

    for (let i = 0; i < numOctaves; i++) {
        const currentOctave = startOctave + i;
        const octave = document.createElement('div');
        octave.className = 'octave';

        const whiteNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        const blackNotes = ['c#', 'd#', 'f#', 'g#', 'a#'];

        // Crear teclas negras PRIMERO, para que los selectores :nth-of-type() en CSS funcionen
        blackNotes.forEach(note => {
            const key = document.createElement('div');
            key.className = 'key black-key';
            key.dataset.note = note + currentOctave;
            key.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                // playKey(key, note, currentOctave);
            });
            octave.appendChild(key);
        });

        // Crear teclas blancas después
        whiteNotes.forEach(note => {
            const key = document.createElement('div');
            key.className = 'key white-key';
            key.dataset.note = note + currentOctave;
            key.addEventListener('mousedown', () => {
                // playKey(key, note, currentOctave);
            });
            octave.appendChild(key);
        });

        piano.appendChild(octave);
    }
}*/

function generatePiano(numOctaves) {
    numOctaves = Number(numOctaves) || 1;
    document.documentElement.style.setProperty('--numWhiteKeys', String(numOctaves * 7));
    let numWhiteKeys = numOctaves * 7;
    let max_width_white_keys = document.documentElement.style.getPropertyValue('--max-width-white-keys') || '10rem';
    let max_width_white_keys__digit = Array.from(max_width_white_keys).filter(character => '0123456789.'.includes(character)).join('');
    let max_width_white_keys__unit = Array.from(max_width_white_keys).filter(character => !'0123456789.'.includes(character)).join('');
    piano.style.maxWidth = `${numWhiteKeys * max_width_white_keys__digit}${max_width_white_keys__unit}`;
    piano.innerHTML = '';

    const startOctave = 3;

    for (let i = 0; i < numOctaves; i++) {
        const currentOctave = startOctave + i;
        const octaveDiv = document.createElement('div');
        octaveDiv.className = 'octave';
        octaveDiv.dataset.octaveNumber = String(currentOctave);

        // Orden importante para CSS y posición
        const whiteNotes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        const blackNotes = ['c#', 'd#', 'f#', 'g#', 'a#'];

        // Crear teclas negras
        blackNotes.forEach(note => {
            const key = document.createElement('div');
            key.className = 'key black-key';
            key.dataset.note = note; // Guardamos solo la nota "c#"

            attachKeyEvents(key, note, currentOctave);
            octaveDiv.appendChild(key);
        });

        // Crear teclas blancas
        whiteNotes.forEach(note => {
            const key = document.createElement('div');
            key.className = 'key white-key';
            key.dataset.note = note; // Guardamos solo la nota "c"

            attachKeyEvents(key, note, currentOctave);
            octaveDiv.appendChild(key);
        });

        piano.appendChild(octaveDiv);
    }
}



// Web AudioAPI

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume(); // reanuda un AudioContext que está en estado "suspended"
    }
}

function getFrequency(note, octave) {
    // Calcular frecuencia base
    const baseFreq = noteFrequencies[note.toLowerCase()];
    if (!baseFreq) return 440;

    // Ajustar por octava (La base es octava 4)
    // Fórmula: Freq = Base * 2^(octava - 4)
    return baseFreq * Math.pow(2, octave - 4);
}

function playNote(noteKey, octave) {
    initAudioContext();

    const noteName = noteKey.replace(/[0-9]/g, ''); // Elimina números si los hay, aunque el dataset viene limpio
    const fullKey = `${noteName}${octave}`; // Identificador único "c#4"

    // Si ya está sonando esta nota, no hacer nada (evita repeticiones al arrastrar)
    if (activeOscillators[fullKey]) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Configurar oscilador
    oscillator.type = waveform_select.value; // Usar el valor del selector
    /* oscillator.type = (waveform_select && waveform_select.value) || 'sine'; */ //PRUEBA antes de agregar selector
    oscillator.frequency.setValueAtTime(getFrequency(noteName, octave), audioCtx.currentTime);

    // Configurar envolvente (Envelope) para evitar "click"
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05); // Ataque suave

    // Conectar: Oscilador -> Ganancia -> Salida
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    // Guardar referencia
    activeOscillators[fullKey] = { oscillator, gainNode };
}

function stopNote(noteKey, octave) {
    const noteName = noteKey.replace(/[0-9]/g, '');
    const fullKey = `${noteName}${octave}`;

    if (activeOscillators[fullKey]) {
        const { oscillator, gainNode } = activeOscillators[fullKey];

        // Release suave (desvanecimiento)
        const releaseTime = 0.2;
        gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + releaseTime);

        oscillator.stop(audioCtx.currentTime + releaseTime);

        // Limpiar referencia después del stop
        setTimeout(() => {
            delete activeOscillators[fullKey];
        }, releaseTime * 1000);
    }
}



function attachKeyEvents(keyElement, note, octave) {
    // Mouse events
    keyElement.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Evitar selección de texto
        keyElement.classList.add('active');
        playNote(note, octave);
    });

    keyElement.addEventListener('mouseup', () => {
        keyElement.classList.remove('active');
        stopNote(note, octave);
    });

    keyElement.addEventListener('mouseleave', () => {
        if (keyElement.classList.contains('active')) {
            keyElement.classList.remove('active');
            stopNote(note, octave);
        }
    });

    // Touch events (básico para móviles)
    keyElement.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyElement.classList.add('active');
        playNote(note, octave);
    });

    keyElement.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyElement.classList.remove('active');
        stopNote(note, octave);
    });
}

