import { getAlbumById, getSongById } from '../data.js';
import { SongItem, HeaderSongItem } from '../components/Card.js';
import { initToggleMore } from '../utils/utils.js';

export default function AlbumDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const album = getAlbumById(id);

    if (!album) return `<h1>Playlist không tồn tại</h1>`;

    const listSongs = album.songIds.map(songId => {
        return getSongById(songId);
    }).filter(song => song !== undefined); // Lọc bỏ trường hợp bài hát bị xóa (undefined)

    const initialDisplayCount = 5;
    const hasMore = listSongs.length > initialDisplayCount;

    return `
        <div class="album-detail">
            
            <section class="playlist-hero">
                <div class="hero-bg-glow"></div> 
                <img class="hero-img" src="${album.image}" alt="">
                
                <div class="hero-info">
                    <span class="playlist-subtitle">Album: ${album.songIds.length} bài</span>
                    <h1 class="playlist-title">${album.title}
                        <br> 
                        <span class="hero-desc-text">
                                Tạo bởi: <strong>${album.creator || 'Admin'}</strong>
                        </span>
                    </h1>
                    <button class="btn-play-all">
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
                            return `<div class="song-item-wrapper ${isHidden ? 'hidden' : ''}">
                                ${SongItem(song, index + 1)}
                            </div>`;
                        }).join('')
                        : '<div class="song-item__empty">Chưa có bài hát nào</div>'
                    }
                </div>

                ${hasMore ? `
                    <div class="see-more" data-expanded="false">
                        <span class="see-more-text">Xem thêm</span> 
                        <span class="material-icons-round">arrow_drop_down</span>
                    </div>
                ` : ''}

            </section>
        </div>
    `;
}

// Export hàm init events
export function initAlbumDetailEvents() {
    initToggleMore('.song-item__song-list', '.song-item-wrapper', 5);
}