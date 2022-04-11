import { onThumbnailClick } from './full-picture';

const userPictures = document.querySelector('.pictures');
const userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');


const renderSimilarPhoto = (photos) => {
  const userPictureFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, comments}) => {
    const userPictureElement = userPictureTemplate.cloneNode(true);
    userPictureElement.querySelector('.picture__img').src = url;
    userPictureElement.querySelector('.picture__likes').textContent = likes;
    userPictureElement.querySelector('.picture__comments').textContent = comments.length;
    userPictureFragment.appendChild(userPictureElement);
  });

  userPictures.appendChild(userPictureFragment);
  const thumbnails = document.querySelectorAll('.picture');

  for (let i = 0; i < thumbnails.length; i++) {
    onThumbnailClick(thumbnails[i], photos[i]);
  }
};

export {renderSimilarPhoto};
