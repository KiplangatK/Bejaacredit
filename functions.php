<?php
/*
|--------------------------------------------------------------------------
| BLMS Helper Functions
|--------------------------------------------------------------------------
*/

function cleanInput(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function formatPhone(string $phone): string
{
    $phone = preg_replace('/\D/', '', $phone);

    if (str_starts_with($phone, '0')) {
        $phone = '254' . substr($phone, 1);
    }

    if (str_starts_with($phone, '254')) {
        return '+' . $phone;
    }

    return '+' . $phone;
}

function generateOTP(int $length = 6): string
{
    return str_pad((string)random_int(0, 999999), $length, '0', STR_PAD_LEFT);
}

function generateCustomerNumber(int $id): string
{
    return 'BJ' . str_pad((string)$id, 6, '0', STR_PAD_LEFT);
}

function redirect(string $url): void
{
    header("Location: $url");
    exit;
}

function isPost(): bool
{
    return $_SERVER['REQUEST_METHOD'] === 'POST';
}

function flash(string $message): void
{
    $_SESSION['flash_message'] = $message;
}
?>