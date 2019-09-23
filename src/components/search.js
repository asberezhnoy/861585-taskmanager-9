import {createElement} from './utils';

class SearchBar {
  constructor() {
    let _element = null;

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()));
    };

    this.removeElelement = function () {
      _element = null;
    };
  }

  getTemplate() {
    return `<input
    type="text"
    id="search__input"
    class="search__input"
    placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
  />
  <label class="visually-hidden" for="search__input">Search</label>`;
  }
}

export {SearchBar};
