const Toast = {
    // Lazy initialization của notifications container
    getNotificationContainer() {
        if (!this._notifications) {
            this._notifications = document.querySelector('.toast-notification');
            if (!this._notifications) {
                console.warn('Toast container not found');
            }
        }
        return this._notifications;
    },

    // Tạo và hiển thị toast
    show(type, text) {
        const notifications = this.getNotificationContainer();
        if (!notifications) return;

        const newToast = document.createElement('div');
        const config = this.getToastConfig(type);

        newToast.innerHTML = `
            <div class="toast ${type}">
                <span class="material-icons-round">
                    ${config.icon}
                </span>
                <div class="content">
                    <div class="title">${config.title}</div>
                    <span>${text}</span>
                </div>
                <span class="material-icons-round close-icon" onclick="(this.parentElement).remove()">
                    close
                </span>
            </div>`;
        
        notifications.appendChild(newToast);
        newToast.timeOut = setTimeout(() => newToast.remove(), 3000);
    },

    // Lấy config cho từng loại toast
    getToastConfig(type) {
        const configs = {
            success: { title: 'Thành công', icon: 'check_circle' },
            error: { title: 'Lỗi', icon: 'error' },
            warning: { title: 'Cảnh báo', icon: 'warning' },
            info: { title: 'Thông báo', icon: 'notifications' }
        };
        return configs[type] || configs.info;
    },

    // Shorthand methods
    success(text) { this.show('success', text); },
    error(text) { this.show('error', text); },
    warning(text) { this.show('warning', text); },
    info(text) { this.show('info', text); }
};

export default Toast;