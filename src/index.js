import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/fetchImages';
import { templateCards } from './js/templateCards';

const body = document.getElementsByTagName('body')[0];
const form = document.getElementById('search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.getElementById('gallery');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  if (!searchQuery.value.replace(/\W+/g, '')) return;
  loadMore.setAttribute('hidden', '');
  page = 1;
  userRequest = '';
  gallery.innerHTML = '';
  userRequest = searchQuery.value;
  const response = await fetchImages();
  if (response.data.totalHits === 0)
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  templateCards(response.data.hits, gallery);
  if (response.data.totalHits > perPage) loadMore.removeAttribute('hidden');
  let lightbox = new SimpleLightbox('#gallery .photo-card');
});

loadMore.addEventListener('click', async () => {
  page++;
  const response = await fetchImages();
  templateCards(response.data.hits, gallery);
  const { height: cardHeight } = document
    .querySelector('#gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  if (response.data.hits.length < perPage) {
    loadMore.setAttribute('hidden', '');
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
});
