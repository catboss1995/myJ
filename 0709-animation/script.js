const images = [
    './1.jpg',
    './2.jpg',
    './3.jpg',
    './4.jpg',
    './5.jpg',
    './1.jpg',
    './2.jpg',
    './3.jpg',
    './4.jpg',
    './5.jpg',
    './1.jpg',
    './2.jpg',
    './3.jpg',
    './4.jpg',
    './5.jpg',
];

const itemsEl = document.querySelector('.items');
let current = 0;
const max = images.length - 1;

// 建立卡片
function render() {
    images.forEach((src, i) => {
        const li = document.createElement('li');
        li.className = 'item';
        const img = document.createElement('img');
        img.src = src;
        li.appendChild(img);
        itemsEl.appendChild(li);
    });
    update();
}

// 每張卡片根據與 current 的距離計算樣式
function update() {
    const items = itemsEl.children;
    for (let i = 0; i < items.length; i++) {
        const dist = i - current; // 距離
        // 計算 Z 軸深度
        const z = dist * -1000;
        // 計算縮放
        const scale = 1 - Math.abs(dist) * 0.15;
        // 計算透明度
        const opacity = Math.max(1 - Math.abs(dist) * 0.25, 0);
        // 計算模糊
        const blur = Math.abs(dist) * 5;

        items[i].style.transform = `
            translateZ(${z}px)
            scale(${scale})
        `;
        items[i].style.opacity = opacity;
        items[i].style.filter = `blur(${blur}px)`;
        items[i].style.zIndex = 100 - Math.abs(dist); // 讓中間的在上面
        items[i].style.pointerEvents = dist === 0 ? 'auto' : 'none'; // 只讓主卡可互動
    }
}

// 滾動事件
function onWheel(e) {
    if (e.deltaY > 0 && current < max) {
        current++;
        update();
    } else if (e.deltaY < 0 && current > 0) {
        current--;
        update();
    }
}

window.onload = () => {
    render();
    document.querySelector('.wrap').classList.remove('hidden');
    window.addEventListener('wheel', onWheel, { passive: false });
};
