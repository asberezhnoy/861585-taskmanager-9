import {RepeatingDays} from './task';
import {AvailableColors} from './datasource';
import {createElement} from './utils';

class Card {
  constructor(task) {
    let _element = null;
    let _editBtn = null;

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(this.getTemplate()).firstChild;
        _editBtn = _element.querySelector(`.card__btn--edit`);

        _editBtn.addEventListener(`click`, () => {
          const editCard = new EditableCard(task, this);
          _element.parentNode.replaceChild(editCard.getElement(), _element);
        });
      }
      return _element;
    };

    this.removeElelement = function () {
      _element = null;
    };

    this.getTemplate = function () {
      return `<article class="card card--${task.color} ${task.isRepeating() ? `card--repeat` : ``} ${task.isDeadLine() ? `card--deadline` : ``}">
      <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>
      
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
      
        <div class="card__textarea-wrap">
          <p class="card__text">${task.description}.</p>
        </div>
      
        <div class="card__settings">
          <div class="card__details">
            ${getDueDateTemplate()}
            ${getHashTagsTemplate()}
          </div>
        </div>
      </div>
      </div>
      </article>`;
    };

    function getHashTagsTemplate() {
      let hashTagList = ``;
      task.tags.forEach((tag) => {
        hashTagList += `
          <span class="card__hashtag-inner">
            <span class="card__hashtag-name">
              #${tag}
            </span>
          </span>`;
      });

      return `<div class="card__hashtag">
          <div class="card__hashtag-list">
          ${hashTagList}
          </div>
        </div>`;
    }

    function getDueDateTemplate() {
      const date = new Date(task.dueDate);

      return `<div class="card__dates">
      <div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          <span class="card__date">${date.toLocaleDateString()}</span>
          <span class="card__time">${date.toLocaleTimeString()}</span>
        </p>
      </div>
    </div>`;
    }
  }
}

class EditableCard {
  constructor(task, card) {
    let _element = null;
    let _form = null;

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(this.getTemplate()).firstChild;
        _form = _element.querySelector(`.card__form`);

        _form.addEventListener(`submit`, () => {
          _element.parentNode.replaceChild(card.getElement(), _element);
        });
      }
      return _element;
    };

    this.removeElelement = function () {
      _element = null;
    };

    this.getTemplate = function () {
      return `<article class="card card--edit card--${task.color} ${task.isRepeating() ? `card--repeat` : ``}" >
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>
      
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
      
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${task.description}</textarea>
            </label>
          </div>
      
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">yes</span>
                </button>
      
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${(new Date(task.dueDate)).toLocaleString()}"
                    />
                  </label>
                </fieldset>
      
              ${getRepeatDaysTemplate()}
              ${getHashTagsTemplate()}
            </div>
      
            ${getColorsTemplate()}
          </div>
      
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
      </article>`;
    };

    function getColorsTemplate() {
      return `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${AvailableColors.map((color) => {
    return `<input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${task.color === color ? `checked` : ``}    
        />
        <label
          for="color-${color}-4"
          class="card__color card__color--${color}"
          >${color}</label>`;
  }).join(``)}
      </div>
      </div>`;
    }

    function getRepeatDaysTemplate() {
      const obj = new RepeatingDays();
      const days = Object.keys(obj).filter((key) => obj.hasOwnProperty(key) && typeof (key) !== `function`);
      const isRepeationg = task.isRepeating();

      return `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isRepeationg ? `yes` : `no`}</span>
      </button>
      
      <fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${days.map((day) => {
    const lowerCaseDay = day.toLowerCase();
    return `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${lowerCaseDay}-4"
          name="repeat"
          value="mo"
          ${isRepeationg && task.repeatingDays[day] ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${lowerCaseDay}-4"
          >${lowerCaseDay}</label
        >`;
  }).join(``)}
      </div>
      </fieldset>
      </div>`;
    }

    function getHashTagsTemplate() {
      return `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${Array.from(task.tags).map((hashTag) => {
    return `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${hashTag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`;
  }).join(``)}
      </div>
    
      <label>
        <input
          type="text"
          class="card__hashtag-input"
          name="hashtag-input"
          placeholder="Type new hashtag here"
        />
      </label>
    </div>`;
    }
  }
}

class TaskBoardFilter {
  constructor() {
    let _element = null;

    this.getElement = function () {
      return _element || (_element = createElement(this.getTemplate()));
    };

    this.removeElelement = function () {
      _element = null;
    };

    this.getTemplate = function () {
      return `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
      </div>`;
    };
  }
}

class TaskBoard {
  constructor(tasks) {
    let _portionSize = 8;
    let _showedTaskCount = 0;
    let _element = null;

    this.getElement = function () {
      if (_element === null) {
        _element = createElement(`<div class="board__tasks"></div>`);
        const cards = getNextTaskPortion();
        const loadMoreBtn = createElement(`<button class="load-more" type="button">load more</button>`);
        _element.querySelector(`.board__tasks`).appendChild(cards);
        _element.appendChild(loadMoreBtn);

        _element.querySelector(`.load-more`).addEventListener(`click`, () => {
          const nextCards = getNextTaskPortion();
          document.querySelector(`.board__tasks`).append(nextCards);
          if (tasks.length === _showedTaskCount) {
            document.querySelector(`.load-more`).classList.toggle(`visually-hidden`);
          }
        });
      }
      return _element;
    };

    this.removeElelement = function () {
      _element = null;
    };

    this.getTemplate = function () {
      return `<div class="board__tasks">${getNextTaskPortion()}</div><button class="load-more" type="button">load more</button>`;
    };

    function getNextTaskPortion() {
      const fragment = new DocumentFragment();

      const lastElementIndex = tasks.length < (_showedTaskCount + _portionSize) ? tasks.length : _showedTaskCount + _portionSize;

      for (let i = _showedTaskCount; i < lastElementIndex; i++, _showedTaskCount++) {
        const card = new Card(tasks[i]);
        fragment.appendChild(card.getElement());
      }
      return fragment;
    }
  }
}

export {TaskBoard, TaskBoardFilter};
