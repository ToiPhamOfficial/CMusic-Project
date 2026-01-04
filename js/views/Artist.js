import { artists, songs } from '../data.js';

export default function Artist() {
    // const artist = artists[0];  
    return `
    <section class="section-hero">
        <div class="hero-content">
            <h1>Top Nghệ Sĩ</h1>
            <p>Cập nhật vào lúc 04/10/2025</p>
        </div>
    </section>

    <section class="playlist-container">

        <div class="chart-header">
            <div class="col-rank">Xếp hạng</div>
            <div class="col-artist"></div> <div class="col-song">Bài hát nổi bật</div>
            <div class="col-time">Thời gian</div>
        </div>

        <div class="divider"></div>

        <div class="track-list">
            ${songs.map((song, index) => {
                const rank = index + 1;
                const artist = artists.find(a => a.name === song.artist);
                // Logic class: Active và Rank (1, 2, 3)
                const rankClass = rank <= 3 ? `number-${rank}` : '';
                
                return `
                <div class="track-item-artist active" data-song-id="${song.id}">
                    
                    <div class="col-rank ${rankClass}">#${rank}</div>
                    
                    <div class="col-artist">
                        <img src="${song.image}" alt="${song.artist}" class="artist-avatar">
                        <div class="artist-info">
                            <div class="artist-name">${song.artist}</div>
                            <div class="artist-sub">${song.plays} người theo dõi</div>
                        </div>
                        <button class="btn-follow" data-artist-id="${artist?.id || ''}">${getFollowText(artist?.id)}</button>
                    </div>

                    <div class="col-song">
                        <div class="song-cover-wrapper">
                            <img src="${song.image}" alt="${song.title}" class="song-cover">
                            <div class="play-overlay"><span class="material-icons-round">play_arrow</span></div>
                        </div>
                        <div class="song-info">
                            <div class="song-title">${song.title}</div>
                            <div class="song-artist">${song.artist}</div>
                        </div>
                    </div>

                    <div class="col-time">
                        <span class="time">${song.duration}</span>
                        <span class="material-icons-round icon-heart">favorite</span>
                        <span class="material-icons-round icon-more">more_horiz</span>
                    </div>
                </div>
                `;
            }).join('')}
        </div>

    </section>
    `;
}

// Hàm trả về kiểu text của btn-follow
function getFollowText(artistId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return 'Theo dõi';

    user.followedArtists ||= [];
    return user.followedArtists.includes(artistId)
        ? 'Đã theo dõi'
        : 'Theo dõi';
}
