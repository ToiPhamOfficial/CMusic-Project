export default function Header() {
    // Đọc dữ liệu mỗi khi render để cập nhật trạng thái mới nhất
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = null;
    if (isLoggedIn) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
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
                    <div class="mini-user-profile ${!isLoggedIn ? 'is-guest' : '" data-route="/profile"'}">
                    ${currentUser ?
                        `<div class="avatar">
                            <img src="${currentUser ? currentUser.avatar : ''}"
                                alt="User Avatar">
                        </div>
                        <span class="name">${currentUser ? currentUser.name : ''}</span>`
                        : `<span>${!isLoggedIn ? 'Đăng nhập' : ''}</span>`
                    }
                    </div>
                </div>
    `;
}