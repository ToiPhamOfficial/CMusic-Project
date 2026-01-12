import { getArtistById, getSongById } from '../data.js';

export default function ArtistDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const artist = getArtistById(id);

    if (!artist) return `<h1>Không tìm thấy nghệ sĩ</h1>`;

    const listSongs = artist.songIds.map(songId => {
        return getSongById(songId);
    }).filter(song => song !== undefined); // Lọc bỏ trường hợp bài hát bị xóa (undefined)

    const nothing = listSongs.length === 0 ? `<div class="empty-playlist">Playlist này chưa có bài hát nào</div>` : ``;
    const header = listSongs.length !== 0 ?
    `<div class="track-header">
        <div class="col-index">#</div>
        <div class="col-title">Tiêu đề</div>
        <div class="col-artist">Nghệ sĩ</div>
        <div class="col-album">Album</div>
        <div class="col-time"><span class="material-icons-round">schedule</span></div>
    </div>` : ``;

    return `
        <section class="profile-hero">
            <div class="hero-bg-overlay"></div>
            
            <div class="profile-content">
                <div class="profile-avatar">
                    <img src="${artist.image}" alt="User Avatar">
                </div>
                
                <div class="profile-info">
                    <span class="profile-tag">Nghệ sĩ</span>
                    <h1 class="profile-name"><span class="name">${artist.name}</span></h1>
                    <div class="profile-stats">Follower: <strong>${artist.followers}</strong></div>
                    
                    <button class="btn-play-profile">
                        <span class="material-icons-round">play_arrow</span> Phát tất cả
                    </button>
                </div>
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

        <section class="section-box my-playlists">
            <div class="section-header">
                <h2>Giới thiệu</h2>
            </div>
            <div class="artist-bio">
                
                <div class="bio-info">
                    <div class="section-title mt-5">
                        <h2>Về ${artist.name}</h2>
                    </div>
                    <div class="bio-content">
                        <p class="bio-text text-clamp">${artist.biography ? artist.biography : `Không có dữ liệu`}</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}