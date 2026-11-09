
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

  const closingDialogs = new WeakSet();

  // ----------------------------------------
  // DIALOG ANIMATIONS AND CLOSING
  // ----------------------------------------

  function closeWithAnimation(dialog) {
    if (!dialog.open || closingDialogs.has(dialog)) return;

    closingDialogs.add(dialog);

    // Respect the visitor's reduced-motion preference.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      dialog.close();
      closingDialogs.delete(dialog);
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

    animation.finished
      .catch(() => {})
      .then(() => {
        if (dialog.open) {
          dialog.close();
        }

        closingDialogs.delete(dialog);
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

      // Insert a fresh copy of the selected movie's template.
      const movieDetails = movieTemplate.content.cloneNode(true);
      modalContent.replaceChildren(movieDetails);

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
