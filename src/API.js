import axios from 'axios';

const API_KEY = '39604118-589a8b2f0b53b6dbb79ce43b2';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (query, page) => {
  // const separated = query.split('/');
  // const exstractedQuery = separated[1];
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
