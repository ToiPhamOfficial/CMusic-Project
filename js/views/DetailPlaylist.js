import { getPlaylistById } from '../data.js';

export default function PlaylistDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const playlist = getPlaylistById(id);

    if (!playlist) return `<h1>Playlist không tồn tại</h1>`;

    return `
        <div class="playlist-detail p-4 d-flex">
            <div class="cover me-4 text-center" style="width: 250px;">
                <img src="${playlist.image}" class="img-fluid shadow rounded mb-3">
                <h4 class="fw-bold">${playlist.title}</h4>
                <p class="text-muted">Tạo bởi: ${playlist.author}</p>
            </div>
            
            <div class="tracks flex-grow-1">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tiêu đề</th>
                            <th>Thời lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Demo Song 1</td>
                            <td>3:45</td>
                        </tr>
                         <tr>
                            <td>2</td>
                            <td>Demo Song 2</td>
                            <td>4:20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}