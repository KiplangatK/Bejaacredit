<?php
/*
|--------------------------------------------------------------------------
| BLMS Secure Session Manager
|--------------------------------------------------------------------------
*/
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

define('SESSION_TIMEOUT', 1800);

if (isset($_SESSION['LAST_ACTIVITY']) &&
    (time() - $_SESSION['LAST_ACTIVITY']) > SESSION_TIMEOUT) {
    session_unset();
    session_destroy();
    header("Location: /auth/customer-login.php?timeout=1");
    exit;
}
$_SESSION['LAST_ACTIVITY'] = time();

function requireLogin() {
    if (empty($_SESSION['user_id'])) {
        header("Location: /auth/customer-login.php");
        exit;
    }
}

function requireRole($role) {
    requireLogin();
    if (($_SESSION['role'] ?? '') !== $role) {
        http_response_code(403);
        exit("Access denied.");
    }
}
?>
