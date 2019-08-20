function HashTag(text) {
  this.toString = function () {
    return `#${text}`;
  };
}

function DeadLine(date, time) {
  this.date = date;
  this.time = time;
}

function Task(description, deadLine, hashTags) {
  this.description = description;
  this.deadLine = deadLine;
  this.hashTags = hashTags;
}

const createMenu = () => `
  <section class="control__btn-wrap">
    <input
      type="radio"
      name="control"
      id="control__new-task"
      class="control__input visually-hidden"
    />
    <label for="control__new-task" class="control__label control__label--new-task"
      >+ ADD NEW TASK</label
    >
    <input
      type="radio"
      name="control"
      id="control__task"
      class="control__input visually-hidden"
      checked
    />
    <label for="control__task" class="control__label">TASKS</label>
    <input
      type="radio"
      name="control"
      id="control__statistic"
      class="control__input visually-hidden"
    />
    <label for="control__statistic" class="control__label"
      >STATISTICS</label
    >
  </section>`;

const createSearch = () => `
<input
  type="text"
  id="search__input"
  class="search__input"
  placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
/>
<label class="visually-hidden" for="search__input">Search</label>`;

const createFilter = () => `<input
type="radio"
id="filter__all"
class="filter__input visually-hidden"
name="filter"
checked
/>
<label for="filter__all" class="filter__label">
All <span class="filter__all-count">13</span></label
>
<input
type="radio"
id="filter__overdue"
class="filter__input visually-hidden"
name="filter"
disabled
/>
<label for="filter__overdue" class="filter__label"
>Overdue <span class="filter__overdue-count">0</span></label
>
<input
type="radio"
id="filter__today"
class="filter__input visually-hidden"
name="filter"
disabled
/>
<label for="filter__today" class="filter__label"
>Today <span class="filter__today-count">0</span></label
>
<input
type="radio"
id="filter__favorites"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__favorites" class="filter__label"
>Favorites <span class="filter__favorites-count">1</span></label
>
<input
type="radio"
id="filter__repeating"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__repeating" class="filter__label"
>Repeating <span class="filter__repeating-count">1</span></label
>
<input
type="radio"
id="filter__tags"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__tags" class="filter__label"
>Tags <span class="filter__tags-count">1</span></label
>
<input
type="radio"
id="filter__archive"
class="filter__input visually-hidden"
name="filter"
/>
<label for="filter__archive" class="filter__label"
>Archive <span class="filter__archive-count">115</span></label
>`;

const createDeadLine = (deadLine) => {
  if (deadLine === null || !(deadLine instanceof DeadLine)) {
    return ``;
  }
  return `<div class="card__dates">
  <div class="card__date-deadline">
    <p class="card__input-deadline-wrap">
      <span class="card__date">${deadLine.date}</span>
      <span class="card__time">${deadLine.time}</span>
    </p>
  </div>
</div>`;
};

const createHashTags = (hashTags) => {
  if (hashTags === null || !Array.isArray(hashTags) || hashTags.length === 0) {
    return ``;
  }

  let hashTagList = ``;
  hashTags.forEach((hashTag) => {
    hashTagList += `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        ${hashTag}
      </span>
    </span>`;
  });

  return `<div class="card__hashtag">
    <div class="card__hashtag-list">
    ${hashTagList}
    </div>
  </div>`;
};

const createCard = (task) => `
<article class="card card--black">
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
      ${createDeadLine(task.deadLine)}
      ${createHashTags(task.hashTags)}
    </div>
  </div>
</div>
</div>
</article>`;

const createTaskBoardFilters = () => `<div class="board__filter-list">
<a href="#" class="board__filter">SORT BY DEFAULT</a>
<a href="#" class="board__filter">SORT BY DATE up</a>
<a href="#" class="board__filter">SORT BY DATE down</a>
</div>`;

const createTaskBoard = (tasks) => {
  let template = `${createTaskBoardFilters()}
  <div class="board__tasks">`;

  for (let task of tasks) {
    template += createCard(task);
  }

  template += `</div>${createLoadMore()}`;
  return template;
};

const createLoadMore = () => `<button class="load-more" type="button">load more</button>`;

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const getMockTasks = () => {
  return [
    new Task(`Example default task with default color`, new DeadLine(`23 September`, `11:15 PM`), [new HashTag(`#todo`), new HashTag(`#personal`), new HashTag(`#important`)]),
    new Task(`Example default task with default color`, null, [new HashTag(`#todo`), new HashTag(`#personal`), new HashTag(`#important`)]),
    new Task(`Example default task with default color`, new DeadLine(`23 September`, `11:15 PM`), null),
  ];
};

render(document.querySelector(`.board`), createTaskBoard(getMockTasks()));
render(document.querySelector(`.main__control`), createMenu());
render(document.querySelector(`.main__search`), createSearch());
render(document.querySelector(`.main__filter`), createFilter());
