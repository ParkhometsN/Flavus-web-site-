export async function loadStaffData() {
    const PARTNER_TOKEN = 'mh8k4exn6yzbm39jhdx3'; 
    const BRANCH_ID = '1075535'; 
    const URL = `https://api.yclients.com/api/v1/staff/${BRANCH_ID}`;

    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${PARTNER_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.api.v2+json'
            }
        });

        if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data.data)) throw new Error("Полученные данные не являются массивом");

        renderBarbers(data.data);
    } catch (error) {
        console.error('Ошибка при получении данных сотрудников:', error);
    }
}

function renderBarbers(staffData) {
    const barbersItemsContainer = document.getElementById('barbersItems');
    const largeBarberContainer = document.getElementById('largeBarber');
    const nameAndButContainer = document.querySelector('.iiuhdd'); // блок для имени и должности

    if (!barbersItemsContainer || !largeBarberContainer || !nameAndButContainer) return;

    barbersItemsContainer.innerHTML = '';
    largeBarberContainer.innerHTML = '';
    nameAndButContainer.innerHTML = '';

    // Фильтруем только активных мастеров (не админы, с аватаркой)
    const filteredStaff = staffData.filter(barber => 
        barber.name && barber.specialization && barber.avatar_big && barber.specialization !== "Админ" && barber.status === 0
    );

    if (filteredStaff.length === 0) return;

    let counter = 1;

    // Показываем первого мастера справа и вставляем имя в блок сверху
    const firstBarber = filteredStaff[0];
    updateLargeBarber(firstBarber);

    // Создаём сетку мастеров слева
    filteredStaff.forEach(barber => {
        const barberItem = document.createElement('div');
        barberItem.className = 'barbers_item';
        barberItem.innerHTML = `
            <div class="info_top">
                <div class="name_of_barber"><h5>${barber.name}</h5></div>
                <div class="category"><h4>${barber.specialization}</h4></div>
            </div>
            <img src="${barber.avatar_big}" alt="${barber.name}">
            <div class="barber_number"><h4>[ ${counter} ]</h4></div>
        `;

        // Клик по мастеру — меняем большую фотографию и имя/должность сверху
        barberItem.addEventListener('click', () => {
            updateLargeBarber(barber);
        });

        barbersItemsContainer.appendChild(barberItem);
        counter++;
    });

    // Функция обновления большой фотографии и блока имени/должности
    function updateLargeBarber(barber) {
        largeBarberContainer.innerHTML = `<img src="${barber.avatar_big}" alt="${barber.name}">`;

        nameAndButContainer.innerHTML = `
            <div class="name_of_barber brlist"><h5>${barber.name}</h5></div>
            <div class="category brlist"><h4>${barber.specialization}</h4></div>
        `;
    }
}
