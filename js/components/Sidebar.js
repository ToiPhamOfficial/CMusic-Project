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
                            <a href="/recent" class="nav-link">
                                <span class="material-icons-round">
                                    history
                                </span>
                                <span>Gần đây</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/album" class="nav-link">
                                <span class="material-icons-round">
                                    book
                                </span>
                                <span>Album</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/favorites" class="nav-link">
                                <span class="material-icons-round">
                                    favorite
                                </span>
                                <span>Yêu thích</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/archive" class="nav-link">
                                <span class="material-icons-round">
                                    folder
                                </span>
                                <span>Lưu trữ</span>
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
                            <a href="/playlist/new" class="nav-link">
                                <span class="material-icons-round">
                                    add_circle
                                </span>
                                <span>Tạo mới</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/playlist" class="nav-link">
                                <span class="material-icons-round">
                                    play_circle
                                </span>
                                <span>Lofi Chill</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/playlist" class="nav-link">
                                <span class="material-icons-round">
                                    play_circle
                                </span>
                                <span>Hot Phonk</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/playlist" class="nav-link">
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