export function ArtistCard(artist) {
    return `
        <div class="card artist-card" data-route="/artist-detail?id=${artist.id}">
            <div class="card-cover artist-cover">
                <img src="${artist.image}" alt="${artist.name}" loading="lazy">
                <button class="card-play-btn btn-play" title="Phát">
                    <span class="material-icons-round">play_arrow</span>
                </button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${artist.name}</h3>
                <p class="card-subtitle">${artist.listeners} lượt nghe</p>
            </div>
        </div>
    `;
}

export function GenreCard(genre) {
    return `
        <div class="card genre-card" data-route="/genre-detail?id=${genre.id}" style="background-color: ${genre.color};">
            <h3 class="genre-name">${genre.name}</h3>
        </div>
    `;
}

export function ChartItem(song, rank) {
    const rankClass = rank <= 3 ? 'top-rank' : '';
    return `
        <div class="chart-item ${rankClass}" data-song-id="${song.id}">
            <span class="chart-rank">${rank}</span>
            <div class="chart-thumbnail">
                <img src="${song.image}" alt="${song.title}" loading="lazy">
                <button class="chart-play-btn btn-play">
                    <span class="material-icons-round">play_arrow</span>
                </button>
            </div>
            <div class="chart-info">
                <h4 class="chart-title">${song.title}</h4>
                <p class="chart-artist">${song.artist}</p>
            </div>
            <span class="chart-duration">${song.duration}</span>
            <div class="chart-actions">
                <button class="btn-icon btn-favorite" title="Yêu thích">
                    <span class="material-icons-round">favorite_border</span>
                </button>
                <button class="btn-icon btn-more" title="Thêm">
                    <span class="material-icons-round">more_horiz</span>
                </button>
            </div>
        </div>
    `;
}

export function AlbumCard(album) {
    return `
        <div class="card album-card" data-route="/album-detail?id=${album.id}">
            <div class="card-cover">
                <img src="${album.image}" alt="${album.title}" loading="lazy">
                <button class="card-play-btn btn-play" title="Phát">
                    <span class="material-icons-round">play_arrow</span>
                </button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${album.title}</h3>
                <p class="card-subtitle">${album.artist}</p>
                ${album.year && album.songs ? `<p class="card-meta">${album.year} • ${album.songs} bài hát</p>` : ''}
            </div>
        </div>
    `;
}

export function HeaderSongItem(song, index = null) {
    return `
        <div class="song-item__header">
            <div class="song-item__header-col song-item__header-col--index">#</div>
            <div class="song-item__header-col song-item__header-col--title">Bài hát</div>
            <div class="song-item__header-col song-item__header-col--artist">Nghệ sĩ</div>
            <div class="song-item__header-col song-item__header-col--actions">Thời gian</div>
        </div>
        <div class="divider"></div>
    `
}

export function SongItem(song, index = null) {
    return `
        <div class="song-item" data-song-id="${song.id}">
            <div class="song-item__index">
                ${index !== null ? `<span class="song-item__number">${index}</span>` : ''}
            </div>
            <div class="song-item__info">
                <div class="song-item__thumbnail">
                    <img class="song-item__image" src="${song.image}" alt="${song.title}" loading="lazy">
                    <button class="song-item__play-btn btn-play" title="Phát">
                        <span class="material-icons-round">play_arrow</span>
                    </button>
                </div>
                <div class="song-item__text">
                    <h4 class="song-item__title">${song.title}</h4>
                    <p class="song-item__artist-mobile">${song.artist}</p>
                </div>
            </div>
            <div class="song-item__artist">
                <p class="song-item__artist-name">${song.artist}</p>
            </div>
            <div class="song-item__actions">
                <span class="song-item__time">${song.duration}</span>
                <button class="btn-icon btn-favorite" title="Yêu thích">
                    <span class="material-icons-round">favorite_border</span>
                </button>
                <button class="btn-icon btn-more" title="Thêm">
                    <span class="material-icons-round">more_horiz</span>
                </button>
            </div>
        </div>
    `;
}

export function PlaylistCard(playlist) {
    const coverStyle = playlist.image 
        ? `background-image: url('${playlist.image}');`
        : playlist.gradient 
            ? `background: ${playlist.gradient};`
            : '';
    
    const coverContent = playlist.image 
        ? `<img src="${playlist.image}" alt="${playlist.name}" loading="lazy">`
        : `<span class="material-icons-round">${playlist.icon || 'queue_music'}</span>`;
    
    return `
        <div class="card playlist-card" data-route="/playlist-detail?id=${playlist.id}">
            <div class="card-cover playlist-cover" style="${coverStyle}">
                ${coverContent}
                <div class="card-overlay">
                    <button class="card-play-btn btn-play" title="Phát">
                        <span class="material-icons-round">play_arrow</span>
                    </button>
                </div>
            </div>
            <div class="card-info">
                <h3 class="card-title">${playlist.name}</h3>
                <p class="card-subtitle">${playlist.songCount} bài hát</p>
            </div>
        </div>
    `;
}