import { photoMocks } from './data.js';
import './picture.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const commentItem = bigPicture.querySelector('.social__comment');

const closeModalButton = document.querySelector('.big-picture__cancel');

// eslint-disable-next-line no-shadow
function addThumbnailClickHandler(thumbnail, photoData) {
  thumbnail.addEventListener('click', () => {
    const commentList = bigPicture.querySelector('.social__comments');
    commentList.textContent = '';
    document.querySelector('body').classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPicture.querySelector('.likes-count').textContent = photoData.likes;
    bigPicture.querySelector('.comments-count').textContent = photoData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;
    photoData.comments.forEach(({avatar, message, name}) => {
      const commentElement = commentItem.cloneNode(true);
      commentElement.querySelector('.social__picture').src = avatar;
      commentElement.querySelector('.social__picture').alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentList.appendChild(commentElement);
    });
  });
}

for (let i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], photoMocks[i]);
}

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});

closeModalButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});
