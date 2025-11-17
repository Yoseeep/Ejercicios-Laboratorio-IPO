const settings__menu = document.getElementById('settings__menu');
const settings__closer = document.getElementById('settings__closer-btn');
const settings__opener = document.getElementById('settings__opener-btn');
const settings__darkMode = document.getElementById('settings__dark-mode');
const octaves__more = document.getElementById('setting-octaves__plus-btn');
const octaves__less = document.getElementById('settings-octaves__minus-btn');
const num_octaves = document.getElementById('input-octaves');


// Settings menu open/close
settings__opener.addEventListener('click', () => {
    settings__menu.classList.toggle('settings-menu--hidden');
    settings__menu.classList.replace('settings-menu--closing', 'settings-menu--opening');

});

settings__closer.addEventListener('click', () => {
    settings__menu.classList.replace('settings-menu--opening', 'settings-menu--closing');
    setTimeout(
        () => {
            settings__menu.classList.toggle('settings-menu--hidden');
        }, 300
    );
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
        console.log(document.documentElement.style.getPropertyValue('--numOctaves'));
    }
    if (Number(num_octaves.value) === 7) {
        octaves__more.disabled = true;
    }
})

octaves__less.addEventListener('click', () => {
    if (Number(num_octaves.value) === 7) {
        octaves__more.disabled = false;
    }
    if (Number(num_octaves.value) > 1) {
        num_octaves.value = Number(num_octaves.value) -  1;
        document.documentElement.style.setProperty('--numOctaves', num_octaves.value);
        console.log(document.documentElement.style.getPropertyValue('--numOctaves'));
    }
    if (Number(num_octaves.value) === 1) {
        octaves__less.disabled = true;
    }
})