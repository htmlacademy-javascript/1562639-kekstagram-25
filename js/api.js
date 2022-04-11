import {showErrorMessage} from './util.js';

const getData = (onSuccess) => {
  fetch ('https://25.javascript.pages.academ/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showErrorMessage('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
