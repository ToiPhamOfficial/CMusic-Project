import { getAlbumById } from '../data.js';
import { AlbumCard, PlaylistCard } from '../components/Card.js';

// 3. Mảng màu nền cho Playlist
const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Màu xanh tím
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Màu hồng cam
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Màu xanh lá (dự phòng)
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"  // Màu vàng cam (dự phòng)
];

export default function Profile() {
    // Đọc dữ liệu mỗi khi render để cập nhật trạng thái mới nhất
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = null;
    if (isLoggedIn) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    const userPlaylists = (currentUser && currentUser.playlists) ? currentUser.playlists : [];
    
    // Lấy danh sách album đã lưu
    const albumsSavedIds = currentUser?.albumsSaved || [];
    const albumsSaved = albumsSavedIds
        .map(id => getAlbumById(id))
        .filter(album => album !== undefined);

    return `      
        <section class="profile-hero">
            <div class="hero-bg-overlay"></div>
            
            <div class="profile-content">
                <div class="profile-avatar">
                    <img src="${currentUser ? currentUser.avatar : '/assets/img/guest-avatar.png'}" alt="User Avatar">
                </div>
                
                <div class="profile-info">
                    <span class="profile-tag">Hồ sơ</span>
                    <h1 class="profile-name">${currentUser ? '<span class="name">' + currentUser.name + '</span>' : ''}</h1>
                    <div class="container-follower">
                        <div class="profile-stats">Đang theo dõi <strong>${currentUser.followedArtists?.length || 0}</strong></div>
                    </div>
                    <button class="btn-play-profile btn-play-music" data-context-type="user_favorites">
                        <span class="material-icons-round">play_arrow</span> Phát tất cả
                    </button>
                </div>
            </div>
        </section>

        <div class="quick-access-grid">
            <div class="qa-card" data-route="/favorites">
                <div class="qa-img-box gradient-heart">
                    <span class="material-icons-round">favorite</span>
                </div>
                <div class="qa-info">
                    <div class="qa-title">Yêu thích</div>
                    <div class="qa-sub">2 bài hát</div>
                </div>
            </div>

            <div class="qa-card" data-route="/recently">
                <div class="qa-img-box gradient-blue">
                    <span class="material-icons-round"> history </span>
                </div>
                <div class="qa-info">
                    <div class="qa-title">Nghe gần đây</div>
                    <div class="qa-sub">16 bài hát</div>
                </div>
            </div>
        </div>

        <section class="section-box my-playlists">
            <div class="section-header">
                <h2>Playlist</h2>
                <button class="btn-create-playlist" id="open-playlist-modal">
                    <span class="material-icons-round">add</span>
                    Tạo mới
                </button>
            </div>
            
            ${userPlaylists.length > 0 ? `
                <div class="playlist-grid">
                    ${userPlaylists.map(playlist => PlaylistCard(playlist, 'user_playlist')).join('')}
                </div>
            ` : `
                <div class="empty-state">
                    <span class="material-icons-round">queue_music</span>
                    <p>Bạn chưa có playlist nào</p>
                    <p class="empty-hint">Tạo playlist đầu tiên của bạn ngay!</p>
                </div>
            `}
        </section>

        <section class="section-box albums-saved">
            <div class="section-header">
                <h2>Album đã lưu</h2>
                <a class="view-all" data-route="/albums-saved">Tất cả</a>
            </div>
            <div class="album-grid">
                ${albumsSaved.length > 0 
                    ? albumsSaved.map((album, index) => AlbumCard(album, index + 1)).join('')
                    : '<div class="page-albums-saved__empty">Bạn chưa lưu album nào.</div>'
                }
            </div>
        </section>
    `;
}