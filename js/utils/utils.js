export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function initToggleMore(containerSelector = '.song-item__song-list', itemSelector = '.song-item-wrapper', initialCount = 5) {
    const seeMoreBtn = document.querySelector('.see-more');
    
    if (!seeMoreBtn) return;
    
    seeMoreBtn.addEventListener('click', function() {
        const isExpanded = this.dataset.expanded === 'true';
        const allItems = document.querySelectorAll(itemSelector);
        
        if (isExpanded) {
            // Thu gọn - chỉ hiển thị số lượng ban đầu
            allItems.forEach((item, index) => {
                if (index >= initialCount) {
                    item.classList.add('hidden');
                }
            });
            this.dataset.expanded = 'false';
            this.querySelector('.see-more-text').textContent = 'Xem thêm';
            this.querySelector('.material-icons-round').style.transform = 'rotate(0deg)';
        } else {
            // Mở rộng - hiển thị tất cả
            allItems.forEach(item => {
                item.classList.remove('hidden');
            });
            this.dataset.expanded = 'true';
            this.querySelector('.see-more-text').textContent = 'Thu gọn';
            this.querySelector('.material-icons-round').style.transform = 'rotate(180deg)';
        }
    });
}