function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.animation = 'none';
    });

    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
    selectedTab.style.animation = '';

    const selectedLink = document.querySelector(`nav a[onclick="openTab('${tabId}')"]`);
    selectedLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    openTab('experience');
});

let currentImageIndex = 0;
let currentProjectImages = [];

function openImage(src) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImage.src = src;

    const projectImages = document.querySelectorAll(`.scroll-container img[src="${src}"]`);
    currentProjectImages = Array.from(projectImages[0].parentElement.querySelectorAll('img')).map(img => img.src);
    currentImageIndex = currentProjectImages.indexOf(src);
}

function closeImage() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

function changeImage(n) {
    currentImageIndex += n;
    if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    }
    if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    }
    document.getElementById('modal-image').src = currentProjectImages[currentImageIndex];
}
