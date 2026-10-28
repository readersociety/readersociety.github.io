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

/* =========================================
   Members Page JS
========================================= */
const memberProfiles = [
   
{
    number: "01",
    name: "Elischa Cruz",
    role: "CEO · Society Founder",
    image: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_noa_main.png?raw=true,
    hoverImage: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_noa_alt.png?raw=true", // Replace with the second image
    bio: "Noa is sixteen years old. She is the second born of four kids, and has an older sister and two younger brothers. \n \nIn her free time, she enjoys listening to music, reading, and occasionally learning new kpop dances. She often spends more time than she should looking for new books, even though her reading list is far from finished. Her favorite genres are realistic fiction and fantasy. She will read a range of things though, from novels to manga to reddit posts about the nichest things, and video game walkthroughs (even 39 clues, i'm just sensitive).",
    favoriteBook: "Skip and Loafer (i thinkk?)",
    favoriteGenre: "Splice of Life",
    quote: "Sned the pictures gng :D",
    fact: "Loves discovering new books"
},

{
    number: "02",
    name: "Elischa Cruz",
    role: "CEO · Society Founder",
    image: "../rs/rs_pfp_noa_main.png",
    hoverImage: "../rs/rs_pfp_noa_alt.png", // Replace with the second image
    bio: "Noa is sixteen years old. She is the second born of four kids, and has an older sister and two younger brothers. \n \nIn her free time, she enjoys listening to music, reading, and occasionally learning new kpop dances. She often spends more time than she should looking for new books, even though her reading list is far from finished. Her favorite genres are realistic fiction and fantasy. She will read a range of things though, from novels to manga to reddit posts about the nichest things, and video game walkthroughs (even 39 clues, i'm just sensitive).",
    favoriteBook: "Skip and Loafer (i thinkk?)",
    favoriteGenre: "Splice of Life",
    quote: "Write a memorable quote from this member here.",
    fact: "Loves discovering new books"
},

{
    number: "03",
    name: "Yumi Aly",
    role: "Member · CEO's Cousin",
    image: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_yumi_main.png?raw=true",
    hoverImage: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_yumi_alt.png?raw=true", // Replace with the second image
    bio: "to describe myself in a few paragraphs is hard for two reasons: one, there’s so much to say, and two, who am i even. because what defines us even, is it the things we like or the thoughts running in our mind? that’s lowkey a preview as to who i am HAHAHAHA. \n \nI’m naomi mogueis, mostly known as yumi or aly! i’m currently 15, with 16 looming ominously around the corner this december. i have a bunch of interests and hobbies, but the most predominant are: reading, playing instruments/singing, rage/joy-baiting my friends, doing daily puzzles (like sudoku and wordle), arts n' crafts of many sorts, and biking around my neighborhood undisturbed(!), and debatingg!! \n \nI feel self-conscious – but i’m honestly a really opinionated person (which is why i love debate, it grounds me) but at the same time, i’m too emotional for my own good :’)). i laugh, if not cry, at almost everything so i think that sums up a lot of things. i don’t really like talking about myself like this HAHA, so just get to know me teehee✌️ CODER'S EDIT: Wow you do learn something new everyday about your friends...",
    favoriteBook: "As Long as the Lemon Trees Grow",
    favoriteGenre: "Knees",
    quote: "HELP",
    fact: "Yumi once debated in the UN World Security Council"
},

{
    number: "04",
    name: "Austin ''Jumpsacre'' Arceo",
    role: "Member · RS' Main Source of Scary Stickers",
    image: ".https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_au_main.png?raw=true",
    hoverImage: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_au_alt.png?raw=true", // Replace with the second image
    bio: "Austin, or Tin, is just a casual 15 year old homeschooler who unintentionally joined the book club, thinking it was a writer's club since he has a knack for writing poetry and literature. Though he eventually decieded on staying, realizing he needed to learn how to do something apart from procrastinating. He is the eldset out of the two other siblings in his family. \n \nHe enjoys playing instruments, doing sports and listening to music. He dreams of becoming a professional athlete in literally any sport (maybe even an Olympian), living a Christ-centered life, and eventually graduating college with honors before becoming a lawyer. CODER EDIT: He'll fr win every case if he keeps doing jumpscares on the judges and stuff.",
    favoriteBook: "How to Scare Your Friends: The Art of Jumpscaring",
    favoriteGenre: "Horror",
    quote: "Write a memorable quote from this member here.",
    fact: "Loves discovering new books"
},

{
    number: "05",
    name: "Qorein",
    role: "Member · Photographer",
    image: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_q_main.png?raw=true",
    hoverImage: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_q_alt.png?raw=true", // Replace with the second image
    bio: "Qorein, you can call her Q or banna Q, whichever floats your boat. She is a 15-year-old student-athlete, photographer, and artist. She is the first born daughter, and an older sister to her one and only brother. (Lets face it, one brother is enough for a lifetime). Her faveorite novels are City Spies and the Summer I Turned Pretty, but she enjoys reaing a wide range of genres. In her spare time, she enjoys reading, journaling, taking pictures with her camera, doing art-related hobbies, binge-watching Netflix, and practicing jiu-jitsu.",
    favoriteBook: "Nang don na sa bio mag-basa ka kasi ngani",
    favoriteGenre: "-_-",
    quote: "Someone kick him out!",
    fact: "She once coached Jackie Chan for Karate Kid in jiu-jitsu"
},
{
    number: "06",
    name: "Claudia",
    role: "Member · Cosplayer · Def NOT the AI chatbot model · Cookies",
    image: ".https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_claudia_main.png?raw=true",
    hoverImage: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_claudia_alt.png?raw=true", // Replace with the second image
    bio: "The middle child among three siblings. Claudia is a writer in the making and is currently working on her soon to be published novel, and she runs a blog with miscellaneous arcticles. In her free time, she watches anime and cosplays her favorite characters when she goes to anime events. She is highly interested in things she likes and will most likely share something about it when you talk to her. Though not perfect, shde loves to draw and paint her original chractersm which is the only way she shows the love to them when she's not torturing them in her stories. SHe reads all kinds of media, from novels to mango to newspaper articles and even fanfiction.",
    favoriteBook: "Dr. Strange.",
    favoriteGenre: "Does anime count?",
    quote: "The bond between Nezuko and me, can't be severed by anyone",
    fact: "In the year 2040, she and her brand CCo. (or Claude's Comics) became Marvel and DC's top competitor."
},
{
    number: "07",
    name: "Ava",
    role: "Member · Aspiring Writer",
    image: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_ava_main.png?raw=true",
    hoverImage: ".https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_ava_alt.png?raw=true",
    bio: "Ava is an aspiring artist/writer/actress/singer/songwriter/ (I haven't decided yet.) is the oldest daughter of 2 kids. She writes and draws her original characters and occasionally makes fanart of her favorite characters. Her projects are writing Filipino covers of her favorite songs (Writing on the Wall, Nowhere, etc.).",
    favoriteBook: "uhmmmm......... (404 Error)",
    favoriteGenre: "Does anime count?",
    quote: "I want to cry, but I also don't want to ruin my makeup.",
    fact: "Anu bayan. She's your friend you should know na."
},
{
    number: "08",
    name: "Jamie",
    role: "Member  · 5 Stages of Grief (ask Iris)"
    number: "08",
    name: "Jamie",
    role: "Member · Aspiring Writer",
    image: ".https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_jamie_main.png?raw=true",
    hoverImage: "https://github.com/readersociety/readersociety.github.io/blob/main/rs_images/people_pfps/rs_pfp_jamie_alt.png?raw=true",
    bio: "Hiii you can call me Jamie or whatever floats your boat.. I’m a 14 year old and a middle child out of 4 children. \n \nThe things I like are: games, watching, singing, and music. My music taste is very mixed but heres some of the artists I like rn: Laufey, Beabadoobee, wave to earth, twice, ILLIT and other kpop groups!! \n \nMy personality (?) I’m sort of quiet and loud at the same time I guess it’ll just depend on my mood and the situation, and I’m really up to anything if you convince me enough LMAO",
    favoriteBook: "she's alive, go ask her",
    favoriteGenre: "👆🏼",
    quote: "Patience is a virtue.",
    fact: "Anu bayan. She's your friend you should know na."
},",
    image: "../rs/rs_pfp_jamie_main.png",
    hoverImage: "../rs/rs_pfp_jamie_alt.png",
    bio: "Hiii you can call me Jamie or whatever floats your boat.. I’m a 14 year old and a middle child out of 4 children. \n \nThe things I like are: games, watching, singing, and music. My music taste is very mixed but heres some of the artists I like rn: Laufey, Beabadoobee, wave to earth, twice, ILLIT and other kpop groups!! \n \nMy personality (?) I’m sort of quiet and loud at the same time I guess it’ll just depend on my mood and the situation, and I’m really up to anything if you convince me enough LMAO",
    favoriteBook: "she's alive, go ask her",
    favoriteGenre: "👆🏼",
    quote: "Patience is a virtue.",
    fact: "Anu bayan. She's your friend you should know na."
},
{
    number: "09",
    name: "JC",
    role: "Member · Lola according to some-who-will-not-be-named (NOT ME DON'T KILL ME I DIDN'T HAVE THIS IDEA)",
    image: "../rs/rs_pfp_jamie_main.png",
    hoverImage: "../rs/rs_pfp_jamie_alt.png",
    bio: "Hiii you can call me Jamie or whatever floats your boat.. I’m a 14 year old and a middle child out of 4 children. \n \nThe things I like are: games, watching, singing, and music. My music taste is very mixed but heres some of the artists I like rn: Laufey, Beabadoobee, wave to earth, twice, ILLIT and other kpop groups!! \n \nMy personality (?) I’m sort of quiet and loud at the same time I guess it’ll just depend on my mood and the situation, and I’m really up to anything if you convince me enough LMAO",
    favoriteBook: "she's alive, go ask her",
    favoriteGenre: "👆🏼",
    quote: "Patience is a virtue.",
    fact: "Anu bayan. She's your friend you should know na."
},
{
    number: "10",
    name: "Genesis",
    role: "Member · Newest",
    image: "../rs/rs_pfp_jamie_main.png",
    hoverImage: "../rs/rs_pfp_jamie_alt.png",
    bio: "Hiii you can call me Jamie or whatever floats your boat.. I’m a 14 year old and a middle child out of 4 children. \n \nThe things I like are: games, watching, singing, and music. My music taste is very mixed but heres some of the artists I like rn: Laufey, Beabadoobee, wave to earth, twice, ILLIT and other kpop groups!! \n \nMy personality (?) I’m sort of quiet and loud at the same time I guess it’ll just depend on my mood and the situation, and I’m really up to anything if you convince me enough LMAO",
    favoriteBook: "she's alive, go ask her",
    favoriteGenre: "👆🏼",
    quote: "Patience is a virtue.",
    fact: "Anu bayan. She's your friend you should know na."
},

];

