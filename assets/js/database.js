/*=========================================================
    BEJJA LOAN CREDIT
    DATABASE ENGINE (database.js)
    Version: 1.0
=========================================================*/

(function () {

    "use strict";

    /*=========================================================
        INITIALIZE DATABASE
    =========================================================*/

    function initializeDatabase() {

        if (!localStorage.getItem("clients")) {
            localStorage.setItem("clients", JSON.stringify([]));
        }

        if (!localStorage.getItem("loanApplications")) {
            localStorage.setItem("loanApplications", JSON.stringify([]));
        }

        if (!localStorage.getItem("loans")) {
            localStorage.setItem("loans", JSON.stringify([]));
        }

        if (!localStorage.getItem("payments")) {
            localStorage.setItem("payments", JSON.stringify([]));
        }

        if (!localStorage.getItem("staff")) {

            localStorage.setItem("staff", JSON.stringify([
                {
                    id: 1,
                    username: "admin",
                    password: "admin123",
                    role: "Administrator",
                    active: true
                }
            ]));

        }

    }

    initializeDatabase();

    /*=========================================================
        GENERIC STORAGE FUNCTIONS
    =========================================================*/

    function read(key) {

        return JSON.parse(localStorage.getItem(key)) || [];

    }

    function write(key, value) {

        localStorage.setItem(key, JSON.stringify(value));

    }

    /*=========================================================
        CLIENTS
    =========================================================*/

    function getClients() {

        return read("clients");

    }

    function saveClients(data) {

        write("clients", data);

    }

    function addClient(client) {

        const clients = getClients();

        client.id = nextId(clients);

        client.createdAt = today();

        client.status = "ACTIVE";

        clients.push(client);

        saveClients(clients);

        return client;

    }

    function getClientByPhone(phone) {

        return getClients().find(c => c.phone === phone);

    }

    function getClientById(id) {

        return getClients().find(c => c.id === id);

    }

    function updateClient(updatedClient) {

        let clients = getClients();

        clients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);

        saveClients(clients);

    }

    /*=========================================================
        LOAN APPLICATIONS
    =========================================================*/

    function getApplications() {

        return read("loanApplications");

    }

    function saveApplications(data) {

        write("loanApplications", data);

    }

    function addApplication(application) {

        const applications = getApplications();

        application.id = nextId(applications);

        application.applicationDate = today();

        application.status = "PENDING";

        applications.push(application);

        saveApplications(applications);

        return application;

    }

    function getApplication(id) {

        return getApplications().find(a => a.id === id);

    }

    function updateApplication(updated) {

        let apps = getApplications();

        apps = apps.map(a => a.id === updated.id ? updated : a);

        saveApplications(apps);

    }

    function deleteApplication(id) {

        const apps = getApplications().filter(a => a.id !== id);

        saveApplications(apps);

    }

    /*=========================================================
        LOANS
    =========================================================*/

    function getLoans() {

        return read("loans");

    }

    function saveLoans(data) {

        write("loans", data);

    }

    function addLoan(loan) {

        const loans = getLoans();

        loan.id = nextId(loans);

        loan.createdAt = today();

        loans.push(loan);

        saveLoans(loans);

        return loan;

    }

    function getLoan(id) {

        return getLoans().find(l => l.id === id);

    }

    function getLoanByClient(clientId) {

        return getLoans().find(l =>
            l.clientId === clientId &&
            l.status === "ACTIVE"
        );

    }

    function updateLoan(updatedLoan) {

        let loans = getLoans();

        loans = loans.map(l =>
            l.id === updatedLoan.id ? updatedLoan : l
        );

        saveLoans(loans);

    }

    /*=========================================================
        PAYMENTS
    =========================================================*/

    function getPayments() {

        return read("payments");

    }

    function savePayments(data) {

        write("payments", data);

    }

    function addPayment(payment) {

        const payments = getPayments();

        payment.id = nextId(payments);

        payment.date = today();

        payments.push(payment);

        savePayments(payments);

        return payment;

    }

    function getLoanPayments(loanId) {

        return getPayments().filter(p => p.loanId === loanId);

    }

    /*=========================================================
        STAFF
    =========================================================*/

    function getStaff() {

        return read("staff");

    }

    function saveStaff(data) {

        write("staff", data);

    }

    /*=========================================================
        DASHBOARD STATISTICS
    =========================================================*/

    function totalClients() {

        return getClients().length;

    }

    function totalApplications() {

        return getApplications().length;

    }

    function pendingApplications() {

        return getApplications().filter(a =>
            a.status === "PENDING"
        ).length;

    }

    function approvedLoans() {

        return getLoans().filter(l =>
            l.status === "ACTIVE"
        ).length;

    }

    function rejectedLoans() {

        return getApplications().filter(a =>
            a.status === "REJECTED"
        ).length;

    }

    function totalPrincipalIssued() {

        let total = 0;

        getLoans().forEach(l => {

            total += Number(l.originalPrincipal || 0);

        });

        return total;

    }

    function outstandingPrincipal() {

        let total = 0;

        getLoans().forEach(l => {

            total += Number(l.remainingPrincipal || 0);

        });

        return total;

    }

    function totalInterestCollected() {

        let total = 0;

        getPayments().forEach(p => {

            total += Number(p.interestPaid || 0);

        });

        return total;

    }

    function totalPrincipalCollected() {

        let total = 0;

        getPayments().forEach(p => {

            total += Number(p.principalPaid || 0);

        });

        return total;

    }

    /*=========================================================
        HELPERS
    =========================================================*/

    function nextId(array) {

        if (array.length === 0) {

            return 1;

        }

        return Math.max(...array.map(item => item.id)) + 1;

    }

    function today() {

        return new Date().toLocaleDateString("en-KE");

    }

    function nextMonthDate() {

        const d = new Date();

        d.setMonth(d.getMonth() + 1);

        return d.toLocaleDateString("en-KE");

    }

    function formatMoney(value) {

        return "KES " + Number(value).toLocaleString();

    }

    /*=========================================================
        PUBLIC API
    =========================================================*/

    window.DB = {

        // Clients
        getClients,
        saveClients,
        addClient,
        getClientByPhone,
        getClientById,
        updateClient,

        // Applications
        getApplications,
        saveApplications,
        addApplication,
        getApplication,
        updateApplication,
        deleteApplication,

        // Loans
        getLoans,
        saveLoans,
        addLoan,
        getLoan,
        getLoanByClient,
        updateLoan,

        // Payments
        getPayments,
        savePayments,
        addPayment,
        getLoanPayments,

        // Staff
        getStaff,
        saveStaff,

        // Statistics
        totalClients,
        totalApplications,
        pendingApplications,
        approvedLoans,
        rejectedLoans,
        totalPrincipalIssued,
        outstandingPrincipal,
        totalInterestCollected,
        totalPrincipalCollected,

        // Helpers
        today,
        nextMonthDate,
        formatMoney

    };

})();
