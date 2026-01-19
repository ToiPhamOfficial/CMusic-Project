import { getSongById } from '../data.js';
import { SongItem, HeaderSongItem } from '../components/Card.js';

export default function Favorites() {
    // Lấy thông tin user từ localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
    
    // Lấy danh sách bài hát yêu thích
    const favoriteSongIds = currentUser?.favoriteSongs || [];
    const favoriteSongs = favoriteSongIds
        .map(id => getSongById(id))
        .filter(song => song !== undefined);
    
    return `
    <section class="page-favorites__hero">
        <div class="page-favorites__hero-icon">
            <span class="material-icons-round">favorite</span>
        </div>
        <div class="page-favorites__hero-content">
            <p class="page-favorites__hero-label">PLAYLIST</p>
            <h1 class="page-favorites__hero-title">Yêu thích</h1>
            <div class="page-favorites__hero-meta">
                <span class="page-favorites__hero-owner">${currentUser?.name}</span>
                <span class="page-favorites__hero-separator">•</span>
                <span class="page-favorites__hero-count">${favoriteSongs.length} Bài hát</span>
                <span class="page-favorites__hero-separator">•</span>
            </div>
        </div>
        <button class="page-favorites__hero-play btn-play-music" data-context-type="favorites">
            <span class="material-icons-round">play_arrow</span>
        </button>
    </section>

    <section class="section_song-item">
        ${HeaderSongItem()}
        <div class="song-item__song-list">
            ${favoriteSongs.length > 0 
                ? favoriteSongs.map((song, index) => SongItem(song, index + 1)).join('')
                : '<div class="song-item__empty">Chưa có bài hát yêu thích nào</div>'
            }
        </div>
    </section>
    `;
}

export function initFavoritesEvents() {
    // Lắng nghe sự kiện unfavorite để re-render lại trang
    $(document).on('user:unfavoritedSong', function(e, songId) {
        if (window.location.pathname === '/favorites') {
            window.navigateTo('/favorites', true);
        }
    });
}