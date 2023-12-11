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

    //initSortCards
    const initSortCards = () => {
        document.getElementById('sortSelect').addEventListener('change', function () {
            const selectedValue = this.value;
            const cardContainer = document.querySelector('.cardsBlock_cards');
            const cards = Array.from(document.querySelectorAll('.card'));

            if (selectedValue === 'popularity') {
                cards.sort(function(a, b) {
                    const popularityA = parseInt(a.getAttribute('data-popularity'));
                    const popularityB = parseInt(b.getAttribute('data-popularity'));
                    return popularityB - popularityA;
                });
            } else if (selectedValue === 'price-high') {
                cards.sort(function (a, b) {
                    const priceA = parseFloat(a.textContent.match(/\d+/)[0]);
                    const priceB = parseFloat(b.textContent.match(/\d+/)[0]);
                    return priceB - priceA;
                });
            } else if (selectedValue === 'price-low') {
                cards.sort(function (a, b) {
                    const priceA = parseFloat(a.textContent.match(/\d+/)[0]);
                    const priceB = parseFloat(b.textContent.match(/\d+/)[0]);
                    return priceA - priceB;
                });
            }

            cards.forEach(function (card) {
                cardContainer.removeChild(card);
            });

            cards.forEach(function (card) {
                cardContainer.appendChild(card);
            });
        });
    };
    initSortCards();

    // -------burger-filter-cards----
    const initBurgerFilterCards = () => {
        const burgerIconFilters = document.querySelectorAll(".burger-iconFilter");
        const burgerFilters = document.querySelectorAll(".burger-filter");
        const closeButtons = document.querySelectorAll('.filterClose');

        burgerIconFilters.forEach(function (burgerIconFilter, index) {
            burgerIconFilter.addEventListener("click", function () {
                toggleMenu(index);
            });

            closeButtons[index]?.addEventListener("click", function () {
                toggleMenu(index);
            });
        });

        function toggleMenu(index) {
            burgerIconFilters[index].classList.toggle("active");
            burgerFilters[index].classList.toggle("active");

            const isOpen = burgerFilters[index].classList.contains("active");
            document.body.style.overflow = isOpen ? "hidden" : "";
        }
    };
    initBurgerFilterCards();

    //initPagination
    const initPagination = () => {
        const pagination = document.getElementById('pagination');
        const slidesContainer = document.querySelector('.cardsBlock_cards');

        const itemsPerPage = 9;
        const totalItems = slidesContainer.children.length;

        if (totalItems > itemsPerPage) {
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = i;
                li.appendChild(a);
                pagination.appendChild(li);
            }

            pagination.addEventListener('click', function (event) {
                if (event.target.tagName === 'A') {
                    const pageNumber = parseInt(event.target.textContent);
                    showPage(pageNumber);

                    // Удаляем класс актив со всех элементов
                    const paginationItems = pagination.querySelectorAll('a');
                    paginationItems.forEach(item => item.classList.remove('active'));

                    // Добавляем класс актив текущему элементу
                    event.target.classList.add('active');
                }
            });

            function showPage(pageNumber) {
                const start = (pageNumber - 1) * itemsPerPage;
                const end = start + itemsPerPage;

                for (let i = 0; i < totalItems; i++) {
                    if (i >= start && i < end) {
                        slidesContainer.children[i].style.display = 'block';
                    } else {
                        slidesContainer.children[i].style.display = 'none';
                    }
                }

                // Скрываем/показываем элементы пагинации в зависимости от текущей страницы
                const paginationItems = pagination.querySelectorAll('li');
                paginationItems.forEach((item, index) => {
                    if (index < totalPages) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            showPage(1);
        } else {
            pagination.style.display = 'none';

            // Показываем все элементы, так как их меньше, чем itemsPerPage
            for (let i = 0; i < totalItems; i++) {
                slidesContainer.children[i].style.display = 'block';
            }
        }
    };

    initPagination();


});
