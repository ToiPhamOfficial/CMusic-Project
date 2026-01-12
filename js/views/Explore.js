import { banner, songs, artists, genres, albums, internationalAlbums, lofiAlbums} from '../data.js';
import { ArtistCard, GenreCard, ChartItem, AlbumCard } from '../components/Card.js';

export default function Explore() {
    return `
        <section class="banner" style="background-image: linear-gradient(90deg, 
            rgba(15, 15, 25, 0.98) 0%, 
            rgba(15, 15, 25, 0.85) 25%, 
            rgba(15, 15, 25, 0.5) 45%, 
            rgba(15, 15, 25, 0.2) 65%, 
            transparent 85%
        ), url('${banner[0].image}');">
            <h3 class="banner-subtitle">${banner[0].subtitle}</h3>
            <div class="banner-content">
                <h1 class="banner-title">${banner[0].title}</h1>
                <div class="banner-info">
                    <span class="artist">${banner[0].artist}</span>
                    <span class="views">${banner[0].views}</span>
                </div>
            </div>
            <div class="banner-actions">
                <button class="btn btn-play-zzz btn-play">Phát ngay</button>
                <button class="btn btn-fav">
                    <span class="material-icons-round">
                        favorite
                    </span>
                </button>
            </div>
        </section>
        
        <section class="content-section">
            <!-- Top Artists -->
            <section class="section-box top-artists">
                <div class="section-header">
                    <h2>Top nghệ sĩ</h2>
                    <a href="/artists" class="view-all">Tất cả</a>
                </div>
                <div class="artists-grid">
                    ${artists.map(artist => ArtistCard(artist)).join('')}
                </div>
            </section>

            <!-- Genres -->
            <section class="section-box genres">
                <div class="section-header">
                    <h2>Thể loại</h2>
                    <a href="/genres" class="view-all">Tất cả</a>
                </div>
                <div class="genres-grid">
                    ${genres.map(genre => GenreCard(genre)).join('')}
                </div>
            </section>

            <!-- Charts -->
            <section class="section-box charts-section">
                <div class="section-header">
                    <h2>Bảng xếp hạng</h2>
                    <a href="/charts" class="view-all">Tất cả</a>
                </div>
                <div class="charts-wrapper">
                    <!-- Weekly Chart -->
                    <div class="chart-column">
                        <div class="chart-column-header">
                            <h3>Top 50 Bài Hát Thịnh Hành</h3>
                            <button class="btn-play-chart btn-play">
                                <span>Phát</span>
                                <span class="material-icons-round">play_arrow</span>
                            </button>
                        </div>
                        <div class="chart-list">
                            ${songs.slice(0, 5).map((song, index) => ChartItem(song, index + 1)).join('')}
                        </div>
                    </div>
                    
                    <!-- Monthly Chart -->
                    <div class="chart-column">
                        <div class="chart-column-header">
                            <h3>Top 50 Nhạc Việt</h3>
                            <button class="btn-play-chart btn-play">
                                <span>Phát</span>
                                <span class="material-icons-round">play_arrow</span>
                            </button>
                        </div>
                        <div class="chart-list">
                            ${songs.slice(5, 10).map((song, index) => ChartItem(song, index + 1)).join('')}
                        </div>
                    </div>
                    
                    <!-- US-UK Chart -->
                    <div class="chart-column">
                        <div class="chart-column-header">
                            <h3>Top 50 Nhạc US-UK</h3>
                            <button class="btn-play-chart btn-play">
                                <span>Phát</span>
                                <span class="material-icons-round">play_arrow</span>
                            </button>
                        </div>
                        <div class="chart-list">
                            ${songs.slice(10, 15).map((song, index) => ChartItem(song, index + 1)).join('')}
                        </div>
                    </div>
                </div>
            </section>  
        </section>

        <!-- Album Hot -->
        <section class="section-box hot-albums">
            <div class="section-header">
                <h2>Album Hot</h2>
                <a href="/albums" class="view-all">Tất cả</a>
            </div>
            <div class="albums-grid">
                ${albums.slice(0, 6).map(album => AlbumCard(album)).join('')}
            </div>
        </section>

        <!-- Album Nhạc Quốc Tế -->
        <section class="section-box international-albums">
            <div class="section-header">
                <h2>Album Nhạc Quốc Tế</h2>
                <a href="/international" class="view-all">Tất cả</a>
            </div>
            <div class="albums-grid">
                ${internationalAlbums.slice(0, 6).map(album => AlbumCard(album)).join('')}
            </div>
        </section>

        <!-- Album Lofi -->
        <section class="section-box lofi-albums">
            <div class="section-header">
                <h2>Album Nhạc Lofi</h2>
                <a href="/lofi" class="view-all">Tất cả</a>
            </div>
            <div class="albums-grid">
                ${lofiAlbums.slice(0, 6).map(album => AlbumCard(album)).join('')}
            </div>
        </section>

        <footer class="footer">
            <div class="footer-content">
                <div class="footer-logo">
                    <div class="logo">
                        <img src="assets/img/logo-icon.png" alt="CMusic Logo">
                        <span class="logo-text">MUSIC</span>
                    </div>
                </div>
                <div class="footer-info">
                    <div class="footer-section">
                        <h4>Doanh nghiệp quản lý</h4>
                        <p>Công ty Cổ phần Tập đoán VNG. GCN ĐKDN: 0303490096 do sở KH & ĐT TPHCM cấp ngày
                            9/9/2004.</p>
                        <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận, TPHCM, Việt Nam.</p>
                    </div>
                    <div class="footer-section">
                        <h4>Người chịu trách nhiệm nội dung</h4>
                        <p>Ông Lê Hồng Minh</p>
                    </div>
                </div>
                <div class="footer-contact">
                    <div class="footer-section">
                        <h4>Thông tin dịch vụ</h4>
                        <p>GPMXH: 157/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 24/4/2019.</p>
                        <p>CSKH/Liên hệ qua Zalo: 0934118443</p>
                        <p>Email: zingmp3@vng.com.vn.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
}