import { isEscapeKey } from './util.js';


const bigPicture = document.querySelector('.big-picture');
const commentItem = bigPicture.querySelector('.social__comment');
const commentList = bigPicture.querySelector('.social__comments');
const commentCountFull = bigPicture.querySelector('.comments-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
const commentsCountStart = bigPicture.querySelector('#comments__counter');
const closeModalButton = document.querySelector('.big-picture__cancel');

const COMMENTS_STEP = 5;
let onShowMoreComments;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  commentLoader.addEventListener('click', onShowMoreComments);
  document.addEventListener('keydown', onPopupEscKeydown);
};

function closeUserModal () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  commentLoader.removeEventListener('click', onShowMoreComments);
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const drawShowMoreButton = (totalCommentsAmount, visibleCommentsCounter) => {
  if (totalCommentsAmount > visibleCommentsCounter) {
    commentLoader.classList.remove('hidden');
  } else {
    commentLoader.classList.add('hidden');
  }
};

const drawComments = (comments) => {
  commentList.textContent = '';
  comments.forEach(({avatar, message, name}) => {
    const commentElement = commentItem.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentList.appendChild(commentElement);
  });
};

const onThumbnailClick = (thumbnail, photoData) => {
  thumbnail.addEventListener('click', () => {
    commentList.textContent = '';
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPicture.querySelector('.likes-count').textContent = photoData.likes;
    const totalCommentsAmount = photoData.comments.length;

    commentCountFull.textContent = totalCommentsAmount;
    bigPicture.querySelector('.social__caption').textContent = photoData.description;

    let commentsCounter = totalCommentsAmount >= COMMENTS_STEP ? COMMENTS_STEP : totalCommentsAmount;

    commentsCountStart.textContent = commentsCounter;

    const visibleComments = photoData.comments.slice(0, commentsCounter);
    drawComments(visibleComments);

    drawShowMoreButton(totalCommentsAmount, commentsCounter);

    onShowMoreComments = () => {
      if (commentsCounter + COMMENTS_STEP >= totalCommentsAmount ) {
        commentsCounter = totalCommentsAmount;
      } else {
        commentsCounter += COMMENTS_STEP;
      }

      commentsCountStart.textContent = commentsCounter;
      const newVisibleComments = photoData.comments.slice(0, commentsCounter);
      drawComments(newVisibleComments);

      drawShowMoreButton(totalCommentsAmount, commentsCounter);
    };

    openUserModal();
  });
};

closeModalButton.addEventListener('click', closeUserModal);

export {onThumbnailClick};
