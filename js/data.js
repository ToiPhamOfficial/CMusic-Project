// Dữ liệu mẫu cho website CMusic

export const songs = [
    {
        id: 1,
        title: "Kamin",
        artist: "Emin ft. JONY",
        duration: "3:43",
        image: "https://www.figma.com/api/mcp/asset/7cd60fd9-1ec8-4230-9406-db7c3ec7fd83",
        plays: "150M",
        genre: "Pop"
    },
    {
        id: 2,
        title: "Die With A Smile",
        artist: "Lady Gaga, Bruno Mars",
        duration: "4:11",
        image: "https://www.figma.com/api/mcp/asset/68231e5b-1d9e-411f-8129-b89115c563cf",
        plays: "320M",
        genre: "Pop"
    },
    {
        id: 3,
        title: "Đừng Làm Trái Tim Anh Đau",
        artist: "Sơn Tùng MTP",
        duration: "5:26",
        image: "https://www.figma.com/api/mcp/asset/01d5042a-0224-40a3-8b38-718f7e36bacf",
        plays: "134M",
        genre: "V-Pop"
    },
    {
        id: 4,
        title: "Faded",
        artist: "Alan Walker",
        duration: "3:33",
        image: "https://www.figma.com/api/mcp/asset/42f253ae-e89c-4b2b-9c13-9f6f9c0968da",
        plays: "970M",
        genre: "EDM"
    },
    {
        id: 5,
        title: "Mất Kết Nối",
        artist: "Dương Domic",
        duration: "3:28",
        image: "https://www.figma.com/api/mcp/asset/c97a1d35-e6f0-4ac7-b955-ac2c7f949a54",
        plays: "89M",
        genre: "V-Pop"
    },
    {
        id: 6,
        title: "Sea Of Feelings",
        artist: "Lowx",
        duration: "2:53",
        image: "https://www.figma.com/api/mcp/asset/d9fc626b-3041-4898-bc9f-bde47efaa68a",
        plays: "45M",
        genre: "Lofi"
    },
    {
        id: 7,
        title: "In My Feelings",
        artist: "Camila Cabello",
        duration: "3:47",
        image: "assets/img/hit-songs-bg/hit1.png",
        plays: "63M",
        genre: "Pop"
    }
];

export const artists = [
    {
        id: 1,
        name: "Alan Walker",
        image: "/data/artists/alan-walker.png",
        listeners: "970M",
        genre: "EDM"
    },
    {
        id: 2,
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
        image: "https://www.figma.com/api/mcp/asset/a4da7324-a9a9-404c-aa1b-e687e953f1eb"
    },
    {
        id: 2,
        title: "Different World",
        artist: "Alan Walker",
        year: 2018,
        songs: 15,
        image: "https://www.figma.com/api/mcp/asset/f4cf5d7e-e854-43eb-a073-26d2011ed91e"
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
