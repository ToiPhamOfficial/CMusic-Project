/**
 * Icon Manager - Quản lý toggle icon cho các nút play/pause
 * Đơn giản hóa với data-icon-type
 */

export function toggleButtonIcon(button, isPlaying) {
    const $btn = $(button);
    const $icon = $btn.find('span.material-icons-round');
    
    if (!$icon.length) return;
    
    // Lấy icon type từ data attribute
    const iconType = $btn.data('icon-type') || 'default';
    
    let playIcon, pauseIcon;
    
    // Xác định cặp icon dựa trên type
    switch (iconType) {
        case 'circle':
            playIcon = 'play_circle';
            pauseIcon = 'pause_circle';
            break;
        case 'filled':
            playIcon = 'play_circle_filled';
            pauseIcon = 'pause_circle_filled';
            break;
        default:
            playIcon = 'play_arrow';
            pauseIcon = 'pause';
    }
    
    // Set icon dựa trên trạng thái
    $icon.text(isPlaying ? pauseIcon : playIcon);
}

export function updateSongButtons(songId, isPlaying) {
    $(`.btn-play-music[data-song-id="${songId}"]`).each(function() {
        toggleButtonIcon(this, isPlaying);
    });
}

export function updateAlbumButtons(albumId, isPlaying) {
    $(`.btn-play-music[data-album-id="${albumId}"]:not([data-song-id])`).each(function() {
        toggleButtonIcon(this, isPlaying);
    });
}

export function updatePlaylistButtons(playlistId, isPlaying) {
    $(`.btn-play-music[data-playlist-id="${playlistId}"]:not([data-song-id])`).each(function() {
        toggleButtonIcon(this, isPlaying);
    });
}

/**
 * Reset tất cả button về trạng thái play
 */
export function resetAllButtons() {
    $('.btn-play-music').each(function() {
        toggleButtonIcon(this, false);
    });
}

export function syncButtonsWithAudioManager(audioManager) {
    const currentSong = audioManager.currentSong;
    const isPlaying = audioManager.isPlaying;
    const currentContext = audioManager.currentContext;
    
    // Reset tất cả về play trước
    resetAllButtons();
    
    // Nếu không có bài hát đang phát, dừng ở đây
    if (!currentSong) return;
    
    // Update button của bài hát hiện tại
    updateSongButtons(currentSong.id, isPlaying);
    
    // Update button của album/playlist nếu có
    if (currentContext.albumId) {
        updateAlbumButtons(currentContext.albumId, isPlaying);
    }
    
    if (currentContext.playlistId) {
        updatePlaylistButtons(currentContext.playlistId, isPlaying);
    }
}
