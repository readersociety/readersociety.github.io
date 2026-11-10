/*
 * MCU intro preloader.
 * Put the authorized video at videos/mcu-intro.mp4, or change VIDEO_URL below.
 */
document.addEventListener("DOMContentLoaded", () => {
  const VIDEO_URL = "videos/mcu-intro.mp4";

  // Load the preloader's styles without requiring an edit to mcu-history.html.
  if (!document.querySelector('link[data-mcu-preloader-styles]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "mcu-preloader.css";
    stylesheet.dataset.mcuPreloaderStyles = "";
    document.head.appendChild(stylesheet);
  }

  const preloader = document.createElement("div");
  preloader.className = "mcu-preloader";
  preloader.setAttribute("role", "dialog");
  preloader.setAttribute("aria-modal", "true");
  preloader.setAttribute("aria-labelledby", "mcu-preloader-title");
  preloader.setAttribute("aria-describedby", "mcu-preloader-description");
  preloader.innerHTML = `
    <section class="mcu-preloader__panel">
      <p class="mcu-preloader__eyebrow">THE MARVEL ARCHIVE</p>
      <h1 class="mcu-preloader__title" id="mcu-preloader-title">A Universe of Stories</h1>
      <p class="mcu-preloader__description" id="mcu-preloader-description">
        Choose how you would like to begin.
      </p>
      <video class="mcu-preloader__video" playsinline preload="none"
        aria-label="Marvel history introduction"></video>
      <div class="mcu-preloader__choices">
        <button class="mcu-preloader__button mcu-preloader__button--primary"
          type="button" data-intro-sound>Watch with sound</button>
        <button class="mcu-preloader__button" type="button" data-intro-muted>
          Watch muted</button>
      </div>
      <button class="mcu-preloader__skip" type="button" data-intro-skip>
        Skip intro <span aria-hidden="true">→</span>
      </button>
    </section>`;
  document.body.prepend(preloader);
  document.body.classList.add("mcu-preloader-open");

  const video = preloader.querySelector("video");
  const choices = preloader.querySelector(".mcu-preloader__choices");
  const soundButton = preloader.querySelector("[data-intro-sound]");
  const mutedButton = preloader.querySelector("[data-intro-muted]");
  const skipButton = preloader.querySelector("[data-intro-skip]");
  let dismissed = false;

  function dismissPreloader() {
    if (dismissed) return;
    dismissed = true;
    video.pause();
    preloader.classList.add("is-leaving");
    document.body.classList.remove("mcu-preloader-open");

    const removeOverlay = () => preloader.remove();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      removeOverlay();
    } else {
      preloader.addEventListener("transitionend", removeOverlay, { once: true });
      // Ensure removal even if transitionend is not fired by the browser.
      window.setTimeout(removeOverlay, 600);
    }
  }

  function startIntro(muted) {
    video.src = VIDEO_URL;
    video.muted = muted;
    video.hidden = false;
    video.controls = true;
    choices.hidden = true;
    preloader.classList.add("is-playing");

    const playback = video.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => dismissPreloader());
    }
  }

  soundButton.addEventListener("click", () => startIntro(false));
  mutedButton.addEventListener("click", () => startIntro(true));
  skipButton.addEventListener("click", dismissPreloader);
  video.addEventListener("ended", dismissPreloader);
  video.addEventListener("error", dismissPreloader);

  preloader.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dismissPreloader();
    }
  });

  soundButton.focus();
});


