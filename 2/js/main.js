//Функция, возвращающая случайное целое число из переданного диапазона включительно
// https://learn.javascript.ru/task/random-int-min-max
const RANDOM_INTEGER = function (min, max) {
  const RAND = min + Math.random() * (max + 1 - min);
  return Math.floor(RAND);
};

RANDOM_INTEGER(1, 5);


//Функция для проверки максимальной длины строки
const STRING = 'какой-то комментарий';
const GET_STRING_LENGTH = function (maxStringLength) {
  if (STRING.length > maxStringLength) {

    // eslint-disable-next-line no-alert
    alert(`Слишком длинный комментарий, максимальное количество символов ${  maxStringLength}`);
  }
};

GET_STRING_LENGTH(8);
