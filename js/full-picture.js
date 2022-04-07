import { photoMocks } from './data.js';
import './picture.js';
import { isEscapeKey } from './util.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const commentItem = bigPicture.querySelector('.social__comment');
const commentCountFull = bigPicture.querySelector('.comments-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
const commentsCountStart = bigPicture.querySelector('#comments__counter');

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

function onThumbnailClick(thumbnail, photoData) {
  thumbnail.addEventListener('click', () => {
    openUserModal ();
    const commentList = bigPicture.querySelector('.social__comments');
    commentList.textContent = '';
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPicture.querySelector('.likes-count').textContent = photoData.likes;
    let commentsCounter = COMMENTS_STEP;

    commentCountFull.textContent = photoData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;
    if (photoData.comments.length < COMMENTS_STEP) {
      commentsCountStart.textContent = photoData.comments.length;
    } else {
      commentsCountStart.textContent = commentsCounter;
    }
    const drawComments = (comments) => {
      commentList.textContent = '';
      comments.forEach(({avatar, message, name}) => {
        const commentElement = commentItem.cloneNode(true);
        commentElement.querySelector('.social__picture').src = avatar;
        commentElement.querySelector('.social__picture').alt = name;
        commentElement.querySelector('.social__text').textContent = message;
        commentList.appendChild(commentElement);
      });
    };
    let visibleComments;
    if (commentsCounter >= photoData.comments.length) {
      visibleComments = photoData.comments.slice(0, commentsCounter);
      drawComments(visibleComments);
      commentLoader.classList.add('hidden');
    } else {
      commentLoader.classList.remove('hidden');
      visibleComments = photoData.comments.slice(0, commentsCounter);
      drawComments(visibleComments);
    }
    commentLoader.addEventListener('click', () => {
      if (commentsCounter + COMMENTS_STEP >= photoData.comments.length) {
        commentsCountStart.textContent = photoData.comments.length;
        commentsCounter = photoData.comments.length;
        visibleComments = photoData.comments.slice(0, commentsCounter);
        drawComments(visibleComments);
        commentLoader.classList.add('hidden');
      } else {
        commentLoader.classList.remove('hidden');
        commentsCounter += COMMENTS_STEP;
        commentsCountStart.textContent = commentsCounter;
        visibleComments = photoData.comments.slice(0, commentsCounter);
        drawComments(visibleComments);
      }
    });
  });
}

for (let i = 0; i < thumbnails.length; i++) {
  onThumbnailClick(thumbnails[i], photoMocks[i]);
}

closeModalButton.addEventListener('click', closeUserModal);
