  /* =========================================
       READER SOCIETY
       Global JavaScript
    ========================================= */


    /* =========================================
       STICKY HEADER
    ========================================= */

    const header =
        document.querySelector(".site-header");

    const hero =
        document.querySelector(".hero");


    if (header && hero) {

        const headerObserver =
            new IntersectionObserver(
                ([entry]) => {

                    header.classList.toggle(
                        "is-scrolled",
                        !entry.isIntersecting
                    );

                },
                {
                    threshold: 0
                }
            );

        headerObserver.observe(hero);

    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            const header =
                document.querySelector(".site-header");

            const menuBtn =
                document.querySelector(
                    ".mobile-menu-button"
                );


            if (!header || !menuBtn) {
                return;
            }


            menuBtn.addEventListener(
                "click",
                () => {

                    header.classList.toggle(
                        "nav-open"
                    );


                    const isOpen =
                        header.classList.contains(
                            "nav-open"
                        );


                    menuBtn.setAttribute(
                        "aria-label",
                        isOpen
                            ? "Close navigation"
                            : "Open navigation"
                    );

                }
            );

        }
    );


    /* =========================================
       SOCIETY COUNTERS
    ========================================= */

    const societySection =
        document.querySelector(".society-section");


    if (societySection) {

        const counters =
            societySection.querySelectorAll(
                ".stat-number[data-target]"
            );


        const animateCounter = (counter) => {

            const target =
                Number(
                    counter.dataset.target
                );


            const duration = 1400;

            const startTime =
                performance.now();


            const update = (currentTime) => {

                const elapsed =
                    currentTime - startTime;


                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                /*
                   Ease-out curve:
                   starts quickly,
                   slows beautifully near the end.
                */

                const eased =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );


                const current =
                    Math.floor(
                        eased * target
                    );


                counter.textContent =
                    current;


                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                } else {

                    counter.textContent =
                        target;

                }

            };


            requestAnimationFrame(update);

        };


        const societyObserver =
            new IntersectionObserver(
                ([entry], observer) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    societySection.classList.add(
                        "is-visible"
                    );


                    counters.forEach(
                        animateCounter
                    );


                    /*
                       Run once only.
                       Scrolling away and back won't
                       restart the animation.
                    */

                    observer.unobserve(
                        societySection
                    );

                },
                {
                    threshold: 0.25
                }
            );


        societyObserver.observe(
            societySection
        );

    }

/* =========================================
   JOURNAL SLIDER
========================================= */

const journalSlider =
    document.querySelector(".journal-slider");

if (journalSlider) {

    const track =
        journalSlider.querySelector(".journal-track");

    const slides =
        journalSlider.querySelectorAll(".journal-slide");

    const nextButton =
        journalSlider.querySelector(".journal-next");

    const prevButton =
        journalSlider.querySelector(".journal-prev");

    const currentNumber =
        journalSlider.querySelector(".journal-current");

    const bigNumber =
        journalSlider.querySelector(".journal-big-number");


    let currentSlide = 0;

    let autoplay;


    /* -----------------------------------------
       UPDATE SLIDE
    ----------------------------------------- */

    const updateJournal = (index) => {

        currentSlide =
            (index + slides.length) %
            slides.length;


        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        slides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "is-active",
                    slideIndex === currentSlide
                );

            }
        );


        const number =
            String(currentSlide + 1)
                .padStart(2, "0");


        currentNumber.textContent =
            number;


        bigNumber.textContent =
            number;

    };


    /* -----------------------------------------
       NEXT / PREVIOUS
    ----------------------------------------- */

    nextButton.addEventListener(
        "click",
        () => {

            updateJournal(
                currentSlide + 1
            );

            restartAutoplay();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            updateJournal(
                currentSlide - 1
            );

            restartAutoplay();

        }
    );


    /* -----------------------------------------
       AUTOPLAY
    ----------------------------------------- */

    const startAutoplay = () => {

        autoplay =
            setInterval(
                () => {

                    updateJournal(
                        currentSlide + 1
                    );

                },
                6500
            );

    };


    const stopAutoplay = () => {

        clearInterval(
            autoplay
        );

    };


    const restartAutoplay = () => {

        stopAutoplay();

        startAutoplay();

    };


    journalSlider.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    journalSlider.addEventListener(
        "mouseleave",
        startAutoplay
    );


    journalSlider.addEventListener(
        "focusin",
        stopAutoplay
    );


    journalSlider.addEventListener(
        "focusout",
        startAutoplay
    );


    /* -----------------------------------------
       KEYBOARD
    ----------------------------------------- */

    journalSlider.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowRight") {

                updateJournal(
                    currentSlide + 1
                );

                restartAutoplay();

            }


            if (event.key === "ArrowLeft") {

                updateJournal(
                    currentSlide - 1
                );

                restartAutoplay();

            }

        }
    );


    /* -----------------------------------------
       START
    ----------------------------------------- */

    updateJournal(0);

    startAutoplay();

}

/* =========================================
   EVENTS SCROLL REVEAL
========================================= */

const eventsSection =
    document.querySelector(".events-section");


if (eventsSection) {

    const eventsObserver =
        new IntersectionObserver(
            ([entry], observer) => {

                if (!entry.isIntersecting) {
                    return;
                }


                eventsSection.classList.add(
                    "is-visible"
                );


                observer.unobserve(
                    eventsSection
                );

            },
            {
                threshold: 0.18
            }
        );


    eventsObserver.observe(
        eventsSection
    );

}

const backToTop =
    document.querySelector(".back-to-top");


if (backToTop) {

    backToTop.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}
