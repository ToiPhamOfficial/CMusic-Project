import { songs, artists } from '../data.js';

// Hàm lấy id artist từ song
function getArtistIdFromSong(song, listArtists) {
    if (!listArtists) return null;
    const artistFound = listArtists.find(a => a.name === song.artist);
    return artistFound ? artistFound.id : null;
}

export default function Favorite() {
    return `
        <div class="playlist-container">
        
            <section class="playlist-hero">
                <div class="hero-bg-glow"></div> 
                <div class="hero-cover">
                    <span class="material-icons-round">favorite</span>
                </div>
                
                <div class="hero-info">
                    <span class="playlist-subtitle">Playlist: ${songs.length} bài</span>
                    <h1 class="playlist-title">Yêu thích của Tamo Osaki</h1>
                    <button class="btn-play-all">
                        <span class="material-icons-round">play_arrow</span> Phát tất cả
                    </button>
                </div>
            </section>

            <section class="track-list-container">
                
                <div class="track-header">
                    <div class="col-index">#</div>
                    <div class="col-title">Tiêu đề</div>
                    <div class="col-artist">Nghệ sĩ</div>
                    <div class="col-album">Album</div>
                    <div class="col-time"><span class="material-icons-round">schedule</span></div>
                </div>

                ${songs.map((song, index) => {
                    // Nếu data không có thì fallback text
                    const albumName = song.album || "Unknown Album"; 

                    // Lấy ID Artist (Dùng biến 'song' thay vì 'currentSong')
                    const artistId = getArtistIdFromSong(song, artists);
                    
                    // Xử lý link artist: Nếu tìm thấy ID thì tạo link, không thì để #
                    const artistLink = artistId ? `data-route="/artist-detail?id=${artistId}"` : '';

                    return `
                    <div class="track-item">
                        <div class="col-index">
                            <span class="number">#${index + 1}</span>
                            <span class="material-icons-round">play_arrow</span>
                        </div>
                        <div class="col-title">
                            <img src="${song.image}" alt="${song.title}" class="track-img">
                            <span class="song-name" data-route="/song-detail?id=${song.id}">${song.title}</span>
                        </div>
                        <div class="col-artist"><span ${artistLink}>${song.artist}</span></div>
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