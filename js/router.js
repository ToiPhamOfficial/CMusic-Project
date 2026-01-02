// Router cho Single Page Application
import Explore from './views/Explore.js';
import Album from './views/Album.js';
import Artist from './views/Artist.js';
import Genre from './views/Genre.js';
import Playlist from './views/Playlist.js';
import Favorite from './views/Favorite.js'
import Profile from './views/Profile.js';
import RecentlyPlayed_Songs from './views/RecentlyPlayed-Songs.js';
import RecentlyPlayed_Playlist from './views/RecentlyPlayed-Playlist.js';
import RecentlyPlayed_Album from './views/RecentlyPlayed-Album.js';
import RecentlyPlayed_Artist from './views/RecentlyPlayed-Artist.js';

// Định nghĩa các route (sử dụng History API)
const routes = {
    '/': Explore,
    '/explore': Explore,
    '/album': Album,
    '/artist': Artist,
    '/genre': Genre,
    '/playlist': Playlist,
    '/recent': RecentlyPlayed_Songs,
    '/recent/playlist': RecentlyPlayed_Playlist,
    '/recent/album': RecentlyPlayed_Album,
    '/recent/artist': RecentlyPlayed_Artist,
    '/favorites': Favorite,
    '/archive': Explore,
    '/profile': Profile
};

// Render trang dựa trên route hiện tại
export function renderRoute(path) {
    const currentPath = path || window.location.pathname;
    const route = routes[currentPath] || routes['/'];
    
    // Lấy app container
    $('.container').html(route());
    
    // Update active state trong sidebar
    updateActiveNavItem(currentPath);
}

// Update active state trong navigation
function updateActiveNavItem(path) {
    // Remove active class từ tất cả nav items
    $('.nav-item').removeClass('active');
    
    // Add active class cho nav item tương ứng
    $(`.nav-link[href="${path}"]`).closest('.nav-item').addClass('active');
}

// Khởi tạo router
export function initRouter() {
    // Xử lý khi người dùng click vào nav-link
    $(document).on('click', '.nav-link', function(e) {
        const href = $(this).attr('href');
        
        // Chỉ handle internal links (bắt đầu bằng /)
        if (href && href.startsWith('/')) {
            e.preventDefault();
            navigateTo(href);
        }
    });

    // Xử lý khi người dùng dùng nút back/forward của trình duyệt
    $(window).on('popstate', function() {
        renderRoute(window.location.pathname);
    });

    // Render trang đầu tiên khi load
    renderRoute(window.location.pathname);
}

// Navigate đến trang mới (helper function)
export function navigateTo(path) {
    window.history.pushState({}, '', path);
    renderRoute(path);
}
