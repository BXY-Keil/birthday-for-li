// script.js
let currentPage = 0;
const pages = document.querySelectorAll('.page');

function updatePage() {
    pages.forEach((page, index) => {
        const content = page.querySelector('.content');
        
        if (index === currentPage) {
            // 当前页动画
            page.style.transform = 'translateX(0)';
            page.style.zIndex = '1';
            content.classList.add('animate-in');
            
            // 背景模糊清除
            setTimeout(() => {
                page.classList.add('active');
            }, 300);
        } else {
            // 其他页重置动画
            page.style.transform = index < currentPage ? 'translateX(-100%)' : 'translateX(100%)';
            page.style.zIndex = '0';
            content.classList.remove('animate-in');
            page.classList.remove('active');
        }
    });
}

// 增加触摸滑动支持（手机端）
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    
    if (Math.abs(deltaX) > 50) { // 滑动距离阈值
        if (deltaX > 0 && currentPage > 0) {
            currentPage--;
        } else if (deltaX < 0 && currentPage < pages.length - 1) {
            currentPage++;
        }
        updatePage();
    }
});

// 保持原有按钮事件
document.getElementById('prev-btn').addEventListener('click', () => { /*...*/ });
document.getElementById('next-btn').addEventListener('click', () => { /*...*/ });