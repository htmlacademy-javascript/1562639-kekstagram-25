import { onThumbnailClick } from './full-picture.js';
import { shuffleArray } from './util.js';

const userPictures = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const filters = document.querySelector('.img-filters');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const NUMBER_RANDOM_PHOTOS = 10;

const setFiltersClick = (cb) => {
  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    const targetButton = evt.target;
    const activeButton = document.querySelector('.img-filters__button--active');
    if (targetButton !== activeButton) {
      activeButton.classList.remove('img-filters__button--active');
      targetButton.classList.add('img-filters__button--active');

      cb(evt);
    }
  });
};

const renderSimilarPhoto = (photos) => {
  const userPictureFragment = document.createDocumentFragment();
  photos
    .forEach(({url, likes, comments}) => {
      const userPictureElement = userPictureTemplate.cloneNode(true);
      userPictureElement.querySelector('.picture__img').src = url;
      userPictureElement.querySelector('.picture__likes').textContent = likes;
      userPictureElement.querySelector('.picture__comments').textContent = comments.length;
      userPictureFragment.appendChild(userPictureElement);
    });

  userPictures.appendChild(userPictureFragment);

  const thumbnails = document.querySelectorAll('.picture');

  for (let i = 0; i < thumbnails.length; i++) {
    onThumbnailClick(thumbnails[i], photos[i]);
  }

  filters.classList.remove('img-filters--inactive');
};

const comparePhoto = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;
  return commentsB - commentsA;
};

const clearPhotoList = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const visiblePhoto = (evt, photos) => {
  const targetButton = evt.target;
  clearPhotoList();
  let photoToShow = photos;

  if (targetButton === filterRandom) {
    clearPhotoList();
    photoToShow = shuffleArray(photos).slice(0, NUMBER_RANDOM_PHOTOS);
  }
  if (targetButton === filterDiscussed) {
    clearPhotoList();
    photoToShow = photos.slice().sort(comparePhoto);
  }
  renderSimilarPhoto(photoToShow);
};

export {renderSimilarPhoto, setFiltersClick, visiblePhoto};