const modal = document.getElementById("member-modal");
const dialog = modal.querySelector(".member-modal-dialog");
const closeButton = modal.querySelector(".member-modal-close");
const backdrop = modal.querySelector(".member-modal-backdrop");

const fields = {
    number: document.getElementById("member-modal-number"),
    name: document.getElementById("member-modal-name"),
    role: document.getElementById("member-modal-role"),
    image: document.getElementById("member-modal-image"),
    bio: document.getElementById("member-modal-bio"),
    book: document.getElementById("member-modal-book"),
    genre: document.getElementById("member-modal-genre"),
    quote: document.getElementById("member-modal-quote"),
    fact: document.getElementById("member-modal-fact")
};

let previouslyFocusedElement = null;

function openMemberModal(index) {
    const member = memberProfiles[index];
    if (!member) return;

    previouslyFocusedElement = document.activeElement;

    fields.number.textContent = member.number;
    fields.name.textContent = member.name;
    fields.role.textContent = member.role;
    fields.image.src = member.image;
    fields.image.alt = member.name;
    fields.bio.textContent = member.bio;
    fields.book.textContent = member.favoriteBook;
    fields.genre.textContent = member.favoriteGenre;
    fields.quote.textContent = `“${member.quote}”`;


    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("member-modal-open");

    dialog.focus();
}

function closeMemberModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("member-modal-open");

    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
}


/* Close the member modal */

if (closeButton) {
    closeButton.addEventListener("click", closeMemberModal);
}

if (backdrop) {
    backdrop.addEventListener("click", closeMemberModal);
}

/* Close with Escape key */

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modal.classList.contains("is-open")
    ) {
        closeMemberModal();
    }
});



document.querySelectorAll(".member-card").forEach((card, index) => {
    const member = memberProfiles[index];
    if (!member) return;

    const button = card.querySelector(".member-photo");
    if (!button) return;

    let image = button.querySelector("img");

    // Set the primary portrait.
    if (image) {
        image.src = member.image;
        image.alt = member.name;
        image.classList.add("member-photo-primary");
    }

    // Add the alternate portrait only when one is provided.
    if (
        member.hoverImage &&
        !member.hoverImage.includes("YOUR-IMAGE-HERE")
    ) {
        let hoverImage = button.querySelector(".member-photo-hover");

        if (!hoverImage) {
            hoverImage = document.createElement("img");
            hoverImage.className = "member-photo-hover";
            hoverImage.alt = "";
            hoverImage.setAttribute("aria-hidden", "true");
            hoverImage.draggable = false;
            button.appendChild(hoverImage);
        }

        hoverImage.src = member.hoverImage;
    }

    button.setAttribute(
        "aria-label",
        `View ${member.name}'s profile`
    );

    button.addEventListener("click", () => {
        openMemberModal(index);
    });
});




/* =========================================
   MEMBER GALLERY SWIPE NAVIGATION
========================================= */

const memberGallery = document.querySelector(".members-gallery");
const galleryCards = [
    ...document.querySelectorAll(".members-gallery .member-card")
];

