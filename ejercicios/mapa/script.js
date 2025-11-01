const filtersPanel = document.querySelector('.filters');
const filtersToggleBtn = document.querySelector('#filters-toggle');
const filterCheckboxes = document.querySelectorAll('.filters__item input[type="checkbox"]');
const locations = document.querySelectorAll('.location');


filtersToggleBtn.addEventListener('click', () => {
    filtersPanel.classList.toggle('filters--visible');
});

filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

applyFilters();

// Aplicar filtros al cambiar un checkbox
function applyFilters() {
    const selectedTypes = Array.from(filterCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.dataset.type);

    locations.forEach(location => {
        const locationType = location.dataset.locationType;
        if (selectedTypes.length === 0 || selectedTypes.includes(locationType)) {
            location.classList.remove('location--hidden');
        } else {
            location.classList.add('location--hidden');
        }
    });
}


