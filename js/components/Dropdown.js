import Toast from "./Toast.js";

function dropdownItem(action, icon, text) {
    const attrString = Object.entries({ action })
        .map(([key, value]) => `data-${key}="${value}"`)
        .join(' ');
    
    return `
        <div class="dropdown-item" ${attrString}>
            <span class="material-icons-round">${icon}</span>
            <span>${text}</span>
        </div>
    `;
}

function handleDropdownAction(action) {
    switch (action) {
        case 'download':
            Toast.info('Tính năng tải về đang được phát triển');
            break;
        case 'add-to-playlist':
            Toast.info('Tính năng thêm vào playlist đang được phát triển');
            break;
        case 'share':
            Toast.info('Tính năng chia sẻ đang được phát triển');
            break;
        case 'report':
            Toast.warning('Tính năng báo cáo đang được phát triển');
            break;
    }
}

export default function Dropdown(dropdownGroups) {
    // Hỗ trợ cả mảng phẳng (backward compatible) và mảng 2 chiều
    const groups = Array.isArray(dropdownGroups[0]) ? dropdownGroups : [dropdownGroups];
    
    const groupsHTML = groups.map((group, groupIndex) => {
        const itemsHTML = group.map(item => 
            dropdownItem(item.action, item.icon, item.text)
        ).join('');
        
        // Thêm divider sau mỗi nhóm trừ nhóm cuối
        const divider = groupIndex < groups.length - 1 ? '<div class="dropdown-divider"></div>' : '';
        
        return itemsHTML + divider;
    }).join('');
    
    return `
        <section class="dropdown">
            ${groupsHTML}
        </section>
    `;
}

// Export để có thể dùng ở bên ngoài
export function toggleDropdown($toggleElement) {
    const $dropdown = $toggleElement.siblings('.dropdown');
    $('.dropdown').not($dropdown).removeClass('active'); // Đóng các dropdown khác
    $dropdown.toggleClass('active');
}

export function initDropdownEvents() {
    // Click vào dropdown item
    $(document).on('click', '.dropdown-item', function (e) {
        e.stopPropagation();
        const action = $(this).data('action');

        // Đóng tất cả dropdown
        $('.dropdown').removeClass('active');

        // Xử lý action
        handleDropdownAction(action);
    });

    // Click outside để đóng dropdown
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropdown-toggle, .dropdown').length) {
            $('.dropdown').removeClass('active');
        }
    });
}