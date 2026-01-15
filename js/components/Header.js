import Auth from '../services/auth.js';

export default function Header() {
    // Đọc dữ liệu mỗi khi render để cập nhật trạng thái mới nhất
    const isLoggedIn = Auth.isLoggedIn;
    let currentUser = Auth.currentUser;
    
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

            <!-- Notifications Dropdown -->
            <div class="notifications-dropdown">
                <div class="notifications-header">
                    <h3>Thông báo</h3>
                    <button class="btn-mark-read">Đánh dấu đã đọc</button>
                </div>
                <div class="notifications-list">
                    <!-- Sample notifications -->
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <span class="material-icons-round">album</span>
                        </div>
                        <div class="notification-content">
                            <p class="notification-text">Album mới <strong>"Khắc Việt 2025"</strong> đã được phát hành</p>
                            <span class="notification-time">2 giờ trước</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">
                            <span class="material-icons-round">person_add</span>
                        </div>
                        <div class="notification-content">
                            <p class="notification-text"><strong>Sơn Tùng M-TP</strong> vừa phát hành bài hát mới</p>
                            <span class="notification-time">1 ngày trước</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">
                            <span class="material-icons-round">favorite</span>
                        </div>
                        <div class="notification-content">
                            <p class="notification-text">Playlist <strong>"Nhạc Việt Hot"</strong> đã được cập nhật</p>
                            <span class="notification-time">3 ngày trước</span>
                        </div>
                    </div>
                </div>
                <div class="notifications-footer">
                    <a href="#" class="view-all">Xem tất cả thông báo</a>
                </div>
            </div>

            <button class="btn btn-settings">
                <span class="material-icons-round">
                    settings
                </span>
            </button>

            <!-- Settings Panel -->
            <div class="settings-panel">
                <div class="settings-header">
                    <h3>Cài đặt</h3>
                    <button class="btn-close-settings">
                        <span class="material-icons-round">close</span>
                    </button>
                </div>
                <div class="settings-content">
                    <div class="settings-section">
                        <h4>Giao diện</h4>
                        <div class="setting-item">
                            <div class="setting-info">
                                <span class="setting-label">Chế độ tối</span>
                                <span class="setting-desc">Giao diện tối để bảo vệ mắt</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4>Phát nhạc</h4>
                        <div class="setting-item">
                            <div class="setting-info">
                                <span class="setting-label">Tự động phát</span>
                                <span class="setting-desc">Tự động phát bài tiếp theo</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <span class="setting-label">Chất lượng nhạc</span>
                                <span class="setting-desc">Chọn chất lượng phát nhạc</span>
                            </div>
                            <select class="setting-select">
                                <option value="low">Thấp (128kbps)</option>
                                <option value="medium">Trung bình (256kbps)</option>
                                <option value="high" selected>Cao (320kbps)</option>
                            </select>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4>Thông báo</h4>
                        <div class="setting-item">
                            <div class="setting-info">
                                <span class="setting-label">Thông báo bài hát mới</span>
                                <span class="setting-desc">Nhận thông báo khi có bài hát mới</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <span class="setting-label">Thông báo album mới</span>
                                <span class="setting-desc">Nhận thông báo khi có album mới</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4>Tài khoản</h4>
                        <div class="setting-item clickable">
                            <span class="setting-label">Thông tin cá nhân</span>
                            <span class="material-icons-round">chevron_right</span>
                        </div>
                        <div class="setting-item clickable">
                            <span class="setting-label">Đổi mật khẩu</span>
                            <span class="material-icons-round">chevron_right</span>
                        </div>
                        <div class="setting-item clickable logout-btn">
                            <span class="setting-label" style="color: #ff4757;">Đăng xuất</span>
                            <span class="material-icons-round" style="color: #ff4757;">logout</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="settings-overlay"></div>

            <div class="mini-user-profile${!isLoggedIn ? ' is-guest' : '" data-route="/profile"'}">
                <div class="avatar">
                    <img src="${currentUser ? currentUser.avatar : ' /assets/img/guest-avatar.png'}" alt="User Avatar">
                </div>
                ${currentUser ? '<span class="name">' + currentUser.name + '</span>' : ''}
            </div>
        </div>
    `;
}

function handleSearch(e) {
    const query = e.target.value.trim();

    if (query.length > 0) {
        const results = searchSongs(query);
        if (results.length === 0) {
            $('.search-bar-suggestions').html('<li class="no-results">Không tìm thấy kết quả</li>');
            return;
        }
        $('.search-bar-suggestions').addClass('is-shown');
        displaySearchResults(results);
    } else {
        $('.search-bar-suggestions').removeClass('is-shown');
        $('.search-bar-suggestions').empty();
    }
}

// Display search results
function displaySearchResults(results) {
    const searchBarSuggestions = $('.search-bar-suggestions');
    let suggestionItems = '<li class="suggestion-label">Gợi ý kết quả</li>';
    results.forEach(song => {
        suggestionItems += `
            <li class="suggestion-item">
                <div>
                    <img src="${song.image}" alt="${song.title} - ${song.artist}">
                    <button type="button" data-song-id="${song.id}">
                        <span class="material-icons-round">
                            play_arrow
                        </span>
                    </button>
                </div>
                <div class="suggestion-info">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                </div>
            </li>
        `;
    });
    searchBarSuggestions.html(suggestionItems);
}

function initSearchBar() {
    // Sử dụng event delegation để tránh mất event khi re-render header
    $(document).on('input', '.search-bar input', handleSearch);

    $(document).on('click', '.search-bar', function () {
        $('.search-bar-wrapper').addClass('is-expanded');
    });

    $(document).on('click', '#btn-close-search-bar', function () {
        $('.search-bar-wrapper').removeClass('is-expanded');
        $('.search-bar-suggestions').removeClass('is-shown');
        $('.search-bar-suggestions').empty();
        $('.search-bar input').val('');
    });
}

function initNotificationsAndSettings() {
    // Toggle Notifications Dropdown
    $(document).on('click', '.btn-notification', function (e) {
        e.stopPropagation();
        const $dropdown = $('.notifications-dropdown');
        $dropdown.toggleClass('active');
        // Close settings if open
        $('.settings-panel').removeClass('active');
        $('.settings-overlay').removeClass('active');
    });

    // Close notifications when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.btn-notification, .notifications-dropdown').length) {
            $('.notifications-dropdown').removeClass('active');
        }
    });

    // Mark all as read
    $(document).on('click', '.btn-mark-read', function (e) {
        e.stopPropagation();
        $('.notification-item').removeClass('unread');
        $('.btn-notification .dot').fadeOut();
    });

    // Click on notification item
    $(document).on('click', '.notification-item', function () {
        $(this).removeClass('unread');
        // Handle notification click action here
        console.log('Notification clicked');
    });

    // Toggle Settings Panel
    $(document).on('click', '.btn-settings', function (e) {
        e.stopPropagation();
        $('.settings-panel').addClass('active');
        $('.settings-overlay').addClass('active');
        // Close notifications if open
        $('.notifications-dropdown').removeClass('active');
    });

    // Close Settings Panel
    $(document).on('click', '.btn-close-settings, .settings-overlay', function () {
        $('.settings-panel').removeClass('active');
        $('.settings-overlay').removeClass('active');
    });

    // Logout button
    $(document).on('click', '.logout-btn', function () {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            auth.logout();
            $('.settings-panel').removeClass('active');
            $('.settings-overlay').removeClass('active');
            $('.header').html(Header());
            navigateTo('/');
        }
    });

    // Go to Settings Page
    $(document).on('click', '.setting-item[data-action="goto-settings"]', function () {
        $('.settings-panel').removeClass('active');
        $('.settings-overlay').removeClass('active');
        navigateTo('/settings');
    });

    // Toggle switches
    $(document).on('change', '.toggle-switch input', function () {
        const $item = $(this).closest('.setting-item');
        const label = $item.find('.setting-label').text();
        const isChecked = $(this).is(':checked');
        console.log(`${label}: ${isChecked ? 'Bật' : 'Tắt'}`);

        // Handle specific settings
        if (label === 'Chế độ tối') {
            // Toggle dark mode (already dark, could add light mode here)
            console.log('Dark mode toggle');
        }
    });

    // Quality select change
    $(document).on('change', '.setting-select', function () {
        const quality = $(this).val();
        console.log('Chất lượng nhạc:', quality);
        // Save to localStorage or apply setting
        localStorage.setItem('musicQuality', quality);
    });
}

// Khởi tạo các sự kiện trong Header
export function initHeaderEvents() {
    initSearchBar();
    initNotificationsAndSettings();
}