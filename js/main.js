/* Import components event handlers */
import Sidebar, { initSidebarToggle } from './components/Sidebar.js';
import Player, { initPlayerEvents } from './components/Player.js';
import Header, { initHeaderEvents } from './components/Header.js';
import LoginSignup, { initLoginSignupEvents } from './components/LoginSignup.js';
import AddPlaylist, { initAddPlaylistEvents } from './components/AddPlaylist.js';
import Toast from './components/Toast.js';

/* Import modules */
import { initRouter } from './router.js';
import { songs } from './data.js';

/* Import services */
import audioManager from './services/audioManager.js';

/* Import views event handlers */
import { initRecentlyPageEvents } from './views/Recently.js';
import { initArtistsPageEvents } from './views/Artists.js';

const App = {
    // Khởi chạy ứng dụng
    start: function () {
        this.renderComponents();
        this.initComponentEvents();
        this.initCore();
        
        // Default Settings
        audioManager.setPlaylist(songs);
    },

    // Render các components
    renderComponents: function () {
        $('.sidebar').html(Sidebar());
        $('.header').html(Header());
        $('.player').html(Player());
        $('#modal-root').html(`
            ${LoginSignup()}
            ${AddPlaylist()}
        `);
    },

    initComponentEvents: function () {
        initSidebarToggle();
        initHeaderEvents();
        initPlayerEvents();
        initLoginSignupEvents();
        initAddPlaylistEvents();
    },

    // Kích hoạt Router và các trang cụ thể
    initCore: function () {
        initRouter();
        initEventListeners();
        initRecentlyPageEvents();
        initArtistsPageEvents();
    }
};

// Khởi tạo các event listeners
function initEventListeners() {
    
}

// Start App when DOM is ready
$(document).ready(() => {
    App.start();
});
