// forms_handler.js - обработка отправки форм

$(document).ready(function() {
    
    // Обработка первой формы (заявка на услугу)
    $('#serviceForm').on('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные
        let formData = {
            form_type: 'service_form',
            firstName: $('input[name="firstName"]', this).val(),
            lastName: $('input[name="lastName"]', this).val(),
            email: $('input[name="email"]', this).val(),
            telegram: $('input[name="telegram"]', this).val(),
            about: $('textarea[name="about"]', this).val()
        };
        
        // Проверяем чекбокс
        let isChecked = $(this).find('#cbx').prop('checked');
        if (!isChecked) {
            showMessage('Пожалуйста, согласитесь с правилами обработки персональных данных', 'error');
            return;
        }
        
        // Отправляем AJAX запрос
        sendForm(formData, $(this));
    });
    
    // Обработка второй формы (заявка на вакансию)
    $('#vacancyForm').on('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные
        let formData = {
            form_type: 'vacancy_form',
            firstName: $('input[name="firstName"]', this).val(),
            lastName: $('input[name="lastName"]', this).val(),
            email: $('input[name="email"]', this).val(),
            position: $('input[name="position"]', this).val(),
            telegram: $('input[name="telegram"]', this).val(),
            about: $('textarea[name="about"]', this).val()
        };
        
        // Проверяем чекбокс
        let isChecked = $(this).find('#cbx').prop('checked');
        if (!isChecked) {
            showMessage('Пожалуйста, согласитесь с правилами обработки персональных данных', 'error');
            return;
        }
        
        // Отправляем AJAX запрос
        sendForm(formData, $(this));
    });
    
    // Функция отправки формы
    function sendForm(formData, formElement) {
        // Блокируем кнопку отправки
        let submitBtn = formElement.find('.primary_but');
        let originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Отправка...');
        
        $.ajax({
            url: '/send_form.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    showMessage(response.message, 'success');
                    formElement[0].reset();
                    // Сбрасываем чекбокс
                    formElement.find('#cbx').prop('checked', false);
                } else {
                    showMessage(response.message, 'error');
                }
            },
            error: function() {
                showMessage('Ошибка соединения. Попробуйте позже.', 'error');
            },
            complete: function() {
                // Разблокируем кнопку
                submitBtn.prop('disabled', false).text(originalText);
            }
        });
    }
    
    // Функция показа сообщений (глобальная, без formElement)
    function showMessage(message, type) {

        $('.form-message').remove();
        
        let messageClass = type === 'success' ? 'success-message' : 'error-message';
        let messageHtml = `
            <div class="form-message ${messageClass}" style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                padding: 15px 20px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ">
                ${message}
            </div>
        `;
        
        $('body').append(messageHtml);
        
        // Стили для сообщений
        if (type === 'success') {
            $('.success-message').css({
                'background-color': 'var(--prymarygold)',
                'color': 'var(--black)'
            });
        } else {
            $('.error-message').css({
                'background-color': 'var(--prymarygold)',
                'color': 'var(--black)'
            });
        }
        
        // Добавляем анимацию
        $('<style>')
            .prop('type', 'text/css')
            .html(`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `)
            .appendTo('head');
        
        // Автоматически скрываем через 5 секунд
        setTimeout(function() {
            $('.form-message').fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }
});