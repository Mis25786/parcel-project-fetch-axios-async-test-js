//! ================== модуль 10 запит на API ====================

// import fetchData from './api';

// const form = document.getElementById('form');
// const newsImg = document.getElementById('newsImg');

// form.addEventListener('submit', onsubmit);

// function onsubmit(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const value = form.elements.photo.value.trim();

//   fetchData(value)
//     .then(({ hits }) => {
//       if (hits.length === 0) throw new Error('No data');
//       return hits.reduce((acc, hit) => createMarcup(hit) + acc, '');
//     })
//     .then(updateImageList)
//     .catch(onError)
//     .finally(() => form.reset());
// }

// function updateImageList(markup) {
//   newsImg.innerHTML = markup;
// }

// function createMarcup({ webformatURL, tags, id }) {
//   return `<div class='thumb'>
//   <h1>${id}</h1>
//   <h4>${tags}</h4>
//       <img src=${webformatURL} alt=${tags} width="240" class="image"/>
//     </div>`;
// }

// function onError(err) {
//   updateImageList('<h1>Not faund</h1>');
// }

//! ================== модуль 10 пагінація ====================

import ImageApiService from './api';
import LoadMoreBtn from './LoadMoreBtn';
import LoadMoreBtn from './LoadMoreBtn';
import LoadMoreBtn from './LoadMoreBtn';

const form = document.getElementById('form');
const newsImg = document.getElementById('newsImg');
// const loadMore = document.getElementById('loadMore');  // замінилисьме на const loadMoreBtn = new LoadMoreBtn({ selector: '#loadMore' });

//* створюємо екземпляр класу (щоб викликати клас)
const imageApiService = new ImageApiService();
console.log(imageApiService);
const loadMoreBtn = new LoadMoreBtn({ selector: '#loadMore', isHidden: true });
console.log(loadMoreBtn);

form.addEventListener('submit', onSubmit);
// loadMore.addEventListener('click', onloadMore); // замінилисьме на featchHits
// loadMore.addEventListener('click', featchHits); // замінюємо на loadMore.button.addEventListener('click', featchHits);
loadMore.addEventListener('click', featchHits);

function onSubmit(e) {
  e.preventDefault();

  //* визначаємо дякий елемент в формі був активований
  const form = e.currentTarget;
  //* отримуемо з інпуту введене значення
  const value = form.elements.photo.value.trim();

  //* передаємо з інпуту введене в клас => конструктор
  imageApiService.searchQuery = value;

  //* скидуємо при новому запиті на 1 сторінку
  imageApiService.resetPage();
  //* очищаємо список
  clearImageList();

  //* робимо запит і виводимо 1 сторінку
  // imageApiService
  //   .getImg()
  //   .then(hits => {
  //     if (hits.length === 0) throw new Error('No data');
  //     return hits.reduce((acc, hit) => createMarcup(hit) + acc, '');
  //   })
  //   .then(appendImageList)
  //   .catch(onError)
  //   .finally(() => form.reset());
  featchHits().finally(() => form.reset());

  loadMoreBtn.show();
}

//* кнопка додати ще робить новий запит
// function onloadMore() {
//   imageApiService
//     .getImg()
//     .then(hits => {
//       if (hits.length === 0) throw new Error('No data');
//       return hits.reduce((acc, hit) => createMarcup(hit) + acc, '');
//     })
//     .then(appendImageList)
//     .catch(onError);
// }
// замінюємо onloadMore щоб не дублювати код
function featchHits() {
  loadMoreBtn.disabled();

  return imageApiService
    .getImg()
    .then(hits => {
      if (hits.length === 0) throw new Error('No data');
      return hits.reduce((acc, hit) => createMarcup(hit) + acc, '');
    })
    .then(acc => {
      appendImageList(acc);
      loadMoreBtn.enable();
    })
    .catch(onError);
}

//* додаємо кожен елемент в уінець списку
function appendImageList(markup) {
  // newsImg.innerHTML = markup;
  newsImg.insertAdjacentHTML('beforeend', markup);
}

//* очищаємо список
function clearImageList(markup) {
  newsImg.innerHTML = '';
}

//* робимо розмітку кожному елементу
function createMarcup({ webformatURL, tags, id }) {
  return `<div class='thumb'>
  <h1>${id}</h1>
  <h4>${tags}</h4>
      <img src=${webformatURL} alt=${tags} width="240" class="image"/>
    </div>`;
}

//* виводемо повідомлення на помилку
function onError(err) {
  loadMoreBtn.hide();
  appendImageList('<h1>Not faund</h1>');
}
