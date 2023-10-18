// cat-api.js
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Xv6PI3iLZUZ4pw7opRL1xePIFKo7Q4OkdfELLxbOAzMn5octTXCBJombMv1JP6l7";

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => console.error(error));
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => console.error(error));
}
