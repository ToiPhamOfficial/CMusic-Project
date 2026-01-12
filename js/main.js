/* Import components */
import Sidebar from './components/Sidebar.js';
import Player from './components/Player.js';
import Header from './components/Header.js';
import LoginSignup from './components/LoginSignup.js';
import Toast from './components/Toast.js';

/* Import modules */
import { initRouter } from './router.js';
import { navigateTo } from './router.js';
import { songs, searchSongs } from './data.js';

/* Import services */
import auth from './services/auth.js';
import audioManager from './services/audioManager.js';

// Khởi tạo app
$(document).ready(function () {
    // Render các components tĩnh
    renderComponents();

    // Khởi tạo router
    initRouter();

    // Thêm event listeners
    initEventListeners();

    // Init sidebar toggle
    initSidebarToggle();

    // Khởi tạo login signup modal interactions
    initLoginSignupModal();

    // Set playlist mặc định cho audio manager
    audioManager.setPlaylist(songs);
});

// Render các components tĩnh
function renderComponents() {
    // Render Sidebar
    $('.sidebar').html(Sidebar());

    // Render Header
    $('.header').html(Header());

    // Render Bottom Player
    $('.player').html(Player());

    $('#modal-root').html(LoginSignup());
}

// Khởi tạo các event listeners
function initEventListeners() {
    // Search functionality - Sử dụng event delegation
    $(document).on('input', '.search-bar input', handleSearch);

    // Listeners for other element :))
    $(document).on('click', '[data-route]', function () {
        const path = $(this).data('route');
        navigateTo(path);
    });

    // Notifications & Settings
    initNotificationsAndSettings();

    // Event delegation cho các actions
    $(document).on('click', '.nav-link', handleNavigation);

    $(document).on('click', '.btn-play-song', function () {
        const songId = parseInt($(this).data('song-id'));
        playSong(songId);
    });

    $(document).on('click', '.btn-add-song', function () {
        const songId = parseInt($(this).data('song-id'));
        addToPlaylist(songId);
    });

    // Tab navigation
    $(document).on('click', '.tab-item', function () {
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
    });

    // Bottom Player Controls
    initPlayerControls();

    // Search Bar interactions
    initSearchBar();

    // FOLLOW / UNFOLLOW (theo artistId)
    $(document).on('click', '.btn-follow', function () {
        const $btn = $(this);
        const artistId = $btn.data('artist-id');
        if (!artistId) return;

        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            alert('Vui lòng đăng nhập');
            return;
        }

        // Danh sách artist đã theo dõi
        user.followedArtists ||= [];

        const index = user.followedArtists.indexOf(artistId);

        if (index === -1) {
            // FOLLOW
            user.followedArtists.push(artistId);
            $btn.text('Đã theo dõi');
        } else {
            // UNFOLLOW
            user.followedArtists.splice(index, 1);
            $btn.text('Theo dõi');
        }

        // Lưu lại user
        localStorage.setItem('currentUser', JSON.stringify(user));
    });

    // Xử lý click nút Xem thêm / Thu gọn
    $(document).on('click', '.btn-toggle-lyrics', function() {
        const $content = $('#lyric-content');
        const $btn = $(this);
        
        if ($content.hasClass('collapsed')) {
            // Đang đóng -> Mở ra
            $content.removeClass('collapsed').addClass('expanded');
            $btn.html('THU GỌN <i class="fa fa-chevron-up"></i>');
        } else {
            // Đang mở -> Đóng lại
            $content.removeClass('expanded').addClass('collapsed');
            $btn.html('XEM THÊM <i class="fa fa-chevron-down"></i>');
        }
    });

    // Artists Page - Dropdown Toggle
    initArtistsDropdown();
}

