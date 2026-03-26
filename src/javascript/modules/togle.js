const toggles = document.querySelectorAll('.toggle_item');

export function tgl() {
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggles.forEach(t => {
                t.classList.remove('active_togle');
                t.setAttribute?.('aria-selected', 'false');
                t.setAttribute?.('tabindex', '-1');
            });
            toggle.classList.add('active_togle');
            toggle.setAttribute?.('aria-selected', 'true');
            toggle.setAttribute?.('tabindex', '0');
        });
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });
}