import { artists, songs } from '../data.js';

export default function Artists() {
    return `
    <section class="page-artists__hero">
        <div class="page-artists__hero-content">
            <h1 class="page-artists__hero-title">Top Nghệ Sĩ</h1>
            <p class="page-artists__hero-subtitle">Cập nhật vào lúc 04/10/2025</p>
        </div>
    </section>

    <section class="page-artists__container">

        <div class="page-artists__header">
            <div class="page-artists__header-col page-artists__header-col--rank">Hạng</div>
            <div class="page-artists__header-col page-artists__header-col--artist">Thông tin</div>
            <div class="page-artists__header-col page-artists__header-col--song">Bài hát nổi bật</div>
            <div class="page-artists__header-col page-artists__header-col--time">Thời gian</div>
        </div>
        <div class="page-artists__divider"></div>

        <div class="page-artists__track-list">
            ${artists.map((artist, index) => {
                const rank = index + 1;
                const rankModifier = rank <= 3 ? ` page-artists__track-rank--${rank}` : '';
                const song = songs.find(s => s.id === artist.topSongId) || {
                    title: 'Không xác định',
                    artist: 'Không xác định',
                    image: '/data/default-song-image.webp',
                    duration: '00:00'
                };
                
                return `
                <div class="page-artists__track" data-song-id="${artist.topSongId}">
                    
                    <div class="page-artists__track-rank${rankModifier}">${rank}</div>
                    
                    <div class="page-artists__track-artist">
                        <img src="${artist.image}" alt="${artist.name}" class="page-artists__artist-avatar">
                        <div class="page-artists__artist-info">
                            <div class="page-artists__artist-name">${artist.name}</div>
                            <div class="page-artists__artist-followers">${artist.listeners} người theo dõi</div>
                        </div>
                        <button class="btn-follow page-artists__follow-btn" data-artist-id="${artist?.id || ''}">${getFollowText(artist?.id)}</button>
                    </div>

                    <div class="page-artists__track-song">
                        <div class="page-artists__song-cover-wrapper">
                            <img src="${song.image}" alt="${song.title}" class="page-artists__song-cover">
                            <div class="page-artists__play-overlay">
                                <span class="material-icons-round">play_arrow</span>
                            </div>
                        </div>
                        <div class="page-artists__song-info">
                            <div class="page-artists__song-title">${song.title}</div>
                            <div class="page-artists__song-artist">${song.artist}</div>
                        </div>
                    </div>

                    <div class="page-artists__track-actions">
                        <span class="page-artists__duration">${song.duration}</span>
                        <span class="material-icons-round page-artists__icon page-artists__icon--heart">favorite</span>
                        <div class="page-artists__dropdown-wrapper">
                            <span class="material-icons-round page-artists__icon page-artists__icon--more js-dropdown-trigger">more_horiz</span>
                            <div class="page-artists__dropdown">
                                <div class="page-artists__dropdown-item" data-action="download">
                                    <span class="material-icons-round">download</span>
                                    <span>Tải về</span>
                                </div>
                                <div class="page-artists__dropdown-item" data-action="add-to-playlist">
                                    <span class="material-icons-round">playlist_add</span>
                                    <span>Thêm vào playlist</span>
                                </div>
                                <div class="page-artists__dropdown-item" data-action="share">
                                    <span class="material-icons-round">share</span>
                                    <span>Chia sẻ</span>
                                </div>
                                <div class="page-artists__dropdown-divider"></div>
                                <div class="page-artists__dropdown-item" data-action="report">
                                    <span class="material-icons-round">flag</span>
                                    <span>Báo cáo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>

    </section>
    `;
}

// Hàm trả về kiểu text của btn-follow
function getFollowText(artistId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return 'Theo dõi';

    user.followedArtists ||= [];
    return user.followedArtists.includes(artistId)
        ? 'Đã theo dõi'
        : 'Theo dõi';
}

function initArtistsDropdown() {
    let currentOpenDropdown = null;

    // Toggle dropdown khi click vào icon more
    $(document).on('click', '.js-dropdown-trigger', function (e) {
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
    $(document).on('click', function (e) {
        if (currentOpenDropdown && !$(e.target).closest('.page-artists__dropdown-wrapper').length) {
            currentOpenDropdown.removeClass('page-artists__dropdown--active');
            currentOpenDropdown = null;
        }
    });

    // Xử lý các action trong dropdown
    $(document).on('click', '.page-artists__dropdown-item', function (e) {
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

// Khởi tạo các sự kiện cho trang Artists
export function initArtistsPageEvents() {
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
    $(document).on('click', '.btn-toggle-lyrics', function () {
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