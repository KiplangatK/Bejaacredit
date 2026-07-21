// Bejja Credit Admin Dashboard
// Load statistics from database


document.addEventListener("DOMContentLoaded", function(){


fetch("../backend/admin-stats.php")


.then(response => response.json())


.then(data => {



    // Registered Clients

    document.getElementById("totalClients").innerHTML =
    data.registered_clients;



    // Active Loans

    document.getElementById("activeLoans").innerHTML =
    data.active_loans;



    // Late Loans

    document.getElementById("lateLoans").innerHTML =
    data.late_loans;



    // Pending Applications

    document.getElementById("pendingLoans").innerHTML =
    data.pending_applications;



})



.catch(error => {


console.log(
"Dashboard loading error:",
error
);


});


});
