/*=========================================================
    BEJJA LOAN CREDIT
    DATABASE ENGINE (database.js)
    Version: 1.1
    Fixed Client ID Matching
=========================================================*/

(function () {

"use strict";


/*=========================================================
    INITIALIZE DATABASE
=========================================================*/


function initializeDatabase(){


    if(!localStorage.getItem("clients")){

        localStorage.setItem(
            "clients",
            JSON.stringify([])
        );

    }


    if(!localStorage.getItem("loanApplications")){

        localStorage.setItem(
            "loanApplications",
            JSON.stringify([])
        );

    }


    if(!localStorage.getItem("loans")){

        localStorage.setItem(
            "loans",
            JSON.stringify([])
        );

    }


    if(!localStorage.getItem("payments")){

        localStorage.setItem(
            "payments",
            JSON.stringify([])
        );

    }


    if(!localStorage.getItem("staff")){


        localStorage.setItem(
            "staff",
            JSON.stringify([

                {
                    id:1,
                    username:"admin",
                    password:"admin123",
                    role:"Administrator",
                    active:true
                }

            ])

        );


    }


}


initializeDatabase();




/*=========================================================
    STORAGE FUNCTIONS
=========================================================*/


function read(key){

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}



function write(key,value){

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}




/*=========================================================
    CLIENTS
=========================================================*/


function getClients(){

    return read("clients");

}



function saveClients(data){

    write(
        "clients",
        data
    );

}




function addClient(client){


    const clients=getClients();


    client.id=nextId(clients);


    client.createdAt=today();


    client.status="ACTIVE";


    clients.push(client);


    saveClients(clients);


    return client;


}




function getClientByPhone(phone){


    return getClients().find(
        c => c.phone === phone
    );


}




// FIXED ID SEARCH

function getClientById(id){


    return getClients().find(

        c => String(c.id) === String(id)

    );


}




function updateClient(updatedClient){


    let clients=getClients();



    clients=clients.map(c =>


        String(c.id) === String(updatedClient.id)

        ?

        updatedClient

        :

        c


    );



    saveClients(clients);


}





/*=========================================================
    LOAN APPLICATIONS
=========================================================*/


function getApplications(){

    return read("loanApplications");

}



function saveApplications(data){

    write(
        "loanApplications",
        data
    );

}




function addApplication(application){


    const applications=getApplications();


    application.id=nextId(applications);


    application.applicationDate=today();


    application.status="PENDING";


    applications.push(application);


    saveApplications(applications);


    return application;


}




function getApplication(id){


    return getApplications().find(

        a => String(a.id) === String(id)

    );


}




function updateApplication(updated){


    let apps=getApplications();



    apps=apps.map(a =>


        String(a.id) === String(updated.id)

        ?

        updated

        :

        a


    );



    saveApplications(apps);


}




function deleteApplication(id){


    const apps=getApplications().filter(

        a => String(a.id) !== String(id)

    );


    saveApplications(apps);


}
