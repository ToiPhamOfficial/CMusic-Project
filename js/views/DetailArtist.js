import { getArtistById } from '../data.js';

export default function ArtistDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const artist = getArtistById(id);

    if (!artist) return `<h1>Không tìm thấy nghệ sĩ</h1>`;

    return `
        <div class="artist-detail p-4">
            <div class="header d-flex align-items-center mb-5">
                <img src="${artist.image}" class="rounded-circle shadow" width="200" height="200">
                <div class="ms-4">
                    <span class="badge bg-primary">Nghệ sĩ</span>
                    <h1 class="display-4 fw-bold">${artist.name}</h1>
                    <p class="text-muted">${artist.desc}</p>
                    <button class="btn btn-success btn-lg rounded-pill mt-2">
                        <i class="fa fa-play"></i> Phát Ngẫu Nhiên
                    </button>
                </div>
            </div>
            
            <h3>Bài hát nổi bật</h3>
            <div class="list-group mt-3">
                <div class="list-group-item">Bài hát 1 - ${artist.name}</div>
                <div class="list-group-item">Bài hát 2 - ${artist.name}</div>
            </div>
        </div>
    `;
}