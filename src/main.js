import { handleFormSubmit, loadMoreImages } from "./js/pixaby-api.js";

const searchForm = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more-button');

searchForm.addEventListener('submit', (event) => handleFormSubmit(event, searchForm));
loadMoreButton.addEventListener('click', loadMoreImages);
