import { playlists, songs } from '../data.js';

export default function Playlist() {
    return `
        <section class="section-box my-playlists">
            <div class="section-header">
                <h2>Danh sách phát của tôi</h2>
                <button class="btn-create-playlist">
                    <span class="material-icons-round">add</span>
                    Tạo mới
                </button>
            </div>
            <div class="playlist-grid">
                ${playlists.map(playlist => `
                    <div class="playlist-card" data-route="/playlist-detail?id=${playlist.id}">
                        <div class="playlist-cover">
                            <span class="material-icons-round">${playlist.icon}</span>
                        </div>
                        <div class="playlist-info">
                            <h3 class="playlist-name">${playlist.name}</h3>
                            <p class="playlist-count">${playlist.songCount} bài hát</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="section-box recommended-playlists">
            <div class="section-header">
                <h2>Đề xuất cho bạn</h2>
            </div>
            <div class="playlist-grid">
                <div class="playlist-card">
                    <div class="playlist-cover" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <span class="material-icons-round">headphones</span>
                    </div>
                    <div class="playlist-info">
                        <h3 class="playlist-name">Chill Vibes</h3>
                        <p class="playlist-count">30 bài hát</p>
                    </div>
                </div>
                <div class="playlist-card">
                    <div class="playlist-cover" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <span class="material-icons-round">favorite</span>
                    </div>
                    <div class="playlist-info">
                        <h3 class="playlist-name">Yêu thích</h3>
                        <p class="playlist-count">50 bài hát</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-box playlist-songs">
            <div class="section-header">
                <h2>Bài hát phổ biến</h2>
            </div>
            <div class="song-list">
                ${songs.map(song => `
                    <div class="song-item" data-song-id="${song.id}">
                        <img src="${song.image}" alt="${song.title}">
                        <div class="song-details">
                            <p class="song-title">${song.title}</p>
                            <p class="song-artist">${song.artist}</p>
                        </div>
                        <span class="song-duration">${song.duration}</span>
                        <button class="btn-icon btn-add">
                            <span class="material-icons-round">add</span>
                        </button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
