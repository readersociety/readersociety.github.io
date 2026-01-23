
import { playlists, songs } from "./data.js";
import { savePlaylists, loadPlaylists } from "./storage.js";
import { playSongById } from "./player.js";
import { openOverlay, syncOverlay } from "./overlay.js";
import { syncMiniPlayer } from "./miniplayer.js";

export function initPlaylists() {
  const stored = loadPlaylists();
  playlists.push(...stored);
}

export function createPlaylist(name) {
  if (!name.trim()) return;

  playlists.push({
    id: "pl_" + Date.now(),
    name,
    songs: []
  });

  savePlaylists(playlists);
}

export function toggleSongInPlaylist(songId, playlistId) {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return;

  const index = playlist.songs.indexOf(songId);
  if (index === -1) {
    playlist.songs.push(songId);
  } else {
    playlist.songs.splice(index, 1);
  }

  savePlaylists(playlists);
}

export function playPlaylist(playlistId) {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist || !playlist.songs.length) return;

  playSongById(playlist.songs[0]);
  syncOverlay();
  syncMiniPlayer();
  openOverlay();
}