// Khởi tạo dropdown cho trang Artists
function initArtistsDropdown() {
    let currentOpenDropdown = null;

    // Toggle dropdown khi click vào icon more
    $(document).on('click', '.js-dropdown-trigger', function(e) {
        e.stopPropagation();
        const $wrapper = $(this).closest('.page-artists__dropdown-wrapper');
        const $dropdown = $wrapper.find('.page-artists__dropdown');

        // Đóng dropdown đang mở (nếu có)
        if (currentOpenDropdown && currentOpenDropdown[0] !== $dropdown[0]) {
            currentOpenDropdown.removeClass('page-artists__dropdown--active');
        }

        // Toggle dropdown hiện tại
        $dropdown.toggleClass('page-artists__dropdown--active');
        currentOpenDropdown = $dropdown.hasClass('page-artists__dropdown--active') ? $dropdown : null;
    });

    // Đóng dropdown khi click bên ngoài
    $(document).on('click', function(e) {
        if (currentOpenDropdown && !$(e.target).closest('.page-artists__dropdown-wrapper').length) {
            currentOpenDropdown.removeClass('page-artists__dropdown--active');
            currentOpenDropdown = null;
        }
    });

    // Xử lý các action trong dropdown
    $(document).on('click', '.page-artists__dropdown-item', function(e) {
        e.stopPropagation();
        const action = $(this).data('action');
        const $track = $(this).closest('.page-artists__track');
        const songId = $track.data('song-id');

        // Đóng dropdown
        if (currentOpenDropdown) {
            currentOpenDropdown.removeClass('page-artists__dropdown--active');
            currentOpenDropdown = null;
        }

        // Xử lý action
        handleArtistsDropdownAction(action, songId);
    });
}

// Xử lý các action của dropdown trong trang Artists
function handleArtistsDropdownAction(action, songId) {
    switch (action) {
        case 'download':
            Toast.info('Tính năng tải về đang được phát triển');
            break;
        case 'add-to-playlist':
            Toast.info('Tính năng thêm vào playlist đang được phát triển');
            break;
        case 'share':
            Toast.info('Tính năng chia sẻ đang được phát triển');
            break;
        case 'report':
            Toast.warning('Tính năng báo cáo đang được phát triển');
            break;
    }
}

function initSidebarToggle() {
    // Sử dụng event delegation để tránh mất event khi re-render header
    $(document).on('click', '.btn-menu, #btn-close-sidebar', function () {
        $('.sidebar').toggleClass('is-active');
        $('.overlay').toggleClass('is-open');
    });

    // Đóng sidebar khi bấm vào overlay
    $(document).on('click', '.overlay', function () {
        $('.sidebar').removeClass('is-active');
        $(this).removeClass('is-open');
    });
}

