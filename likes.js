import { songs } from "./data.js";
import { saveLikes } from "./storage.js";
import { syncOverlay } from "./overlay.js";
import { syncMiniPlayer } from "./miniplayer.js";

export function toggleLike(songId) {
  const song = songs.find(s => s.id === songId);
  if (!song) return;

  song.liked = !song.liked;
  saveLikes(songs);

  syncOverlay();
  syncMiniPlayer();
}
