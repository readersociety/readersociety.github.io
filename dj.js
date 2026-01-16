/* =========================
   ELEMENTS
========================= */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const accountList = document.getElementById("accounts");
const welcomeText = document.querySelector(".topbar h3");
const newSongsRow = document.querySelector(".new-songs");

/* =========================
   ACCOUNT SYSTEM (SIMULATED)
========================= */
let currentUser =
  localStorage.getItem("dj_current_user") || "Adam";

initUser(currentUser);
highlightActiveUser();

/* Switch account on click */
accountList.addEventListener("click", (e) => {
  if (e.target.tagName !== "LI") return;

  const user = e.target.dataset.user;
  currentUser = user;

  localStorage.setItem("dj_current_user", user);
  highlightActiveUser();
  initUser(user);
});

/* Highlight active account */
function highlightActiveUser() {
  document.querySelectorAll(".sidebar li").forEach((li) => {
    li.classList.toggle(
      "active",
      li.dataset.user === currentUser
    );
  });
}

/* Load or create user data */
function initUser(user) {
  const key = `dj_account_${user}`;
  let data = JSON.parse(localStorage.getItem(key));

  if (!data) {
    data = {
      theme: "dark",
      playlists: [],
      liked: [],
      recent: []
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  applyTheme(data.theme);
  welcomeText.textContent = `Welcome, ${user}`;
}

/* =========================
   THEME TOGGLE (PER USER)
========================= */
themeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "🌙" : "☀️";

  const key = `dj_account_${currentUser}`;
  const data = JSON.parse(localStorage.getItem(key));
  data.theme = isDark ? "dark" : "light";
  localStorage.setItem(key, JSON.stringify(data));
});

function applyTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
}

/* =========================
   HORIZONTAL SCROLL (DESKTOP)
========================= */
if (newSongsRow) {
  newSongsRow.addEventListener("wheel", (e) => {
    e.preventDefault();
    newSongsRow.scrollLeft += e.deltaY;
  });
}

/* =========================
   RIPPLE EFFECT (CLICK / TAP)
========================= */
document.addEventListener("click", (e) => {
  const target = e.target.closest(
    ".card, .playlist, .song-card, .play-btn, .bottom-nav button"
  );

  if (!target) return;

  const rect = target.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.classList.add("ripple");

  const existing = target.querySelector(".ripple");
  if (existing) existing.remove();

  target.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 600);
});

/* =========================
   FEATURED PLAY BUTTON (UI ONLY)
========================= */
const playBtn = document.querySelector(".play-btn");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    playBtn.textContent =
      playBtn.textContent.includes("Play")
        ? "⏸ Pause"
        : "▶ Play";
  });
}
