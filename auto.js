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

/* ==========================
BOOK ARCHIVE JS
============================*/
// 1. Select all your archive book elements

// 1. Select all your archive book elements
//const bookElements = document.querySelectorAll('.archive-book');

//bookElements.forEach(book => {
    //const viewButton = book.querySelector('.view-record');

  //  viewButton.addEventListener('click', () => {
        // 2. Fetch the description text from the data attribute
      //  const descriptionText = book.getAttribute('data-description');

        // 3. Select the target container where the text should appear
        // (Replace '.modal-description' with your actual target class)
     //   const outputContainer = document.querySelector('.modal-description');

      //  if (outputContainer) {
            // 4. Tell the container to respect tabs (\t) and line breaks (\n)
         //   outputContainer.style.whiteSpace = "pre-wrap";

            // 5. Inject the text safely using textContent
        //    outputContainer.textContent = descriptionText;
   //     }
  //  });
//});

/* =========================================
   SMART ARCHIVE ARRANGEMENT
   -----------------------------------------
   Keeps book order intact while creating
   controlled asymmetry.
========================================= */

function arrangeArchiveBooks() {

    const books = [
        ...document.querySelectorAll(".archive-book")
    ];


    /*
        Each position represents a nearby
        visual variation.

        Nothing is allowed to jump wildly
        across the page.
    */

    const layouts = [

        {
            column: 1,
            span: 3,
            offset: 0,
            rotate: -1.2
        },

        {
            column: 5,
            span: 3,
            offset: 35,
            rotate: 1.4
        },

        {
            column: 9,
            span: 3,
            offset: -10,
            rotate: -1.8
        },

        {
            column: 3,
            span: 3,
            offset: 55,
            rotate: 1.8
        },

        {
            column: 7,
            span: 3,
            offset: 15,
            rotate: -1
        },

        {
            column: 10,
            span: 3,
            offset: 45,
            rotate: 1.5
        }

    ];


    books.forEach((book, index) => {

        /*
            Cycle through the nearby layouts.

            Book order NEVER changes.
        */

        const layout =
            layouts[
                index % layouts.length
            ];


        book.style.gridColumn =
            `${layout.column} / span ${layout.span}`;


        book.style.marginTop =
            `${layout.offset}px`;


        book.style.transform =
            `rotate(${layout.rotate}deg)`;

    });

}


arrangeArchiveBooks();

/* =========================================
   BOOK RECORD MODAL
========================================= */

const bookModal =
    document.querySelector("#book-modal");

const modalBackdrop =
    document.querySelector(".book-modal-backdrop");

const modalClose =
    document.querySelector(".book-modal-close");


/* -----------------------------------------
   Book information
----------------------------------------- */

const modalCover =
    document.querySelector("#modal-book-cover");

const modalNumber =
    document.querySelector("#modal-book-number");

const modalYear =
    document.querySelector("#modal-book-year");

const modalTitle =
    document.querySelector("#modal-book-title");

const modalAuthor =
    document.querySelector("#modal-book-author");

const modalRating =
    document.querySelector("#modal-book-rating");

const modalDescription =
    document.querySelector("#modal-book-description");

const modalReaders =
    document.querySelector("#modal-book-readers");

const modalGenre =
    document.querySelector("#modal-book-genre");

const modalDate =
    document.querySelector("#modal-book-date");

const modalRead =
    document.querySelector("#modal-read-button");

const modalGalleryTrack =
    document.querySelector("#modal-gallery-track");

const modalGalleryCount =
    document.querySelector("#modal-gallery-count");

/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryLightbox = 
    document.querySelector("#gallery-lightbox");

const galleryLightboxBackdrop =
    document.querySelector(
        ".gallery-lightbox-backdrop"
    );

const galleryLightboxClose =
    document.querySelector(
        ".gallery-lightbox-close"
    );

const galleryLightboxImage =
    document.querySelector(
        "#gallery-lightbox-image"
    );

