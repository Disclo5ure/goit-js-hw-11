import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const api = 'https://pixabay.com/api/';
const apiKey = 'key=39010846-94b79845e5a284c0e487aa25e';
let userRequest = 'q=';
const imageType = 'image_type=photo';
const orientation = 'orientation=horizontal';
const safeSearch = 'safesearch=true';
const perPage = 'per_page=200'

const form = document.getElementById('search-form');
const button = document.querySelector('.button');
const gallery = document.getElementById('gallery');

const fetchImages = async () => {
  return await axios.get(
    `${api}?${apiKey}&${apiKey}&${userRequest}&${imageType}&${orientation}&${safeSearch}&${perPage}`
  );
};

const templateCards = (items) => {
  items.forEach(item => {
    gallery.innerHTML += `<div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
      </p>
      <p class="info-item">
        <b>Views</b>
      </p>
      <p class="info-item">
        <b>Comments</b>
      </p>
      <p class="info-item">
        <b>Downloads</b>
      </p>
    </div>
  </div>`
  })
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  userRequest += searchQuery.value;
  const response = await fetchImages();
  if (response.data.total === 0)
    return Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  console.log(response)
});
