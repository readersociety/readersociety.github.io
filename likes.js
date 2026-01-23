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
import { songs } from "./data.js";
import { playSongById } from "./player.js";
import { syncOverlay, openOverlay } from "./overlay.js";
import { syncMiniPlayer } from "./miniplayer.js";

export function playAllLiked() {
  const liked = songs.filter(song => song.liked);
  if (!liked.length) return;

  playSongById(liked[0].id);
  syncOverlay();
  syncMiniPlayer();
  openOverlay();
}
