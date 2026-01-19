import { getPlaylistById, getSongById } from '../data.js';
import { SongItem, HeaderSongItem } from '../components/Card.js';

export default function PlaylistDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../playlist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const type = params.get('type');

    let playlist = null;
    // Biến xác định context để truyền vào nút Play và SongItem
    const contextType = type === 'user_playlist' ? 'user_playlist' : 'playlist';

    // --- 1. SỬA LỖI KEY STORAGE ---
    if (type === 'user_playlist') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.playlists) {
            playlist = currentUser.playlists.find(p => p.id === id);
        }
    } 
    
    if (!playlist) {
        playlist = getPlaylistById(id);
    }

    if (!playlist) return `<h1>Playlist không tồn tại</h1>`;

    // Lưu ý: User Playlist ban đầu thường có mảng songIds rỗng []
    const listSongs = (playlist.songIds || []).map(songId => {
        return getSongById(songId);
    }).filter(song => song !== undefined);

    const initialDisplayCount = 15;
    const hasMore = listSongs.length > initialDisplayCount;

    const coverHTML = playlist.image 
        ? `<img src="${playlist.image}" alt="${playlist.name}" style="width: 100%; height: 100%; object-fit: cover;">`
        : `<span class="material-icons-round" style="font-size: 64px;">music_note</span>`;

    return `
        <div class="playlist-detail">
            
            <section class="playlist-hero">
                <div class="hero-bg-glow"></div> 
                <div class="hero-cover">
                    ${coverHTML}
                </div>
                
                <div class="hero-info">
                    <span class="playlist-subtitle">Playlist: ${playlist.songIds.length} bài</span>
                    <h1 class="playlist-title">${playlist.name}
                        <br> 
                        <span class="hero-desc-text">
                                Tạo bởi: <strong>${playlist.creator || 'Admin'}</strong>
                        </span>
                    </h1>
                    <button class="btn-play-all btn-play-music" data-playlist-id="${id}" data-context-type="${type}">
                        <span class="material-icons-round">play_arrow</span> Phát tất cả
                    </button>
                </div>
            </section>

            <section class="track-list-container">

                ${HeaderSongItem()}
                <div class="song-item__song-list">
                    ${listSongs.length > 0 
                        ? listSongs.map((song, index) => {
                            const isHidden = hasMore && index >= initialDisplayCount;                  
                            // SỬA LỖI CONTEXT: Truyền đúng contextType (user_playlist hoặc playlist)
                            return `<div class="song-item-wrapper ${isHidden ? 'hidden' : ''}">
                                ${SongItem(song, index + 1, id, contextType)}
                            </div>`;
                        }).join('')
                        : '<div style="padding: 20px; color: #888;">Chưa có bài hát nào</div>'
                    }
                </div>

                ${hasMore ? `
                    <div class="see-more" data-expanded="false" data-element=".song-item-wrapper">
                        <span class="see-more-text">Xem thêm</span> 
                        <span class="material-icons-round">arrow_drop_down</span>
                    </div>
                ` : ''}

            </section>
        </div>
    `;
}