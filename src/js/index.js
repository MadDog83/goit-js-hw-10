import { fetchBreeds, fetchCatByBreed } from './cats-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelector = document.querySelector('.breed-select');
const loadingIndicator = document.querySelector('.loader');
const catDetails = document.querySelector('.cat-info');
const error = document.querySelector('.error');

error.classList.add('is-hidden');

function updateBreedList(breeds) {
  breedSelector.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('\n');
}

function handleBreedChange(evt) {
  const selectedBreedId = evt.currentTarget.value;
  catDetails.classList.add('is-hidden');
  loadingIndicator.classList.remove('is-hidden');

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      const { breeds, url } = data[0];
      const { name, temperament, description } = breeds[0];

      catDetails.innerHTML = `
        <img src="${url}" alt="${name}" width=500>
        <div class ="back-color">
          <h2 class="title">${name}</h2>
          <p class="text">${description}</p>
          <p class="text span-text"><span class="span">Temperament:</span> ${temperament}</p>
        </div>`;
      
      catDetails.classList.remove('is-hidden');
    })
    .catch(() => {
      error.classList.remove('is-hidden');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', { timeout: 2000, userIcon: false });
    })
    .finally(() => loadingIndicator.classList.add('is-hidden'));
}

function initialize() {
  loadingIndicator.classList.remove('is-hidden');

  fetchBreeds()
    .then(updateBreedList)
    .then(() => new SlimSelect({ select: breedSelector }))
    .catch(() => {
      error.classList.remove('is-hidden');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', { timeout: 4000, userIcon: false });
    })
    .finally(() => loadingIndicator.classList.add('is-hidden'));

  breedSelector.addEventListener('change', handleBreedChange);
}

initialize();