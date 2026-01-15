export default function Sidebar() {
    return `
        <!-- Logo -->
            <div class="logo">
                <img src="assets/img/logo-icon.png" alt="CMusic Logo">
                <span class="logo-text">MUSIC</span>
                <button class="btn btn-close-sidebar" id="btn-close-sidebar">
                    <span class="material-icons-round">
                        close
                    </span>
                </button>
            </div>

            <div class="sidebar-nav">
                <div class="divider"></div>

                <!-- Menu -->
                <div class="nav-group">
                    <h3 class="nav-title">MENU</h3>
                    <ul class="nav-list">
                        <li class="nav-item active">
                            <a href="/" class="nav-link">
                                <span class="material-icons-round">
                                    explore
                                </span>
                                <span>Khám phá</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/albums" class="nav-link">
                                <span class="material-icons-round">
                                    album
                                </span>
                                <span>Album</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/artists" class="nav-link">
                                <span class="material-icons-round">
                                    mic
                                </span>
                                <span>Nghệ sĩ</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/genres" class="nav-link">
                                <span class="material-icons-round">
                                    volume_up
                                </span>
                                <span>Thể loại</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="divider"></div>

                <!-- Library -->    
                <div class="nav-group">
                    <h3 class="nav-title">THƯ VIỆN</h3>
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="/recently" class="nav-link">
                                <span class="material-icons-round">
                                    history
                                </span>
                                <span>Gần đây</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/albums-saved" class="nav-link" data-need-login="true">
                                <span class="material-icons-round">
                                    book
                                </span>
                                <span>Album</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/favorites" class="nav-link" data-need-login="true">
                                <span class="material-icons-round">
                                    favorite
                                </span>
                                <span>Yêu thích</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="divider"></div>

                <!-- Playlist -->
                <div class="nav-group">
                    <h3 class="nav-title">DANH SÁCH PHÁT</h3>
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="" class="nav-link" id="open-playlist-modal" data-need-login="true">
                                <span class="material-icons-round">
                                    add_circle
                                </span>
                                <span>Tạo mới</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-route="/playlist-detail?id=1&type=userPlaylists">
                                <span class="material-icons-round">
                                    play_circle
                                </span>
                                <span>Lofi Chill</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-route="/playlist-detail?id=2&type=userPlaylists">
                                <span class="material-icons-round">
                                    play_circle
                                </span>
                                <span>Hot Phonk</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/playlists?type=userPlaylists" class="nav-link">
                                <span class="material-icons-round">
                                    format_list_bulleted
                                </span>
                                <span>Tất cả</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>`;
}

export function initSidebarToggle() {
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