import { getArtistById, getSongById } from '../data.js';
import { SongItem, HeaderSongItem } from '../components/Card.js';
import { initToggleMore } from '../utils/utils.js';

export default function ArtistDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const artist = getArtistById(id);

    if (!artist) return `<h1>Không tìm thấy nghệ sĩ</h1>`;

    const listSongs = artist.songIds.map(songId => {
        return getSongById(songId);
    }).filter(song => song !== undefined); // Lọc bỏ trường hợp bài hát bị xóa (undefined)

    const initialDisplayCount = 5;
    const hasMore = listSongs.length > initialDisplayCount;

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

// Export hàm init events
export function initArtistDetailEvents() {
    initToggleMore('.song-item__song-list', '.song-item-wrapper', 5);
}