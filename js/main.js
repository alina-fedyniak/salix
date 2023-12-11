// -------burger------
document.addEventListener("DOMContentLoaded", function() {
    const initFilterBurgerMenu = () => {
        const burgerIcon = document.querySelector(".burger-icon");
        const burgerMenu = document.querySelector(".burger-menu");

        burgerIcon.addEventListener("click", function () {
            burgerIcon.classList.toggle("active");
            burgerMenu.classList.toggle("active");

            if (burgerMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });
    };
    initFilterBurgerMenu();

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

    //mySwiper
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 15,
        freeMode: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: false,
        },navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            719: {
                slidesPerView: 3,
            },
            340: {
                slidesPerView: 1.2,
                spaceBetween: 10,
            },

        },

    });

    // -------btn-to-top------
    $(function() {
        $.fn.scrollToTop = function() {
            $(this).hide().removeAttr("href");
            if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
            const scrollDiv = $(this);
            $(window).scroll(function() {
                if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
                else $(scrollDiv).fadeIn("slow")
            });
            $(this).click(function() {
                $("html, body").animate({scrollTop: 0}, "slow")
            })
        }
    });

    $(function() {
        $("#go-top").scrollToTop();
    });

    //drop-filter-catalog
    const initFilterAccordions = () => {
        const filterAccordions = document.querySelectorAll('.filterDrop');

        filterAccordions.forEach(function (accordion) {
            accordion.addEventListener('click', function () {
                accordion.classList.toggle('active');
            });

            // Prevent event bubbling for checkboxes in each accordion
            const checkboxes = accordion.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener('click', function (event) {
                    event.stopPropagation();
                });
            });
        });
    };
    initFilterAccordions();

});
