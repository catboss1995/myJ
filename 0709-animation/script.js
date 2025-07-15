const cards = [
    { type: 'img', src: './1.jpg', alt: '第一張圖說明文字' },
    { type: 'text', text: '這裡是SEO重要說明或口號、敘述、介紹內容' },
    { type: 'img', src: './2.jpg', alt: '第二張圖說明文字' },
    { type: 'text', text: '關鍵字、品牌Slogan、產品特色' },
    { type: 'img', src: './3.jpg', alt: '第三張圖說明文字' },
    { type: 'text', text: '關鍵字、品牌Slogan、產品特色' },
    { type: 'img', src: './4.jpg', alt: '第四張圖說明文字' },
    { type: 'text', text: '關鍵字、品牌Slogan、產品特色' },
    { type: 'img', src: './5.jpg', alt: '第五張圖說明文字' },
];
/* 圖片記得加上 alt 有助於 SEO 與無障礙 */

const itemsEl = document.querySelector('.items');
let current = 0;
const max = cards.length - 1;

// 建立卡片
function render() {
    cards.forEach((card, i) => {
        const li = document.createElement('li');
        li.className = 'item';
        if(card.type === 'img'){
            const img = document.createElement('img');
            img.src = card.src;
            img.alt = card.alt || '';
            li.appendChild(img);
        }else if(card.type === 'text'){
            const p = document.createElement('p');
            p.textContent = card.text;
            p.className = 'card-text';
            li.appendChild(p);
        }
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

        // 左右交錯(三角函數 讓 X 隨 index 產生彎曲感)
        const x = dist * 120; // 每張相差120px
        const y = ((i % 2 === 0) ? 1 : -1) * Math.abs(dist) * 60; // 上下

        items[i].style.transform = `
            translateX(${x}px)
            translateY(${y}px)
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
