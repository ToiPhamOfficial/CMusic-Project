import { albums } from '../data.js';
import { AlbumCard } from '../components/Card.js';

export default function Albums() {
    return `
        <section class="section-box albums">
            <div class="section-header">
                <h2>Album hot</h2>
            </div>
            <div class="album-grid">
                ${albums.map(album => AlbumCard(album)).join('')}
            </div>
        </section>

        <section class="section-box new-releases">
            <div class="section-header">
                <h2>Album mới phát hành</h2>
            </div>
            <div class="album-grid">
                ${albums.map(album => AlbumCard(album)).join('')}
            </div>
        </section>
    `;
}