const galleryLightboxCaption =
    document.querySelector(
        "#gallery-lightbox-caption"
    );

const galleryLightboxPrev =
    document.querySelector(
        ".gallery-lightbox-prev"
    );

const galleryLightboxNext =
    document.querySelector(
        ".gallery-lightbox-next"
    );


/* -----------------------------------------
   Lightbox state
----------------------------------------- */

let lightboxImages = [];

let currentLightboxImage = 0;


/* =========================================
   SHOW LIGHTBOX IMAGE
========================================= */

function showLightboxImage(index) {

    if (!lightboxImages.length) {
        return;
    }


    /* Loop around */

    currentLightboxImage =
        (index + lightboxImages.length)
        % lightboxImages.length;


    const photo =
        lightboxImages[currentLightboxImage];


    galleryLightboxImage.src =
        photo.image;


    galleryLightboxImage.alt =
        photo.caption ||
        "Reader Society photo";


    galleryLightboxCaption.textContent =
        photo.caption || "";


    /* Hide arrows if there is only one image */

    const hasMultipleImages =
        lightboxImages.length > 1;


    galleryLightboxPrev.hidden =
        !hasMultipleImages;

    galleryLightboxNext.hidden =
        !hasMultipleImages;

}


/* =========================================
   OPEN IMAGE
========================================= */

function openGalleryImage(
    images,
    index
) {

    lightboxImages =
        Array.isArray(images)
            ? images
            : [];

    if (!lightboxImages.length) {
        return;
    }


    currentLightboxImage =
        index || 0;


    showLightboxImage(
        currentLightboxImage
    );


    galleryLightbox.classList.add(
        "is-open"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    /* Prevent page scrolling */

    document.body.classList.add(
        "gallery-lightbox-open"
    );


    /* Focus close button */

    galleryLightboxClose.focus();

}


/* =========================================
   CLOSE IMAGE
========================================= */

function closeGalleryImage() {

    galleryLightbox.classList.remove(
        "is-open"
    );


    galleryLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "gallery-lightbox-open"
    );


    galleryLightboxImage.src = "";


    galleryLightboxCaption.textContent = "";


    lightboxImages = [];

    currentLightboxImage = 0;

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function showPreviousGalleryImage() {

    if (!lightboxImages.length) {
        return;
    }


    showLightboxImage(
        currentLightboxImage - 1
    );

}


/* =========================================
   NEXT IMAGE
========================================= */

function showNextGalleryImage() {

    if (!lightboxImages.length) {
        return;
    }


    showLightboxImage(
        currentLightboxImage + 1
    );

}


/* =========================================
   GALLERY CLICK DELEGATION
========================================= */

modalGalleryTrack.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".modal-gallery-item"
            );


        if (!item) {
            return;
        }


        const items =
            Array.from(
                modalGalleryTrack.querySelectorAll(
                    ".modal-gallery-item"
                )
            );


        const index =
            items.indexOf(item);


        const images =
            items.map(galleryItem => {

                const image =
                    galleryItem.querySelector("img");

                const caption =
                    galleryItem.querySelector(
                        "figcaption"
                    );


                return {

                    image:
                        image?.src || "",

                    caption:
                        caption?.textContent || ""

                };

            }).filter(photo => photo.image);


        openGalleryImage(
            images,
            index
        );

    }
);


/* =========================================
   ARROW CONTROLS
========================================= */

galleryLightboxPrev.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        showPreviousGalleryImage();

    }
);


galleryLightboxNext.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        showNextGalleryImage();

    }
);


/* =========================================
   CLOSE CONTROLS
========================================= */

galleryLightboxClose.addEventListener(
    "click",
    closeGalleryImage
);


galleryLightboxBackdrop.addEventListener(
    "click",
    closeGalleryImage
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !galleryLightbox.classList.contains(
                "is-open"
            )
        ) {
            return;
        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();

            showPreviousGalleryImage();

        }


        if (event.key === "ArrowRight") {

            event.preventDefault();

            showNextGalleryImage();

        }


        if (event.key === "Escape") {

            event.preventDefault();

            closeGalleryImage();

        }

    }
);
/* GALLERY *//* =========================================
   BOOK GALLERY
========================================= */

