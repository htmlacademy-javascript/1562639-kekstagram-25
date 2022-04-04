import { isEscapeKey } from './util.js';

const HASHTAG_INVALID_FORMAT_ERROR = 'хэш-тег начинается с символа #, быть не длиннее 20 символов, строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д';
const HASHTAG_UNIQUENESS_ERROR = 'Не должно быть повторяющихся Хэштегов';
const MAX_HASHTAGS_AMOUNT = 5;
const HASHTAGS_AMOUNT_ERROR = `Хэш-тегов не может быть более ${MAX_HASHTAGS_AMOUNT}`;

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
const effectsList = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const MINSIZE = 25;
const MAXSIZE = 100;
const STEP = 25;

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
  scaleControlValue.value = `${MAXSIZE}%`;
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
const NON_EFFECT_FIELD_ID = 'effect-none';
imgUploadEffectLevel.classList.add('hidden');
const photoFilters = {
  chrome : {
    name: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia : {
    name: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin : {
    name: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  phobos : {
    name: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat : {
    name: 'brightness',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  none: 'none',
  property: '',
  getTotalString: function (variable){
    switch(true){
      case (photoFilters.property === photoFilters.marvin.name):
        return `${photoFilters.property  }(${  variable  }%)`;
      case (photoFilters.property === photoFilters.phobos.name):
        return `${photoFilters.property  }(${  variable  }px)`;
      default:
        return `${photoFilters.property  }(${  variable  })`;
    }
  }
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
  img.style.filter = photoFilters.getTotalString(sliderElement.noUiSlider.get());
  effectLevelValue.value = sliderElement.noUiSlider.get();
});

const updateFilterSetting = (photoFilter) => {
  img.style.filter = 'none';
  photoFilters.property = photoFilters[photoFilter].name;
  sliderElement.noUiSlider.updateOptions(photoFilters[photoFilter]);
  imgUploadEffectLevel.classList.remove('hidden');
};
for (let i = 0; i < effectsList.length; i++) {
  effectsList[i].addEventListener('click', (evt) => {
    const photoFilter = evt.target.id.split('-')[1];
    updateFilterSetting(photoFilter);
    if (evt.target.id === NON_EFFECT_FIELD_ID) {
      img.style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
    }
  });
}

//Валидация хэштега
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