// Init login signup modal interactions
function initLoginSignupModal() {
    const $modal = $('#login-signup-modal');
    const $views = $('.auth-view');

    // Hàm chuyển đổi view linh hoạt
    function switchAuthView(viewId) {
        $views.removeClass('active');
        $(`${viewId}`).addClass('active');
    }

    // 1. Mở modal (mặc định luôn hiện login) - Sử dụng event delegation
    $(document).on('click', '.mini-user-profile.is-guest', function () {
        $modal.addClass('is-shown');
        switchAuthView('#login-view');
    });

    // 2. Chuyển đổi qua lại giữa Đăng nhập/Đăng ký (Sử dụng ID từ href)
    // Giả sử HTML: <a href="#signup-view" class="modal__link">Đăng ký ngay!</a>
    $(document).on('click', '.modal__link', function (e) {
        e.preventDefault();
        const targetView = $(this).attr('data-target');
        console.log('Switching to view:', targetView);
        if (targetView) {
            switchAuthView(targetView);
        }
    });

    // 3. Đóng modal (Vừa bấm nút Close vừa bấm ra ngoài Overlay)
    $modal.on('click', function (e) {
        const isCloseBtn = $(e.target).closest('.modal__close button').length > 0;
        const isOverlay = $(e.target).is($modal);

        if (isCloseBtn || isOverlay) {
            $modal.removeClass('is-shown');
        }
    });

    // Toggle password visibility - Sử dụng event delegation
    $(document).on('click', '.auth-form__toggle-password', function () {
        const $passwordInput = $(this).siblings('input[type="password"], input[type="text"]');
        const type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordInput.attr('type', type);
        $(this).find('span').text(type === 'password' ? 'visibility' : 'visibility_off');
    });

    $(document).on('submit', '.auth-form', function (e) {
        e.preventDefault();
        // if(!$(this).valid) {
        //     console.log('Form is valid, proceeding...');
        //     return;
        // }
        const isLogin = $(this).attr('id') === 'login-form';
        if (isLogin) {
            // Handle login
            const email = $('#login-email').val().trim();
            const password = $('#login-password').val().trim();
            const loginResult = auth.handleLogin(email, password);
            Toast[loginResult.type](loginResult.message);
            
            if (loginResult.success) {
                // Đóng modal
                $modal.removeClass('is-shown');
                // Re-render Header để hiển thị thông tin user
                $('.header').html(Header());
                // Reset form
                $(this)[0].reset();
            }
            
        } else {
            // Handle signup
            const name = $('#signup-name').val().trim();
            const email = $('#signup-email').val().trim();
            const password = $('#signup-password').val().trim();
            const confirmPassword = $('#signup-confirm-password').val().trim();
            const signupResult = auth.handleSignup(name, email, password, confirmPassword);
            Toast[signupResult.type](signupResult.message);
            
            if (signupResult.success) {
                // Đóng modal
                $modal.removeClass('is-shown');
                // Re-render Header để hiển thị thông tin user
                $('.header').html(Header());
                // Reset form
                $(this)[0].reset();
            }
        }
    });
}

// Khởi tạo bottom player controls
function initPlayerControls() {
    // Play/Pause button
    $(document).on('click', '.player-controls .btn-play, .player-controls .play, .suggestion-item div button, .btn-play', function () {
        $(this).find('span').text(function (i, text) {
            return text === 'play_arrow' ? 'pause' : 'play_arrow';
        });
        audioManager.togglePlay();
    });

    // Previous button
    $(document).on('click', '.player-controls .btn-control[title="Previous"]', function () {
        audioManager.prev();
    });

    // Next button
    $(document).on('click', '.player-controls .btn-control[title="Next"]', function () {
        audioManager.next();
    });

    // Repeat button
    $(document).on('click', '.player-controls .btn-control[title="Repeat"]', function () {
        audioManager.toggleRepeat();
    });

    // Shuffle button
    $(document).on('click', '.player-controls .btn-control[title="Shuffle"]', function () {
        audioManager.toggleShuffle();
    });

    // Progress slider
    $(document).on('input', '.progress-slider', function () {
        const percentage = $(this).val();
        audioManager.seek(percentage);
    });

    // Favorite button
    $(document).on('click', '.player-right .btn-control[title="Favorite"]', function () {
        $(this).find('span').text(function (i, text) {
            return text === 'favorite' ? 'favorite_border' : 'favorite';
        });
        $(this).toggleClass('favorited');
    });

    // Player More Dropdown Toggle
    $(document).on('click', '.btn-more', function (e) {
        e.stopPropagation();
        const $dropdown = $('.player-more-dropdown');
        $dropdown.toggleClass('active');
    });

    // Close More Dropdown when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.player-more-container').length) {
            $('.player-more-dropdown').removeClass('active');
        }
    });

    // Handle More Dropdown Actions
    $(document).on('click', '.dropdown-item', function (e) {
        e.stopPropagation();
        const action = $(this).data('action');
        
        switch (action) {
            case 'download':
                Toast.info('Tính năng tải về đang được phát triển');
                break;
            case 'add-to-playlist':
                Toast.info('Tính năng thêm vào playlist đang được phát triển');
                break;
            case 'share':
                Toast.info('Tính năng chia sẻ đang được phát triển');
                break;
            case 'report':
                Toast.warning('Tính năng báo cáo đang được phát triển');
                break;
        }
        
        $('.player-more-dropdown').removeClass('active');
    });

    // colose player more dropdown when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.player-more-container').length) {
            $('.player-more-dropdown').removeClass('active');
        }
    });

    // For mobile - expand player
    $(document).on('click', '.player', function (e) {
        // Không expand nếu click vào button hoặc controls
        if ($(e.target).closest('.btn-control, .btn-collapse-player, .progress-slider, .queue-panel, .player-more-dropdown').length) {
            return;
        }
        
        // Chỉ expand trên mobile
        if (window.innerWidth <= 576) {
            $(this).addClass('is-expanded');
        }
    });

    // Collapse player button
    $(document).on('click', '.btn-collapse-player', function (e) {
        // e.stopPropagation();
        $('.player').removeClass('is-expanded');
    });

    // Queue Panel Toggle
    $(document).on('click', '.btn-queue', function (e) {
        e.stopPropagation();
        $('.queue-panel').addClass('active');
        $('.queue-overlay').addClass('active');
        renderQueue();
    });

    // Close Queue Panel
    $(document).on('click', '.btn-close-queue, .queue-overlay', function () {
        $('.queue-panel').removeClass('active');
        $('.queue-overlay').removeClass('active');
    });

    // Queue Item Click - Play song from queue
    $(document).on('click', '.queue-item', function () {
        const songId = parseInt($(this).data('song-id'));
        if (songId) {
            const song = songs.find(s => s.id === songId);
            if (song) {
                audioManager.playSong(song, audioManager.playlist);
                renderQueue(); // Re-render to update active state
            }
        }
    });
}

