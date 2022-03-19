import { photoMocks } from './data.js';
import './picture.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');

const closeModalButton = document.querySelector('.big-picture__cancel');

// eslint-disable-next-line no-shadow
function addThumbnailClickHandler(thumbnail, photoData) {
  thumbnail.addEventListener('click', () => {
    const сommentList = bigPicture.querySelector('.social__comments');
    const commentItem = bigPicture.querySelector('.social__comment');
    сommentList.textContent = '';
    //commentItem.textContent = '';
    document.querySelector('body').classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPicture.querySelector('.likes-count').textContent = photoData.likes;
    bigPicture.querySelector('.comments-count').textContent = photoData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;
    photoData.comments.forEach(({avatar, message, name}) => {
      const сommentElement = commentItem.cloneNode(true);
      сommentElement.querySelector('.social__picture').src = avatar;
      сommentElement.querySelector('.social__picture').alt = name;
      сommentElement.querySelector('.social__text').textContent = message;
      commentItem.appendChild(сommentElement);
    });
    сommentList.appendChild(commentItem);
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
}

for (let i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], photoMocks[i]);
}

closeModalButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});
