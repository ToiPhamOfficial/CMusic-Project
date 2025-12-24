import { artists, songs } from '../data.js';

export default function Artist() {
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
                const isActive = index === 0; // Bài đầu tiên là Active
                
                // Logic class: Active và Rank (1, 2, 3)
                const activeClass = isActive ? 'active' : '';
                const rankClass = rank <= 3 ? `number-${rank}` : '';

                // Logic hiển thị cột cuối cùng: Active thì hiện Icon, ko Active thì hiện Thời gian
                const actionsContent = isActive 
                    ? ` <span class="material-icons-round icon-heart">favorite</span>
                        <span class="material-icons-round icon-more">more_horiz</span>`
                    : `${song.duration}`;
                
                // Class cho cột cuối: nếu active thêm class 'actions'
                const colTimeClass = isActive ? 'col-time actions' : 'col-time';

                return `
                <div class="track-item-artist ${activeClass}" data-song-id="${song.id}">
                    
                    <div class="col-rank ${rankClass}">#${rank}</div>
                    
                    <div class="col-artist">
                        <img src="${song.image}" alt="${song.artist}" class="artist-avatar">
                        <div class="artist-info">
                            <div class="artist-name">${song.artist}</div>
                            <div class="artist-sub">${song.plays} người theo dõi</div>
                        </div>
                        ${isActive ? '<button class="btn-follow">Theo dõi</button>' : ''}
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

                    <div class="${colTimeClass}">
                        ${actionsContent}
                    </div>
                </div>
                `;
            }).join('')}
        </div>

    </section>
    `;
}
