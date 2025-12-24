// 1. Import dữ liệu từ data.js
import { playlists, albums } from '../data.js';

// 2. Dữ liệu người dùng (Vì chưa có trong database nên tạm thời khai báo ở đây)
const userData = {
    name: "Phạm Sang Tới",
    avatar: "https://i.pravatar.cc/300?img=12",
    following: 100
};

// 3. Mảng màu nền cho Playlist (để hiển thị cho đẹp giống HTML cũ)
const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Màu xanh tím
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Màu hồng cam
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Màu xanh lá (dự phòng)
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"  // Màu vàng cam (dự phòng)
];

export default function Profile() {
    return `
        <div class="profile-container"> 
            
            <div class="profile-hero">
                <div class="hero-bg-overlay"></div>
                
                <div class="profile-content">
                    <div class="profile-avatar">
                        <img src="${userData.avatar}" alt="Avatar">
                    </div>
                    
                    <div class="profile-info">
                        <span class="profile-tag">Hồ sơ</span>
                        <h1 class="profile-name">${userData.name}</h1>
                        <div class="profile-stats">Đang theo dõi <strong>${userData.following}</strong></div>
                        
                        <button class="btn-play-profile">
                            <i class="fa-solid fa-play"></i> Phát tất cả
                        </button>
                    </div>
                </div>
            </div>

            <div class="quick-access-grid">
                <div class="qa-card">
                    <div class="qa-img-box gradient-heart">
                        <span class="material-icons-round">favorite</span>
                    </div>
                    <div class="qa-info">
                        <div class="qa-title">Yêu thích</div>
                        <div class="qa-sub">2 bài hát</div>
                    </div>
                </div>

                <div class="qa-card">
                    <div class="qa-img-box gradient-blue">
                        <span class="material-icons-round"> history </span>
                    </div>
                    <div class="qa-info">
                        <div class="qa-title">Nghe gần đây</div>
                        <div class="qa-sub">16 bài hát</div>
                    </div>
                </div>
            </div>

            <section class="section-box recommended-playlists">
                <div class="section-header">
                    <h2>Playlist đã tạo (${playlists.length}) </h2>
                    <a href="#" class="view-all">Tất cả</a>
                </div>
                <div class="playlist-grid">
                    ${playlists.map((playlist, index) => {
                        // Logic chọn màu: Lấy index chia lấy dư cho độ dài mảng màu
                        // Ví dụ: index 0 -> màu 0, index 1 -> màu 1, index 2 -> quay lại màu 0
                        const bgStyle = gradients[index % gradients.length];

                        return `
                        <div class="playlist-card" data-playlist-id="${playlist.id}">
                            <div class="playlist-cover" style="background: ${bgStyle};">
                                <span class="material-icons-round">${playlist.icon}</span>
                            </div>
                            <div class="playlist-info">
                                <h3 class="playlist-name">${playlist.name}</h3>
                                <p class="playlist-count">${playlist.songCount} bài hát</p>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </section>

            <section class="section-box albums">
                <div class="section-header">
                    <h2>Album yêu thích (${albums.length}) </h2>
                    <a href="#" class="view-all">Tất cả</a>
                </div>
                <div class="album-grid">
                    ${albums.map(album => `
                        <div class="album-card" data-album-id="${album.id}">
                            <div class="album-cover">
                                <img src="${album.image}" alt="${album.title}">
                                <button class="album-play-btn">
                                    <span class="material-icons-round">play_arrow</span>
                                </button>
                            </div>
                            <div class="album-info">
                                <h3 class="album-title">${album.title}</h3>
                                <p class="album-artist">${album.artist}</p>
                                <p class="album-meta">${album.year} • ${album.songs} bài hát</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

        </div>
    `;
}