const galleryProgress = document.getElementById(
    "members-gallery-progress"
);

const galleryDots = document.getElementById(
    "members-gallery-dots"
);

let activeGalleryIndex = 0;
let galleryScrollFrame = null;


/* Build one dot per member. */

if (memberGallery && galleryProgress && galleryDots) {

    galleryDots.innerHTML = "";

    galleryCards.forEach((card, index) => {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "members-gallery-dot";
        dot.setAttribute(
            "aria-label",
            `Go to member ${index + 1}`
        );

        dot.addEventListener("click", () => {

            card.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "nearest",
                inline: "center"
            });

        });

        galleryDots.appendChild(dot);

    });


    const dots = [
        ...galleryDots.querySelectorAll(".members-gallery-dot")
    ];


    function updateGalleryProgress() {

        if (!galleryCards.length) return;

        const galleryCenter =
            memberGallery.getBoundingClientRect().left +
            memberGallery.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        galleryCards.forEach((card, index) => {

            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(galleryCenter - cardCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }

        });

        activeGalleryIndex = closestIndex;

        galleryProgress.textContent =
            `${String(closestIndex + 1).padStart(2, "0")} / ${String(galleryCards.length).padStart(2, "0")}`;

        dots.forEach((dot, index) => {

            const isActive = index === closestIndex;

            dot.classList.toggle("is-active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "step");
            } else {
                dot.removeAttribute("aria-current");
            }

        });

    }


    memberGallery.addEventListener("scroll", () => {

        if (galleryScrollFrame !== null) {
            cancelAnimationFrame(galleryScrollFrame);
        }

        galleryScrollFrame = requestAnimationFrame(() => {
            updateGalleryProgress();
            galleryScrollFrame = null;
        });

    }, { passive: true });


    window.addEventListener("resize", updateGalleryProgress);

    updateGalleryProgress();

}



/* =========================================
   MEMBERS: RADIAL CAROUSEL ROTATION
========================================= */


/* =========================================
   MEMBERS: SEMICIRCLE CAROUSEL
========================================= */

(() => {
    const stage = document.getElementById("members-radial-stage");
    const gallery = stage?.querySelector(".members-gallery");
    const sticky = stage?.querySelector(".members-radial-sticky");

    if (!stage || !gallery || !sticky) return;

    const cards = [...gallery.querySelectorAll(".member-card")];
    if (!cards.length) return;

    const count = cards.length;
    stage.style.setProperty("--member-count", count);

    let frame = null;

    function updateCarousel() {
        frame = null;

        const rect = stage.getBoundingClientRect();
        const scrollDistance = stage.offsetHeight - window.innerHeight;

	const startOffset = window.innerHeight * 0.10; // starts 8% of a screen earlier

        const progress = scrollDistance > 0
            ? Math.max(0, Math.min(1, -rect.top / scrollDistance))
            : 0;

        // The featured member moves one card at a time.
        const activePosition = progress * (count - 1);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const mobile = width <= 700;

        // Keep the arc within the screen on small devices.
        const radiusX = mobile
            ? width * 0.34
            : Math.min(width * 0.43, height * 0.58);

        const radiusY = mobile
            ? height * 0.35
            : height * 0.57;

        const angleStep = mobile ? 11 : 18;
        const centerX = width / 2;
        const arcBaseY = mobile ? height * 0.80 : height * 0.91;

        cards.forEach((card, index) => {
            const offset = index - activePosition;
            const angle = offset * angleStep * Math.PI / 180;

            const x = centerX + Math.sin(angle) * radiusX;
            const y = arcBaseY - Math.cos(angle) * radiusY;

            const distance = Math.abs(offset);
            const visible = distance < (mobile ? 3.2 : 4.2);
            const focused = distance < 0.48;

            card.style.left = `${x}px`;
            card.style.top = `${y}px`;
            card.style.opacity = visible
                ? String(Math.max(0.12, 1 - distance * 0.24))
                : "0";
            card.style.filter = focused
                ? "none"
                : `blur(${Math.min(distance * 0.7, 2)}px) grayscale(${Math.min(distance * 0.15, 0.65)})`;
            card.style.scale = focused
                ? "1"
                : String(Math.max(0.68, 1 - distance * 0.075));
            card.style.zIndex = String(
                100 - Math.round(distance * 10)
            );
            card.style.pointerEvents = visible ? "auto" : "none";

            card.classList.toggle("is-focused", focused);
            card.setAttribute("aria-hidden", visible ? "false" : "true");
        });
    }

    function requestUpdate() {
        if (frame !== null) return;
        frame = requestAnimationFrame(updateCarousel);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    updateCarousel();
})();


