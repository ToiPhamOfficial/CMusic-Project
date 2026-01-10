// Dữ liệu mẫu cho website CMusic

export const banner = [
    {
        id: 1,
        subtitle: "Bản Hit Mới Nhất",
        title: "Mất Kết Nối",
        artist: "Dương Domic",
        views: "15Tr lượt nghe",
        image: "/data/hit-songs-bg/hit1.png"
    },
    {
        id: 2,
        subtitle: "Top Trending",
        title: "Die With A Smile",
        artist: "Lady Gaga, Bruno Mars",
        views: "120Tr lượt nghe",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    {
        id: 3,
        subtitle: "Cháy Nhất Hiện Nay",
        title: "Kamin",
        artist: "Emran, HANN",
        views: "85Tr lượt nghe",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
    },
    {
        id: 4,
        subtitle: "Mới Ra Mắt",
        title: "Faded",
        artist: "Alan Walker",
        views: "95Tr lượt nghe",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
    }
];

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
    }
];

export const artists = [
    {
        id: 1,
        name: "Sơn Tùng MTP",
        image: "/data/artists/son-tung-mtp.webp",
        listeners: "134M",
        genre: "V-Pop"
    },
    {
        id: 2,
        name: "Soobin Hoàng Sơn",
            image: "/data/artists/soobin-hoang-son.webp",
            listeners: "80M",
        genre: "V-Pop"
    },
    {
        id: 3,
        name: "Dương Domic",
        image: "/data/artists/duong-domic.webp",
        listeners: "45M",
        genre: "V-Pop"
    },
    {
        id: 4,
        name: "Đen Vâu",
        image: "/data/artists/den-vau.webp",
        listeners: "120M",
        genre: "Hip Hop"
    },
    {
        id: 5,
        name: "Min",
        image: "/data/artists/min.webp",
        listeners: "95M",
        genre: "V-Pop"
    },
    {
        id: 6,
        name: "ERIK",
        image: "/data/artists/erik.webp",
        listeners: "85M",
        genre: "V-Pop"
    },
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
    },
    {
        id: 7,
        name: "V-Pop",
        color: "#d34e24"
    },
    {
        id: 8,
        name: "Lofi",
        color: "#6b8a4f"
    },
    {
        id: 9,
        name: "Pop",
        color: "#d24f67"
    },
    {
        id: 10,
        name: "EDM",
        color: "#4f90d2"
    },
    {
        id: 11,
        name: "Rock",
        color: "#888888"
    },
    {
        id: 12,
        name: "Jazz",
        color: "#a0522d"
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
        image: "/data/albums/greatest-hits-bruno-mars.webp"
    },
    {
        id: 2,
        title: "Different World",
        artist: "Alan Walker",
        year: 2018,
        songs: 15,
        image: "/data/albums/different-world-alan-walker.webp"
    },
    {
        id: 3,
        title: "Sky Tour",
        artist: "Sơn Tùng MTP",
        year: 2022,
        songs: 10,
        image: "/data/albums/sky-tour-son-tung-mtp.webp"
    },
    {
        id: 4,
        title: "Lofi Beats",
        artist: "Various Artists",
        year: 2021,
        songs: 20,
        image: "/data/albums/lofi-beats.webp"
    },
    {
        id: 5,
        title: "Pop Classics",
        artist: "Various Artists",
        year: 2020,
        songs: 18,
        image: "/data/albums/pop-classics.webp"
    },
    {
        id: 6,
        title: "Indie Vibes",
        artist: "Various Artists",
        year: 2019,
        songs: 22,
        image: "/data/albums/indie-vibes.webp"
    },
    {
        id: 7,
        title: "Hip Hop Anthems",
        artist: "Various Artists",
        year: 2023,
        songs: 16,
        image: "/data/albums/hip-hop-anthems.webp"
    }
];

export const internationalAlbums = [
    {
        id: 1,
        title: "Behind The Light",
        artist: "James Bay",
        year: 2018,
        songs: 12,
        image: "/data/albums/international-albums/behind-the-light-james-bay.webp"
    },
    {
        id: 2,
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        year: 2020,
        songs: 11,
        image: "/data/albums/international-albums/future-nostalgia-dua-lipa.webp"
    },
    {
        id: 3,
        title: "Divide",
        artist: "Ed Sheeran",
        year: 2017,
        songs: 16,
        image: "/data/albums/international-albums/divide-ed-sheeran.webp"
    },
    {
        id: 4,
        title: "Lover",
        artist: "Taylor Swift",
        year: 2019,
        songs: 18,
        image: "/data/albums/international-albums/lover-taylor-swift.webp"
    },
    {
        id: 5,
        title: "Starboy",
        artist: "The Weeknd",
        year: 2016,
        songs: 18,
        image: "/data/albums/international-albums/starboy-the-weeknd.webp"
    },
    {
        id: 6,
        title: "Purpose",
        artist: "Justin Bieber",
        year: 2015,
        songs: 13,
        image: "/data/albums/international-albums/purpose-justin-bieber.webp"
    },
    {
        id: 7,
        title: "Scorpion",
        artist: "Drake",
        year: 2018,
        songs: 25,
        image: "/data/albums/international-albums/scorpion-drake.webp"
    },
    {
        id: 8,
        title: "Fine Line",
        artist: "Harry Styles",
        year: 2019,
        songs: 12,
        image: "/data/albums/international-albums/fine-line-harry-styles.webp"
    }
];

export const lofiAlbums = [
    {
        id: 1,
        title: "Lofi Chill Beats",
        artist: "Various Artists",
        year: 2021,
        songs: 20,
        image: "/data/albums/lofi-albums/lofi-chill-beats.webp"
    },
    {
        id: 2,
        title: "Study Lofi",
        artist: "Various Artists",
        year: 2020,
        songs: 18,
        image: "/data/albums/lofi-albums/study-lofi.webp"
    },
    {
        id: 3,
        title: "Lofi Vibes",
        artist: "Various Artists",
        year: 2019,
        songs: 22,
        image: "/data/albums/lofi-albums/lofi-vibes.webp"
    },
    {
        id: 4,
        title: "Lofi Hip Hop",
        artist: "Various Artists",
        year: 2022,
        songs: 16,
        image: "/data/albums/lofi-albums/lofi-hip-hop.webp"
    },
    {
        id: 5,
        title: "Chillhop Essentials",
        artist: "Various Artists",
        year: 2023,
        songs: 15,
        image: "/data/albums/lofi-albums/chillhop-essentials.webp"
    },
    {
        id: 6,
        title: "Lofi Dreams",
        artist: "Various Artists",
        year: 2021,
        songs: 19,
        image: "/data/albums/lofi-albums/lofi-dreams.webp"
    }
];

// Helper functions để lấy dữ liệu
export function getSongById(id) {
    return songs.find(song => song.id === id);
}

export function getArtistById(id) {
    return artists.find(artist => artist.id === id);
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
