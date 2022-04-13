import { renderSimilarPhoto, setFiltersClick, visiblePhoto } from './picture.js';
import { setUserFormSubmit, closeRedactorPhoto } from './form.js';
import {getData} from './api.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderSimilarPhoto(photos);
  setFiltersClick(debounce(
    (evt) => visiblePhoto(evt, photos),
    RERENDER_DELAY,
  ));
});

setUserFormSubmit(closeRedactorPhoto);
