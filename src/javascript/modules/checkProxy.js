import { AlertError } from "./alert.js";


export async function checkVpnUsage() {
  try {
    const res = await fetch('https://ipinfo.io/json?token=39d621c91e0f5b');

    if (!res.ok) {
      console.error('Request failed:', res.status);
      return;
    }

    const data = await res.json();

    // Проверяем страну
    if (data.country !== 'RU') {
        AlertError('Похоже, у вас включён VPN. Без него сервис может работать быстрее')
    } else {
      console.log('Пользователь из России, VPN не обнаружен');

    }

  } catch (err) {
    console.error('Ошибка запроса:', err);
  }
}



