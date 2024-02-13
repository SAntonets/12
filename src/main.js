// main.js

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

document.getElementById('search-form').addEventListener('submit', handleFormSubmit);
document.getElementById('loader').style.display = 'none';

function handleFormSubmit(event) {
    event.preventDefault();
    let searchValue = document.getElementById('search-form-input').value.trim();
    let loader = document.getElementById('loader');

    if (searchValue === '') {
        iziToast.warning({
            title: 'Caution',
            message: 'The search field cannot be empty!',
        });
        return;
    }

       loader.style.display = 'block';

    performSearch(searchValue);
}

function performSearch(searchValue) {
    const apiKey = '42176348-9192a588252a9fae2debe28a6';
    let apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';


            if (data.hits.length > 0) {
                displayImages(data.hits);
            } else {
                iziToast.info({
                    title: 'Info',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topCenter',
                });
            }
        })
        .catch(error => {
document.getElementById('loader').style.display = 'none';


            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topCenter',
            });
            console.error('Fetch error:', error);
        });
}

function displayImages(images) {
    const galleryContainer = document.querySelector('ul.gallery');
    galleryContainer.innerHTML = images.map(image => `
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

    const gallery = new SimpleLightbox('.gallery a', options);
}
