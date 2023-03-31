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
        // console.log('Too many matches found. Please enter a more specific name.');
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        listEl.innerHTML = '';
        divEl.innerHTML = '';
        return;
      }

      if ((arrays.length > 1) & (arrays.length <= 10)) {
        fetchCountries(valueInput).then(arrayOfObjs => {
          const markUpListCountry = arrayOfObjs
            .map(
              array =>
                `<li><img src="${array.flags.png}" width="20" height="20"> <span style="font-size: 22px; font-weight: bold;">${array.name.common}</span></li>`
            )
            .join('');
          divEl.innerHTML = '';
          listEl.innerHTML = markUpListCountry;
        });
        return;
      }

      if (arrays.length === 1) {
        fetchCountries(valueInput).then(arrays => {
          const { flags, languages, name, population, capital } = arrays[0];

          listEl.innerHTML = '';
          divEl.innerHTML = `<ul style="list-style: none;">
        <h1><img src="${flags.png}" width="25" height="25"> <span>${
            name.common
          }</span></h1>
        <li><span style="font-weight: bold;">Capital: </span>${capital}</li>
        <li><span style="font-weight: bold;">Languages: </span>${Object.values(
          languages
        )}</li>
        <li><span style="font-weight: bold;">Population: </span>${population}</li>
        </ul>`;
        });
        return;
      }
    })
    .catch(Error => {
      listEl.innerHTML = '';
      divEl.innerHTML = '';
      console.warn(Error);
    });
};

listEl.style.listStyle = 'none';
