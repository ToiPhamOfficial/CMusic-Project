import Sidebar from './components/Sidebar.js';
import Player from './components/Player.js';
import Header from './components/Header.js';
import { initRouter } from './router.js';
import { navigateTo } from './router.js';
import { songs, searchSongs } from './data.js';
import audioManager from './utils/audioManager.js';

// Khởi tạo app
$(document).ready(function() {
    // Render các components tĩnh
    renderComponents();
    
    // Khởi tạo router
    initRouter();
    
    // Thêm event listeners
    initEventListeners();
    
    // Set playlist mặc định cho audio manager
    audioManager.setPlaylist(songs);
});

// Render các components tĩnh
function renderComponents() {
    // Render Sidebar
    $('.sidebar').html(Sidebar());
    
    // Render Header
    $('.header').html(Header());
    
    // Render Bottom Player
    $('.bottom-player').html(Player());
}

// Khởi tạo các event listeners
function initEventListeners() {
    // Search functionality
    $('.search-bar input').on('input', handleSearch);

    // Listeners for other element :))
    $(document).on('click', '[data-route]', function () {
        const path = $(this).data('route');
        navigateTo(path);
    });


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

    // Tab navigation
    $(document).on('click', '.tab-item', function() {
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
    });
    
    // Bottom Player Controls
    initBottomPlayerControls();
}

// Khởi tạo bottom player controls
function initBottomPlayerControls() {
    // Play/Pause button
    $(document).on('click', '.bottom-player-controls .btn-play, .player-controls .play', function() {
        audioManager.togglePlay();
    });
    
    // Previous button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Previous"]', function() {
        audioManager.prev();
    });
    
    // Next button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Next"]', function() {
        audioManager.next();
    });
    
    // Repeat button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Repeat"]', function() {
        audioManager.toggleRepeat();
    });
    
    // Shuffle button
    $(document).on('click', '.bottom-player-controls .btn-control[title="Shuffle"]', function() {
        audioManager.toggleShuffle();
    });
    
    // Progress slider
    $(document).on('input', '.progress-slider', function() {
        const percentage = $(this).val();
        audioManager.seek(percentage);
    });
    
    // Favorite button
    $(document).on('click', '.bottom-player-right .btn-control[title="Favorite"]', function() {
        $(this).find('span').text(function(i, text) {
            return text === 'favorite' ? 'favorite_border' : 'favorite';
        });
        $(this).toggleClass('favorited');
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
        audioManager.playSong(song, songs);
        console.log('Playing:', song.title);
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
export { playSong, addToPlaylist };

// Make audioManager globally accessible for debugging
window.audioManager = audioManager;
