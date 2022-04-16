//Функция для перемешивания элементов массива

const shuffleArray = (items) => {
  const tempItems = [...items]; //клонируем наш массив
  for (let i = tempItems.length - 1; i > 0; i--) {  //перемешиваем
    const j = Math.floor(Math.random() * (i + 1));
    [tempItems[i], tempItems[j]] = [tempItems[j], tempItems[i]];
  }
  return tempItems;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = 100;
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '30%';
  errorContainer.style.top = '70px';
  errorContainer.style.right = '30%';
  errorContainer.style.bottom = '-180px';
  errorContainer.style.padding = '250px 50px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.lineHeight = '50px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = '#232321';

  errorContainer.textContent = message;

  document.body.append(errorContainer);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...others) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, others), timeoutDelay);
  };
};

export {isEscapeKey, showErrorMessage, shuffleArray, debounce};
