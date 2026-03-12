
const toggles = document.querySelectorAll('.toggle_item');


export function tgl(){

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggles.forEach(t => t.classList.remove('active_togle'));
            toggle.classList.add('active_togle');
        });
    });

}