import iziToast from "izitoast";
import { displayImages, showErrorToast, smoothScroll } from "./render-functions.js";

const loader = document.getElementById('loader');
const gallery = document.querySelector('.gallery');
let page = 1;
let loadMoreButton; // Змінна для збереження посилання на кнопку "Load more"

export async function handleFormSubmit(event, searchForm) {
    event.preventDefault();
    const searchInput = searchForm.querySelector('#search-form-input');
    const searchValue = searchInput.value.trim();
    if (searchValue === '') {
        iziToast.warning({
            title: 'Caution',
            message: 'The search field cannot be empty!',
        });
        return;
    }

    loader.style.display = 'block';
    gallery.innerHTML = ''; // Очистка галереї перед новим пошуком
    page = 1; // Скидання сторінки до першої при новому пошуку
    loadMoreButton = document.getElementById('load-more-button'); // Оновлення змінної при кожному натисканні кнопки
    await performSearch(searchValue);
}

export async function loadMoreImages() {
    loader.style.display = 'block';
    page++; // Збільшення номеру сторінки для нового запиту
    loadMoreButton = document.getElementById('load-more-button'); // Оновлення змінної при кожному натисканні кнопки
    const searchInput = document.getElementById('search-form-input');
    const searchValue = searchInput.value.trim();
    await performSearch(searchValue);
}

async function performSearch(searchValue) {
    const apiKey = '42176348-9192a588252a9fae2debe28a6';
    let apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.hits.length > 0) {
            displayImages(data.hits);
            if (data.hits.length < 15) {
                loadMoreButton.style.display = 'none'; // Приховуємо кнопку "Load more", якщо на сервері закінчилися картинки
            } else {
                loadMoreButton.style.display = 'block';
            }
            smoothScroll();
        } else {
            iziToast.info({
                title: 'Info',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topCenter',
            });
            loadMoreButton.style.display = 'none'; // Приховуємо кнопку "Load more", якщо на сервері немає зображень
        }
    } catch (error) {
        showErrorToast();
        console.error('Fetch error:', error);
    } finally {
        loader.style.display = 'none';
    }
}
