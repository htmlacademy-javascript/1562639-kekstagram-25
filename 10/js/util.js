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

export {isEscapeKey, showErrorMessage};
