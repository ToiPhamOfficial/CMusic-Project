import { getGenreById, getPlaylistById } from "../data.js";
import { PlaylistCard } from "../components/Card.js";

export default function GenreDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const genre = getGenreById(id);

    if (!genre) return `<h1>Không tìm thấy thể loại nào</h1>`;

    const listSongs = genre.playlistIds.map(laylistId => {
        return getPlaylistById(laylistId);
    }).filter(laylist => laylist !== undefined); // Lọc bỏ trường hợp playlist bị xóa (undefined)

    return `
        <section class="page__heading page-playlist__heading">
            <h1 class="page__title page-playlist__title">${genre.name}</h1>
            <p class="page__subtitle page-playlist__subtitle">Danh sách các bài hát thuộc dòng nhạc ${genre.name}</p>
        </section>

        <section class="section-box playlists">
            <div class="section-header"><h2>Playlist nổi bật</h2></div>
            <div class="playlist-grid">
                ${listSongs.map(playlist => PlaylistCard(playlist)).join('')}
            </div>
        </section>
    `;
}