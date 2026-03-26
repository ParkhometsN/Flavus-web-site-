/**
 * Ленивая загрузка Яндекс.Карт — загружает API только когда футер в зоне видимости
 */
import { CONFIG } from '../config.js';

let scriptLoaded = false;
let scriptLoading = false;
const callbacks = [];

function loadYmapsScript() {
    if (scriptLoaded) {
        callbacks.forEach(cb => cb());
        callbacks.length = 0;
        return Promise.resolve();
    }
    if (scriptLoading) {
        return new Promise(resolve => callbacks.push(resolve));
    }
    scriptLoading = true;
    return new Promise((resolve, reject) => {
        const key = CONFIG.YANDEX_MAPS_API_KEY;
        if (!key || key === 'YOUR_YANDEX_MAPS_API_KEY') {
            scriptLoading = false;
            console.warn('Yandex Maps: укажите API-ключ в src/javascript/config.js');
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(key)}&lang=ru_RU`;
        script.async = true;
        script.onload = () => {
            scriptLoaded = true;
            scriptLoading = false;
            callbacks.forEach(cb => cb());
            callbacks.length = 0;
            resolve();
        };
        script.onerror = () => {
            scriptLoading = false;
            callbacks.forEach(cb => { try { cb(); } catch (_) {} });
            callbacks.length = 0;
            resolve(); // Не ломаем страницу при ошибке загрузки карты
        };
        document.head.appendChild(script);
    });
}

export function initYmapsWhenNeeded() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadYmapsScript().then(() => {
                        import('./ymap.js').then(({ initMap }) => initMap());
                    }).catch(() => {});
                    obs.disconnect();
                }
            },
            { rootMargin: '200px', threshold: 0.01 }
        );
        obs.observe(mapContainer);
    } else {
        loadYmapsScript().then(() => {
            import('./ymap.js').then(({ initMap }) => initMap());
        }).catch(() => {});
    }
}
