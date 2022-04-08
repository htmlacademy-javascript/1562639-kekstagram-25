import {getRandomPositiveInteger, getRandomArrayElement, shuffleArray} from './util.js';

const numbers = [ ...Array(25).keys() ].map( (i) => i+1);

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

const createComment = (photoId, commentNumber) => ({
  id: `${photoId}0${commentNumber}`,
  avatar: `img/avatar-${  getRandomPositiveInteger(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAMES),
});

function createPhoto(id) {
  const commentsAmount = getRandomPositiveInteger(0, 55);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    likes: getRandomPositiveInteger(15, 200),
    description: getRandomArrayElement(DESCRIPTION),
    comments: [...Array(commentsAmount)].map((_, i) => createComment(id, i)),
  };
}

const photoMocks = shuffledNumbers.map((number) => createPhoto(number));

export {photoMocks};
export {createPhoto};
