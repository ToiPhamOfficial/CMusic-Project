export default function AddPlaylist() {
    return `
        <div class="modal-overlay" id="playlist-modal">
        <div class="modal-container">
            <div class="modal-header">
                <h3>Tạo playlist mới</h3>
                <span class="close-btn">&times;</span>
            </div>

            <div class="modal-body">
                <div class="playlist-cover-upload">
                    <img id="cover-preview" src="" alt="Cover Preview" style="display: none;">
                    
                    <input type="file" id="upload-cover" accept="image/*" hidden>
                    <label for="upload-cover" class="upload-label" id="upload-label-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <span>Chỉnh sửa</span>
                    </label>
                </div>

                <div class="playlist-info-input">
                    <input type="text" id="playlist-name" placeholder="Nhập tên playlist" maxlength="100" autocomplete="off">
                    <div class="char-counter"><span id="current-count">0</span>/100</div>
                </div>
            </div>

        <div class="modal-footer">
            <button class="btn-addplaylist btn-cancel" id="btn-cancel">Hủy</button>
            <button class="btn-addplaylist btn-save" id="btn-save" disabled>Lưu</button>
        </div>
    </div>
</div>
    `;
}

export function initAddPlaylistEvents() {
    const modal = document.getElementById('playlist-modal');
    if (!modal) return;

    const inputName = document.getElementById('playlist-name');
    const inputCover = document.getElementById('upload-cover');
    const imgPreview = document.getElementById('cover-preview');
    const btnSave = document.getElementById('btn-save');
    const currentCount = document.getElementById('current-count');

    // ===== MỞ MODAL (event delegation – CHUẨN SPA) =====
    $(document).on('click', '#open-playlist-modal', function (e) {
        e.preventDefault();
        modal.classList.add('active');
        inputName?.focus();
    });

    // ===== ĐÓNG MODAL =====
    const closeModal = () => {
        modal.classList.remove('active');

        setTimeout(() => {
            inputName.value = '';
            currentCount.innerText = '0';
            btnSave.setAttribute('disabled', 'true');

            imgPreview.src = '';
            imgPreview.style.display = 'none';
            inputCover.value = '';
        }, 300);
    };

    // Click nút đóng
    $(document).on('click', '.close-btn, #btn-cancel', closeModal);

    // Click ra ngoài
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // ===== XEM TRƯỚC ẢNH =====
    inputCover.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    // ===== VALIDATE TÊN PLAYLIST =====
    inputName.addEventListener('input', function () {
        const len = this.value.length;
        currentCount.innerText = len;
        btnSave.disabled = len === 0;
    });

    // ===== LƯU PLAYLIST =====
    btnSave.addEventListener('click', () => {
        if (!inputName.value) return;

        // const newPlaylist = {
        //     id: Date.now(),
        //     name: inputName.value,
        //     image: imgPreview.src || 'assets/images/default-playlist.png'
        // };

        // console.log('Playlist mới:', newPlaylist);
        // alert(`Đã tạo playlist: ${newPlaylist.name}`);

        // closeModal();
        // // TODO: addPlaylist(newPlaylist)

        // 1. Lấy thông tin user đang đăng nhập
        // LƯU Ý: Key này phải khớp với key bạn dùng lúc đăng nhập (VD: 'current_user' hoặc 'user_info')
        const STORAGE_KEY_USER = 'currentUser'; 
        const STORAGE_KEY_USERS_DB = 'users'; // Key chứa danh sách tất cả user (giả lập database)

        const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));

        // Kiểm tra đăng nhập
        if (!currentUser) {
            alert('Vui lòng đăng nhập để tạo Playlist!');
            return;
        }

        // 2. Tạo đối tượng Playlist mới
        const newPlaylist = {
            id: Date.now() + 1, // ID duy nhất dựa trên thời gian
            name: inputName.value.trim(),
            icon: "play_circle",
            // Nếu không có ảnh thì dùng ảnh mặc định
            image: imgPreview.src && imgPreview.style.display !== 'none' 
                   ? imgPreview.src 
                   : './assets/img/playlist-default.png', 
            creator: currentUser.username || currentUser.name,
            songIds: [] // Mảng bài hát rỗng
        };

        // 3. Thêm vào mảng playlists của User
        // Nếu user chưa có mảng playlists thì tạo mới
        if (!currentUser.playlists) {
            currentUser.playlists = [];
        }
        currentUser.playlists.push(newPlaylist);

        // 4. Lưu lại currentUser vào LocalStorage
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));

        // 5. (Tùy chọn) Cập nhật vào danh sách tổng Users (Giả lập Database)
        // Bước này giúp khi logout ra và login lại, dữ liệu vẫn còn đồng bộ
        const allUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB)) || [];
        const userIndex = allUsers.findIndex(u => u.id === currentUser.id || u.username === currentUser.username);
        
        if (userIndex !== -1) {
            allUsers[userIndex] = currentUser; // Cập nhật user trong DB
            localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(allUsers));
        }

        // 6. Thông báo thành công
        console.log('Playlist đã tạo:', newPlaylist);
        // alert(`Đã tạo playlist: ${newPlaylist.name}`); // Có thể bỏ alert nếu thấy phiền
        
        // Đóng modal
        closeModal();

        // 7. BẮN SỰ KIỆN ĐỂ SIDEBAR CẬP NHẬT
        // Sidebar sẽ lắng nghe sự kiện này để render lại list playlist mà không cần F5
        const event = new Event('playlist:updated');
        document.dispatchEvent(event);
    });
}