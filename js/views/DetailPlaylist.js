import { getPlaylistById, getSongById } from '../data.js';
import { SongItem, HeaderSongItem } from '../components/Card.js';

export default function PlaylistDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const playlist = getPlaylistById(id);

    if (!playlist) return `<h1>Playlist không tồn tại</h1>`;

    const listSongs = playlist.songIds.map(songId => {
        return getSongById(songId);
    }).filter(song => song !== undefined); // Lọc bỏ trường hợp bài hát bị xóa (undefined)

    const nothing = listSongs.length === 0 ? `<div class="empty">Playlist này chưa có bài hát nào</div>` : ``;
    const header = listSongs.length !== 0 ?
    `<div class="track-header">
        <div class="col-index">#</div>
        <div class="col-title">Tiêu đề</div>
        <div class="col-artist">Nghệ sĩ</div>
        <div class="col-album">Album</div>
        <div class="col-time"><span class="material-icons-round">schedule</span></div>
    </div>` : ``;

    return `
        <div class="playlist-detail">
            
            <section class="playlist-hero">
                <div class="hero-bg-glow"></div> 
                <div class="hero-cover">
                    <span class="material-icons-round">favorite</span>
                </div>
                
                <div class="hero-info">
                    <span class="playlist-subtitle">Playlist: ${playlist.songIds.length} bài</span>
                    <h1 class="playlist-title">${playlist.name}
                        <br> 
                        <span class="hero-desc-text">
                                Tạo bởi: <strong>${playlist.creator || 'Admin'}</strong>
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
                        ? listSongs.map((song, index) => SongItem(song, index + 1)).join('')
                        : '<div class="song-item__empty">Chưa có bài hát nào</div>'
                    }
                </div>

                <div class="see-more">
                    Xem thêm <span class="material-icons-round">arrow_drop_down</span>
                </div>

            </section>
        </div>
    `;
}