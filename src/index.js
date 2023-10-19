// Імпортуємо функції з cat-api.js
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
// Отримуємо елементи інтерфейсу
const select = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

// Створюємо екземпляр SlimSelect для селекту
const slimSelect = new SlimSelect({
  select,
  placeholder: "Обери породу кота",
  onChange: (option) => {
    // Коли користувач обирає опцію, запускаємо функцію showCatInfo з ідентифікатором породи
    showCatInfo(option.value);
  },
});

// Функція для показу інформації про кота за ідентифікатором породи
function showCatInfo(breedId) {
  // Приховуємо блок catInfo та показуємо завантажувач loader
  catInfo.classList.add("is-hidden");
  loader.classList.remove("is-hidden");

  // Викликаємо функцію fetchCatByBreed з ідентифікатором породи та чекаємо результату проміса
  fetchCatByBreed(breedId)
    .then((data) => {
      // Якщо проміс виконався успішно, створюємо розмітку з даними про кота
      const markup = `
        <img src="${data.url}" alt="${data.breeds[0].name}" width="300" />
        <h2>${data.breeds[0].name}</h2>
        <p>${data.breeds[0].description}</p>
        <p><b>Темперамент:</b> ${data.breeds[0].temperament}</p>
      `;
      // Вставляємо розмітку в блок catInfo
      catInfo.innerHTML = markup;
      // Приховуємо завантажувач loader та показуємо блок catInfo
      loader.classList.add("is-hidden");
      catInfo.classList.remove("is-hidden");
    })
    .catch((error) => {
      // Якщо проміс було відхилено, показуємо повідомлення про помилку за допомогою Notiflix
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
      // Приховуємо завантажувач loader
      loader.classList.add("is-hidden");
    });
}

// Функція для наповнення селекту опціями з масиву порід
function fillSelect(breeds) {
  // Створюємо масив об'єктів з властивостями text і value для кожної породи
  const options = breeds.map((breed) => ({
    text: breed.name,
    value: breed.id,
  }));
  // Викликаємо метод setData екземпляра SlimSelect з масивом опцій
  slimSelect.setData(options);
}

// При завантаженні сторінки запускаємо функцію fetchBreeds та чекаємо результату проміса
fetchBreeds()
  .then((data) => {
    // Якщо проміс виконався успішно, запускаємо функцію fillSelect з масивом порід
    fillSelect(data);
    // Приховуємо завантажувач loader та показуємо селект select
    loader.classList.add("is-hidden");
    select.classList.remove("is-hidden");
  })
  .catch((error) => {
    // Якщо проміс було відхилено, показуємо повідомлення про помилку за допомогою Notiflix
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    // Приховуємо завантажувач loader
    loader.classList.add("is-hidden");
  });
