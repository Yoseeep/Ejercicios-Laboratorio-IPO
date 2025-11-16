const settings__menu = document.getElementById('settings__menu');
const settings__closer = document.getElementById('settings__closer-btn');
const settings__opener = document.getElementById('settings__opener-btn');
const settings__darkMode = document.getElementById('settings__dark-mode');

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

settings__darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

