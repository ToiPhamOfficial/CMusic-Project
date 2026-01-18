export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper function để format thời gian
export function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Helper function để kiểm tra trạng thái theo dõi của nghệ sĩ

// Helper function để kiểm tra trạng thái favorite của bài hát
export function isFavorited(songId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return false;
    
    user.favoriteSongs ||= [];
    return user.favoriteSongs.includes(songId);
}