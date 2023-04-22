// const URL =
//   'https://pixabay.com/api/?key=35628652-5826d534b36a8e5c375c91e65&q=cat';

//   per_page: 12,
//   page: 1,
//   webformatURL,
//   largeImageURL,

// const options = {
//   params: {
//     q: val,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: 12,
//     page: page,
//   },
// };

// fetch(URL, options)
//   .then(response => response.json())
//   .then(({ hits }) => console.log(hits));

// fetch(URL).then(response => console.log(response));

// fetch(URL)
//   .then(response => response.json())
//   .then(data => console.log(data));

// fetch(URL)
//   .then(response => response.json())
//   .then(({ hits }) => console.log(hits));

export default function fetchData(query) {
  const URL = `https://pixabay.com/api/?key=35628652-5826d534b36a8e5c375c91e65&q=${query}`;

  return fetch(URL).then(response => response.json());
}
