// Audio Manager - Quản lý phát nhạc (Pure Logic)
class AudioManager {
    constructor() {
        this.audio = new Audio();
        this.currentSong = null;
        this.originalPlaylist = []; // Playlist gốc
        this.shuffledPlaylist = []; // Playlist đã xáo trộn
        this.currentIndex = -1;
        
        // Context tracking để xác định bài hát thuộc album/playlist nào
        this.currentContext = {
            albumId: null,
            playlistId: null,
            type: null // 'album', 'playlist', 'song', etc.
        };
        
        // Settings
        this.isPlaying = false;
        this.isRepeat = false; // false | 'one' | 'all' (nếu muốn mở rộng)
        this.isShuffle = false;

        this.setupAudioEvents();
    }

    // --- INTERNAL EVENTS ---
    setupAudioEvents() {
        this.audio.addEventListener('loadedmetadata', () => {
            this.emit('audio:loaded', { duration: this.audio.duration });
        });

        this.audio.addEventListener('timeupdate', () => {
            // Chỉ emit để UI update, không tính toán % ở đây
            this.emit('audio:timeupdate', { 
                currentTime: this.audio.currentTime, 
                duration: this.audio.duration || 0
            });
        });

        this.audio.addEventListener('ended', () => {
            this.emit('audio:ended');
            this.onSongEnded();
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.emit('audio:error', { message: 'Không thể phát bài hát này' });
        });
        
        // Sự kiện play/pause native
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            this.emit('audio:state-change', { isPlaying: true });
        });
        
        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            this.emit('audio:state-change', { isPlaying: false });
        });
    }

    // --- CORE METHODS ---

    playSong(song, newPlaylist = null) {
        if (!song) return;

        // Nếu có playlist mới, cập nhật context
        if (newPlaylist && newPlaylist.length > 0) {
            this.setPlaylist(newPlaylist);
        }

        // Tìm index trong playlist hiện tại (Original hoặc Shuffle)
        const currentList = this.getCurrentPlaylist();
        this.currentIndex = currentList.findIndex(s => s.id === song.id);
        
        // Fallback nếu không tìm thấy bài trong list hiện tại
        if (this.currentIndex === -1) {
             // Trường hợp phát bài lẻ không nằm trong playlist hiện tại -> Reset playlist về bài đó
             this.setPlaylist([song]);
             this.currentIndex = 0;
        }

        this.currentSong = song;
        this.loadSourceAndPlay(song);
        
        // Bắn event báo cho UI biết bài hát đã đổi
        this.emit('audio:change', { song: this.currentSong });
    }

    loadSourceAndPlay(song) {
        // Clear src cũ để tránh memory leak nhẹ trên 1 số trình duyệt
        this.audio.pause(); 
        
        const src = song.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
        this.audio.src = src;
        this.audio.load();
        
        this.play();
    }

    play() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn('Playback prevented:', error);
                this.isPlaying = false;
                this.emit('audio:state-change', { isPlaying: false });
            });
        }
    }

    pause() {
        this.audio.pause();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            // Resume hoặc phát bài đầu tiên
            if (this.currentSong) {
                this.play();
            } else if (this.originalPlaylist.length > 0) {
                this.playSong(this.originalPlaylist[0]);
            }
        }
    }

    next() {
        const list = this.getCurrentPlaylist();
        if (list.length === 0) return;

        let nextIndex = this.currentIndex + 1;
        
        // Loop playlist
        if (nextIndex >= list.length) {
            nextIndex = 0; 
        }

        this.playSong(list[nextIndex]);
    }

    prev() {
        const list = this.getCurrentPlaylist();
        if (list.length === 0) return;

        // Logic Replay: Nếu nghe quá 3s thì replay lại bài hiện tại
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
            return;
        }

        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = list.length - 1;
        }

        this.playSong(list[prevIndex]);
    }

    seek(percentage) {
        if (this.audio.duration) {
            const time = (percentage / 100) * this.audio.duration;
            this.audio.currentTime = time;
        }
    }

    setVolume(volume) {
        // volume input: 0-100
        this.audio.volume = Math.max(0, Math.min(1, volume / 100));
    }

    // --- PLAYLIST & MODES ---

    setPlaylist(playlist) {
        // Clone mảng để tránh reference ngoài ý muốn
        this.originalPlaylist = [...playlist];
        
        // Nếu đang shuffle, cần tạo lại shuffled playlist nhưng cố gắng giữ bài hiện tại (nếu có)
        if (this.isShuffle) {
            this.generateShuffledPlaylist(this.currentSong);
        }
    }

    setContext(context) {
        // Cập nhật context (albumId, playlistId, type)
        this.currentContext = {
            albumId: context.albumId || null,
            playlistId: context.playlistId || null,
            type: context.type || null
        };
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        this.emit('audio:mode-change', { repeat: this.isRepeat, shuffle: this.isShuffle });
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        
        if (this.isShuffle) {
            // Bật shuffle: Tạo list mới bắt đầu bằng bài hiện tại
            this.generateShuffledPlaylist(this.currentSong);
            // Reset index về 0 (vì bài hiện tại luôn nằm đầu list shuffle)
            this.currentIndex = 0; 
        } else {
            // Tắt shuffle: Tìm lại index bài hiện tại trong list gốc
            if (this.currentSong) {
                this.currentIndex = this.originalPlaylist.findIndex(s => s.id === this.currentSong.id);
            }
        }
        
        this.emit('audio:mode-change', { repeat: this.isRepeat, shuffle: this.isShuffle });
    }

    // Thuật toán Fisher-Yates Shuffle
    generateShuffledPlaylist(startSong = null) {
        let list = [...this.originalPlaylist];
        
        // Nếu có bài bắt đầu, tách nó ra để đưa lên đầu
        if (startSong) {
            list = list.filter(s => s.id !== startSong.id);
        }

        // Shuffle phần còn lại
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        // Gộp lại: [Bài hiện tại, ...các bài đã đảo]
        if (startSong) {
            this.shuffledPlaylist = [startSong, ...list];
        } else {
            this.shuffledPlaylist = list;
        }
    }

    getCurrentPlaylist() {
        return this.isShuffle ? this.shuffledPlaylist : this.originalPlaylist;
    }

    onSongEnded() {
        if (this.isRepeat) {
            // Nếu repeat 1 bài (tùy logic bạn muốn repeat 1 hay repeat list)
            // Giả sử ở đây logic cũ của bạn là repeat bài hiện tại
            this.audio.currentTime = 0;
            this.play();
        } else {
            this.next();
        }
    }

    // --- HELPER: EVENT EMITTER ---
    // Giúp tách biệt Logic và UI. UI sẽ lắng nghe các event này.
    emit(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }
}

export default new AudioManager();