function setupGallery(gallery) {

    modalGalleryTrack.innerHTML = "";


    /* No gallery */

    if (!Array.isArray(gallery) || !gallery.length) {

        modalGalleryCount.textContent =
            "NO PHOTOS";

        return;

    }


    /* Photo count */

    modalGalleryCount.textContent =
        `${String(gallery.length).padStart(2, "0")} ${
            gallery.length === 1
                ? "PHOTO"
                : "PHOTOS"
        }`;


    /* Create photos */

    gallery.forEach(photo => {

        const figure =
            document.createElement("figure");

        figure.className =
            "modal-gallery-item";

	const tapHint = document.createElement("span");

tapHint.className = "modal-gallery-tap-hint";
tapHint.innerHTML = "↗ <span>TAP TO EXPAND</span>";

figure.appendChild(tapHint);


        const imageWrapper =
            document.createElement("div");

        imageWrapper.className =
            "modal-gallery-image";


        const image =
            document.createElement("img");

        image.src =
            photo.image;

        image.alt =
            photo.caption || "Book club photo";

        image.loading =
            "lazy";


        const caption =
            document.createElement("figcaption");

        caption.textContent =
            photo.caption || "";


        imageWrapper.appendChild(
            image
        );

        figure.appendChild(
            imageWrapper
        );

        figure.appendChild(
            caption
        );


        modalGalleryTrack.appendChild(
            figure
        );


    });

}


/* -----------------------------------------
   Quotes
----------------------------------------- */

const modalQuote =
    document.querySelector("#modal-book-quote");

const modalQuoteCounter =
    document.querySelector("#modal-quote-counter");

const modalQuoteControls =
    document.querySelector("#modal-quote-controls");


let currentQuote = 0;

let activeQuotes = [];

let quoteTimer;


/* =========================================
   QUOTE CAROUSEL
========================================= */


/* -----------------------------------------
   Setup quotes
----------------------------------------- */

