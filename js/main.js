//Функция, возвращающая случайное целое число из переданного диапазона включительно

const randomInteger = function (min, max) {
  if (min >= 0 && max >= min) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  throw new Error ('Invalid Input Parameters');
};

randomInteger(1, 5);


//Функция для проверки максимальной длины строки

const checkStringLength = function (string, maxStringLength) {
  return string.length <= maxStringLength;
};

checkStringLength('какой-то комментарий', 8);
