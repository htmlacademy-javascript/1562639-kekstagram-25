//Функция, возвращающая случайное целое число из переданного диапазона включительно

/*const randomInteger = function (min, max) {
  if (min >= 0 && max >= min) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  throw new Error ('Invalid Input Parameters');
};

randomInteger(1, 5);
*/

//Функция для проверки максимальной длины строки

const checkStringLength = function (string, maxStringLength) {
  return string.length <= maxStringLength;
};

checkStringLength('какой-то комментарий', 8);

// Задание 4

const numbers = [ ...Array(25).keys() ].map( (i) => i+1);

function shuffleArray(array) {
  const tempArray = [...array]; //клонируем наш массив
  for (let i = tempArray.length - 1; i > 0; i--) {  //перемешиваем
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;
}

const shuffledNumbers = shuffleArray(numbers);

const DESCRIPTION = [
  'Красота',
  'На отдыхе',
  'Отдыхаю',
  'Заграница',
  'Отпуск',
  'А как вам там на работе?))',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Макс',
  'Андрей',
  'Ольга',
  'Елена',
  'Сергей',
  'Оксана',
  'Марина',
  'Юлия',
  'Екатерина',
  'Алиса',
];


const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = (photoId, commentNumber) => ({
  id: `${photoId}0${commentNumber}`,
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

function createPhoto(id) {
  const commentsAmount = getRandomPositiveInteger(0, 5);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    likes: getRandomPositiveInteger(15, 200),
    description: getRandomArrayElement(DESCRIPTION),
    comments: [...Array(commentsAmount)].map((_, i) => createComment(id, i)),
  };
}

const photoMocks = shuffledNumbers.map((number) => createPhoto(number));

// eslint-disable-next-line no-console
console.log(photoMocks);
