function changeMobileMenu(){

    const burger = document.querySelector(".burger");
    const menu =  document.querySelector(".header .menu");
    const overflow = document.querySelector(".header__overflow");

    burger.classList.toggle("burger--open");
    menu.classList.toggle("menu--open");
    overflow.classList.toggle("header__overflow--open");
    document.body.classList.toggle("body--noscroll");
    
}

function initMobileMenu(){

    const burger = document.querySelector(".burger");
    const overflow = document.querySelector(".header__overflow");

    const menuItems = document.querySelector(".menu__items");

    [burger, overflow].forEach( 
        el => el.addEventListener("click", () => {
            changeMobileMenu();
        }) 
    );

    menuItems.addEventListener("click", e => {
        if(e.target.classList.contains("menu__link"))
            changeMobileMenu();
    }) 

}

function init(){
    initMobileMenu();
}



init();