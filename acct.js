/* =========================
   ELEMENTS
========================= */
const audio = document.getElementById("audio");

const allSongs = Array.from(document.querySelectorAll(".song"));
const likedSongsList = document.getElementById("likedSongsList");
const playLikedBtn = document.getElementById("playLiked");

/* Overlay */
const overlay = document.getElementById("overlay");
const overlayCover = document.getElementById("overlayCover");
const overlayTitle = document.getElementById("overlayTitle");
const overlayArtist = document.getElementById("overlayArtist");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const back10Btn = document.getElementById("back10");
const forward10Btn = document.getElementById("forward10");

const likeBtn = document.getElementById("like");
const repeatBtn = document.getElementById("repeat");
const lyricsText = document.getElementById("lyricsText");
const closeOverlayBtn = document.getElementById("closeOverlay");

/* =========================
   STATE
========================= */
let currentQueue = allSongs;
let currentIndex = 0;
let isRepeat = false;

/* Store liked songs by src */
let likedSongs = [];

/* =========================
   CORE FUNCTIONS
========================= */
function loadSong(index) {
  const song = currentQueue[index];
  if (!song) return;

  audio.src = song.dataset.src;
  overlayCover.src = song.querySelector("img").src;
  overlayTitle.textContent = song.querySelector(".title").textContent;
  overlayArtist.textContent = song.querySelector(".artist").textContent;
  lyricsText.textContent = song.dataset.lyrics || "Lyrics not available.";

  likeBtn.classList.toggle(
    "active",
    likedSongs.includes(song.dataset.src)
  );

  playPauseBtn.textContent = "⏸";
  overlay.classList.remove("hidden");
  audio.play();
}

function playSongFromQueue(queue, index) {
  currentQueue = queue;
  currentIndex = index;
  loadSong(currentIndex);
}

/* =========================
   SONG LIST CLICK
========================= */
allSongs.forEach((song, index) => {
  song.querySelector(".play").addEventListener("click", () => {
    playSongFromQueue(allSongs, index);
  });
});

/* =========================
   LIKE SYSTEM
========================= */
likeBtn.addEventListener("click", () => {
  const src = currentQueue[currentIndex].dataset.src;

  if (likedSongs.includes(src)) {
    likedSongs = likedSongs.filter(s => s !== src);
    likeBtn.classList.remove("active");
  } else {
    likedSongs.push(src);
    likeBtn.classList.add("active");
  }

  renderLikedSongs();
});

function renderLikedSongs() {
  likedSongsList.innerHTML = "";

  if (likedSongs.length === 0) {
    likedSongsList.innerHTML =
      `<p class="empty">No liked songs yet</p>`;
    return;
  }

  likedSongs.forEach(src => {
    const song = allSongs.find(s => s.dataset.src === src);
    if (!song) return;

    const clone = song.cloneNode(true);

    clone.querySelector(".play").addEventListener("click", () => {
      const queue = likedSongs.map(s =>
        allSongs.find(song => song.dataset.src === s)
      );
      playSongFromQueue(queue, queue.indexOf(song));
    });

    likedSongsList.appendChild(clone);
  });
}

/* Play all liked songs */
playLikedBtn.addEventListener("click", () => {
  if (likedSongs.length === 0) return;

  const queue = likedSongs.map(src =>
    allSongs.find(song => song.dataset.src === src)
  );

  playSongFromQueue(queue, 0);
});

/* =========================
   PLAYER CONTROLS
========================= */
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶";
  }
});

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + currentQueue.length) %
    currentQueue.length;
  loadSong(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex + 1) % currentQueue.length;
  loadSong(currentIndex);
});

back10Btn.addEventListener("click", () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

forward10Btn.addEventListener("click", () => {
  audio.currentTime = Math.min(
    audio.duration,
    audio.currentTime + 10
  );
});

/* =========================
   REPEAT
========================= */
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
});

audio.addEventListener("ended", () => {
  if (isRepeat) loadSong(currentIndex);
  else nextBtn.click();
});

/* =========================
   PROGRESS BAR
========================= */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent =
    (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

/* =========================
   OVERLAY
========================= */
closeOverlayBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

/* =========================
   UTILS
========================= */
function formatTime(time) {
  if (!time) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}
