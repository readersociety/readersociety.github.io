/*
 * MCU intro preloader.
 * Put the authorized video at videos/mcu-intro.mp4, or change VIDEO_URL below.
 */
document.addEventListener("DOMContentLoaded", () => {
  const VIDEO_URL = "https://github.com/readersociety/readersociety.github.io/raw/refs/heads/main/MARVEL%20STUDIOS%20INTRO.mp4";

  // Load the preloader's styles without requiring an edit to mcu-history.html.
  if (!document.querySelector('link[data-mcu-preloader-styles]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "mcu-preloader.css";
    stylesheet.dataset.mcuPreloaderStyles = "";
    document.head.appendChild(stylesheet);
  }

  const preloader = document.createElement("div");
  preloader.className = "mcu-preloader is-playing";
  preloader.setAttribute("role", "dialog");
  preloader.setAttribute("aria-modal", "true");
  preloader.setAttribute("aria-label", "Marvel history introduction");
  preloader.innerHTML = `
    <section class="mcu-preloader__panel">
      <video class="mcu-preloader__video" playsinline preload="auto"
        aria-label="Marvel history introduction"></video>
      <button class="mcu-preloader__skip" type="button" data-intro-skip>
        Skip intro <span aria-hidden="true">→</span>
      </button>
    </section>`;
  document.body.prepend(preloader);
  document.body.classList.add("mcu-preloader-open");

  const video = preloader.querySelector("video");
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

  skipButton.addEventListener("click", dismissPreloader);
  video.addEventListener("ended", dismissPreloader);
  video.addEventListener("error", dismissPreloader);

  preloader.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dismissPreloader();
    }
  });

  // Start immediately. Try audio first, then fall back to muted autoplay if
  // the browser blocks audible playback without a user gesture.
  video.src = VIDEO_URL;
  video.controls = false;
  video.muted = false;
  skipButton.focus();

  const playback = video.play();
  if (playback && typeof playback.catch === "function") {
    playback.catch(() => {
      if (dismissed) return;
      video.muted = true;
      const mutedPlayback = video.play();
      if (mutedPlayback && typeof mutedPlayback.catch === "function") {
        mutedPlayback.catch(dismissPreloader);
      }
    });
  }
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

  // Add authorized theme audio files at these paths (or update the paths here).

  const modalBackgroundVideo = document.querySelector("#modal-background-video");

const movieBackgrounds = {
  "captain-america": "videos/captain-america-background.mp4",
  "captain-marvel": "videos/captain-marvel-background.mp4",
  "iron-man": "videos/iron-man-background.mp4"
};
  
  const movieThemes = {
    "captain-america": "https://github.com/readersociety/readersociety.github.io/raw/refs/heads/main/mcu-history/captain-america-1theme.weba",
    "captain-marvel": "audio/themes/captain-marvel.mp3",
    "iron-man": "audio/themes/iron-man.mp3"
  };
  const themeAudio = new Audio();
  themeAudio.preload = "none";
  themeAudio.volume = 0;
  let themeAnimationFrame = 0;
  let themeRequest = 0;
  let fadingForLoop = false;
  const THEME_VOLUME = 0.16;
  const LOOP_FADE_MS = 1400;

  function fadeThemeTo(volume, duration, onComplete) {
    window.cancelAnimationFrame(themeAnimationFrame);
    const startVolume = themeAudio.volume;
    const startTime = performance.now();

    function step(now) {
      const progress = duration <= 0 ? 1 : Math.min((now - startTime) / duration, 1);
      themeAudio.volume = startVolume + (volume - startVolume) * progress;

      if (progress < 1) {
        themeAnimationFrame = window.requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    }

    themeAnimationFrame = window.requestAnimationFrame(step);
  }

  function playMovieTheme(movieId) {
    const themeUrl = movieThemes[movieId];
    const request = ++themeRequest;
    fadingForLoop = false;

    // Fade out and stop any previous movie's theme before switching tracks.
    fadeThemeTo(0, 300, () => {
      if (request !== themeRequest) return;
      themeAudio.pause();

      if (!themeUrl) {
        themeAudio.removeAttribute("src");
        themeAudio.load();
        return;
      }

      themeAudio.src = themeUrl;
      themeAudio.load();
      themeAudio.currentTime = 0;

      // This call follows the visitor's poster click, satisfying common
      // browser audio-playback requirements. Missing files fail quietly.
      const playback = themeAudio.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {});
      }
      fadeThemeTo(THEME_VOLUME, 900);
    });
  }

  function stopMovieTheme() {
    const request = ++themeRequest;
    fadingForLoop = false;
    fadeThemeTo(0, 350, () => {
      if (request !== themeRequest) return;
      themeAudio.pause();
      themeAudio.currentTime = 0;
    });
  }

  // Fade down at the end of each theme, then restart and fade back in.
  themeAudio.addEventListener("timeupdate", () => {
    if (
      !fadingForLoop &&
      Number.isFinite(themeAudio.duration) &&
      themeAudio.duration > 0 &&
      themeAudio.duration - themeAudio.currentTime <= LOOP_FADE_MS / 1000
    ) {
      fadingForLoop = true;
      const remainingMs = Math.max(
        100,
        (themeAudio.duration - themeAudio.currentTime) * 1000
      );
      fadeThemeTo(0, remainingMs);
    }
  });

  themeAudio.addEventListener("ended", () => {
    if (!movieModal.open || !themeAudio.src) return;
    fadingForLoop = false;
    themeAudio.currentTime = 0;
    const playback = themeAudio.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {});
    }
    fadeThemeTo(THEME_VOLUME, 900);
  });

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
      const backgroundSource = movieBackgrounds[movieId];

if (backgroundSource) {
  modalBackgroundVideo.src = backgroundSource;
  modalBackgroundVideo.load();
  modalBackgroundVideo.play().catch(() => {});
}
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
      playMovieTheme(movieId);

      cancelPendingClose(movieModal);

      if (!movieModal.open) {
        movieModal.showModal();
      }

      // Put keyboard focus on the close button.
      modalClose.focus();
    });
  });

  // Fade out and stop the movie's theme whenever its modal closes.
  movieModal.addEventListener("close", () => {
    stopMovieTheme();

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
