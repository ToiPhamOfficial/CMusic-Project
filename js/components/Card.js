export function ArtistCard(artist) {
    return `
        <div class="card artist-card" data-artist-id="${artist.id}">
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
        <div class="card genre-card" data-genre-id="${genre.id}" style="background-color: ${genre.color};">
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
        <div class="card album-card" data-album-id="${album.id}">
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