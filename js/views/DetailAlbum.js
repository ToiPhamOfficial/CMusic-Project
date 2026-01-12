import { getAlbumById, getSongById } from '../data.js';

export default function AlbumDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const album = getAlbumById(id);

    if (!album) return `<h1>Playlist không tồn tại</h1>`;

    const listSongs = album.songIds.map(songId => {
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

                ${nothing}
                ${header}
                ${listSongs.map((song, index) => {
                    // Nếu data không có thì fallback text
                    const albumName = song.album || "Unknown Album"; 

                    return `
                    <div class="track-item" data-song-id="${song.id}">
                        <div class="col-index">
                            <span class="number">#${index + 1}</span>
                            <span class="material-icons-round">play_arrow</span>
                        </div>
                        <div class="col-title">
                            <img src="${song.image}" alt="${song.title}" class="track-img">
                            <span class="song-name">${song.title}</span>
                        </div>
                        <div class="col-artist">${song.artist}</div>
                        <div class="col-album">${albumName}</div>
                        <div class="col-time">
                            ${song.duration} <span class="material-icons-round icon-more">more_horiz</span>
                        </div>
                    </div>
                    `;
                }).join('')}

                <div class="see-more">
                    Xem thêm <span class="material-icons-round">arrow_drop_down</span>
                </div>

            </section>
        </div>
    `;
}