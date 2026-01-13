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
            <button class="btn btn-cancel" id="btn-cancel">Hủy</button>
            <button class="btn btn-save" id="btn-save" disabled>Lưu</button>
        </div>
    </div>
</div>
    `;
}