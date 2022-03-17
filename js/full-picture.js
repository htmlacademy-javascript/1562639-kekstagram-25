import { photoMocks } from './data.js';
//import { createComment } from './data.js';
import './picture.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const сommentList = bigPicture.querySelector('.social__comments');

const commentItem = bigPicture.querySelector('.social__comment');

//const similarComments = createComment();

photoMocks.comments.forEach(({avatar, message, name}) => {
  const сommentElement = commentItem.cloneNode(true);
  сommentElement.querySelector('.social__picture').src = avatar;
  сommentElement.querySelector('.social__picture').alt = name;
  сommentElement.querySelector('.social__text').textContent = message;
  сommentList.appendChild(commentItem);
});

// eslint-disable-next-line no-shadow
function addThumbnailClickHandler(thumbnail, photoMocks) {
  thumbnail.addEventListener('click', () => {
    document.querySelector('body').classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoMocks.url;
    bigPicture.querySelector('.likes-count').textContent = photoMocks.likes;
    bigPicture.querySelector('.comments-count').textContent = photoMocks.comments.length;
    //сommentList.textContent = photoMocks.comments;
    bigPicture.querySelector('.social__caption').textContent = photoMocks.description;
  });
}

for (let i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], photoMocks[i]);
}
