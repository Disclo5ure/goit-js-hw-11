import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const api = 'https://pixabay.com/api/';
const apiKey = 'key=39010846-94b79845e5a284c0e487aa25e';
let userRequest = 'q=';
const imageType = 'image_type=photo';
const orientation = 'orientation=horizontal';
const safeSearch = 'safesearch=true';

const form = document.getElementById('search-form');
const button = document.querySelector('.button');
const gallery = document.getElementById('gallery');

const fetchImages = async () => {
  return await axios.get(
    `${api}?${apiKey}&${apiKey}&${userRequest}&${imageType}&${orientation}&${safeSearch}`
  );
};

// const templateCard

form.addEventListener('submit', async e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  userRequest += searchQuery.value;
  const response = await fetchImages();
  if (response.data.total === 0)
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  else console.log(response);
});
