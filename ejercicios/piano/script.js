const settings__menu = document.getElementById('settings__menu');
const settings__closer = document.getElementById('settings__closer-btn');
const settings__opener = document.getElementById('settings__opener-btn');
const settings__darkMode = document.getElementById('settings__dark-mode');
const octaves__more = document.getElementById('setting-octaves__plus-btn');
const octaves__less = document.getElementById('settings-octaves__minus-btn');
const num_octaves = document.getElementById('input-octaves');
const piano = document.getElementById('piano');

/*document.documentElement.style.setProperty('--numOctaves', num_octaves.value);*/
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

function generatePiano(numOctaves) {
    numOctaves = Number(numOctaves) || 1;
    document.documentElement.style.setProperty('--numWhiteKeys', String(numOctaves * 7));
    console.log(document.documentElement.style.getPropertyValue('--numWhiteKeys'));
    numWhiteKeys = numOctaves * 7;
    piano.style.maxWidth = `${numWhiteKeys * 10}rem`;
    piano.innerHTML = '';

    const startOctave = 3;

    for (let i = 0; i < numOctaves; i++) {
        const currentOctave = startOctave + i;
        const octave = document.createElement('div');
        octave.className = 'octave';

        const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const blackNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];

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

    /*
    // Ajustar ancho de las octavas
    const octaves = document.querySelectorAll('.octave');
    octaves.forEach(oct => {
        if (numOctaves <= 3) {
            oct.style.flex = '1';
            oct.style.width = 'auto';
        } else {
            oct.style.flex = '0 0 auto';
            oct.style.width = '260px';
        }
    });*/
}
