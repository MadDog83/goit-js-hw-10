// Імпортуємо axios для виконання HTTP-запитів
import axios from "axios";

// Встановлюємо заголовок x-api-key для всіх запитів
axios.defaults.headers.common["x-api-key"] = "live_Xv6PI3iLZUZ4pw7opRL1xePIFKo7Q4OkdfELLxbOAzMn5octTXCBJombMv1JP6l7";

// Функція для отримання масиву порід
export function fetchBreeds() {
  // Виконуємо GET-запит на ресурс https://api.thecatapi.com/v1/breeds
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      // Повертаємо масив порід з відповіді
      return response.data;
    })
    .catch(error => {
      // Повертаємо помилку у разі відхилення проміса
      return error;
    });
}

// Функція для отримання даних про кота за ідентифікатором породи
export function fetchCatByBreed(breedId) {
  // Виконуємо GET-запит на ресурс https://api.thecatapi.com/v1/images/search з параметром breed_ids
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      // Повертаємо дані про кота з відповіді
      return response.data[0];
    })
    .catch(error => {
      // Повертаємо помилку у разі відхилення проміса
      return error;
    });
}
