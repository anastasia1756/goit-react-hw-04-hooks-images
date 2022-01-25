import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "24345533-951d6b0bcd0a023b92b061ad5";

export const getImages = async (value, page) => {
  const response = await axios.get(
    `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const newImages = response.data.hits;
  return newImages;
};