function setupQuotes(quotes) {

    activeQuotes =
        Array.isArray(quotes)
            ? quotes
            : [];

    currentQuote = 0;

    modalQuoteControls.innerHTML = "";


    /* -------------------------------------
       No quotes
    ------------------------------------- */

    if (!activeQuotes.length) {

        modalQuote.textContent =
            "“A story worth remembering.”";

        modalQuoteCounter.textContent =
            "01 / 01";

        return;

    }


    /* -------------------------------------
       Create quote controls
    ------------------------------------- */

    activeQuotes.forEach(
        (quote, index) => {

            const dot =
                document.createElement("button");


            dot.type =
                "button";


            dot.className =
                "modal-quote-dot";


            dot.setAttribute(
                "aria-label",
                `Show quote ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    showQuote(index);

                    startQuoteTimer();

                }
            );


            modalQuoteControls.appendChild(
                dot
            );

        }
    );


    showQuote(0);

    startQuoteTimer();

}


/* -----------------------------------------
   Show quote
----------------------------------------- */

function showQuote(index) {

    if (!activeQuotes.length) {

        return;

    }


    currentQuote =
        index;


    /* -------------------------------------
       Fade out
    ------------------------------------- */

    modalQuote.style.opacity =
        "0";

    modalQuote.style.transform =
        "translateY(5px)";


    /* -------------------------------------
       Change quote
    ------------------------------------- */

    setTimeout(() => {

        modalQuote.textContent =
            activeQuotes[currentQuote];


        modalQuote.style.opacity =
            "1";

        modalQuote.style.transform =
            "translateY(0)";

    }, 150);


    /* -------------------------------------
       Counter
    ------------------------------------- */

    modalQuoteCounter.textContent =
        `${String(currentQuote + 1).padStart(2, "0")} / ${String(activeQuotes.length).padStart(2, "0")}`;


    /* -------------------------------------
       Active dot
    ------------------------------------- */

    modalQuoteControls
        .querySelectorAll(".modal-quote-dot")
        .forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentQuote
            );

        });

}


/* -----------------------------------------
   Start automatic quote rotation
----------------------------------------- */

function startQuoteTimer() {

    stopQuoteTimer();


    if (activeQuotes.length <= 1) {

        return;

    }


    quoteTimer =
        setInterval(() => {

            const nextQuote =
                (currentQuote + 1)
                % activeQuotes.length;


            showQuote(nextQuote);

        }, 5500);

}


/* -----------------------------------------
   Stop automatic quote rotation
----------------------------------------- */

function stopQuoteTimer() {

    if (quoteTimer) {

        clearInterval(
            quoteTimer
        );

        quoteTimer = null;

    }

}


/* =========================================
   OPEN BOOK MODAL
========================================= */

function openBookModal(book) {

    const data =
        book.dataset;


    /* -------------------------------------
       Book cover
    ------------------------------------- */

    const cover =
        book.querySelector(
            ".archive-cover img"
        );


    if (cover) {

        modalCover.src =
            cover.src;

        modalCover.alt =
            cover.alt || data.title || "";

    }


    /* -------------------------------------
       Basic information
    ------------------------------------- */

    modalNumber.textContent =
        book.querySelector(
            ".archive-number"
        )?.textContent.trim()
        || "";

    modalYear.textContent =
        data.year || "";

    modalTitle.textContent =
        data.title || "";

    modalAuthor.textContent =
        data.author || "";

    modalRating.textContent =
        data.rating || "★★★★★";


    modalDescription.textContent =
        data.description ||
        "The Reader Society's record for this book.";


    modalReaders.textContent =
        data.readers ||
        "—";


    modalGenre.textContent =
        (data.genre || "BOOK")
            .toUpperCase();


    modalDate.textContent =
        data.discussion ||
        "—";


    modalRead.href =
        data.readUrl || "#";


    /* -------------------------------------
       Quotes
    ------------------------------------- */

    let quotes = [];


    try {

        quotes =
            JSON.parse(
                data.quotes || "[]"
            );

    } catch (error) {

        console.warn(
            "Could not read book quotes:",
            error
        );

        quotes = [];

    }


    setupQuotes(
        quotes
    );

let gallery = [];

try {

    gallery =
        JSON.parse(
            data.gallery || "[]"
        );

} catch (error) {

    console.warn(
        "Could not read book gallery:",
        error
    );

    gallery = [];

}

setupGallery(gallery);


    /* -------------------------------------
       Open modal
    ------------------------------------- */

    bookModal.classList.add(
        "is-open"
    );


    bookModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    /* -------------------------------------
       Accessibility
    ------------------------------------- */

    modalClose.focus();

}


/* =========================================
   CLOSE BOOK MODAL
========================================= */

function closeBookModal() {

    /* If the lightbox is open, close it too */
    if (
        galleryLightbox.classList.contains("is-open")
    ) {
        closeGalleryImage();
    }

    bookModal.classList.remove(
        "is-open"
    );

    bookModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    document.body.classList.remove(
        "gallery-lightbox-open"
    );

    stopQuoteTimer();
}


/* =========================================
   BOOK RECORD BUTTONS
========================================= */

document
    .querySelectorAll(".view-record")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const book =
                    button.closest(
                        ".archive-book"
                    );


                if (book) {

                    openBookModal(
                        book
                    );

                }

            }
        );

    });


/* =========================================
   CLOSE CONTROLS
========================================= */


/* Close button */

modalClose.addEventListener(
    "click",
    closeBookModal
);


/* Backdrop */

modalBackdrop.addEventListener(
    "click",
    closeBookModal
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            bookModal.classList.contains(
                "is-open"
            )
        ) {

            closeBookModal();

        }

    }
);



