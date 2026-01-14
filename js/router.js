// Router cho Single Page Application
import Explore from './views/Explore.js';
import Albums from './views/Albums.js';
import Artists from './views/Artists.js';
import Genres from './views/Genres.js';
import Playlist from './views/Playlist.js';
import Favorites from './views/Favorites.js'
import Profile from './views/Profile.js';
import Recently from './views/Recently.js';
import AlbumsSaved from './views/AlbumsSaved.js';
import ArtistDetail from './views/DetailArtist.js';
import PlaylistDetail from './views/DetailPlaylist.js';
import SongDetail from './views/DetailSong.js';
import AlbumDetail from './views/DetailAlbum.js';

// Định nghĩa các route (sử dụng History API)
const routes = {
    '/': Explore,
    '/albums': Albums,
    '/artists': Artists,
    '/genres': Genres,
    '/playlist': Playlist,
    '/recently': Recently,
    '/albums-saved': AlbumsSaved,
    '/favorites': Favorites,
    '/archive': Explore,
    '/profile': Profile,
    '/artist-detail': ArtistDetail, // Trang chi tiết (Tên khác đi cho đỡ nhầm)
    '/playlist-detail': PlaylistDetail,
    '/song-detail': SongDetail,
    '/album-detail': AlbumDetail
};

// Render trang dựa trên route hiện tại
export function renderRoute(path) {
    // const currentPath = path || window.location.pathname;
    // const route = routes[currentPath];
    
    // // Lấy app container
    // $('.container').html(route());
    
    // // Update active state trong sidebar
    // updateActiveNavItem(currentPath);

    //--------------------------------------------------
    // 1. Xác định path thực tế
    // Ưu tiên path được truyền vào (từ navigateTo), nếu không có thì lấy từ URL trình duyệt
    const fullPath = path || window.location.pathname;

    // 2. Tách path chính và query string (để map đúng key trong routes)
    // Ví dụ: '/song-detail?id=10' -> routePath là '/song-detail'
    const routePath = fullPath.split('?')[0];

    // 3. Tìm view
    const viewFunction = routes[routePath] || routes['/'];

    // 4. Render HTML
    // View sẽ tự lấy ID từ URLSearchParams bên trong nó
    $('.container').html(viewFunction());

    // 5. Update Sidebar (chỉ cần highlight path chính)
    updateActiveNavItem(routePath);
}

// Update active state trong navigation
function updateActiveNavItem(path) {
    // Remove active class từ tất cả nav items
    $('.nav-item').removeClass('active');
    
    // Add active class cho nav item tương ứng
    $(`.nav-link[href="${path}"]`).closest('.nav-item').addClass('active');

    // // Tìm thẻ a có href bắt đầu bằng path hiện tại
    // $(`.nav-link[href^="${path}"]`).closest('.nav-item').addClass('active');
}

// Khởi tạo router
export function initRouter() {
    // Xử lý khi người dùng click vào bất kỳ link nào có href bắt đầu bằng /
    $(document).on('click', 'a[href^="/"]', function(e) {
        const href = $(this).attr('href');
        
        // Prevent default behavior và navigate bằng History API
        if (href && href.startsWith('/')) {
            e.preventDefault();
            navigateTo(href);
        }
    });

    // Xử lý khi người dùng dùng nút back/forward của trình duyệt
    $(window).on('popstate', function() {
        renderRoute(window.location.pathname);
    });

    // Xử lý redirect /index.html hoặc route không tồn tại về /
    let currentPath = window.location.pathname;
    
    // Nếu là /index.html hoặc route không tồn tại (ngoại trừ /), redirect về /
    if (currentPath === '/index.html' || (!routes[currentPath] && currentPath !== '/')) {
        window.history.replaceState({}, '', '/');
        currentPath = '/';
    }
    // Render trang đầu tiên khi load
    renderRoute(currentPath);
}

// Navigate đến trang mới (helper function)
export function navigateTo(path) {
    window.history.pushState({}, '', path);
    renderRoute(path);
}
