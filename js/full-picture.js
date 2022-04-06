/* eslint-disable no-unused-expressions */
import { photoMocks } from './data.js';
import './picture.js';
import { isEscapeKey } from './util.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const commentItem = bigPicture.querySelector('.social__comment');
const commentCountFull = bigPicture.querySelector('.comments-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
let commentsCounter = bigPicture.querySelector('#comments__counter');

const closeModalButton = document.querySelector('.big-picture__cancel');

const COMMENTS_STEP = 5;

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
}

const openUserModal = () => {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

function closeUserModal () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

/*function onMoreCommentsClick (photoData) {
  commentLoader.addEventListener('click', () => {
    commentsCounter.text = COMMENTS_STEP;
    if (commentsCounter > photoData.comments.length) {
      photoData.comments.slice(0, photoData.comments.length);
    } else {
      photoData.comments.slice(0, commentsCounter);
      commentsCounter += COMMENTS_STEP;
    }
  });
}*/

function onThumbnailClick(thumbnail, photoData) {
  thumbnail.addEventListener('click', () => {
    openUserModal ();
    const commentList = bigPicture.querySelector('.social__comments');
    commentList.textContent = '';
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPicture.querySelector('.likes-count').textContent = photoData.likes;

    commentCountFull.textContent = photoData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;
    if (photoData.comments.length < COMMENTS_STEP) {
      commentsCounter.textContent = photoData.comments.length;
    } else {
      commentsCounter.textContent = COMMENTS_STEP;
    }
    commentLoader.addEventListener('click', () => {
      if (commentsCounter > photoData.comments.length) {
        photoData.comments.slice(0, photoData.comments.length);
      } else {
        photoData.comments.slice(0, commentsCounter);
      }
      commentsCounter += COMMENTS_STEP;
      //commentsCounter.textContent = commentsCounter;
    });
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
  onThumbnailClick(thumbnails[i], photoMocks[i]);
  //onMoreCommentsClick (photoMocks[i]);
}

closeModalButton.addEventListener('click', closeUserModal);
