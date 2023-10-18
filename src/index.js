import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectElement = document.querySelector('.breed-select');
const loaderElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

function createOptionElement(breed) {
  const optionElement = document.createElement('option');
  optionElement.value = breed.id;
  optionElement.textContent = breed.name;
  return optionElement;
}

function showCatInfo(cat) {
  catInfoElement.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <img src="${cat.url}" alt="${cat.breeds[0].name}">
    <p>${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
  `;
}

selectElement.addEventListener('change', (event) => {
  loaderElement.classList.remove('hidden');
  catInfoElement.classList.add('hidden');

  fetchCatByBreed(event.target.value)
    .then(cat => {
      showCatInfo(cat);
      loaderElement.classList.add('hidden');
      catInfoElement.classList.remove('hidden');
    })
    .catch(() => {
      errorElement.classList.remove('hidden');
      loaderElement.classList.add('hidden');
    });
});

let select = new SlimSelect({
    select: '.breed-select'
  });
  
  fetchBreeds()
    .then(breeds => {
      let options = breeds.map(breed => ({text: breed.name, value: breed.id}));
      select.setData(options);
      loaderElement.classList.add('hidden');
      selectElement.classList.remove('hidden');
    })
    .catch(() => {
      errorElement.classList.remove('hidden');
      loaderElement.classList.add('hidden');
    });
  
