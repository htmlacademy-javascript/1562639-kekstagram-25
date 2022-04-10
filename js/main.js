import { renderSimilarPhoto } from './picture.js';
import { setUserFormSubmit, closeRedactorPhoto } from './form.js';
import {getData} from './api.js';


getData((photos) => {
  renderSimilarPhoto(photos);
});

setUserFormSubmit(closeRedactorPhoto);
