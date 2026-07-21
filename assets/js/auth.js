/*=========================================================
    BEJJA LOAN CREDIT
    AUTHENTICATION ENGINE
    Version: 2.0
=========================================================*/

(function () {

    "use strict";

    /*==========================================
        SESSION KEYS
    ==========================================*/

    const CLIENT_SESSION = "loggedInClient";
    const ADMIN_SESSION = "loggedInAdmin";

    /*==========================================
        CLIENT REGISTRATION
    ==========================================*/

    function registerClient(client) {

        // Check duplicate phone
        if (DB.getClientByPhone(client.phone)) {

            return {
                success: false,
                message: "Phone number is already registered."
            };

        }

        // Save client
        const savedClient = DB.addClient(client);

        return {
            success: true,
            message: "Account created successfully.",
            client: savedClient
        };

    }

    /*==========================================
        CLIENT LOGIN
    ==========================================*/

    function clientLogin(phone, password) {

        const client = DB.getClientByPhone(phone);

        if (!client) {

            return {
                success: false,
                message: "Phone number is not registered."
            };

        }

        if (client.password !== password) {

            return {
                success: false,
                message: "Incorrect password."
            };

        }

        if (client.status !== "ACTIVE") {

            return {
                success: false,
                message: "This account has been disabled."
            };

        }

        sessionStorage.setItem(
            CLIENT_SESSION,
            JSON.stringify(client)
        );

        return {
            success: true,
            message: "Login successful.",
            client: client
        };

    }

    /*==========================================
        CLIENT LOGOUT
    ==========================================*/

    function clientLogout() {

        sessionStorage.removeItem(CLIENT_SESSION);

        window.location.href = "client-portal.html";

    }

    /*==========================================
        ADMIN LOGIN
    ==========================================*/

    function adminLogin(username, password) {

        const staff = DB.getStaff();

        const admin = staff.find(user =>

            user.username === username &&
            user.password === password &&
            user.active === true

        );

        if (!admin) {

            return {
                success: false,
                message: "Invalid username or password."
            };

        }

        sessionStorage.setItem(
            ADMIN_SESSION,
            JSON.stringify(admin)
        );

        return {
            success: true,
            message: "Login successful.",
            admin: admin
        };

    }

    /*==========================================
        ADMIN LOGOUT
    ==========================================*/

    function adminLogout() {

        sessionStorage.removeItem(ADMIN_SESSION);

        window.location.href = "admin-login.html";

    }

    /*==========================================
        CURRENT CLIENT
    ==========================================*/

    function currentClient() {

        const client =
            sessionStorage.getItem(CLIENT_SESSION);

        if (!client) {

            return null;

        }

        return JSON.parse(client);

    }

    /*==========================================
        CURRENT ADMIN
    ==========================================*/

    function currentAdmin() {

        const admin =
            sessionStorage.getItem(ADMIN_SESSION);

        if (!admin) {

            return null;

        }

        return JSON.parse(admin);

    }

    /*==========================================
        REQUIRE CLIENT LOGIN
    ==========================================*/

    function requireClient() {

        if (!currentClient()) {

            window.location.href = "client-portal.html";

        }

    }

    /*==========================================
        REQUIRE ADMIN LOGIN
    ==========================================*/

    function requireAdmin() {

        if (!currentAdmin()) {

            window.location.href = "admin-login.html";

        }

    }

    /*==========================================
        REFRESH CLIENT SESSION
    ==========================================*/

    function refreshClientSession() {

        const client = currentClient();

        if (!client) {

            return;

        }

        const latest = DB.getClientById(client.id);

        if (!latest) {

            sessionStorage.removeItem(CLIENT_SESSION);

            return;

        }

        sessionStorage.setItem(
            CLIENT_SESSION,
            JSON.stringify(latest)
        );

    }

    /*==========================================
        CHECK LOGIN STATUS
    ==========================================*/

    function isClientLoggedIn() {

        return currentClient() !== null;

    }

    function isAdminLoggedIn() {

        return currentAdmin() !== null;

    }

    /*==========================================
        PUBLIC API
    ==========================================*/

    window.AUTH = {

        registerClient,

        clientLogin,

        clientLogout,

        adminLogin,

        adminLogout,

        currentClient,

        currentAdmin,

        requireClient,

        requireAdmin,

        refreshClientSession,

        isClientLoggedIn,

        isAdminLoggedIn

    };

})();
