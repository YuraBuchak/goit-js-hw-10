import Notiflix from 'notiflix';
// функція пошуку країни за назвою
export const fetchCountries = sityName => {
  return fetch(
    `https://restcountries.com/v3.1/name/${sityName}?fields=name,capital,population,languages,flags`
  ).then(data => {
    // console.log(data);

    if (data.status === 404) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }

    return data.json();
  });
};
