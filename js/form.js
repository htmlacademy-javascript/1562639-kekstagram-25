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

const onInputKeydown = (evt) => evt.stopPropagation();

const openRedactorPhoto = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  hashtagsInput.addEventListener('keydown', onInputKeydown);
  descriptionInput.addEventListener('keydown', onInputKeydown);
  document.addEventListener('keydown', onRedactorEscKeydown);
};

function closeRedactorPhoto () {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  uploadFileInput.value = '';

  hashtagsInput.removeEventListener('keydown', onInputKeydown);
  descriptionInput.removeEventListener('keydown', onInputKeydown);
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

pristine.addValidator(hashtagsInput, validateHashtags);
