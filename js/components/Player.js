import { songs } from '../data.js';
import audioManager from '../services/audioManager.js';
import Toast from './Toast.js';
import Dropdown, { toggleDropdown } from './Dropdown.js';
import { formatTime } from '../utils/utils.js';

export default function Player() {
    return `
        <button class="player__btn-collapse" title="Collapse">
            <span class="material-icons-round">expand_more</span>
        </button>
        
        <div class="player__left">
            <div class="player__song-thumb">
                <img src="/assets/img/default-player-thumb.png" alt="Album Cover">
            </div>
            <div class="player__song-info">
                <h3>Unknown</h3>
                <p>Unknown</p>
            </div>
        </div>
        
        <div class="player__center">
            <div class="player__controls">
                <button class="player__btn-control" title="Repeat">
                    <span class="material-icons-round">repeat</span>
                </button>
                <button class="player__btn-control" title="Previous">
                    <span class="material-icons-round">skip_previous</span>
                </button>
                <button class="btn-play-music player__btn-control player__btn-control--play" data-icon-type="circle" title="Play/Pause">
                    <span class="material-icons-round">play_circle</span>
                </button>
                <button class="player__btn-control" title="Next">
                    <span class="material-icons-round">skip_next</span>
                </button>
                <button class="player__btn-control" title="Shuffle">
                    <span class="material-icons-round">shuffle</span>
                </button>
            </div>
            <div class="player__progress">
                <span class="time">00:00</span>
                <div class="player__progress-slider" data-value="0">
                    <div class="player__progress-track">
                        <div class="player__progress-fill"></div>
                        <div class="player__progress-thumb"></div>
                    </div>
                </div>
                <span class="time">00:00</span>
            </div>
        </div>
        
        <div class="player__right">
            <button class="player__btn-control" title="Favorite">
                <span class="material-icons-round">favorite_border</span>
            </button>
            <button class="player__btn-control player__btn-control--queue" title="Queue">
                <span class="material-icons-round">queue_music</span>
            </button>
            <div class="player__more-wrapper">
                <button class="player__btn-control player__btn-control--more" title="More">
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
        <div class="player__queue-panel">
            <div class="player__queue-header">
                <h3>Danh sách phát</h3>
                <button class="player__btn-close-queue" title="Đóng">
                    <span class="material-icons-round">close</span>
                </button>
            </div>
            <div class="player__queue-section">
                <div class="player__queue-section-header">
                    <h4>Tiếp theo</h4>
                    <span class="player__queue-subtitle">Từ For You</span>
                </div>
                <div class="player__queue-list">
                    <!-- Queue items will be rendered here -->
                </div>
            </div>
        </div>
        
        <!-- Queue Overlay -->
        <div class="player__queue-overlay"></div>
    `;
}

// --- Main Render Function (Optimized) ---
function renderQueue() {
    // Destructuring an toàn với giá trị mặc định
    const { playlist = [], currentSong } = audioManager;
    const $queueList = $('.player__queue-list');

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
            <div class="player__queue-item ${isActive}" data-song-id="${song.id}">
                <div class="player__queue-item-thumbnail">
                    <img src="${song.image}" alt="${song.title}" loading="lazy">
                    <div class="play-indicator">
                        <span class="material-icons-round">equalizer</span>
                    </div>
                </div>
                <div class="player__queue-item-info">
                    <div class="player__queue-item-title">${song.title}</div>
                    <div class="player__queue-item-artist">${song.artist}</div>
                </div>
                <div class="player__queue-item-actions">
                    <button class="player__queue-item-btn" title="Thêm vào yêu thích">
                        <span class="material-icons-round">favorite_border</span>
                    </button>
                    <button class="player__queue-item-btn" title="Thêm tùy chọn">
                        <span class="material-icons-round">more_horiz</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    $queueList.html(queueHTML);
}

