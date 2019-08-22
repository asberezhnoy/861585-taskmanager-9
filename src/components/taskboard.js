
import {DeadLine} from './task';

const createDeadLineTemplate = (deadLine) => {
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

const createHashTagsTemplate = (hashTags) => {
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

const createCardTemplate = (task) => `
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
        ${createDeadLineTemplate(task.deadLine)}
        ${createHashTagsTemplate(task.hashTags)}
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

const createLoadMoreTemplate = () => `<button class="load-more" type="button">load more</button>`;

const createTaskBoardTemplate = (tasks) => {
  let template = `${createTaskBoardFiltersTemplate()}
    <div class="board__tasks">`;

  for (let task of tasks) {
    template += createCardTemplate(task);
  }

  template += `</div>${createLoadMoreTemplate()}`;
  return template;
};

export {createTaskBoardTemplate};
