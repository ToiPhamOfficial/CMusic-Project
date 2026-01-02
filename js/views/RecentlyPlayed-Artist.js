import { artists, playlists, songs } from '../data.js';

export default function RecentlyPlayed_Artist() {
    return `
        <div class="section-header">
                <h1>Recently played</h1>
            </div>

        <div class="genre-tabs">
                
                    <button class="genre-tab" data-route="/recent">Bài hát</button>
                
                    <button class="genre-tab" data-route="/recent/playlist">Playlist</button>
                
                    <button class="genre-tab" data-route="/recent/album">Album</button>
                
                    <button class="genre-tab" data-route="/recent/artist">Nghệ sĩ</button>
                
            </div>

        <section class="section-box all-artists">
            <div class="section-header">
                <h2>Tất cả nghệ sĩ</h2>
            </div>
            <div class="artist-grid">
                ${artists.map(artist => `
                    <div class="artist-card-large" data-artist-id="${artist.id}">
                        <div class="artist-avatar">
                            <img src="${artist.image}" alt="${artist.name}">
                            <button class="artist-follow-btn">
                                <span class="material-icons-round">person_add</span>
                            </button>
                        </div>
                        <div class="artist-details">
                            <h3 class="artist-name">${artist.name}</h3>
                            <p class="artist-genre">${artist.genre}</p>
                            <p class="artist-listeners">${artist.listeners} lượt nghe</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        
    `;
}