export default function Header() {
    // Đọc dữ liệu mỗi khi render để cập nhật trạng thái mới nhất
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = null;
    if (isLoggedIn) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    return `
        <button class="btn btn-menu">
            <span class="material-icons-round">
                menu
            </span>
        </button>
                <div class="search-bar-wrapper">
                    <button class="btn" id="btn-close-search-bar">
                    <span class="material-icons-round">
                        arrow_back
                    </span>
                </button>
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
                    <div class="mini-user-profile${!isLoggedIn ? ' is-guest' : '" data-route="/profile"'}">
                        <div class="avatar">
                            <img src="${currentUser ? currentUser.avatar : '/assets/img/guest-avatar.png'}"
                                alt="User Avatar">
                        </div>
                        ${currentUser ? '<span class="name">' + currentUser.name + '</span>' : ''}
                    </div>
                </div>
    `;
}