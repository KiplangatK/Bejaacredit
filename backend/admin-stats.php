<?php

header("Content-Type: application/json");

include "db.php";


// Registered Clients

$clientsQuery = "
SELECT COUNT(*) AS total 
FROM clients
";

$clientsResult = $conn->query($clientsQuery);

$clients = $clientsResult->fetch_assoc();




// Active Loans

$activeQuery = "

SELECT COUNT(*) AS total

FROM loans

WHERE status='Active'

";


$activeResult = $conn->query($activeQuery);

$activeLoans = $activeResult->fetch_assoc();





// Late Loans

$lateQuery = "

SELECT COUNT(*) AS total

FROM loans

WHERE due_date < CURDATE()

AND amount_paid < loan_amount + interest

";


$lateResult = $conn->query($lateQuery);

$lateLoans = $lateResult->fetch_assoc();






// Pending Applications


$pendingQuery = "

SELECT COUNT(*) AS total

FROM loans

WHERE status='Pending'

";


$pendingResult = $conn->query($pendingQuery);

$pendingLoans = $pendingResult->fetch_assoc();







// Return Data


$data = [

"registered_clients" => $clients['total'],

"active_loans" => $activeLoans['total'],

"late_loans" => $lateLoans['total'],

"pending_applications" => $pendingLoans['total']

];



echo json_encode($data);



$conn->close();


?>
