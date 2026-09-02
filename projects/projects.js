let currentFolder = '';
let currentImages = [];
let currentImageIndex = 0;

const galleryModal = document.getElementById('galleryModal');
const detailModal = document.getElementById('detailModal');
const viewCollectionBtn = document.getElementById('viewCollectionBtn');
const gallerySection = document.getElementById('gallerySection');
const featuredPoster = document.querySelector('.featured-poster');
const featuredVideo = document.getElementById('featuredVideo');
const replayBtn = document.querySelector('.replay-btn');
const maximizeBtn = document.querySelector('.maximize-btn');

document.querySelectorAll('img').forEach((img) => {
  img.loading = 'lazy';
  img.decoding = 'async';
  img.fetchPriority = 'low';
});

if (featuredVideo) {
  featuredVideo.preload = 'metadata';
}

if (viewCollectionBtn && gallerySection) {
  viewCollectionBtn.addEventListener('click', () => {
    gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (featuredVideo && featuredPoster) {
  featuredVideo.addEventListener('ended', () => {
    featuredPoster.classList.add('ended');
  });

  featuredVideo.addEventListener('play', () => {
    featuredPoster.classList.remove('ended');
  });

  replayBtn?.addEventListener('click', () => {
    featuredVideo.currentTime = 0;
    featuredVideo.play();
    featuredPoster.classList.remove('ended');
  });

  maximizeBtn?.addEventListener('click', () => {
    const isMaximized = featuredPoster.classList.toggle('maximized');
    maximizeBtn.textContent = isMaximized ? '−' : '⤢';
    maximizeBtn.setAttribute('aria-label', isMaximized ? 'Minimize video' : 'Maximize video');
    if (isMaximized) {
      featuredPoster.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function openGallery(folderName, imageArray) {
  currentFolder = folderName;
  currentImages = imageArray;

  const title = document.getElementById('modalTitle');
  const container = document.getElementById('modalImages');

  title.innerText = folderName.toUpperCase();
  container.innerHTML = '';

  imageArray.forEach((imgName, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = `../assets/images/${folderName}/${imgName}`;
    imgElement.alt = imgName;
    imgElement.onclick = () => openDetail(index);
    container.appendChild(imgElement);
  });

  closeDetail();
  galleryModal.style.display = 'flex';
}

function closeGallery() {
  galleryModal.style.display = 'none';
}

/* Detail Zoom Functions */
function openDetail(index) {
  currentImageIndex = index;
  updateDetailView();
  detailModal.style.display = 'flex';
}

function closeDetail() {
  detailModal.style.display = 'none';
}

function changeDetailImage(step) {
  currentImageIndex += step;
  if (currentImageIndex < 0) {
    currentImageIndex = currentImages.length - 1;
  } else if (currentImageIndex >= currentImages.length) {
    currentImageIndex = 0;
  }
  updateDetailView();
}

function updateDetailView() {
  const detailImg = document.getElementById('detailImage');
  const caption = document.getElementById('detailCaption');
  const imageName = currentImages[currentImageIndex];

  detailImg.src = `../assets/images/${currentFolder}/${imageName}`;
  caption.innerText = `${currentFolder} — [${currentImageIndex + 1}/${currentImages.length}]`;
}

galleryModal.addEventListener('click', (event) => {
  if (event.target === galleryModal) {
    closeGallery();
  }
});

detailModal.addEventListener('click', (event) => {
  if (event.target === detailModal) {
    closeDetail();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDetail();
    closeGallery();
  }
});