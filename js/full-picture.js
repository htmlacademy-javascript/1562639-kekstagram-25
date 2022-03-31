import { photoMocks } from './data.js';
import './picture.js';
import { isEscapeKey } from './util.js';

const thumbnails = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const commentItem = bigPicture.querySelector('.social__comment');

const closeModalButton = document.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');
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

    document.addEventListener('keydown', onPopupEscKeydown);
  });
}

for (let i = 0; i < thumbnails.length; i++) {
  onThumbnailClick(thumbnails[i], photoMocks[i]);
}

closeModalButton.addEventListener('click', closeUserModal);
