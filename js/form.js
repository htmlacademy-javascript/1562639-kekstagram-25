import { isEscapeKey } from './util.js';

const HASHTAG_INVALID_FORMAT_ERROR = 'хэш-тег начинается с символа #, быть не длиннее 20 символов, строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д';
const HASHTAG_UNIQUENESS_ERROR = 'Не должно быть повторяющихся Хэштегов';
const MAX_HASHTAGS_AMOUNT = 5;
const HASHTAGS_AMOUNT_ERROR = `Хэш-тегов не может быть более ${MAX_HASHTAGS_AMOUNT}`;

const form = document.querySelector('.img-upload__form');
const uploadFileInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCancelButton = form.querySelector('#upload-cancel');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const errorText = form.querySelector('.text__error');

const pristine = new Pristine(form, {
  classTo: 'text__element--hashtags',
  errorTextParent: 'text__element--hashtags',
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

  hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
  descriptionInput.addEventListener('keydown', (evt) => evt.stopPropagation());
  document.addEventListener('keydown', onRedactorEscKeydown);
}

function closeRedactorPhoto () {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  uploadFileInput.value = '';

  hashtagsInput.removeEventListener('keydown', (evt) => evt.stopPropagation());
  descriptionInput.removeEventListener('keydown', (evt) => evt.stopPropagation());
  document.removeEventListener('keydown', onRedactorEscKeydown);
}

uploadFileInput.addEventListener('change', openRedactorPhoto);

uploadCancelButton.addEventListener('click', closeRedactorPhoto);

const validateFormat = (hashtags) => {
  const re = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,20}$');
  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      errorText.textContent = HASHTAG_INVALID_FORMAT_ERROR;
      return false;
    }
  }

  return true;
};

const validateUniqueness = (hashtags) => {
  const uniqHashtags = new Set(hashtags);
  if (uniqHashtags.size < hashtags.length) {
    errorText.textContent = HASHTAG_UNIQUENESS_ERROR;
    return false;
  }

  return true;
};

const validateAmount = (hashtags) => {
  if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
    errorText.textContent = HASHTAGS_AMOUNT_ERROR;
    return false;
  }

  return true;
};

const validateHashtags = () => {
  const hashtags = hashtagsInput.value.toLowerCase().split(' ');
  errorText.textContent = '';

  return validateFormat(hashtags) && validateUniqueness(hashtags) && validateAmount(hashtags);
};

/*
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
}*/

pristine.addValidator(hashtagsInput, validateHashtags);
