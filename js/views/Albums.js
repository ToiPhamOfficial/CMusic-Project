import { albums } from '../data.js';
import { AlbumCard } from '../components/Card.js';

export default function Albums() {
    return `
        <section class="page__heading">
            <h1 class="page__title">Kho album</h1>
            <p class="page__subtitle">Tổng hợp các album âm nhạc độc đáo</p>
        </section>

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
