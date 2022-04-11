import { renderSimilarPhoto } from './picture.js';
import { setUserFormSubmit, closeRedactorPhoto } from './form.js';
import {getData} from './api.js';
//import './full-picture.js';


getData((photos) => {
  renderSimilarPhoto(photos);
});

setUserFormSubmit(closeRedactorPhoto);
