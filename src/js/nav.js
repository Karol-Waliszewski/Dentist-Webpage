const navModule = (function () {

    // DOM Cache
    var nav = document.querySelector('.nav'),
        logo = document.querySelector('.nav__logo');

    // Methods
    var checkScrollPosition = function () {
        var scrollPos = window.scrollY;
        if (scrollPos > 80) {
            addScrollClass();
        } else {
            removeScrollClass();
        }
    };

    var addScrollClass = function () {
        // Checking if scroll class is already on nav
        if (!nav.classList.contains('nav--scroll')) {
            // Updateing nav classes
            nav.classList.add('nav--scroll');
            logo.setAttribute('src', 'img/logo--lorem--scroll.svg');
        } else {
            // Updateing nav classes
            nav.classList.remove('nav');
        }
    };

    var removeScrollClass = function () {
        // Updateing nav classes
        nav.classList.add('nav');
        nav.classList.remove('nav--scroll');
        logo.setAttribute('src', 'img/logo--lorem.svg');
    };

    // Event Listeners
    window.addEventListener('scroll', checkScrollPosition);

    checkScrollPosition();
})();
