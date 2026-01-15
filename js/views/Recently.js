import { getAlbumById, getPlaylistById, getArtistById, getSongById } from '../data.js';
import { AlbumCard, PlaylistCard, ArtistCard, SongItem } from '../components/Card.js';


// Tên key để lưu trong LocalStorage
const STORAGE_KEY = 'music_app_recent_history';

// Hàm lấy dữ liệu lịch sử (Ưu tiên LocalStorage, nếu không có thì trả về mảng rỗng)
function getRecentData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        return JSON.parse(storedData);
    }
    // Cấu trúc mặc định nếu chưa có lịch sử
    return {
        albums: [1, 2],
        playlists: [1, 2],
        artists: [1, 2],
        songsIds: [1, 2]
    };
}

// --- CÁC HÀM RENDER UI ---

function Albums() {
    const data = getRecentData();
    // Map ID sang Object thật, và lọc bỏ các item null (trường hợp ID bị xóa khỏi data gốc)
    const recentAlbums = data.albums.map(id => getAlbumById(id)).filter(item => item);

    if (recentAlbums.length === 0) return ''; // Hoặc trả về thông báo "Chưa có album"

    return `
        <section class="section-box albums">
            <div class="section-header"><h2>Album gần đây</h2></div>
            <div class="album-grid">
                ${recentAlbums.map(album => AlbumCard(album)).join('')}
            </div>
        </section>
    `;
}

function Playlists() {
    const data = getRecentData();
    const recentPlaylists = data.playlists.map(id => getPlaylistById(id)).filter(item => item);

    if (recentPlaylists.length === 0) return '';

    return `
        <section class="section-box playlists">
            <div class="section-header"><h2>Playlist gần đây</h2></div>
            <div class="playlist-grid">
                ${recentPlaylists.map(playlist => PlaylistCard(playlist)).join('')}
            </div>
        </section>
    `;
}

function Artists() {
    const data = getRecentData();
    const recentArtists = data.artists.map(id => getArtistById(id)).filter(item => item);

    if (recentArtists.length === 0) return '';

    return `
        <section class="section-box artists">
            <div class="section-header"><h2>Nghệ sĩ gần đây</h2></div>
            <div class="artist-grid">
                ${recentArtists.map(artist => ArtistCard(artist)).join('')}
            </div>
        </section>
    `;
}

function Songs() {
    const data = getRecentData();
    const recentSongs = data.songsIds.map(id => getSongById(id)).filter(item => item);

    if (recentSongs.length === 0) {
        return `
            <div style="text-align: center; padding: 40px; color: #888;"> 
                <p>Bạn chưa nghe bài hát nào gần đây.</p>
            </div>
        `;
    }

    return `
        <section class="section-box page-recently__songs">
            <div class="page-recently__songs-header">
                <div class="page-recently__songs-header-col page-recently__songs-header-col--index">#</div>
                <div class="page-recently__songs-header-col page-recently__songs-header-col--title">Bài hát</div>
                <div class="page-recently__songs-header-col page-recently__songs-header-col--artist">Nghệ sĩ</div>
                <div class="page-recently__songs-header-col page-recently__songs-header-col--time">Thời gian</div>
            </div>
            <div class="divider"></div>
            <div class="song-list">
                ${recentSongs.map((song, index) => SongItem(song, index + 1)).join('')}
            </div>
        </section>
    `;
}

// --- MAIN RENDER ---

export default function Recently() {
    return `
        <section class="page__heading page-recently__heading">
            <h1 class="page__title page-recently__title">Nghe gần đây</h1>
            <p class="page__subtitle page-recently__subtitle">Tiếp tục thưởng thức những giai điệu bạn yêu thích.</p>
        </section>
        
        <section class="tabs">
            <button class="tabs__tab-item active" data-tab-id="0">Tất cả</button>
            <button class="tabs__tab-item" data-tab-id="1">Bài hát</button>
            <button class="tabs__tab-item" data-tab-id="2">Album</button>
            <button class="tabs__tab-item" data-tab-id="3">Playlist</button>
            <button class="tabs__tab-item" data-tab-id="4">Nghệ sĩ</button>
        </section>

        <section class="page-recently__wrapper" id="recently-content">
            ${Albums()}
            ${Playlists()}
            ${Artists()}
            ${Songs()}
        </section>
    `;
}

// --- EVENT HANDLERS ---

export function initRecentlyPageEvents() {
    // Dùng .off() trước khi .on() để tránh bị gán sự kiện nhiều lần khi chuyển trang qua lại
    $(document).off('click', '.tabs__tab-item').on('click', '.tabs__tab-item', function() {
        // Chỉ xử lý nếu đang ở trang Recently (có id recently-content)
        if ($('#recently-content').length === 0) return;
        
        // Active tab style
        $('.tabs__tab-item').removeClass('active');
        $(this).addClass('active');

        const tabId = parseInt($(this).data('tab-id'));
        let contentHTML = '';

        switch (tabId) {
            case 0: // Tất cả
                contentHTML = Albums() + Playlists() + Artists() + Songs();
                if (!contentHTML || contentHTML.trim() === "") {
    return `
        <div style="text-align: center; padding: 40px; color: #888;"> 
            <p>Bạn chưa nghe bài hát nào gần đây.</p>
        </div>
    `;
}
                break;
            case 1: // Bài hát
                contentHTML = Songs();
                break;
            case 2: // Album
                contentHTML = Albums();
                break;
            case 3: // Playlist
                contentHTML = Playlists();
                break;
            case 4: // Nghệ sĩ
                contentHTML = Artists();
                break;
            default:
                contentHTML = Songs();
        }

        $('#recently-content').html(contentHTML);
    });
}

// --- HÀM HỖ TRỢ: GỌI HÀM NÀY KHI BẤM PLAY ---
// Bạn export hàm này để dùng ở file Player.js hoặc nơi xử lý logic phát nhạc
export function addToHistory(type, id) {
    // type: 'songsIds', 'albums', 'playlists', 'artists'
    // id: ID của item
    
    // 1. Lấy dữ liệu cũ
    let currentHistory = getRecentData();

    // 2. Kiểm tra type có hợp lệ không
    if (!currentHistory[type]) {
        console.error('Loại lịch sử không hợp lệ:', type);
        return;
    }

    // 3. Xóa ID nếu đã tồn tại (để đưa lên đầu danh sách)
    // Lưu ý: Đảm bảo so sánh cùng kiểu dữ liệu (String/Number)
    currentHistory[type] = currentHistory[type].filter(existingId => existingId != id);

    // 4. Thêm ID mới vào đầu mảng
    currentHistory[type].unshift(id);

    // 5. Giới hạn số lượng (Ví dụ: chỉ lưu 20 bài gần nhất)
    if (currentHistory[type].length > 20) {
        currentHistory[type].pop();
    }

    // 6. Lưu lại vào LocalStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentHistory));
}