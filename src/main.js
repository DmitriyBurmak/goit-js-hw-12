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

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

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
  loadingMessage.classList.remove('hidden');
  loadingMessage.classList.add('visible');
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      createGallery(data.hits, totalHits);

      const loadedImages = document.querySelectorAll('.gallery-item').length;
      if (loadedImages < totalHits) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    loadingMessage.classList.remove('visible');
    loadingMessage.classList.add('hidden');
  }
});

const loadingMessage = document.querySelector('.loading-message');

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  loadMoreBtn.classList.add('hidden');
  loadingMessage.classList.remove('hidden');
  loadingMessage.classList.add('visible');
  showLoader();

  setTimeout(async () => {
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
        }
      }
    } catch (error) {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    } finally {
      hideLoader();

      loadingMessage.classList.remove('visible');
      loadingMessage.classList.add('hidden');
    }
  }, 2000);
});
