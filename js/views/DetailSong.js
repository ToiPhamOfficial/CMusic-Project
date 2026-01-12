import { getSongById } from '../data.js';

export default function SongDetail() {
    //Tự lấy ID từ URL hiện tại (ví dụ: .../artist-detail?id=1)
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Lấy số 1 ra

    const song = getSongById(id);
    if (!song) return `<h1>Bài hát không tồn tại</h1>`;

    // --- LOGIC LẤY LYRIC TỪ FILE ---
    // 1. Tạo đường dẫn tới file txt dựa trên ID
    const lyricUrl = `./data/songs/lyrics/${id}.txt`;

    // 2. Gọi hàm lấy dữ liệu (Fetch)
    // Lưu ý: Vì fetch chạy mất thời gian, nên ta sẽ cập nhật DOM sau khi nó tải xong
    fetch(lyricUrl)
        .then(response => {
            if (!response.ok) throw new Error("Chưa có lời bài hát");
            return response.text(); // Chuyển nội dung file thành text
        })
        .then(text => {
            // Khi đã lấy được text -> Nhét vào thẻ p có id="lyric-content"
            $('#lyric-content').text(text);
        })
        .catch(err => {
            $('#lyric-content').html('<span class="text-muted">Lời bài hát đang cập nhật...</span>');
        });
    // -------------------------------

   return `
        <div class="detail-song">
            <section class="playlist-hero">
                <div class="hero-bg-glow"></div> 
                
                <img class="hero-img" src="${song.image}" alt="">
                
                <div class="hero-info">
                    <span class="playlist-subtitle">Bài hát: </span>
                    <h1 class="playlist-title">${song.title}</h1>
                    <button class="btn-play-all">
                        <span class="material-icons-round">play_arrow</span> Phát
                    </button>
                </div>
            </section>
            
            <div class="card bg-dark text-white border-secondary">
                <div class="card-body">
                    <h5 class="card-title text-primary">Lời bài hát</h5>
                    <hr class="border-secondary">
                    
                    <p id="lyric-content" style="white-space: pre-line; line-height: 2.0; min-height: 100px;">
                        <i class="fa fa-spinner fa-spin"></i> Đang tải lời bài hát...
                    </p>

                </div>
            </div>
        </div>
        
    `;
}