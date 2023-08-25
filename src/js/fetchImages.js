import axios from 'axios';

const api = 'https://pixabay.com/api/';
const apiKey = '39010846-94b79845e5a284c0e487aa25e';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = 'true';

export const fetchImages = async (page, perPage, userRequest) => {
  return await axios.get(
    `${api}?key=${apiKey}&q=${userRequest}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&per_page=${perPage}&page=${page}`
  );
};
