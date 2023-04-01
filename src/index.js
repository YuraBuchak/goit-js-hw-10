import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 1000;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(event => handleSerchCountry(event), DEBOUNCE_DELAY)
);

// обробник пошуку та рендер розмітки
const handleSerchCountry = event => {
  const valueInput = event.target.value.trim();

  if (valueInput === '') {
    console.log('Write anything!');

    listEl.innerHTML = '';
    divEl.innerHTML = '';
    return;
  }

  fetchCountries(valueInput)
    .then(arrays => {
      if (arrays.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        listEl.innerHTML = '';
        divEl.innerHTML = '';
      } else if (arrays.length > 1 && arrays.length <= 10) {
        const markUpListCountry = arrays
          .map(
            array =>
              `<li><img src="${array.flags.png}" width="20" height="20"> <span style="font-size: 22px; font-weight: bold;">${array.name.common}</span></li>`
          )
          .join('');
        divEl.innerHTML = '';
        listEl.innerHTML = markUpListCountry;
      } else if (arrays.length === 1) {
        const markUpInfoCountry = arrays
          .map(
            array => `<ul style="list-style: none;">
        <h1><img src="${array.flags.png}" width="25" height="25"> <span>${
              array.name.common
            }</span></h1>
        <li><span style="font-weight: bold;">Capital: </span>${
          array.capital
        }</li>
        <li><span style="font-weight: bold;">Languages: </span>${Object.values(
          array.languages
        )}</li>
        <li><span style="font-weight: bold;">Population: </span>${
          array.population
        }</li>
        </ul>`
          )
          .join('');
        listEl.innerHTML = '';
        divEl.innerHTML = markUpInfoCountry;
      }
    })
    .catch(Error => {
      listEl.innerHTML = '';
      divEl.innerHTML = '';
      console.warn(Error);
    });
};

listEl.style.listStyle = 'none';
