import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';

let lightbox;

export function createGallery(images, totalHits) {
  const galleryContainer = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
            <div class="info">
              <p class="info-item"><b>Likes:</b> ${likes}</p>
              <p class="info-item"><b>Views:</b> ${views}</p>
              <p class="info-item"><b>Comments:</b> ${comments}</p>
              <p class="info-item"><b>Downloads:</b> ${downloads}</p>
            </div>
          </a>
        </li>`;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }

  const loadedImages = document.querySelectorAll('.gallery-item').length;
}

export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  document
    .querySelector('.load-more-wrapper .loader')
    .classList.remove('hidden');
}

export function hideLoader() {
  document.querySelector('.load-more-wrapper .loader').classList.add('hidden');
}

export function showLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  btn.classList.remove('hidden');
  btn.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  btn.classList.remove('is-visible');
  btn.classList.add('hidden');
}
