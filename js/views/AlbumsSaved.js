import { getAlbumById } from '../data.js';
import { AlbumCard } from '../components/Card.js';

export default function AlbumsSaved() {
    // Lấy thông tin user từ localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
    
    // Lấy danh sách album đã lưu
    const albumsSavedIds = currentUser?.albumsSaved || [];
    const albumsSaved = albumsSavedIds
        .map(id => getAlbumById(id))
        .filter(album => album !== undefined);

    return `
        <section class="page__heading page-albums-saved__heading">
            <h1 class="page__title page-albums-saved__title">Các album đã lưu</h1>
            <p class="page__subtitle page-albums-saved__subtitle">Lưu trữ các album yêu thích của bạn</p>
        </section>

        <section class="section-box albums-saved">
            <div class="section-header">
                <h2>Album</h2>
            </div>
            <div class="album-grid">
                ${albumsSaved.length > 0 
                    ? albumsSaved.map((album, index) => AlbumCard(album, index + 1)).join('')
                    : '<div class="page-albums-saved__empty">Bạn chưa lưu album nào.</div>'
                }
            </div>
        </section>
    `;
}
