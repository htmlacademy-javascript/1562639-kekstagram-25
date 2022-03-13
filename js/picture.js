import {photoMocks} from './data.js';

const userPictures = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPictureFragment = document.createDocumentFragment();

photoMocks.forEach(({url, likes, comments}) => {
  const userPictureElement = userPictureTemplate.cloneNode(true);
  userPictureElement.querySelector('.picture__img').src = url;
  userPictureElement.querySelector('.picture__likes').textContent = likes;
  userPictureElement.querySelector('.picture__comments').textContent = comments;
  userPictureFragment.appendChild(userPictureElement);
});

userPictures.appendChild(userPictureFragment);
