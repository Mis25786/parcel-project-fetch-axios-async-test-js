import fetchData from './api';

const form = document.getElementById('form');
const newsImg = document.getElementById('newsImg');

form.addEventListener('submit', onsubmit);

function onsubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.photo.value.trim();

  fetchData(value)
    .then(({ hits }) => {
      if (hits.length === 0) throw new Error('No data');
      return hits.reduce((acc, hit) => createMarcup(hit) + acc, '');
    })
    .then(updateImageList)
    .catch(onError)
    .finally(() => form.reset());
}

function updateImageList(markup) {
  newsImg.innerHTML = markup;
}

function createMarcup({ webformatURL, tags, id }) {
  return `<div class='thumb'>
  <h1>${id}</h1>
  <h4>${tags}</h4>
      <img src=${webformatURL} alt=${tags} width="240" class="image"/>
    </div>`;
}

function onError(err) {
  updateImageList('<h1>Not faund</h1>');
}
