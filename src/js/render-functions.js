import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function displayImages(images) {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML += images.map(image => `
        <li class="gallery-item">
            <a href="${image.largeImageURL}" data-lightbox="gallery">
                <img src="${image.webformatURL}" alt="${image.tags}" class="image-card-image">
                <div class="image-card-details">
                    <span class="image-card-likes"><span class="bold">Likes:</span><br>${image.likes}</span>
                    <span class="image-card-views"><span class="bold">Views:</span><br>${image.views}</span>
                    <span class="image-card-comments"><span class="bold">Comments:</span><br>${image.comments}</span>
                    <span class="image-card-downloads"><span class="bold">Downloads:</span><br>${image.downloads}</span>
                </div>
            </a>
        </li>
    `).join('');

    initLightbox();

    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.style.display = 'block'; // Показуємо кнопку "Load more" після завантаження галереї
}

function initLightbox() {
    const options = {
        captions: true,
        captionType: 'attr',
        captionsData: 'alt',
        captionDelay: 250,
        overlay: true,
        overlayOpacity: 0.8,
    };

    const lightbox = new SimpleLightbox('.gallery a', options);
}

export function showErrorToast() {
    iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again later.',
        position: 'topCenter',
    });
}

export function smoothScroll() {
    const galleryItemHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    window.scrollBy({
        top: galleryItemHeight * 2, // Прокрутити на висоту двох карточок
        behavior: 'smooth' // Плавна анімація
    });
}
