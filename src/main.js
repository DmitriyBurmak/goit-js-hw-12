import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const loadingMessage = document.querySelector('.loading-message');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Затримка
function delay(ms) {
  console.log('⏳ delaying...');
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLoadingMessage() {
  loadingMessage.classList.remove('hidden');
  loadingMessage.classList.add('visible');
}

function hideLoadingMessage() {
  loadingMessage.classList.remove('visible');
  loadingMessage.classList.add('hidden');
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  hideLoadMoreButton();
  clearGallery();
  showLoader();
  showLoadingMessage();

  await delay(1000);

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images found. Please try a different search.',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits, totalHits);
      const loadedImages = document.querySelectorAll('.gallery-item').length;

      if (loadedImages < totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    hideLoadingMessage();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();
  showLoadingMessage();

  await delay(1000);

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits, totalHits);

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const loadedImages = document.querySelectorAll('.gallery-item').length;

    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    hideLoadingMessage();
  }
});
