
import axios from "axios";


axios.defaults.headers.common["x-api-key"] = "live_Xv6PI3iLZUZ4pw7opRL1xePIFKo7Q4OkdfELLxbOAzMn5octTXCBJombMv1JP6l7";


axios.defaults.baseURL = "https://api.thecatapi.com/v1";

// Функція для отримання масиву порід
function fetchBreeds() {
  // Виконуємо GET-запит на ресурс /breeds
  return axios.get("/breeds")
    .then(response => {
      if (response.status !==200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      // Повертаємо масив порід з відповіді
      return response.data;
    })
}

// Функція для отримання даних про кота за ідентифікатором породи
function fetchCatByBreed(breedId) {
  // Виконуємо GET-запит на ресурс /images/search з параметром breed_ids
  return axios.get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      // Повертаємо дані про кота з відповіді
      return response.data;
    })
}

// Експортуємо функції fetchBreeds і fetchCatByBreed
module.exports = { fetchBreeds, fetchCatByBreed };
