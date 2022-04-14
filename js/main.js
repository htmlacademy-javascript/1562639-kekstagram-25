import { renderSimilarPhoto, setFiltersClick, showPhoto } from './picture.js';
import { setUserFormSubmit, onSuccessFormSend,  onErrorFormSend } from './form.js';
import {getData} from './api.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderSimilarPhoto(photos);
  setFiltersClick(debounce(
    (evt) => showPhoto(evt, photos),
    RERENDER_DELAY,
  ));
});

setUserFormSubmit(onSuccessFormSend,  onErrorFormSend);
