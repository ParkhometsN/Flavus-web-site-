export function initMap() {
    // Защита от двойной инициализации (на некоторых страницах initMap дергался дважды)
    const container = document.getElementById("map");
    if (!container) return;
    if (container.dataset.ymapInited === "1") return;

    // Если API не загрузился (нет ключа/ошибка сети/блокировка) — просто выходим без падения
    if (typeof window === "undefined" || typeof window.ymaps === "undefined") {
        console.error("Yandex Maps API (ymaps) не загружен. Проверьте ключ, сеть, блокировщики.");
        return;
    }

    container.dataset.ymapInited = "1";

    window.ymaps.ready(() => {
        const myMap = new window.ymaps.Map("map", {
            center: [59.905962, 30.440792],
            zoom: 17,
            controls: ["zoomControl"],
            suppressMapOpenBlock: true,
        });

        // Прячем копирайты (если это уместно для вашего кейса)
        myMap.copyrights.add(
            "<style>.ymaps-2-1-79-copyrights-pane { display: none !important; }</style>"
        );

        const firstPlacemark = new window.ymaps.Placemark(
            [59.905962, 30.440792],
            {},
            {
                iconLayout: "default#image",
                iconImageHref: "/src/assests/svg/Map_pin.svg",
                iconImageSize: [40, 137],
                iconImageOffset: [-15, -39],
            }
        );

        firstPlacemark.events.add("click", (e) => {
            window.open(
                "https://yandex.com/maps/2/saint-petersburg/?ll=30.440719%2C59.906003&mode=poi&poi%5Bpoint%5D=30.440788%2C59.905971&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D161808942293&z=20.28",
                "_blank"
            );
            e.stopPropagation();
        });

        myMap.geoObjects.add(firstPlacemark);
    });
}