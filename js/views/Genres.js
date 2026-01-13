import { genres, songs } from '../data.js';
import { GenreCard } from '../components/Card.js';


export default function Genres() {
    return `
        <section class="page-heading page-genres__heading">
            <h1 class="page-genres__title">Khám phá thể loại</h1>
            <p class="page-genres__subtitle">Tìm kiếm tâm trạng âm nhạc của bạn</p>
        </section>

        <!-- Hot Genres Section -->
        <section class="section-box hot-genres">
            <div class="section-header">
                <h2>Thể loại nổi bật</h2>
            </div>
            <div class="page-genres__grid">
                ${genres.slice(6, 11).map(genre => GenreCard(genre)).join('')}
            </div>
        </section>

        <!-- All Genres Section -->
        <section class="section-box all-genres">
            <div class="section-header">
                <h2>Tất cả thể loại</h2>
            </div>
            <div class="page-genres__grid">
                ${genres.map(genre => GenreCard(genre)).join('')}
            </div>
        </section>

        <!-- Popular Genres Section -->
        <section class="section-box popular-genres">
            <div class="section-header">
                <h2>Thể loại phổ biến</h2>
            </div>
            <div class="page-genres__grid">
                ${genres.slice(0, 5).map(genre => GenreCard(genre)).join('')}
            </div>
        </section>

    `;
}
