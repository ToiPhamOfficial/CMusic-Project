import { albums } from '../data.js';

export default function Album() {
    return `
        <section class="section-box albums">
            <div class="section-header">
                <h2>Album phổ biến</h2>
            </div>
            <div class="album-grid">
                ${albums.map(album => `
                    <div class="album-card" data-route="/album-detail?id=${album.id}">
                        <div class="album-cover">
                            <img src="${album.image}" alt="${album.title}">
                            <button class="album-play-btn">
                                <span class="material-icons-round">play_arrow</span>
                            </button>
                        </div>
                        <div class="album-info">
                            <h3 class="album-title">${album.title}</h3>
                            <p class="album-artist">${album.artist}</p>
                            <p class="album-meta">${album.year} • ${album.songs} bài hát</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="section-box new-releases">
            <div class="section-header">
                <h2>Mới phát hành</h2>
            </div>
            <div class="album-grid">
                ${albums.map(album => `
                    <div class="album-card" data-route="/album-detail?id=${album.id}">
                        <div class="album-cover">
                            <img src="${album.image}" alt="${album.title}">
                            <button class="album-play-btn">
                                <span class="material-icons-round">play_arrow</span>
                            </button>
                        </div>
                        <div class="album-info">
                            <h3 class="album-title">${album.title}</h3>
                            <p class="album-artist">${album.artist}</p>
                            <p class="album-meta">${album.year} • ${album.songs} bài hát</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
