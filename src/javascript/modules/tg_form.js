
import { telegramapi, chatid_TELEGRAM } from './config.js';

export function initForm() {


function initForms() {
    // берём ВСЕ формы с таким id (на разных страницах будет одна)
    const forms = document.querySelectorAll('#contactForm');

    if (!forms.length) {
        console.error('Формы не найдены');
        return;
    }

    forms.forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const telegram = formData.get('telegram');
            const about = formData.get('about');
            const position = formData.get('position'); // есть только в vacancy

            let message = '';

            if (position) {
                message = `
Заявка на вакансию:
Имя: ${firstName} ${lastName}
Email: ${email}
Должность: ${position}
Telegram: ${telegram}
О себе: ${about}
`;
            } else {
                message = `
Заявка на обучение:
Имя: ${firstName} ${lastName}
Email: ${email}
Telegram: ${telegram}
О себе: ${about}
`;
            }

            const TELEGRAM_API = `https://api.telegram.org/bot${telegramapi.TELEGRAM_API_BOT}/sendMessage`;

            try {
                const res = await fetch(
                    `${TELEGRAM_API}?chat_id=${chatid_TELEGRAM.CHAT_ID}&text=${encodeURIComponent(message)}`
                );

                const data = await res.json();

                if (data.ok) {
                    alert('Заявка успешно отправлена!');
                    form.reset();
                } else {
                    alert('Ошибка при отправке заявки');
                    console.error('Telegram error:', data);
                }

            } catch (error) {
                alert('Ошибка при отправке заявки');
                console.error('Fetch error:', error);
            }
        });
    });
}

// запуск
initForms();

}
