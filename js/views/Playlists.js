import { myPlaylists, getPlaylistById, getPlaylistGroupById } from '../data.js';
import { PlaylistCard } from '../components/Card.js';

export default function Playlists() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const id = params.get('id');

    // Hiển thị playlist của user
    if (type === 'userPlaylists') {
        return `
            <section class="page__heading">
                <h1 class="page__title">Danh sách phát của tôi</h1>
            </section>

            <section class="section-box my-playlists">
                <div class="section-header">
                    <h2>Playlist</h2>
                    <button class="btn-create-playlist">
                        <span class="material-icons-round">add</span>
                        Tạo mới
                    </button>
                </div>
                ${myPlaylists.length > 0 ? `
                    <div class="playlist-grid">
                        ${myPlaylists.map(playlist => PlaylistCard(playlist)).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <span class="material-icons-round">queue_music</span>
                        <p>Bạn chưa có playlist nào</p>
                        <p class="empty-hint">Tạo playlist đầu tiên của bạn ngay!</p>
                    </div>
                `}
            </section>
        `;
    }

    // Hiển thị playlist hệ thống theo nhóm
    const playlistGroup = getPlaylistGroupById(id);
    if(!playlistGroup) {
        return `<h1>Nhóm playlist không tồn tại</h1>`;
    }

    return `
        <section class="page__heading">
            <h1 class="page__title">${playlistGroup.name}</h1>
            <p class="page__subtitle">${playlistGroup.description}</p>
        </section>

        <section class="section-box my-playlists">
            <div class="section-header">
                <h2>Playlist</h2>
            </div>
            ${playlistGroup.playlistIds.length > 0 ? `
                <div class="playlist-grid">
                    ${playlistGroup.playlistIds.map(playlistId => PlaylistCard(getPlaylistById(playlistId))).join('')}
                </div>
            ` : `
                <div class="empty-state">
                    <span class="material-icons-round">queue_music</span>
                    <p>Không có playlist nào trong nhóm này</p>
                </div>
            `}
        </section>
    `;
}
