import {createElement} from './utils';

class FilterItem {
  constructor(name, title) {
    let _checked = false;
    let _disabled = false;
    let _element = null;
    let _count = 0;

    this.getName = function () {
      return name;
    };

    this.getTitle = function () {
      return title;
    };

    this.setCount = function (value) {
      _count = value;
    };

    this.getCount = function () {
      return _count;
    };

    this.setChecked = function (value) {
      if (typeof (value) !== `boolean`) {
        throw new TypeError(`Incoming parameter has invalid tyoe`);
      }

      const element = this.getElement().querySelector(`input`);

      if (value === false) {
        element.removeAttribute(`checked`);
      } else if (value === true) {
        element.setAttribute(`checked`, null);
      }

      _checked = value;
    };

    this.isChecked = function () {
      return _checked;
    };

    this.setDisabled = function (value) {
      if (typeof (value) !== `boolean`) {
        throw new TypeError(`Incoming parameter has invalid tyoe`);
      }

      const element = this.getElement().querySelector(`input`);

      if (value === false) {
        element.removeAttribute(`disabled`);
      } else if (value === true) {
        element.setAttribute(`disabled`, null);
      }

      _disabled = value;
    };

    this.isDisabled = function () {
      return _disabled;
    };

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()));
    };

    this.removeElement = function () {
      _element = null;
    };
  }

  getTemplate() {
    return `<input
    type="radio"
    id="filter__${this.getName()}"
    class="filter__input visually-hidden"
    name="filter"
    ${this.isChecked() ? ` checked` : ``}
    ${this.isDisabled() ? ` disabled` : ``}    
    />
    <label for="filter__${this.getName()}" class="filter__label">
    ${this.getTitle()} <span class="filter__${this.getName()}-count">${this.getCount()}</span></label
    >`;
  }
}

FilterItem.Names = {
  ALL: `all`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATINGS: `repeating`,
  TAGS: `tags`,
  ARCHIVE: `archive`,
  TODAY: `today`
};

class FilterItemFactory {
  static createFilterItem(tasks, name, title, isFilterTaskCallback) {
    const count = tasks.reduce(function (accumulator, task) {
      return isFilterTaskCallback(task) ? accumulator + 1 : accumulator;
    }, 0);

    const filter = new FilterItem(name, title, count);
    filter.setCount(count);
    return filter;
  }

  static createAllFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.ALL, `All`, () => true);
  }
  static createFavoritesFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.FAVORITES, `Favorites`, (task) => task.isFavorite);
  }
  static createOverdueFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.OVERDUE, `Overdue`, (task) => task.isDeadLine());
  }
  static createRepeatingFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.REPEATINGS, `Repeating`, (task) => task.isRepeating());
  }
  static createTagsFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.TAGS, `Tags`, (task) => task.hasTags());
  }
  static createArchiveFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.ARCHIVE, `Archive`, (task) => task.isArchive);
  }
  static createTodayaFilterItem(tasks) {
    return FilterItemFactory.createFilterItem(tasks, FilterItem.Names.TODAY, `Today`, (task) => {
      const today = new Date();
      const taskDt = new Date(task.dueDate);

      return today.getFullYear() === taskDt.getFullYear() && today.getMonth() === taskDt.getMonth() && today.getDate() === taskDt.getDate();
    });
  }
}

export class Filter {
  constructor(tasks) {
    let _element = null;
    const _items = [FilterItemFactory.createAllFilterItem(tasks), FilterItemFactory.createOverdueFilterItem(tasks), FilterItemFactory.createTodayaFilterItem(tasks),
      FilterItemFactory.createFavoritesFilterItem(tasks), FilterItemFactory.createRepeatingFilterItem(tasks), FilterItemFactory.createTagsFilterItem(tasks),
      FilterItemFactory.createArchiveFilterItem(tasks)];

    _items[0].setChecked(true);

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
