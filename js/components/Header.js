import { users } from '../data.js';

export default function Header() {
    return `
        <div class="tabs">
                    <div class="tab-item active">MUSIC</div>
                    <div class="tab-item">PODCAST</div>
                    <div class="tab-item">LIVE</div>
                </div>
                <div class="search-bar-container">
                    <div class="search-bar">
                        <span class="material-icons-round">
                            search
                        </span>
                        <input type="text" placeholder="Tìm kiếm bài hát">
                    </div>
                    <ul class="search-bar-suggestions"></ul>
                </div>

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