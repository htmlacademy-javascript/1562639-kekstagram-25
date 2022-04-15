import { isEscapeKey } from './util.js';
import {sendData} from './api.js';

const HASHTAG_INVALID_FORMAT_ERROR = 'хэш-тег начинается с символа #, быть не длиннее 20 символов, строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д';
const HASHTAG_UNIQUENESS_ERROR = 'Не должно быть повторяющихся Хэштегов';
const MAX_HASHTAGS_AMOUNT = 5;
const HASHTAGS_AMOUNT_ERROR = `Хэш-тегов не может быть более ${MAX_HASHTAGS_AMOUNT}`;
const MINSIZE = 25;
const MAXSIZE = 100;
const STEP = 25;
const Effect = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  NONE: 'none'
};

const form = document.querySelector('.img-upload__form');
const uploadFileInput = form.querySelector('#upload-file');
const uploadOverlay = form.querySelector('.img-upload__overlay');
const uploadCancelButton = form.querySelector('#upload-cancel');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const errorText = form.querySelector('.text__error');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsItems = document.querySelectorAll('.effects__radio');
const sliderEffectValue = document.querySelector('.effect-level__value');
const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const submitButton = form.querySelector('.img-upload__submit');
const fileChooser = document.querySelector('.img-upload__input');

const preview = document.querySelector('.img-upload__preview img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

const resetEnteredData = () => {
  document.querySelector('#effect-none').check = true;
  hashtagsInput.value = '';
  descriptionInput.value = '';
  scaleControlValue.value = `${MAXSIZE}%`;
  img.style.transform = `scale(${MAXSIZE / 100})`;
  img.style.filter = 'none';
  imgUploadEffect.classList.add('hidden');
};

const pristine = new Pristine(form, {
  errorTextClass: 'text__error',
});

const onRedactorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeRedactorPhoto();
  }
};

const onInputKeydown = (evt) => evt.stopPropagation();

const openRedactorPhoto = () => {
  resetEnteredData();
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

  resetEnteredData();

  hashtagsInput.removeEventListener('keydown', onInputKeydown);
  descriptionInput.removeEventListener('keydown', onInputKeydown);
  document.removeEventListener('keydown', onRedactorEscKeydown);
}

uploadFileInput.addEventListener('change', openRedactorPhoto);

uploadCancelButton.addEventListener('click', closeRedactorPhoto);

//Изменение масштаба изображения
controlSmaller.addEventListener('click', () => {
  let size = parseInt(scaleControlValue.value, 10);
  if (size <= MINSIZE) {
    return;
  }
  size -= STEP;
  scaleControlValue.value = `${size}%`;
  img.style.transform = `scale(${size / 100})`;
});
controlBigger.addEventListener('click', () => {
  let size = parseInt(scaleControlValue.value, 10);
  if (size >= MAXSIZE) {
    return;
  }
  size += STEP;
  scaleControlValue.value = `${size}%`;
  img.style.transform = `scale(${size / 100})`;
});

//Фильтры
imgUploadEffect.classList.add('hidden');

const effectsSettings = {
  [Effect.CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  [Effect.SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  [Effect.MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  [Effect.PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  [Effect.HEAT]: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  [Effect.NONE]: {}
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const filterValue = sliderElement.noUiSlider.get();
  sliderEffectValue.value = filterValue;
  imgUploadEffect.classList.remove('hidden');
  const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
  if (selectedEffect === Effect.CHROME) {
    img.style.filter = `grayscale(${filterValue})`;
  } else if (selectedEffect === Effect.SEPIA) {
    img.style.filter = `sepia(${filterValue})`;
  } else if (selectedEffect === Effect.MARVIN) {
    img.style.filter = `invert(${filterValue}%)`;
  } else if (selectedEffect === Effect.PHOBOS) {
    img.style.filter = `blur(${filterValue}px)`;
  } else if (selectedEffect === Effect.HEAT) {
    img.style.filter =`brightness(${filterValue})`;
  } else if (selectedEffect === Effect.NONE) {
    img.style.filter = 'none';
    imgUploadEffect.classList.add('hidden');
  }
});

const onEffectClick = (evt) => {
  const effectValue = evt.target.value;
  if (effectValue === Effect.CHROME) {
    img.className = 'effects__preview--chrome';
  } else if (effectValue === Effect.SEPIA) {
    img.className = 'effects__preview--sepia';
  } else if (effectValue === Effect.MARVIN) {
    img.className = 'effects__preview--marvin';
  } else if (effectValue === Effect.PHOBOS) {
    img.className = 'effects__preview--phobos';
  } else if (effectValue === Effect.HEAT) {
    img.className = 'effects__preview--heat';
  } else if (effectValue === Effect.NONE) {
    img.className = '';
  }

  sliderElement.noUiSlider.updateOptions(effectsSettings[effectValue]);
};

for (let i = 0; i < effectsItems.length; i++) {
  effectsItems[i].addEventListener('click', onEffectClick);
}

//Валидация хэштега
const validateFormat = (hashtags) => {
  const re = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1,19}$');
  if (hashtagsInput.value !== '') {
    for (let i = 0; i < hashtags.length; i++) {
      if (!re.test(hashtags[i])) {
        errorText.textContent = HASHTAG_INVALID_FORMAT_ERROR;
        return false;
      }
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

//Сообщение об успешной загрузке фотографии
const successMessage = successMessageTemplate.cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const openSuccessMessage = () => {
  document.body.appendChild(successMessage);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
};

function closeSuccessMessage () {
  document.body.removeChild(successMessage);

  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
}

successMessage.addEventListener('click', (evt) => {
  if ( !evt.target.closest('.success__inner') ) {
    closeSuccessMessage();
  }
});

successButton.addEventListener('click', closeSuccessMessage);

const onSuccessFormSend = () => {
  closeRedactorPhoto();
  openSuccessMessage();
};

//Сообщение о неудачной загрузке фотографиии
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const openErrorMessage = () => {
  document.body.appendChild(errorMessage);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
};

function closeErrorMessage () {
  document.body.removeChild(errorMessage);

  document.removeEventListener('keydown', onErrorMessageEscKeydown);
}

errorMessage.addEventListener('click', (evt) => {
  if ( !evt.target.closest('.error__inner') ) {
    closeErrorMessage();
  }
});

errorButton.addEventListener('click', closeErrorMessage);

const onErrorFormSend = () => {
  closeRedactorPhoto();
  openErrorMessage();
};

const submitMessageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message--loading');
const submitMessage = submitMessageTemplate.cloneNode(true);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  document.body.appendChild(submitMessage);
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  document.body.removeChild(submitMessage);
};

const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {setUserFormSubmit, onSuccessFormSend,  onErrorFormSend};
