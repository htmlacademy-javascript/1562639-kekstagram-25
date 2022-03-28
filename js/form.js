import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadFileInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCancelButton = form.querySelector('#upload-cancel');
const textHashtags = form.querySelector('.text__hashtags');
//const description = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
});

const onRedactorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeRedactorPhoto();
  }
};

function openRedactorPhoto () {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

function closeRedactorPhoto () {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  uploadFileInput.value = '';

  document.removeEventListener('keydown', onRedactorEscKeydown);
}

uploadFileInput.addEventListener('change', () => {
  openRedactorPhoto();

  document.addEventListener('keydown', onRedactorEscKeydown);
});

uploadCancelButton.addEventListener('click', () => {
  closeRedactorPhoto();
});

textHashtags.addEventListener('change', () => {
  const hashtags = textHashtags.value;
  const hashtagsArray = hashtags.split(' ', 5);
  for (let i = 0; i <= hashtagsArray.length - 1; i++) {
    for (let j = i+1; j <= hashtagsArray.length; j++) {
      // eslint-disable-next-line eqeqeq
      if (i != j && hashtagsArray[i] != hashtagsArray[j]) {
        // eslint-disable-next-line no-console
        console.log('OK');
      } else {
        // eslint-disable-next-line no-console
        console.log('Error');
      }
    }
  }
});


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Можно отправлять');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма невалидна');
  }
});


// разобраться, куда это вставить
//if (textHashtags.focus || description.focus) {
//evt.stopPropagation();
//}

