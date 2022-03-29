import { isEscapeKey } from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadFileInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCancelButton = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const errorText = form.querySelector('.text__error');

const pristine = new Pristine(form, {
  classTo: 'text__element--description',
  errorTextParent: 'text__element--description',
  errorTextClass: 'text__error',
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
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
  hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
  descriptionInput.addEventListener('keydown', (evt) => evt.stopPropagation());
  document.addEventListener('keydown', onRedactorEscKeydown);
});

uploadCancelButton.addEventListener('click', () => {
  closeRedactorPhoto();
});

// Валидаця на повторения и количество хэштегов
function myValidationFunction() {
  const hashtags = hashtagsInput.value.toLowerCase().split(' ');
  const uniqHashtags = new Set(hashtags);
  if (hashtags.length > 5) {
    errorText.textContent = 'Хэш-тегов не может быть более 5';
    return false;
  }
  else {
    errorText.textContent = '';
    if (uniqHashtags.size < hashtags.length) {
      errorText.textContent = 'Не должно быть повторяющихся Хэштегов';
      return false;
    }
    else {
      errorText.textContent = '';
    }
  }


  // Валидация хэштега на правильность ввода
  const re = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,20}$');
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtagsInput.value.length > 0) {
      const curentHashtag = hashtags[i];
      const hashCheck = re.test(curentHashtag);
      if (hashCheck === false) {
        errorText.textContent = 'Хэш-тег имеет ошибку или длину более 20 символов';
        if (curentHashtag === '' || curentHashtag === '#') {
          errorText.textContent = 'Введите #ХэшТег';
        }
        return false;
      }
      else {
        errorText.textContent = '';
      }
    } else {
      errorText.textContent = '';
      return true;
    }
  }
  return true;
}

pristine.addValidator(hashtagsInput, myValidationFunction);
