import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

const api = 'https://pixabay.com/api/';
const apiKey = '39010846-94b79845e5a284c0e487aa25e';
let userRequest = '';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = 'true';
const perPage = 40;
let page = 1;

const body = document.getElementsByTagName('body')[0];
const form = document.getElementById('search-form');
const loadMore = document.querySelector('.load-more');
const gallery = document.getElementById('gallery');

const fetchImages = async () => {
  return await axios.get(
    `${api}?key=${apiKey}&q=${userRequest}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}`
  );
};

const templateCards = items => {
  items.forEach(item => {
    gallery.innerHTML += `<div class="photo-card">
    <img src="${item.largeImageURL}" alt="${item.tags}" loading="lazy" class="card-img"/>
    <div class="info">
      <p class="info-item">
        <b class="info-header">Likes</b>
        <span class="info-text">${item.likes}</span>
      </p>
      <p class="info-item">
        <b class="info-header">Views</b>
        <span class="info-text">${item.views}</span>
      </p>
      <p class="info-item">
        <b class="info-header">Comments</b>
        <span class="info-text">${item.comments}</span>
      </p>
      <p class="info-item">
        <b class="info-header">Downloads</b>
        <span class="info-text">${item.downloads}</span>
      </p>
    </div>
  </div>`;
  });
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  userRequest = '';
  gallery.innerHTML = '';
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  userRequest = searchQuery.value;
  const response = await fetchImages();
  if (response.data.total === 0)
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
  templateCards(response.data.hits);
  if (response.data.totalHits > perPage) loadMore.removeAttribute('hidden');
  let lightbox = new SimpleLightbox('#gallery .photo-card');
  console.log(lightbox);
});

loadMore.addEventListener('click', async () => {
  page++;
  const response = await fetchImages();
  templateCards(response.data.hits);
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
