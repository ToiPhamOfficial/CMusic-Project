import audioManager from "../services/audioManager.js";
import { isFavorited } from "../utils/utils.js";
import Dropdown from "./Dropdown.js";

export function ArtistCard(artist) {
    return `
        <div class="card artist-card" data-route="/artist-detail?id=${artist.id}">
            <div class="card-cover artist-cover">
                <img src="${artist.image}" alt="${artist.name}" loading="lazy">
                <button class="btn-follow card-play-btn" data-artist-id="${artist.id}" title="Theo dõi">
                    <span class="material-icons-round">${getFollowIcon(artist.id)}</span>
                </button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${artist.name}</h3>
                <p class="card-subtitle">${artist.listeners} lượt nghe</p>
            </div>
        </div>
    `;
}

export function GenreCard(genre) {
    return `
        <div class="card genre-card" data-route="/genre-detail?id=${genre.id}" style="background-color: ${genre.color};">
            <h3 class="genre-name">${genre.name}</h3>
        </div>
    `;
}

export function ChartItem(song, rank) {
    const rankClass = rank <= 3 ? 'top-rank' : '';
    return `
        <div class="chart-item ${rankClass}" data-song-id="${song.id}">
            <span class="chart-rank">${rank}</span>
            <div class="chart-thumbnail">
                <img src="${song.image}" alt="${song.title}" loading="lazy">
                <button class="chart-play-btn btn-play-music" data-song-id="${song.id}"title="Phát">
                    <span class="material-icons-round">play_arrow</span>
                </button>
            </div>
            <div class="chart-info">
                <h4 class="chart-title">${song.title}</h4>
                <p class="chart-artist">${song.artist}</p>
            </div>
            <span class="chart-duration">${song.duration}</span>
            <div class="chart-actions">
                <button class="btn-icon btn-favorite ${isFavorited(song.id) ? 'active' : ''}" title="Yêu thích" data-song-id="${song.id}">
                    <span class="material-icons-round">favorite</span>
                </button>
                <div class="btn-more-wrapper">
                    <button class="btn-icon btn-more" title="Thêm">
                        <span class="material-icons-round">more_horiz</span>
                    </button>
                    ${Dropdown([
                        [
                            { action: 'download', icon: 'download', text: 'Tải về' },
                            { action: 'add-to-playlist', icon: 'playlist_add', text: 'Thêm vào playlist' },
                            { action: 'share', icon: 'share', text: 'Chia sẻ' },
                        ],
                        [
                            { action: 'report', icon: 'flag', text: 'Báo cáo' }
                        ]
                    ])}
                </div>
            </div>
        </div>
    `;
}

export function AlbumCard(album) {
    return `
        <div class="card album-card" data-route="/album-detail?id=${album.id}">
            <div class="card-cover">
                <img src="${album.image}" alt="${album.title}" loading="lazy">
                <button class="card-play-btn btn-play-music" data-album-id="${album.id}" title="Phát">
                    <span class="material-icons-round">play_arrow</span>
                </button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${album.title}</h3>
                <p class="card-subtitle">${album.artist}</p>
                ${album.year && album.songIds.length ? `<p class="card-meta">${album.year} • ${album.songIds.length} bài hát</p>` : ''}
            </div>
        </div>
    `;
}

export function HeaderSongItem(song, index = null) {
    return `
        <div class="song-item__header">
            <div class="song-item__header-col song-item__header-col--index">#</div>
            <div class="song-item__header-col song-item__header-col--title">Bài hát</div>
            <div class="song-item__header-col song-item__header-col--artist">Nghệ sĩ</div>
            <div class="song-item__header-col song-item__header-col--actions">Thời gian</div>
        </div>
        <div class="divider"></div>
    `
}