document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector("#timeline");
  const movieModal = document.querySelector("#movie-modal");
  const modalContent = document.querySelector("#modal-content");
  const modalClose = document.querySelector("#modal-close");

  if (!timeline || !movieModal || !modalContent || !modalClose) {
    console.error("Marvel timeline: Required HTML elements were not found.");
    return;
  }

  let previousFocus = null;
  let galleryReturnFocus = null;

  const closeAnimations = new WeakMap();

  // ----------------------------------------
  // DIALOG ANIMATIONS AND CLOSING
  // ----------------------------------------

  function cancelPendingClose(dialog) {
    const animation = closeAnimations.get(dialog);

    if (animation) {
      animation.cancel();
      closeAnimations.delete(dialog);
    }
  }

  function closeWithAnimation(dialog) {
    if (!dialog.open || closeAnimations.has(dialog)) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      dialog.close();
      return;
    }

    const animation = dialog.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0) scale(1)"
        },
        {
          opacity: 0,
          transform: "translateY(18px) scale(0.98)"
        }
      ],
      {
        duration: 180,
        easing: "ease-in",
        fill: "forwards"
      }
    );

    closeAnimations.set(dialog, animation);

    animation.finished
      .then(() => {
        // Ignore an animation that was cancelled or replaced.
        if (closeAnimations.get(dialog) !== animation) return;

        closeAnimations.delete(dialog);

        if (dialog.open) {
          dialog.close();
        }

        // IMPORTANT: Remove the animation's final visual state.
        animation.cancel();
      })
      .catch(() => {
        // Cancellation is expected when a dialog is reopened.
      });
  }

  function configureDialog(dialog, closeButton) {
    closeButton.addEventListener("click", () => {
      closeWithAnimation(dialog);
    });

    // Clicking the dark area outside the dialog closes it.
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeWithAnimation(dialog);
      }
    });

    // Handle the Escape key with the closing animation.
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeWithAnimation(dialog);
    });
  }

  configureDialog(movieModal, modalClose);

  // ----------------------------------------
  // OPENING MOVIE DETAILS
  // ----------------------------------------

  const moviePosters = document.querySelectorAll(
    ".movie-poster[data-movie]"
  );

  moviePosters.forEach((poster) => {
    poster.addEventListener("click", () => {
      const movieId = poster.dataset.movie;
      const movieTemplate = document.getElementById(movieId);

      if (!movieTemplate) {
        console.error(`Marvel timeline: Template "${movieId}" was not found.`);
        return;
      }

      // Remember where the visitor was before opening the modal.
      previousFocus = poster;

      // Insert a fresh copy of the selected movie template.
      const movieDetails = movieTemplate.content.cloneNode(true);
      modalContent.replaceChildren(movieDetails);

      cancelPendingClose(movieModal);

      if (!movieModal.open) {
        movieModal.showModal();
      }

      // Put keyboard focus on the close button.
      modalClose.focus();
    });
  });

  // Restore focus after closing the movie details.
  movieModal.addEventListener("close", () => {
    if (previousFocus && document.contains(previousFocus)) {
      previousFocus.focus();
    }
  });

  // ----------------------------------------
  // GALLERY IMAGE VIEWER
  // ----------------------------------------

  // Create the image viewer once, then reuse it.
  const galleryViewer = document.createElement("dialog");
  galleryViewer.className = "movie-modal gallery-viewer";
  galleryViewer.setAttribute("aria-label", "Expanded gallery image");

  const viewerContainer = document.createElement("div");
  viewerContainer.className = "modal-container";

  const viewerHeader = document.createElement("div");
  viewerHeader.className = "modal-header";

  const viewerTitle = document.createElement("span");
  viewerTitle.textContent = "VISUAL ARCHIVE";

  const viewerClose = document.createElement("button");
  viewerClose.className = "modal-close";
  viewerClose.type = "button";
  viewerClose.textContent = "×";
  viewerClose.setAttribute("aria-label", "Close image viewer");

  const viewerContent = document.createElement("div");
  viewerContent.className = "modal-content";

  const viewerImage = document.createElement("img");
  viewerImage.alt = "";
  viewerImage.style.maxWidth = "100%";
  viewerImage.style.maxHeight = "72vh";
  viewerImage.style.width = "auto";
  viewerImage.style.height = "auto";
  viewerImage.style.objectFit = "contain";
  viewerImage.style.display = "block";
  viewerImage.style.margin = "auto";
  viewerImage.style.borderRadius = "8px";

  viewerContent.style.display = "flex";
  viewerContent.style.alignItems = "center";
  viewerContent.style.justifyContent = "center";

  viewerHeader.append(viewerTitle, viewerClose);
  viewerContent.appendChild(viewerImage);
  viewerContainer.append(viewerHeader, viewerContent);
  galleryViewer.appendChild(viewerContainer);

  document.body.appendChild(galleryViewer);

  configureDialog(galleryViewer, viewerClose);

  // Find gallery images even after a movie template is inserted.
  modalContent.addEventListener("click", (event) => {
    const image = event.target.closest(".movie-gallery img");

    if (!image) return;

    galleryReturnFocus = image;

    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt || "Expanded movie gallery image";

    cancelPendingClose(galleryViewer);

    if (!galleryViewer.open) {
      galleryViewer.showModal();
    }

    viewerClose.focus();
  });

  // Return focus to the thumbnail after closing the image viewer.
  galleryViewer.addEventListener("close", () => {
    if (
      galleryReturnFocus &&
      document.contains(galleryReturnFocus)
    ) {
      galleryReturnFocus.focus();
    }

    viewerImage.removeAttribute("src");
    galleryReturnFocus = null;
  });

  console.log("Marvel timeline initialized.");
});
