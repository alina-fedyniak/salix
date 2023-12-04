// -------burger------
document.addEventListener("DOMContentLoaded", function() {
    const burgerIcon = document.querySelector(".burger-icon");
    const burgerMenu = document.querySelector(".burger-menu");

    burgerIcon.addEventListener("click", function() {
        burgerIcon.classList.toggle("active");
        burgerMenu.classList.toggle("active");

        if (burgerMenu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });
});

//menu-active
$(document).ready(function() {
    const currentPage = window.location.pathname.split('/').pop();

    $('.header-menu a').each(function() {
        const linkPage = $(this).attr('href').split('/').pop();
        if (linkPage === currentPage) {
            $(this).addClass('current-menu-item');
        }
    });
});