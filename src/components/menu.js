import {createElement} from './utils';

class MenuItem {
  constructor(name, title) {
    let _checked = false;
    let _element = null;

    this.getName = function () {
      return name;
    };

    this.getTitle = function () {
      return title;
    };

    this.setChecked = function (value) {
      if (typeof (value) !== `boolean`) {
        throw new TypeError(`Incoming parameter has invalid tyoe`);
      }

      const element = this.getElement().querySelector(`input`);

      if (value === false) {
        element.removeAttribute(`checked`);
      } else {
        element.setAttribute(`checked`, null);
      }

      _checked = value;
    };

    this.isChecked = function () {
      return _checked;
    };

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()));
    };

    this.removeElelement = function () {
      _element = null;
    };
  }

  getTemplate() {
    return `<input
    type="radio"
    name="control"
    id="control__${this.getName()}"
    class="control__input visually-hidden"
    ${this.isChecked() ? `checked` : ``}
  />
  <label for="control__${this.getName()}" class="control__label control__label--${this.getName()}"
    >${this.getTitle()}</label>`;
  }
}

class Menu {
  constructor() {
    let _element = null;
    const _items = [
      new MenuItem(`new-task`, `+ ADD NEW TASK`),
      new MenuItem(`task`, `TASKS`),
      new MenuItem(`statistic`, `STATISTICS`)
    ];

    _items[1].setChecked(true);

    this.getTemplate = function () {
      return _items.map((item) => item.getTemplate()).join(``);
    };

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()));
    };

    this.removeElelement = function () {
      _element = null;
    };
  }
}

export {Menu};
