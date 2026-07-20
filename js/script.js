/* =====================================
        BEJJA LOAN CREDIT
        MAIN JAVASCRIPT
===================================== */


/* =====================================
        NAVBAR SCROLL EFFECT
===================================== */


window.addEventListener("scroll", function(){

    const navbar = document.querySelector(".navbar");


    if(window.scrollY > 50){

        navbar.style.background = "#083358";

        navbar.style.padding = "10px 0";

    }

    else{

        navbar.style.background = "#0F4C81";

        navbar.style.padding = "18px 0";

    }

});




/* =====================================
        LOAN CARD ANIMATION
===================================== */


const cards = document.querySelectorAll(".loan-card");


cards.forEach(card => {


    card.addEventListener("mouseenter",()=>{


        card.style.transform="translateY(-10px)";


    });



    card.addEventListener("mouseleave",()=>{


        card.style.transform="translateY(0)";


    });


});





/* =====================================
        AUTO YEAR FOOTER
===================================== */


const year = new Date().getFullYear();


const footerYear = document.querySelector("footer p:last-child");


if(footerYear){

    footerYear.innerHTML =
    "© " + year + " Bejja Loan Credit. All Rights Reserved.";

}




/* =====================================
        BUTTON CLICK EFFECT
===================================== */


const buttons = document.querySelectorAll(".btn");


buttons.forEach(button=>{


    button.addEventListener("click",function(){


        button.style.transform="scale(.95)";


        setTimeout(()=>{


            button.style.transform="scale(1)";


        },150);


    });


});





/* =====================================
        MOBILE MENU CLOSE
===================================== */


const menuLinks=document.querySelectorAll(".nav-link");


menuLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        const menu=document.querySelector(".navbar-collapse");


        if(menu.classList.contains("show")){


            menu.classList.remove("show");


        }


    });


});
