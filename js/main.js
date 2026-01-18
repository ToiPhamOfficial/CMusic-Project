/* Import components event handlers */
import Sidebar, { initSidebarToggle } from './components/Sidebar.js';
import Player, { initPlayerEvents } from './components/Player.js';
import Header, { initHeaderEvents } from './components/Header.js';
import LoginSignup, { initLoginSignupEvents } from './components/LoginSignup.js';
import AddPlaylist, { initAddPlaylistEvents } from './components/AddPlaylist.js';
import { initDropdownEvents } from './components/Dropdown.js';

/* Import modules */
import { initRouter } from './router.js';
import { songs } from './data.js';

/* Import services */
import audioManager from './services/audioManager.js';

/* Import utils */
import { syncButtonsWithAudioManager } from './utils/iconManager.js';

/* Import views event handlers */
import { initRecentlyPageEvents } from './views/Recently.js';
import { initArtistsPageEvents } from './views/Artists.js';

/* Import functions from ./data.js */
import { getAlbumById, getPlaylistById, getSongById, getRecommendationsByGenre} from './data.js';
import Toast from './components/Toast.js';

const App = {
    // Khởi chạy ứng dụng
    start: function () {
        this.renderComponents();
        this.initComponentEvents();
        this.initCore();
        
        // Default Settings
        audioManager.setPlaylist(songs);
    },

    // Render các components
    renderComponents: function () {
        $('.sidebar').html(Sidebar());
        $('.header').html(Header());
        $('.player').html(Player());
        $('#modal-root').html(`
            ${LoginSignup()}
            ${AddPlaylist()}
        `);
    },

    initComponentEvents: function () {
        initSidebarToggle();
        initHeaderEvents();
        initPlayerEvents();
        initLoginSignupEvents();
        initAddPlaylistEvents();
        initDropdownEvents();
    },

    // Kích hoạt Router và các trang cụ thể
    initCore: function () {
        initRouter();
        initEventListeners();
        initRecentlyPageEvents();
        initArtistsPageEvents();
    }
};

// Start App when DOM is ready
$(document).ready(() => {
    App.start();
});


/*=================================== Các hàm xử lý sự kiện chung ===================================*/
// Khởi tạo các event listeners
function initEventListeners() {
    // Chặn reload, chuyển trang khi nhạc đang phát
    // $(window).on('beforeunload', function() {
    //     if (audioManager.isPlaying) {
    //         return "Nhạc đang phát. Bạn có chắc chắn muốn rời trang?";
    //     }
    // });

    // Lắng nghe sự kiện đăng nhập/đăng ký thành công
    $(document).on('user:authChanged', function() {
        // Re-render Header để hiển thị thông tin user
        $('.header').html(Header());

        // Re-render Sidebar để hiển thị các nav link cần thiết
        $('.sidebar').html(Sidebar());
    });

    $(document).on('click', '.btn-play-music', function(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
        handlePlayClick(this);
    });
    
    // Lắng nghe sự kiện thay đổi từ audioManager để update icon
    document.addEventListener('audio:change', () => {
        syncButtonsWithAudioManager(audioManager);
    });
    
    document.addEventListener('audio:state-change', () => {
        syncButtonsWithAudioManager(audioManager);
    });
}

function handlePlayClick(btnElement) {
    const $btn = $(btnElement);
    const { currentSong, isPlaying, currentContext } = audioManager;

    // 1. Lấy dữ liệu từ nút bấm (Destructuring cho gọn)
    const target = {
        albumId: $btn.data('album-id'),
        playlistId: $btn.data('playlist-id'),
        songId: $btn.data('song-id'),
        contextType: $btn.data('context-type')
    };

    try {
        // --- TRƯỜNG HỢP A: Tương tác với nội dung ĐANG PHÁT ---

        // A1. Toggle (Pause/Play) nếu click đúng bài đang phát
        const isSameSong = target.songId && currentSong && target.songId === currentSong.id;
        if (isSameSong) {
            audioManager.togglePlay();
            return;
        }

        // A2. Kiểm tra xem có đang ở trong cùng một Context (Album/Playlist) không
        const isSameAlbum = target.albumId && currentContext.albumId === target.albumId;
        const isSamePlaylist = target.playlistId && currentContext.playlistId === target.playlistId;
        const isInSameContext = isSameAlbum || isSamePlaylist;

        // Nếu click nút Play to (không có songId) mà đang đúng context -> Toggle
        if (!target.songId && isInSameContext) {
            audioManager.togglePlay();
            return;
        }

        // Nếu click bài hát nằm trong context đang phát -> Chuyển bài (Skip)
        if (target.songId && isInSameContext) {
            const songToPlay = getSongById(target.songId);
            if (songToPlay) {
                audioManager.playSong(songToPlay);
            }
            return;
        }

        // --- TRƯỜNG HỢP B: Phát nội dung MỚI (New Context) ---
        
        console.log("Đang tải context nhạc mới...", target);

        const newContextData = fetchPlaybackData(target);

        if (newContextData && newContextData.songToPlay) {
            // Cập nhật Context cho AudioManager
            audioManager.setContext(newContextData.contextInfo);

            // Gọi lệnh phát nhạc với danh sách mới
            console.log(`Bắt đầu phát: ${newContextData.songToPlay.name}`);
            audioManager.playSong(newContextData.songToPlay, newContextData.songsList);
        }

    } catch (error) {
        console.error("Lỗi xử lý phát nhạc:", error);
        Toast.error("Không thể phát nhạc. Vui lòng thử lại.");
    }
}

/**
 * Hàm Helper: Lấy danh sách bài hát và bài cần phát dựa trên target data.
 * Giúp tách biệt logic lấy dữ liệu khỏi logic điều khiển UI.
 */
function fetchPlaybackData(target) {
    let songIds = [];
    let contextInfo = {};
    let songsList = [];
    
    // 1. Xác định nguồn nhạc (Source)
    if (target.albumId) {
        const album = getAlbumById(target.albumId);
        if (!album) throw new Error("Album not found");
        
        songIds = album.songIds || [];
        contextInfo = { albumId: target.albumId, playlistId: null, type: 'album' };
    } 
    else if (target.playlistId) {
        const playlist = getPlaylistById(target.playlistId);
        if (!playlist) throw new Error("Playlist not found");

        songIds = playlist.songIds || [];
        contextInfo = { albumId: null, playlistId: target.playlistId, type: 'playlist' };
    } 
    else if (target.songId) {
        // Trường hợp bài lẻ: Tạo list dựa trên Genre (Gợi ý)
        const song = getSongById(target.songId);
        if (!song) throw new Error("Song not found");

        const recommendations = getRecommendationsByGenre(song.genreId);
        songIds = recommendations.songIds || [];
        
        // Đảm bảo bài được click có trong list (đưa lên đầu nếu chưa có)
        if (!songIds.includes(target.songId)) {
            songIds.unshift(target.songId);
        }

        contextInfo = { albumId: null, playlistId: null, type: 'genre-based' };
    }

    // 2. Map ID sang Object bài hát đầy đủ
    songsList = songIds.map(id => getSongById(id)).filter(s => s); // Filter lọc bài null

    if (songsList.length === 0) return null;

    // 3. Xác định bài hát cụ thể để bắt đầu phát
    // Nếu user click chọn bài -> phát bài đó. Nếu không -> phát bài đầu tiên.
    const songToPlay = target.songId 
        ? songsList.find(s => s.id === target.songId) 
        : songsList[0];

    return {
        songToPlay: songToPlay || songsList[0],
        songsList: songsList,
        contextInfo: contextInfo
    };
}

window.audioManager = audioManager; // For debugging purpose only
