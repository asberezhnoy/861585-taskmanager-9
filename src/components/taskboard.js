import {RepeatingDays} from './task';
import {AvailableColors} from './datasource';

const createDueDateTemplate = (dueDate) => {
  const date = new Date(dueDate);

  return `<div class="card__dates">
    <div class="card__date-deadline">
      <p class="card__input-deadline-wrap">
        <span class="card__date">${date.toLocaleDateString()}</span>
        <span class="card__time">${date.toLocaleTimeString()}</span>
      </p>
    </div>
  </div>`;
};

const createHashTagsTemplate = (hashTags) => {
  let hashTagList = ``;
  hashTags.forEach((hashTag) => {
    hashTagList += `
      <span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${hashTag}
        </span>
      </span>`;
  });

  return `<div class="card__hashtag">
      <div class="card__hashtag-list">
      ${hashTagList}
      </div>
    </div>`;
};

const createEditTaskTemplate = (task) => `<article class="card card--edit card--${task.color} ${task.isRepeating() ? `card--repeat` : ``} >
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

        ${createRepeatDaysEditTemplate(task)}
        ${createHashTagsEditTemplate(task)}
      </div>

      ${createColorsEditTemplate(task)}
    </div>

    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  </div>
</form>
</article>`;

const createHashTagsEditTemplate = (task) => {
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
};

const createColorsEditTemplate = (task) => {
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
};

const createRepeatDaysEditTemplate = (task) => {
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
};

const createTaskTemplate = (task) => `
  <article class="card card--${task.color} ${task.isRepeating() ? `card--repeat` : ``} ${task.isDeadLine() ? `card--deadline` : ``}">
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
        ${createDueDateTemplate(task.dueDate)}
        ${createHashTagsTemplate(task.tags)}
      </div>
    </div>
  </div>
  </div>
  </article>`;

const createTaskBoardFiltersTemplate = () => `<div class="board__filter-list">
  <a href="#" class="board__filter">SORT BY DEFAULT</a>
  <a href="#" class="board__filter">SORT BY DATE up</a>
  <a href="#" class="board__filter">SORT BY DATE down</a>
  </div>`;

export {createTaskTemplate, createTaskBoardFiltersTemplate, createEditTaskTemplate};
