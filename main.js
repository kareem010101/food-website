/* ============================================
   FRESH FOOD — main.js
   • Navbar toggle auto-close on link click
   • Scroll-reveal animations (IntersectionObserver)
   • Navbar shadow on scroll
   ============================================ */

(function () {
    'use strict';

    /* --------------------------------------------------
       1. NAVBAR — Close mobile menu when a link is clicked
       -------------------------------------------------- */
    const navbarCollapse = document.getElementById('mynavbar');
    const navToggler     = document.getElementById('navToggler');

    if (navbarCollapse && navToggler) {
        // Listen for clicks on any nav-link inside the collapsed menu
        navbarCollapse.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                // Only collapse if the menu is actually open (mobile view)
                if (navbarCollapse.classList.contains('show')) {
                    // Use Bootstrap's Collapse API to hide it
                    var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (!bsCollapse) {
                        bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    }
                    bsCollapse.hide();
                }
            });
        });
    }

    /* --------------------------------------------------
       2. NAVBAR — Add "scrolled" class on scroll
       -------------------------------------------------- */
    var navbar = document.getElementById('navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run once on load

    /* --------------------------------------------------
       3. SCROLL-REVEAL — IntersectionObserver
       -------------------------------------------------- */
    var revealElements = document.querySelectorAll(
        '.reveal-left, .reveal-right, .reveal-bottom'
    );

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Unobserve after first reveal so it doesn't re-trigger
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,   // trigger when 12% of element is visible
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealElements.forEach(function (el, i) {
            // Stagger sibling elements in the same parent for a cascade effect
            el.style.transitionDelay = (i % 4) * 0.08 + 's';
            revealObserver.observe(el);
        });
    } else {
        // Fallback: just show everything for older browsers
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* --------------------------------------------------
       4. ACTIVE NAV LINK — Highlight current section
       -------------------------------------------------- */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top    = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id     = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id ||
                        (id === 'home' && link.getAttribute('href') === 'index.html')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();

    /* --------------------------------------------------
       5. MENU CARD — Stagger reveal delay reset per row
       -------------------------------------------------- */
    // Re-apply stagger within each row of reveal-bottom cards
    var menuBoxes    = document.querySelectorAll('.menu .reveal-bottom');
    var gallaryCards = document.querySelectorAll('.gallary .reveal-bottom');
    var teamCards    = document.querySelectorAll('.team .reveal-bottom');

    [menuBoxes, gallaryCards, teamCards].forEach(function (group) {
        group.forEach(function (el, i) {
            el.style.transitionDelay = (i % 4) * 0.12 + 's';
        });
    });

})();
