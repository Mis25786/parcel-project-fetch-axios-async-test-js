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

//! ================== модуль 10 запит на API ====================

// export default function fetchData(query) {
//   const URL = `https://pixabay.com/api/?key=35628652-5826d534b36a8e5c375c91e65&q=${query}`;

//   return fetch(URL).then(response => response.json());
// }

//! ================== модуль 10 пагінація ====================
const ENDPOIND = 'https://pixabay.com/api';
const KEY = '35628652-5826d534b36a8e5c375c91e65';
export default class ImageApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  getImg() {
    const URL = `${ENDPOIND}/?key=${KEY}&q=${this.searchQuery}&page=${this.page}&per_page=5`;

    return fetch(URL)
      .then(response => response.json())
      .then(({ hits }) => {
        this.nextPage();
        return hits;
      });
  }

  //додаємо сторінку
  nextPage() {
    this.page += 1;
  }
  // скидуємо на 1 сторінку при новому запиті
  resetPage() {
    this.page = 1;
  }
}

//! ================== модуль 11 async ====================
// import axios from 'axios';

// const ENDPOIND = 'https://pixabay.com/api';
// const KEY = '35628652-5826d534b36a8e5c375c91e65';
// export default class ImageApiService {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//   }

//   async getImg() {
//     const URL = `${ENDPOIND}/?key=${KEY}&q=${this.searchQuery}&page=${this.page}&per_page=5`;

//     const response = await axios.get(URL);
//     // console.log(response);
//     // console.log(response.data);
//     // console.log(response.data.hits);

//     // return axios.get(URL).then(({ data }) => {
//     //   this.nextPage();
//     //   return data.hits;
//     // })

//     this.nextPage();
//     return response.data.hits;
//   }

//   //додаємо сторінку
//   nextPage() {
//     this.page += 1;
//   }
//   // скидуємо на 1 сторінку при новому запиті
//   resetPage() {
//     this.page = 1;
//   }
// }
