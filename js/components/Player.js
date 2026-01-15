import audioManager from '../services/audioManager.js';
import Toast from './Toast.js';
import Dropdown, { toggleDropdown } from './Dropdown.js';
import { songs } from '../data.js';

export default function Player() {
    return `
        <button class="btn-collapse-player" title="Collapse">
            <span class="material-icons-round">expand_more</span>
        </button>
        
        <div class="player-left">
            <div class="player-album">
                <img src="/assets/img/default-player-thumb.png" alt="Album Cover">
            </div>
            <div class="player-info">
                <h3>Unknown</h3>
                <p>Unknown</p>
            </div>
        </div>
        
        <div class="player-center">
            <div class="player-controls">
                <button class="btn-control" title="Repeat">
                    <span class="material-icons-round">repeat</span>
                </button>
                <button class="btn-control" title="Previous">
                    <span class="material-icons-round">skip_previous</span>
                </button>
                <button class="btn-control btn-play" title="Play">
                    <span class="material-icons-round">play_circle</span>
                </button>
                <button class="btn-control" title="Next">
                    <span class="material-icons-round">skip_next</span>
                </button>
                <button class="btn-control" title="Shuffle">
                    <span class="material-icons-round">shuffle</span>
                </button>
            </div>
            <div class="player-progress">
                <span class="time">00:00</span>
                <input type="range" class="progress-slider" min="0" max="100" value="0">
                <span class="time">00:00</span>
            </div>
        </div>
        
        <div class="player-right">
            <button class="btn-control" title="Favorite">
                <span class="material-icons-round">favorite_border</span>
            </button>
            <button class="btn-control btn-queue" title="Queue">
                <span class="material-icons-round">queue_music</span>
            </button>
            <div class="player-more-container">
                <button class="btn-control btn-more" title="More">
                    <span class="material-icons-round">more_horiz</span>
                </button>
                
                <!-- More Dropdown Menu -->
                ${Dropdown([
                        [
                            { action: 'download', icon: 'download', text: 'Tải về' },
                            { action: 'add-to-playlist', icon: 'playlist_add', text: 'Thêm vào playlist' },
                            { action: 'share', icon: 'share', text: 'Chia sẻ' },
                        ],
                        [
                            { action: 'report', icon: 'flag', text: 'Báo cáo' }
                        ]
                    ])}
            </div>
        </div>
        
        <!-- Queue Panel -->
        <div class="queue-panel">
            <div class="queue-header">
                <h3>Danh sách phát</h3>
                <button class="btn-close-queue" title="Đóng">
                    <span class="material-icons-round">close</span>
                </button>
            </div>
            <div class="queue-section">
                <div class="queue-section-header">
                    <h4>Tiếp theo</h4>
                    <span class="queue-subtitle">Từ For You</span>
                </div>
                <div class="queue-list">
                    <!-- Queue items will be rendered here -->
                </div>
            </div>
        </div>
        
        <!-- Queue Overlay -->
        <div class="queue-overlay"></div>
    `;
}

// --- Main Render Function (Optimized) ---
function renderQueue() {
    // Destructuring an toàn với giá trị mặc định
    const { playlist = [], currentSong } = audioManager;
    const $queueList = $('.queue-list');

    // 1. Xử lý trường hợp danh sách trống
    if (playlist.length === 0) {
        $queueList.html(EMPTY_QUEUE_HTML);
        return;
    }

    // 2. Cache ID bài hát hiện tại để so sánh nhanh hơn trong vòng lặp
    const currentSongId = currentSong?.id;

    // 3. Sử dụng map() thay vì forEach để nối chuỗi hiệu quả hơn
    const queueHTML = playlist.map(song => {
        const isActive = currentSongId === song.id ? 'active' : '';
        // Thêm loading="lazy" để tối ưu tải ảnh
        return `
            <div class="queue-item ${isActive}" data-song-id="${song.id}">
                <div class="queue-item-thumbnail">
                    <img src="${song.image}" alt="${song.title}" loading="lazy">
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
    }).join('');

    $queueList.html(queueHTML);
}

export function initPlayerEvents() {
    // Play/Pause button
    $(document).on('click', '.player-controls .btn-play, .player-controls .play, .suggestion-item div button, .btn-play', function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
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
        toggleDropdown($(this));
    });

    // Close More Dropdown when clicking outside
    // $(document).on('click', function (e) {
    //     if (!$(e.target).closest('.player-more-container').length) {
    //         $('.player-more-dropdown').removeClass('active');
    //     }
    // });

    // Handle More Dropdown Actions
    // $(document).on('click', '.dropdown-item', function (e) {
    //     e.stopPropagation();
    //     const action = $(this).data('action');

    //     switch (action) {
    //         case 'download':
    //             Toast.info('Tính năng tải về đang được phát triển');
    //             break;
    //         case 'add-to-playlist':
    //             Toast.info('Tính năng thêm vào playlist đang được phát triển');
    //             break;
    //         case 'share':
    //             Toast.info('Tính năng chia sẻ đang được phát triển');
    //             break;
    //         case 'report':
    //             Toast.warning('Tính năng báo cáo đang được phát triển');
    //             break;
    //     }

    //     $('.player-more-dropdown').removeClass('active');
    // });

    // colose player more dropdown when clicking outside
    // $(document).on('click', function (e) {
    //     if (!$(e.target).closest('.player-more-container').length) {
    //         $('.player-more-dropdown').removeClass('active');
    //     }
    // });

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