// Khởi tạo search bar interactions
function initSearchBar() {
    // Sử dụng event delegation để tránh mất event khi re-render header
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





////////////////////////////////////////////
// Handle search
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

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();

    // Remove active class from all nav items
    $('.nav-item').removeClass('active');

    // Add active class to clicked nav item
    $(this).closest('.nav-item').addClass('active');
}

// Play song
function playSong(songId) {
    const song = songs.find(s => s.id === songId);

    if (song) {
        audioManager.playSong(song, songs);
        console.log('Playing:', song.title);
    }
}

// Render Queue Panel
function renderQueue() {
    const playlist = audioManager.playlist || [];
    const currentSong = audioManager.currentSong;
    const queueList = $('.queue-list');
    
    if (playlist.length === 0) {
        queueList.html(`
            <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                <span class="material-icons-round" style="font-size: 64px; opacity: 0.3;">queue_music</span>
                <p style="margin-top: 16px;">Chưa có bài hát nào trong danh sách phát</p>
            </div>
        `);
        return;
    }
    
    let queueHTML = '';
    playlist.forEach((song, index) => {
        const isActive = currentSong && currentSong.id === song.id ? 'active' : '';
        queueHTML += `
            <div class="queue-item ${isActive}" data-song-id="${song.id}">
                <div class="queue-item-thumbnail">
                    <img src="${song.image}" alt="${song.title}">
                    <div class="play-indicator">
                        <span class="material-icons-round">equalizer</span>
                    </div>
                </div>
                <div class="queue-item-info">
                    <div class="queue-item-title">${song.title}</div>
                    <div class="queue-item-artist">${song.artist}</div>
                </div>
                <div class="queue-item-actions">
                    <button class="queue-item-btn" title="Thêm vào yêu thích">
                        <span class="material-icons-round">favorite_border</span>
                    </button>
                    <button class="queue-item-btn" title="Thêm tùy chọn">
                        <span class="material-icons-round">more_horiz</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    queueList.html(queueHTML);
}

// Initialize Notifications and Settings
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


// Add to playlist
function addToPlaylist(songId) {
    const song = songs.find(s => s.id === songId);

    if (song) {
        console.log('Added to playlist:', song.title);
        // TODO: Implement actual playlist functionality

        // Show notification
        Toast.success(`Đã thêm "${song.title}" vào playlist!`);
    }
}
///////////////////////////////////////////////////////

// STATE //




///////////////////////////////////////////////////////



// Export functions for use in other modules
export { playSong, addToPlaylist };