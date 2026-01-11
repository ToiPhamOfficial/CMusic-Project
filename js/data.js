// Dữ liệu mẫu cho website CMusic

export const users = [
    {
        id: 1,
        name: "Demo",
        password: "demo123@",
        email: "demo@example.com",
        avatar: "/assets/img/default-avatar.png"
    },

    {
        id: 2,
        name: "Hoàng Quân",
        password: "hoangquan123@",
        email: "hoang_quan@gmail.com",
        avatar: "/data/users/avatar/hoang_quan_3343.png"
    },
    {
        id: 3,
        name: "Văn Khánh",
        password: "vankhanh456@",
        email: "van_khanh@gmail.com",
        avatar: "/data/users/avatar/van_khanh_2331.png"
    }
];

export const songs = [
    {
        id: 1,
        title: "Kamin",
        artist: "Emin ft. JONY",
        duration: "3:05",
        image: "/data/songs/thumb/Kamin%20-%20Emin%20ft.%20JONY.png",
        plays: "150M",
        genre: "Pop",
        audioUrl: "/data/songs/mp3/Kamin%20-%20Emin%20ft.%20JONY.mp3"
    },
    {
        id: 2,
        title: "Die With A Smile",
        artist: "Lady Gaga, Bruno Mars",
        duration: "4:11",
        image: "/data/songs/thumb/Die%20With%20A%20Smile%20-%20Lady%20Gaga,%20Bruno%20Mars.png",
        plays: "320M",
        genre: "Pop",
        audioUrl: "/data/songs/mp3/Die%20With%20A%20Smile%20-%20Lady%20Gaga,%20Bruno%20Mars.mp3"
    },
    {
        id: 3,
        title: "Đừng Làm Trái Tim Anh Đau",
        artist: "Sơn Tùng MTP",
        duration: "5:26",
        image: "/data/songs/thumb/Đừng%20Làm%20Trái%20Tim%20Anh%20Đau%20-%20Sơn%20Tùng%20MTP.png",
        plays: "162M",
        genre: "V-Pop",
        audioUrl: "/data/songs/mp3/Đừng%20Làm%20Trái%20Tim%20Anh%20Đau%20-%20Sơn%20Tùng%20MTP.mp3"
    },
    {
        id: 4,
        title: "Faded",
        artist: "Alan Walker",
        duration: "3:33",
        image: "/data/songs/thumb/Faded%20-%20Alan%20Walker.png",
        plays: "970M",
        genre: "EDM",
        audioUrl: "/data/songs/mp3/Faded%20-%20Alan%20Walker.mp3"
    },
    {
        id: 5,
        title: "Mất Kết Nối",
        artist: "Dương Domic",
        duration: "3:28",
        image: "/data/songs/thumb/Mất%20Kết%20Nối%20-%20Dương%20Domic.png",
        plays: "89M",
        genre: "V-Pop",
        audioUrl: "/data/songs/mp3/Mất%20Kết%20Nối%20-%20Dương%20Domic.mp3"
    },
    {
        id: 6,
        title: "Sea Of Feelings",
        artist: "Lowx",
        duration: "2:53",
        image: "/data/songs/thumb/Sea%20Of%20Feelings%20-%20Lowx.png",
        plays: "45M",
        genre: "Lofi",
        audioUrl: "/data/songs/mp3/Sea%20Of%20Feelings%20-%20Lowx.mp3"
    },
    {
        id: 7,
        title: "In My Feelings",
        artist: "Camila Cabello",
        duration: "3:47",
        image: "assets/img/hit-songs-bg/hit1.png",
        plays: "63M",
        genre: "Pop",
        audioUrl: "/data/songs/mp3/In%20My%20Feelings%20-%20Camila%20Cabello.mp3"
    }
];

