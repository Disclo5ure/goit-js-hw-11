import axios from 'axios';

const api = 'https://pixabay.com/api/';
const apiKey = '39010846-94b79845e5a284c0e487aa25e';
let userRequest = '';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = 'true';
const perPage = 40;
let page = 1;

export const fetchImages = async () => {
  return await axios.get(
    `${api}?key=${apiKey}&q=${userRequest}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}`
  );
};
