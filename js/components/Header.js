import { users } from '../data.js';

export default function Header() {
    return `
        <div class="tabs">
                    <div class="tab-item active">MUSIC</div>
                    <div class="tab-item">PODCAST</div>
                    <div class="tab-item">LIVE</div>
                </div>
                <form class="search-bar-container">
                    <div class="search-bar">
                        <span class="material-icons-round">
                            search
                        </span>
                        <input type="text" placeholder="Tìm kiếm bài hát">
                    </div>
                    <ul class="search-bar-suggestions">
                        <li class="suggestion-item">
                            <img src="/data/songs/thumb/Faded - Alan Walker.png"
                                alt="Faded - Alan Walker">
                            <div class="suggestion-info">
                                <span class="song-title">Faded</span>
                                <span class="song-artist">Alan Walker</span>
                            </div>
                        </li>
                        <li class="suggestion-item">
                            <img src="/data/songs/thumb/Đừng Làm Trái Tim Anh Đau - Sơn Tùng MTP.png"
                                alt="Đừng Làm Trái Tim Anh Đau - Sơn Tùng MTP">
                            <div class="suggestion-info">
                                <span class="song-title">Đừng Làm Trái Tim Anh Đau</span>
                                <span class="song-artist">Sơn Tùng MTP</span>
                            </div>
                        </li>
                        <li class="suggestion-item">
                            <img src="/data/songs/thumb/Kamin - Emin ft. JONY.png"
                                alt="Kamin - Emin ft. JONY">
                            <div class="suggestion-info">
                                <span class="song-title">Kamin</span>
                                <span class="song-artist">Emin ft. JONY</span>
                            </div>
                        </li>
                    </ul>
                </form>

                <div class="user-actions">
                    <button class="btn btn-notification">
                        <span class="material-icons-round">
                            notifications
                        </span>
                        <div class="dot"></div>
                    </button>
                    <button class="btn btn-settings">
                        <span class="material-icons-round">
                            settings
                        </span>
                    </button>
                    <div class="user-profile" data-route="/profile">
                        <div class="avatar">
                            <img src="${users[0].avatar}"
                                alt="User Avatar">
                        </div>
                        <span class="username">${users[0].username}</span>
                    </div>
                </div>
    `;
}