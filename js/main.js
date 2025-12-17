import Sidebar from './components/Sidebar.js';
import Player from './components/Player.js';
import Header from './components/Header.js';
import { initRouter } from './router.js';
import { songs, searchSongs } from './data.js';

// State quản lý player
let currentSong = null;
let isPlaying = false;

// Khởi tạo app
$(document).ready(function() {
    // Render các components tĩnh
    renderComponents();
    
    // Khởi tạo router
    initRouter();
    
    // Thêm event listeners
    initEventListeners();
});

// Render các components tĩnh
function renderComponents() {
    // Render Sidebar
    $('.sidebar').html(Sidebar());
    
    // Render Header
    $('.header').html(Header());
    
    // Render Player
    $('.player').html(Player());
}

// Khởi tạo các event listeners
function initEventListeners() {
    // Search functionality
    $('.search-bar input').on('input', handleSearch);

    // Event delegation cho các actions
    $(document).on('click', '.nav-link', handleNavigation);
    
    $(document).on('click', '.btn-play-song', function() {
        const songId = parseInt($(this).data('song-id'));
        playSong(songId);
    });
    
    $(document).on('click', '.btn-add-song', function() {
        const songId = parseInt($(this).data('song-id'));
        addToPlaylist(songId);
    });
    
    $(document).on('click', '.btn-control.play', togglePlay);

    // Tab navigation
    $(document).on('click', '.tab-item', function() {
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
    });
}

// Handle search
function handleSearch(e) {
    const query = e.target.value.trim();
    
    if (query.length > 0) {
        const results = searchSongs(query);
        displaySearchResults(results);
    } else {
        // Clear search results or show default content
        console.log('Clear search');
    }
}

// Display search results
function displaySearchResults(results) {
    console.log('Search results:', results);
    // TODO: Implement UI for search results
}

// Handle navigation
function handleNavigation(e) {
    e.preventDefault();
    
    // Remove active class from all nav items
    $('.nav-item').removeClass('active');
    
    // Add active class to clicked nav item
    $(this).closest('.nav-item').addClass('active');
}

// Play song
function playSong(songId) {
    const song = songs.find(s => s.id === songId);
    
    if (song) {
        currentSong = song;
        isPlaying = true;
        updatePlayer(song);
        console.log('Playing:', song.title);
        
        // TODO: Implement actual audio playback
    }
}

// Update player UI
function updatePlayer(song) {
    $('.player-info').html(`
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
    `);
    
    $('.player-disc img').attr({
        'src': song.image,
        'alt': song.title
    });
}

// Toggle play/pause
function togglePlay() {
    isPlaying = !isPlaying;
    
    const $playBtn = $('.btn-control.play img');
    if ($playBtn.length) {
        if (isPlaying) {
            // Change to pause icon
            console.log('Playing');
        } else {
            // Change to play icon
            console.log('Paused');
        }
    }
}

// Add to playlist
function addToPlaylist(songId) {
    const song = songs.find(s => s.id === songId);
    
    if (song) {
        console.log('Added to playlist:', song.title);
        // TODO: Implement actual playlist functionality
        
        // Show notification
        showNotification(`Đã thêm "${song.title}" vào danh sách phát`);
    }
}

// Show notification
function showNotification(message) {
    // Simple notification (có thể cải thiện với toast UI)
    console.log('Notification:', message);
    
    // TODO: Implement better notification UI
}

// Export functions for use in other modules
export { playSong, addToPlaylist, currentSong, isPlaying };