export function tmp() {
    // Play/Pause button
    $(document).on('click', '.player__controls .btn-play, .player__controls .play, .suggestion-item div button, .btn-play', function (e) {
        e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
        $(this).find('span').text(function (i, text) {
            return text === 'play_arrow' ? 'pause' : 'play_arrow';
        });
        audioManager.togglePlay();
    });

    // Previous button
    $(document).on('click', '.player__controls .btn-control[title="Previous"]', function () {
        audioManager.prev();
    });

    // Next button
    $(document).on('click', '.player__controls .btn-control[title="Next"]', function () {
        audioManager.next();
    });

    // Repeat button
    $(document).on('click', '.player__controls .btn-control[title="Repeat"]', function () {
        audioManager.toggleRepeat();
    });

    // Shuffle button
    $(document).on('click', '.player__controls .btn-control[title="Shuffle"]', function () {
        audioManager.toggleShuffle();
    });

    // Progress slider
    $(document).on('input', '.progress-slider', function () {
        const percentage = $(this).val();
        audioManager.seek(percentage);
    });

    // Favorite button
    $(document).on('click', '.player__right .btn-control[title="Favorite"]', function () {
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
    
    // For mobile - expand player
    $(document).on('click', '.player', function (e) {
        // Không expand nếu click vào button hoặc controls
        if ($(e.target).closest('.player__btn-control, .player__btn-collapse, .player__progress-slider, .player__queue-panel, .player__more-wrapper').length) {
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
    $(document).on('click', '.player__btn-queue', function (e) {
        e.stopPropagation();
        $('.player__queue-panel').addClass('active');
        $('.player__queue-overlay').addClass('active');
        renderQueue();
    });

    // Close Queue Panel
    $(document).on('click', '.btn-close-queue, .player__queue-overlay', function () {
        $('.player__queue-panel').removeClass('active');
        $('.player__queue-overlay').removeClass('active');
    });

    // Queue Item Click - Play song from queue
    $(document).on('click', '.player__queue-item', function () {
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

export function initPlayerEvents() {
    // Các sự kiện xứ lý UI của Player
    $(document).on('click', '.player', function (e) {
        // Không expand nếu click vào button hoặc controls
        if ($(e.target).closest('.player__btn-control, .player__btn-collapse, .player__progress-slider, .player__queue-panel, .player__more-wrapper').length) {
            return;
        }

        // Chỉ expand trên mobile
        if (window.innerWidth <= 576) {
            $(this).addClass('is-expanded');
        }
    });

    // Collapse player button
    $(document).on('click', '.player__btn-collapse', function (e) {
        e.stopPropagation();
        $('.player').removeClass('is-expanded');
    });

    // Push sự kiện phát nhạc đến audioManager
    // Next/Previous button
    $(document).on('click', '.player__controls .player__btn-control[title="Previous"]', function () {
        audioManager.prev();
    });

    $(document).on('click', '.player__controls .player__btn-control[title="Next"]', function () {
        audioManager.next();
    });

    // Repeat button
    $(document).on('click', '.player__controls .player__btn-control[title="Repeat"]', function () {
        audioManager.toggleRepeat();
        $(this).toggleClass('active', audioManager.isRepeat);
    });

    // Shuffle button
    $(document).on('click', '.player__controls .player__btn-control[title="Shuffle"]', function () {
        audioManager.toggleShuffle();
        $(this).toggleClass('active', audioManager.isShuffle);
    });


    // Nhận sự kiện từ audioManager để cập nhật UI
    document.addEventListener('audio:change', (e) => {
        const song = e.detail.song;

        // Hiển thị Player
        $('.player').css('display', 'grid');
        $('.app').css('padding-bottom', $('.player').outerHeight());

        // Cập nhật thông tin bài hát trong player
        $('.player__song-info h3').text(song.title);
        $('.player__song-info p').text(song.artist);
        $('.player__song-thumb img').attr('src', song.image);

        // Thêm song-id, context-info vào nút play lớn
        const contextInfo = audioManager.currentContext;
        const type = contextInfo?.type;
        if (type === 'album' && contextInfo.albumId) {
            $('.btn-play-music.player__btn-control--play')
                .attr('data-album-id', contextInfo.albumId)
                .removeAttr('data-playlist-id data-song-id data-context-type');
        } else if (type === 'playlist' && contextInfo.playlistId) {
            $('.btn-play-music.player__btn-control--play')
                .attr('data-playlist-id', contextInfo.playlistId)
                .removeAttr('data-album-id data-song-id data-context-type');
        } else {
            $('.btn-play-music.player__btn-control--play')
                .attr('data-song-id', song.id)
                .removeAttr('data-album-id data-playlist-id data-context-type');
        }
    });

    document.addEventListener('audio:state-change', (e) => {
    });

    // Cập nhật progress bar khi nhạc phát
    document.addEventListener('audio:timeupdate', (e) => {
        const { currentTime, duration } = e.detail;
        
        if (!duration || duration === 0) return;
        
        const percentage = (currentTime / duration) * 100;
        
        // Cập nhật progress bar (chỉ khi không đang kéo)
        if (!window.isSeekingProgress) {
            $('.player__progress-slider').attr('data-value', percentage);
            $('.player__progress-fill').css('width', percentage + '%');
            $('.player__progress-thumb').css('left', percentage + '%');
        }
        
        // Cập nhật thời gian
        $('.player__progress .time:first').text(formatTime(currentTime));
        $('.player__progress .time:last').text(formatTime(duration));
    });

    // Cập nhật thời gian khi tải nhạc xong
    document.addEventListener('audio:loaded', (e) => {
        const { duration } = e.detail;
        $('.player__progress .time:last').text(formatTime(duration));
    });

    // Xử lý kéo progress slider
    progressSliderHandler();
}

function progressSliderHandler() {
    // Xử lý kéo progress slider
    let isDragging = false;
    let wasPlayingBeforeSeeking = false;
    
    $(document).on('mousedown touchstart', '.player__progress-slider', function (e) {
        e.preventDefault();
        isDragging = true;
        window.isSeekingProgress = true;
        
        // Lưu trạng thái phát và tạm dừng nhạc
        wasPlayingBeforeSeeking = audioManager.isPlaying;
        if (wasPlayingBeforeSeeking) {
            audioManager.pause();
        }
        
        updateProgressFromEvent(e, $(this));
    });
    
    $(document).on('mousemove touchmove', function (e) {
        if (isDragging) {
            const $slider = $('.player__progress-slider');
            updateProgressFromEvent(e, $slider);
        }
    });
    
    $(document).on('mouseup touchend', function () {
        if (isDragging) {
            isDragging = false;
            window.isSeekingProgress = false;
            
            // Phát lại nhạc nếu đang phát trước khi tua
            if (wasPlayingBeforeSeeking) {
                audioManager.play();
                wasPlayingBeforeSeeking = false;
            }
        }
    });
}

function updateProgressFromEvent(e, $slider) {
    const rect = $slider[0].getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    $slider.attr('data-value', percentage);
    $('.player__progress-fill').css('width', percentage + '%');
    $('.player__progress-thumb').css('left', percentage + '%');
    
    audioManager.seek(percentage);
}