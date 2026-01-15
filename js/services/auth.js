// ============================================
// Auth Service - Login & Signup Handler
// ============================================

import { validateEmail } from '../utils/utils.js';
import {users} from '../data.js';

class Auth {
    constructor() {
        // Constructor intentionally empty - no auto UI updates
    }
    
    // Handle login
    handleLogin(email, password) {
        // Validation
        if (!validateEmail(email)) {
            return {
                success: false,
                message: 'Email không hợp lệ!',
                type: 'error'
            };
        }
        
        if (password.length < 6) {
            return {
                success: false,
                message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                type: 'error'
            };
        }
        
        // Authenticate user
        try {
            const user = this.authenticateUser(email, password);
            
            if (user) {
                this.setCurrentUser(user);
                return {
                    success: true,
                    message: `Chào mừng ${user.name}!`,
                    type: 'success',
                    user
                };
            } else {
                return {
                    success: false,
                    message: 'Email hoặc mật khẩu không đúng!',
                    type: 'error'
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra!',
                type: 'error'
            };
        }
    }
    
    // Handle signup
    handleSignup(name, email, password, confirmPassword) {
        // Validation
        if (name.length < 2) {
            return {
                success: false,
                message: 'Tên phải có ít nhất 2 ký tự!',
                type: 'error'
            };
        }
        
        if (!validateEmail(email)) {
            return {
                success: false,
                message: 'Email không hợp lệ!',
                type: 'error'
            };
        }
        
        if (password.length < 6) {
            return {
                success: false,
                message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                type: 'error'
            };
        }
        
        if (password !== confirmPassword) {
            return {
                success: false,
                message: 'Mật khẩu xác nhận không khớp!',
                type: 'error'
            };
        }
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            return {
                success: false,
                message: 'Email đã được đăng ký!',
                type: 'error'
            };
        }
        
        // Create new user
        try {
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                avatar: this.getDefaultAvatar(),
                createdAt: new Date().toISOString(),
                followedArtists: [],
                favoriteSongs: [],
                albumsSaved: []
            };
            
            users.push(newUser);
            
            this.setCurrentUser(newUser);
            return {
                success: true,
                message: 'Đăng ký thành công!',
                type: 'success',
                user: newUser
            };
        } catch (error) {
            console.error('Signup error:', error);
            return {
                success: false,
                message: 'Đã có lỗi xảy ra!',
                type: 'error'
            };
        }
    }
    
    // Authenticate user
    authenticateUser(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        return user || null;
    }
    
    // Set current user
    setCurrentUser(user) {
        const userToStore = { 
            ...user,
            lastLogin: new Date().toISOString()
        };
        delete userToStore.password; // Don't store password in current user
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        localStorage.setItem('isLoggedIn', 'true');
    }
    
    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }
    
    // Logout
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        return {
            success: true,
            message: 'Đã đăng xuất!',
            type: 'success'
        };
    }
    
    // Get default avatar
    getDefaultAvatar() {
        const avatars = [
            '/assets/img/default-avatar.png'
        ];
        return avatars[0];
    }
    
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true' && 
               localStorage.getItem('currentUser') !== null;
    }
    
    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }
}

// Export singleton instance
export default new Auth();