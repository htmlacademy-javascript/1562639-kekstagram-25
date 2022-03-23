import {bigPicture} from './full-picture.js';

const closeModalButton = document.querySelector('.big-picture__cancel');

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
