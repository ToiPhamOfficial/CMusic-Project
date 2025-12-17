import { songs, artists, genres } from '../data.js';

export default function Explore() {
    return `
        <section class="banner">
                    <h3 class="banner-subtitle">Bản Hit Mới Nhất</h3>
                    <div class="banner-content">
                        <h1 class="banner-title">In My Feelings</h1>
                        <div class="banner-info">
                            <span class="artist">Camila Cabello</span>
                            <span class="views">63Tr lượt nghe</span>
                        </div>
                    </div>
                    <div class="banner-actions">
                        <button class="btn-play">Phát ngay</button>
                        <button class="btn-fav">
                            <span class="material-icons-round">
                                favorite
                            </span>
                        </button>
                    </div>
                </section>
                <section class="content-section">
                    <div class="tasgs-player">
                        <div class="tas-gs">
                            <!-- Top Artists -->
                            <section class="section-box top-artists">
                                <div class="section-header">
                                    <h2>Top nghệ sĩ</h2>
                                    <a href="#artists" class="view-all">Tất cả</a>
                                </div>
                                <div class="artist-list">
                                    ${artists.map(artist => `
                                    <div class="artist-card" data-artist-id="${artist.id}">
                                        <img src="${artist.image}" alt="${artist.name}">
                                        <div class="artist-info">
                                            <p class="name">${artist.name}</p>
                                            <p class="listeners">${artist.listeners} lượt nghe</p>
                                        </div>
                                    </div>
                                    `).join('')}
                                </div>
                            </section>

                            <!-- Genres -->
                            <section class="section-box genres">
                                <div class="section-header">
                                    <h2>Thể loại</h2>
                                    <a href="#genres" class="view-all">Tất cả</a>
                                </div>
                                <div class="genre-grid">
                                    ${genres.map(genre => `
                                    <div class="genre-item" style="background-color: ${genre.color};"
                                        data-genre-id="${genre.id}">
                                        ${genre.name}
                                    </div>
                                    `).join('')}
                                </div>
                            </section>
                        </div>
                        <section class="home-player">
                        <div class="player-content">
                            <div class="player-header">
                                <h2>Player</h2>
                                <button class="btn-icon"><span class="material-icons-round" style="color: white;">
                                        playlist_play
                                    </span></button>
                            </div>
                            <div class="player-body">
                                <div class="player-disc">
                                    <img src="https://www.figma.com/api/mcp/asset/d9fc626b-3041-4898-bc9f-bde47efaa68a"
                                        alt="Sea Of Feelings">
                                </div>
                                <div class="player-info">
                                    <h3>Sea Of Feelings</h3>
                                    <p>Lowx</p>
                                </div>
                                <div class="player-progress">
                                    <span class="time">1:54</span>
                                    <input type="range" min="0" max="100" value="40" class="progress-bar">
                                    <span class="time">02:53</span>
                                </div>
                            </div>
                            </div>
                            <div class="player-controls">
                                <button class="btn-control">
                                <span class="material-icons-round">
                                repeat
                                </span></button>
                                <button class="btn-control"><span class="material-icons-round">
skip_previous
</span></button>
                                <button class="btn-control play"><span class="material-icons-round">
play_circle
</span></button>
                                <button class="btn-control"><span class="material-icons-round">
skip_next
</span></button>
                                <button class="btn-control"><span class="material-icons-round">
shuffle
</span></button>
                            </div>
                        </section>
                    </div>

                    <!-- Charts -->
                    <section class="section-box charts">
                        <div class="section-header">
                            <h2>Bảng xếp hạng</h2>
                            <a href="#charts" class="view-all">Tất cả</a>
                        </div>
                        <div class="chart-list">
                            ${songs.slice(0, 5).map((song, index) => `
                            <div class="chart-item" data-song-id="${song.id}">
                                <div class="chart-left">
                                    <span class="rank">${String(index + 1).padStart(2, '0')}</span>
                                    <img src="${song.image}" alt="${song.title}">
                                    <div class="song-info">
                                        <p class="song-title">${song.title}</p>
                                        <p class="song-artist">${song.artist}</p>
                                    </div>
                                </div>
                                <div class="chart-right">
                                    <span class="duration">${song.duration}</span>
                                    <button class="btn-icon btn-play-song" data-song-id="${song.id}">
                                        <span class="material-icons-round">
                                            play_arrow
                                        </span>
                                    </button>
                                    <button class="btn-icon btn-add-song" data-song-id="${song.id}">
                                        <span class="material-icons-round">
                                            add_circle
                                        </span>
                                    </button>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </section>
                </section>
                <footer class="footer">
            <div class="footer-content">
                <div class="footer-left">
                    <p>&copy; 2025 CMusic. All rights reserved.</p>
                </div>
                <div class="footer-links">
                    <a href="#about">Về chúng tôi</a>
                    <a href="#terms">Điều khoản</a>
                    <a href="#privacy">Chính sách</a>
                    <a href="#contact">Liên hệ</a>
                </div>
            </div>
        </footer>
    `;
}
