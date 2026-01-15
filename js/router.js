import Explore from './views/Explore.js';
import Albums from './views/Albums.js';
import Artists from './views/Artists.js';
import Genres from './views/Genres.js';
import Playlist from './views/Playlist.js';
import Favorites from './views/Favorites.js';
import Profile from './views/Profile.js';
import Recently from './views/Recently.js';
import AlbumsSaved from './views/AlbumsSaved.js';
import ArtistDetail from './views/DetailArtist.js';
import PlaylistDetail from './views/DetailPlaylist.js';
import SongDetail from './views/DetailSong.js';
import AlbumDetail from './views/DetailAlbum.js';
import GenreDetail from './views/DetailGenre.js';

// Cấu hình Route map
const routes = {
    '/': Explore,
    '/albums': Albums,
    '/artists': Artists,
    '/genres': Genres,
    '/playlist': Playlist,
    '/recently': Recently,
    '/albums-saved': AlbumsSaved,
    '/favorites': Favorites,
    '/profile': Profile,
    '/artist-detail': ArtistDetail,
    '/playlist-detail': PlaylistDetail,
    '/song-detail': SongDetail,
    '/album-detail': AlbumDetail,
    '/genre-detail': GenreDetail
};

// Khởi tạo Router
export function initRouter() {
    // 1. Xử lý click link nội bộ
    $(document).on('click', 'a[href^="/"]', (e) => {
        const href = $(e.currentTarget).attr('href');
        if (href?.startsWith('/')) {
            e.preventDefault();
            navigateTo(href);
        }
    });

    // 2. Xử lý click element có data-route
    $(document).on('click', '[data-route]', function () {
        const path = $(this).data('route');
        navigateTo(path);
    });

    // 3. Xử lý nút Back/Forward trình duyệt
    $(window).on('popstate', () => renderRoute());

    // 4. Xử lý lần đầu load trang (Redirect index.html hoặc 404 về Home)
    const path = window.location.pathname;
    if (path === '/index.html' || (!routes[path] && path !== '/')) {
        navigateTo('/', true); // Replace state
    } else {
        renderRoute();
    }
}

// Điều hướng và Render
export function navigateTo(path, replace = false) {
    if (replace) window.history.replaceState(null, null, path);
    else window.history.pushState(null, null, path);
    renderRoute(path);
}

// Expose navigateTo ra global scope để components có thể sử dụng
window.navigateTo = navigateTo;

// Render View dựa trên URL
export function renderRoute(path = window.location.pathname) {
    const routePath = path.split('?')[0];
    const view = routes[routePath] || routes['/'];

    // Render HTML
    $('.container').html(view());

    // Update Sidebar Active
    $('.nav-item').removeClass('active');
    $(`.nav-link[href="${routePath}"]`).closest('.nav-item').addClass('active');
}