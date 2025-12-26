// Audio Manager - Quản lý phát nhạc
class AudioManager {
    constructor() {
        this.audio = new Audio();
        this.currentSong = null;
        this.playlist = [];
        this.currentIndex = -1;
        this.isPlaying = false;
        this.isRepeat = false;
        this.isShuffle = false;

        // Setup audio event listeners
        this.setupAudioEvents();
    }

    setupAudioEvents() {
        // Khi bài hát tải xong
        this.audio.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });

        // Cập nhật progress khi phát
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        // Khi bài hát kết thúc
        this.audio.addEventListener('ended', () => {
            this.onSongEnded();
        });

        // Khi có lỗi
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showNotification('Không thể phát bài hát này');
        });
    }

    // Phát bài hát
    playSong(song, playlist = []) {
        if (!song) return;

        // Nếu có playlist mới, cập nhật
        if (playlist.length > 0) {
            this.playlist = playlist;
            this.currentIndex = this.playlist.findIndex(s => s.id === song.id);
        }

        this.currentSong = song;

        // Nếu bài hát có URL âm thanh
        if (song.audioUrl) {
            this.audio.src = song.audioUrl;
            this.audio.load();
            this.play();
        } else {
            // Sử dụng demo audio (có thể thay bằng URL thật)
            console.warn('Bài hát chưa có file audio, sử dụng demo');
            this.audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            this.audio.load();
            this.play();
        }

        this.updatePlayerUI();
    }

    // Play
    play() {
        const playPromise = this.audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
            }).catch(error => {
                console.error('Play error:', error);
                this.isPlaying = false;
            });
        }
    }

    // Pause
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }

    // Toggle play/pause
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            if (this.currentSong) {
                this.play();
            } else if (this.playlist.length > 0) {
                // Nếu chưa có bài hát nhưng có playlist, phát bài đầu tiên
                this.playSong(this.playlist[0], this.playlist);
            }
        }
    }

    // Next song
    next() {
        if (this.playlist.length === 0) return;

        if (this.isShuffle) {
            // Random song
            const randomIndex = Math.floor(Math.random() * this.playlist.length);
            this.currentIndex = randomIndex;
        } else {
            // Next song in order
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        }

        this.playSong(this.playlist[this.currentIndex], this.playlist);
    }

    // Previous song
    prev() {
        if (this.playlist.length === 0) return;

        // Nếu đang phát > 3s, quay về đầu bài
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
            return;
        }

        // Previous song
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.playSong(this.playlist[this.currentIndex], this.playlist);
    }

    // Seek to position
    seek(percentage) {
        if (this.audio.duration) {
            this.audio.currentTime = (percentage / 100) * this.audio.duration;
        }
    }

    // Set volume (0-100)
    setVolume(volume) {
        this.audio.volume = volume / 100;
    }

    // Set playlist
    setPlaylist(playlist) {
        this.playlist = playlist;
        if (this.playlist.length > 0 && !this.currentSong) {
            this.currentIndex = 0;
        }
    }

    // Toggle repeat
    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        this.updateRepeatButton();
    }

    // Toggle shuffle
    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.updateShuffleButton();
    }

    // Khi bài hát kết thúc
    onSongEnded() {
        if (this.isRepeat) {
            this.audio.currentTime = 0;
            this.play();
        } else {
            this.next();
        }
    }

    // Update UI
    updatePlayerUI() {
        if (!this.currentSong) return;

        // Update song info
        $('.bottom-player-info h3, .player-info h3').text(this.currentSong.title);
        $('.bottom-player-info span, .player-info span').text(this.currentSong.artist);

        // Update album cover
        $('.bottom-player-album img, .player-disc img').attr({
            'src': this.currentSong.image,
            'alt': this.currentSong.title
        });

        $('.bottom-player').css('display', 'flex');
        $('.app').css('padding-bottom', '90px');
    }

    updatePlayButton() {
        const icon = this.isPlaying ? 'pause_circle' : 'play_circle';
        $('.bottom-player-controls .btn-play span, .player-controls .play span').text(icon);
    
    }

    updateProgress() {
        if (!this.audio.duration) return;

        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        const percentage = (currentTime / duration) * 100;

        // Update progress bar
        $('.progress-slider, .progress-bar').val(percentage);

        // Update time display
        $('.bottom-player-progress .time:first, .player-progress .time:first').text(this.formatTime(currentTime));
        $('.bottom-player-progress .time:last, .player-progress .time:last').text(this.formatTime(duration));
    }

    updateDuration() {
        if (this.audio.duration) {
            $('.bottom-player-progress .time:last, .player-progress .time:last').text(this.formatTime(this.audio.duration));
            $('.progress-slider, .progress-bar').attr('max', 100);
        }
    }

    updateRepeatButton() {
        const $btn = $('.bottom-player-controls .btn-control[title="Repeat"]');
        if (this.isRepeat) {
            $btn.addClass('active');
            $btn.find('span').css('color', 'var(--accent-color)');
        } else {
            $btn.removeClass('active');
            $btn.find('span').css('color', '');
        }
    }

    updateShuffleButton() {
        const $btn = $('.bottom-player-controls .btn-control[title="Shuffle"]');
        if (this.isShuffle) {
            $btn.addClass('active');
            $btn.find('span').css('color', 'var(--accent-color)');
        } else {
            $btn.removeClass('active');
            $btn.find('span').css('color', '');
        }
    }

    // Format time (seconds to mm:ss)
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Show notification
    showNotification(message) {
        console.log('Notification:', message);
        // TODO: Implement toast notification
    }
}

// Export singleton instance
export default new AudioManager();
