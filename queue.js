export const queue = JSON.parse(localStorage.getItem("djQueue")) || [];

export function addToQueue(song) {
  queue.push(song);
  saveQueue();
}

export function nextSong() {
  return queue.shift();
}

function saveQueue() {
  localStorage.setItem("djQueue", JSON.stringify(queue));
}
audio.addEventListener("ended", () => {
  const next = nextSong();
  if (next) playSong(next);
});
