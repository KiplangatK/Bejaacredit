<?php
/*
|--------------------------------------------------------------------------
| BLMS Authentication Helper
|--------------------------------------------------------------------------
*/
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/session.php';

function loginUser(string $phone, string $password): bool
{
    global $pdo;

    $sql = "SELECT id, customer_id, phone, password_hash, role, status
            FROM users
            WHERE phone = :phone
            LIMIT 1";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['phone' => $phone]);
    $user = $stmt->fetch();

    if (!$user) {
        return false;
    }

    if (!password_verify($password, $user['password_hash'])) {
        return false;
    }

    if ($user['status'] === 'suspended') {
        return false;
    }

    session_regenerate_id(true);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['customer_id'] = $user['customer_id'];
    $_SESSION['phone'] = $user['phone'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['logged_in'] = true;

    return true;
}

function logoutUser(): void
{
    $_SESSION = [];

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"] ?? '',
            $params["secure"] ?? false,
            $params["httponly"] ?? true
        );
    }

    session_destroy();
}
?>