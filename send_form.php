<?php
header('Content-Type: application/json');

require_once('phpmailer/src/PHPMailer.php');
require_once('phpmailer/src/SMTP.php');
require_once('phpmailer/src/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Функция отправки письма
function sendEmail($subject, $body) {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'utf-8';
    
    try {
        // Настройки SMTP (ваши работающие настройки)
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mofmails@gmail.com';
        $mail->Password = 'tsdzbhmemjyfjlkh'; // Ваш пароль приложения (без пробелов)
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        
        // Отправитель и получатель
        $mail->setFrom('mofmails@gmail.com', 'Сайт Flavus');
        $mail->addAddress('flavus.barber@gmail.com'); // Куда отправлять
        
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = strip_tags($body);
        
        return $mail->send();
    } catch (Exception $e) {
        return false;
    }
}

// Определяем тип формы и обрабатываем
$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Форма 1: Заявка на услугу (с полями firstName, lastName, email, telegram, about)
    if (isset($_POST['form_type']) && $_POST['form_type'] == 'service_form') {
        $firstName = htmlspecialchars($_POST['firstName'] ?? '');
        $lastName = htmlspecialchars($_POST['lastName'] ?? '');
        $email = htmlspecialchars($_POST['email'] ?? '');
        $telegram = htmlspecialchars($_POST['telegram'] ?? '');
        $about = htmlspecialchars($_POST['about'] ?? '');
        
        $subject = 'Новая заявка на услугу - Flavus';
        
        $body = "
            <h2>Новая заявка на обучение</h2>
            <table style='border-collapse: collapse; width: 100%;'>
                <tr style='background-color: #f2f2f2;'>
                    <th style='padding: 10px; border: 1px solid #ddd; text-align: left;'>Поле</th>
                    <th style='padding: 10px; border: 1px solid #ddd; text-align: left;'>Значение</th>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Имя</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$firstName}</td>
                </tr>
                <tr style='background-color: #f9f9f9;'>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Фамилия</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$lastName}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Email</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$email}</td>
                </tr>
                <tr style='background-color: #f9f9f9;'>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Telegram/Телефон</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$telegram}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>О себе</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$about}</td>
                </tr>
            </table>
        ";
        
        if (sendEmail($subject, $body)) {
            $response['success'] = true;
            $response['message'] = 'Заявка успешно отправлена! Мы свяжемся с вами.';
        } else {
            $response['message'] = 'Ошибка при отправке. Попробуйте позже.';
        }
    }
    
    // Форма 2: Заявка на вакансию (с полями firstName, lastName, email, position, telegram, about)
    elseif (isset($_POST['form_type']) && $_POST['form_type'] == 'vacancy_form') {
        $firstName = htmlspecialchars($_POST['firstName'] ?? '');
        $lastName = htmlspecialchars($_POST['lastName'] ?? '');
        $email = htmlspecialchars($_POST['email'] ?? '');
        $position = htmlspecialchars($_POST['position'] ?? '');
        $telegram = htmlspecialchars($_POST['telegram'] ?? '');
        $about = htmlspecialchars($_POST['about'] ?? '');
        
        $subject = 'Новая заявка на вакансию - Flavus';
        
        $body = "
            <h2>Новая заявка на вакансию</h2>
            <table style='border-collapse: collapse; width: 100%;'>
                <tr style='background-color: #f2f2f2;'>
                    <th style='padding: 10px; border: 1px solid #ddd; text-align: left;'>Поле</th>
                    <th style='padding: 10px; border: 1px solid #ddd; text-align: left;'>Значение</th>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Имя</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$firstName}</td>
                </tr>
                <tr style='background-color: #f9f9f9;'>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Фамилия</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$lastName}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Email</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$email}</td>
                </tr>
                <tr style='background-color: #f9f9f9;'>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Должность</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$position}</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>Telegram/Телефон</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$telegram}</td>
                </tr>
                <tr style='background-color: #f9f9f9;'>
                    <td style='padding: 10px; border: 1px solid #ddd;'><strong>О себе/Резюме</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>{$about}</td>
                </tr>
            </table>
        ";
        
        if (sendEmail($subject, $body)) {
            $response['success'] = true;
            $response['message'] = 'Заявка на вакансию отправлена! Мы рассмотрим вашу кандидатуру.';
        } else {
            $response['message'] = 'Ошибка при отправке. Попробуйте позже.';
        }
    }
    
    else {
        $response['message'] = 'Неизвестный тип формы';
    }
} else {
    $response['message'] = 'Неверный метод запроса';
}

echo json_encode($response);
?>