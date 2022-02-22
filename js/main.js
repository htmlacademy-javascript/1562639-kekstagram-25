//Функция, возвращающая случайное целое число из переданного диапазона включительно
// https://learn.javascript.ru/task/random-int-min-max
const RANDOM_INTEGER = function (min, max) {
  const RAND = min + Math.random() * (max + 1 - min);
  return Math.floor(RAND);
};

RANDOM_INTEGER(1, 5);


//Функция для проверки максимальной длины строки
let string = 'какой-то комментарий';
let getStringLength = function (maxStringLength) {
  if (string.length > maxStringLength) {
    console.log('Слишком длинный комментарий, максимальное количество символов ' + maxStringLength);
  }
};

getStringLength(8);