export const artists = [
    { id: 1, name: 'Sơn Tùng M-TP', image: 'https://placehold.co/200', desc: 'Hoàng tử mưa...' },
    { id: 2, name: 'Đen Vâu', image: 'https://placehold.co/200', desc: 'Rapper tử tế...' },
    {
        id: 11,
        name: "Alan Walker",
        image: "/data/artists/alan-walker.png",
        listeners: "970M",
        genre: "EDM"
    },
    {
        id: 22,
        name: "Bruno Mars",
        image: "/data/artists/bruno-mars.png",
        listeners: "275M",
        genre: "Pop"
    },
    {
        id: 3,
        name: "Sơn Tùng MTP",
        image: "/data/artists/son-tung-mtp.png",
        listeners: "134M",
        genre: "V-Pop"
    },
    {
        id: 4,
        name: "Soobin Hoàng Sơn",
        image: "/data/artists/soobin-hoang-son.png",
        listeners: "80M",
        genre: "V-Pop"
    },
    {
        id: 5,
        name: "Drake",
        image: "/data/artists/drake.png",
        listeners: "75M",
        genre: "Hip Hop"
    }
];

export const genres = [
    {
        id: 1,
        name: "Electro Pop",
        color: "#a49a85"
    },
    {
        id: 2,
        name: "Alternative Indie",
        color: "#a34c33"
    },
    {
        id: 3,
        name: "Hip Hop",
        color: "#0c4045"
    },
    {
        id: 4,
        name: "Dance Beat",
        color: "#466a89"
    },
    {
        id: 5,
        name: "Classical Period",
        color: "#a77895"
    },
    {
        id: 6,
        name: "Hip Hop Rap",
        color: "#5647a5"
    }
];

export const playlists = [
    {
        id: 1,
        name: "Lofi Chill",
        songCount: 24,
        icon: "play_circle"
    },
    {
        id: 2,
        name: "Hot Phonk",
        songCount: 18,
        icon: "play_circle"
    }
];

export const albums = [
    {
        id: 1,
        title: "Greatest Hits",
        artist: "Bruno Mars",
        year: 2023,
        songs: 12,
        image: "/data/artists/bruno-mars.png"
    },
    {
        id: 2,
        title: "Different World",
        artist: "Alan Walker",
        year: 2018,
        songs: 15,
        image: "/data/albums/different-world-alan-walker.png"
    },
    {
        id: 3,
        title: "Sky Tour",
        artist: "Sơn Tùng MTP",
        year: 2022,
        songs: 10,
        image: "/data/albums/sky-tour-son-tung-mtp.png"
    },
    {
        id: 4,
        title: "Lofi Beats",
        artist: "Various Artists",
        year: 2021,
        songs: 20,
        image: "/data/albums/lofi-beats.png"
    },
    {
        id: 5,
        title: "Pop Classics",
        artist: "Various Artists",
        year: 2020,
        songs: 18,
        image: "/data/albums/pop-classics.png"
    },
    {
        id: 6,
        title: "Indie Vibes",
        artist: "Various Artists",
        year: 2019,
        songs: 22,
        image: "/data/albums/indie-vibes.png"
    },
    {
        id: 7,
        title: "Hip Hop Anthems",
        artist: "Various Artists",
        year: 2023,
        songs: 16,
        image: "/data/albums/hip-hop-anthems.png"
    }
];

// Helper functions để lấy dữ liệu
export function getSongById(id) {
    return songs.find(song => song.id === id);
}

export function getArtistById(id) {
    return artists.find(artist => artist.id === id);
}

export function getPlaylistById(id) {
    return playlists.find(playlist => playlist.id === id);
}

export function getTopSongs(limit = 5) {
    return songs.slice(0, limit);
}

export function getTopArtists(limit = 5) {
    return artists.slice(0, limit);
}

export function searchSongs(query) {
    const lowerQuery = query.toLowerCase();
    return songs.filter(song => 
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery)
    );
}

export const db = {
    artists: [
        { id: '1', name: 'Sơn Tùng M-TP', image: 'https://placehold.co/200', desc: 'Hoàng tử mưa...' },
        { id: '2', name: 'Đen Vâu', image: 'https://placehold.co/200', desc: 'Rapper tử tế...' }
    ],
    playlists: [
        { id: '101', title: 'Nhạc Chill Cuối Tuần', author: 'Admin', image: 'https://placehold.co/200' },
        { id: '102', title: 'Top Hits 2024', author: 'Spotify', image: 'https://placehold.co/200' }
    ],
    songs: [
        { id: 's1', title: 'Chúng Ta Của Hiện Tại', artist: 'Sơn Tùng M-TP', lyrics: '...' },
        { id: 's2', title: 'Mang Tiền Về Cho Mẹ', artist: 'Đen Vâu', lyrics: '...' }
    ]
};