export function SongItem(song, index = null, contextId = null, contextType = null) {
    // Tạo data attributes cho context (album hoặc playlist)
    const contextDataAttr = contextId && contextType 
        ? (contextType === 'album' ? `data-album-id="${contextId}"` : `data-playlist-id="${contextId}"`)
        : '';
    
    return `
        <div class="song-item" data-route="/song-detail?id=${song.id}">
            <div class="song-item__index">
                ${index !== null ? `<span class="song-item__number">${index}</span>` : ''}
            </div>
            <div class="song-item__info">
                <div class="song-item__thumbnail">
                    <img class="song-item__image" src="${song.image}" alt="${song.title}" loading="lazy">
                    <button class="btn-play-music song-item__play-btn" data-song-id="${song.id}" ${contextDataAttr} title="Phát">
                        <span class="material-icons-round">play_arrow</span>
                    </button>
                </div>
                <div class="song-item__text">
                    <h4 class="song-item__title">${song.title}</h4>
                    <p class="song-item__artist-mobile">${song.artist}</p>
                </div>
            </div>
            <div class="song-item__artist">
                <p class="song-item__artist-name">${song.artist}</p>
            </div>
            <div class="song-item__actions">
                <span class="song-item__time">${song.duration}</span>
                <button class="btn-icon btn-favorite ${isFavorited(song.id) ? 'active' : ''}" title="Yêu thích" data-song-id="${song.id}">
                    <span class="material-icons-round">favorite</span>
                </button>
                <div class="btn-more-wrapper">
                    <button class="btn-icon btn-more" title="Thêm">
                        <span class="material-icons-round">more_horiz</span>
                    </button>
                    ${Dropdown([
                        [
                            { action: 'download', icon: 'download', text: 'Tải về' },
                            { action: 'add-to-playlist', icon: 'playlist_add', text: 'Thêm vào playlist' },
                            { action: 'share', icon: 'share', text: 'Chia sẻ' },
                        ],
                        [
                            { action: 'report', icon: 'flag', text: 'Báo cáo' }
                        ]
                    ])}
                </div>
            </div>
        </div>
    `;
}

export function PlaylistCard(playlist) {
    const thumbUrl = playlist.image ? playlist.image : '/assets/img/default-playlist-thumb.png';
    return `
        <div class="card playlist-card" data-route="/playlist-detail?id=${playlist.id}">
            <div class="card-cover playlist-cover">
                <img src="${thumbUrl}" alt="${playlist.name}" loading="lazy">
                <div class="card-overlay">
                    <button class="btn-play-music card-play-btn" data-playlist-id="${playlist.id}" title="Phát">
                        <span class="material-icons-round">play_arrow</span>
                    </button>
                </div>
            </div>
            <div class="card-info">
                <h3 class="card-title">${playlist.name}</h3>
                <p class="card-subtitle">${playlist.songIds.length} bài hát</p>
            </div>
        </div>
    `;
}

export function initCardEvents() {
    $(document).on('user:followedArtist', function(e, artistId) {
        // Re-render lại nút theo dõi
        $(`.artist-card .btn-follow[data-artist-id="${artistId}"] span`).text('person_add_disabled');
    });

    $(document).on('user:unfollowedArtist', function(e, artistId) {
        // Re-render lại nút theo dõi
        $(`.artist-card .btn-follow[data-artist-id="${artistId}"] span`).text('person_add');
    });
    
    // Lắng nghe sự kiện favorite/unfavorite để cập nhật icon
    $(document).on('user:favoritedSong', function(e, songId) {
        $(`.btn-favorite[data-song-id="${songId}"]`).addClass('active');
    });

    $(document).on('user:unfavoritedSong', function(e, songId) {
        $(`.btn-favorite[data-song-id="${songId}"]`).removeClass('active');
    });
    
    // Dropdown toggle trong Card (ChartItem, SongItem)
    $(document).on('click', '.btn-more', function(e) {
        e.stopPropagation();
        const $dropdown = $(this).siblings('.dropdown');
        $('.dropdown').not($dropdown).removeClass('active');
        $dropdown.toggleClass('active');
    });
}

function getFollowIcon(artistId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return 'person_add';

    user.followedArtists ||= [];
    return user.followedArtists.includes(artistId)
        ? 'person_add_disabled'
        : 'person_add';
}