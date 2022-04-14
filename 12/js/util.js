//Функция для перемешивания элементов массива

const shuffleArray = (array) => {
  const tempArray = [...array]; //клонируем наш массив
  for (let i = tempArray.length - 1; i > 0; i--) {  //перемешиваем
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;
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
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, showErrorMessage, shuffleArray, debounce};
