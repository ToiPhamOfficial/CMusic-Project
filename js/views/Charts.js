import { songs } from "../data.js";
import { ChartItem } from "../components/Card.js";

export default function Charts() {
    return `
        <section class="page__heading page-albums-saved__heading">
            <h1 class="page__title page-albums-saved__title">Bảng Xếp Hạng</h1>
            <p class="page__subtitle page-albums-saved__subtitle">Top những bài hát được nghe nhiều nhất</p>
        </section>

        <!-- Charts -->
        <section class="section-box charts-section">
            <div class="section-header">
                <h2>Bảng xếp hạng</h2>
                <a href="#" class="view-all" data-route="/charts">Tất cả</a>
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
    `;
}