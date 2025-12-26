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
    $('.bottom-player').html(Player());

    $('#modal-root').html(LoginSignup());
}

// Khởi tạo các event listeners
function initEventListeners() {
    // Search functionality
    $('.search-bar input').on('input', handleSearch);

    // Listeners for other element :))
    $(document).on('click', '[data-route]', function () {
        const path = $(this).data('route');
        navigateTo(path);
    });


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
    initBottomPlayerControls();

    // Search Bar interactions
    initSearchBar();
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

    // 1. Mở modal (mặc định luôn hiện login)
    $('.mini-user-profile.is-guest').on('click', function () {
        $modal.addClass('is-shown');
        switchAuthView('#login-view');
    });

    // 2. Chuyển đổi qua lại giữa Đăng nhập/Đăng ký (Sử dụng ID từ href)
    // Giả sử HTML: <a href="#signup-view" class="modal__link">Đăng ký ngay!</a>
    $('.modal__link').on('click', function (e) {
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

    // Toggle password visibility
    $('.auth-form__toggle-password').on('click', function () {
        const $passwordInput = $(this).siblings('input[type="password"], input[type="text"]');
        const type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
        $passwordInput.attr('type', type);
        $(this).find('span').text(type === 'password' ? 'visibility' : 'visibility_off');
    });

    $('.auth-form').on('submit', function (e) {
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
function initBottomPlayerControls() {
    // Play/Pause button
    $(document).on('click', '.bottom-player-controls .btn-play, .player-controls .play, .suggestion-item div button', function () {
        Toast.error('Đang phát nhạc mà chưa được cấp phép âm thanh do trình duyệt chặn tự động phát!');
        audioManager.togglePlay();
    });

    // Previous button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Previous"]', function () {
        audioManager.prev();
    });

    // Next button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Next"]', function () {
        audioManager.next();
    });

    // Repeat button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Repeat"]', function () {
        audioManager.toggleRepeat();
    });

    // Shuffle button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Shuffle"]', function () {
        audioManager.toggleShuffle();
    });

    // Progress slider
    $(document).on('input', '.progress-slider', function () {
        const percentage = $(this).val();
        audioManager.seek(percentage);
    });

    // Favorite button
    $(document).on('click', '.bottom-player-right .btn-control[title="Favorite"]', function () {
        $(this).find('span').text(function (i, text) {
            return text === 'favorite' ? 'favorite_border' : 'favorite';
        });
        $(this).toggleClass('favorited');
    });
}

// Khởi tạo search bar interactions
function initSearchBar() {
    $('.search-bar').on('click', function () {
        $(this).addClass('is-expanded');
        // $('.search-bar-suggestions').css('display', 'flex');
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
    let suggestionItems = '<li class="sugestion-label">Gợi ý kết quả</li>';
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




// Export functions for use in other modules
export { playSong, addToPlaylist };