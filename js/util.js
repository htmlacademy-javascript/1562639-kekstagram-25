//Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//Функция для перемешивания элементов массива

function shuffleArray(array) {
  const tempArray = [...array]; //клонируем наш массив
  for (let i = tempArray.length - 1; i > 0; i--) {  //перемешиваем
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;
}

//Функция для проверки максимальной длины строки

const checkStringLength = function (string, maxStringLength) {
  return string.length <= maxStringLength;
};

checkStringLength('какой-то комментарий', 8);

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

  /*setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);*/
};

export {getRandomPositiveInteger, getRandomArrayElement, shuffleArray, isEscapeKey, showErrorMessage};
