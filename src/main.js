import {createMenuTemplate} from './components/menu';
import {createSearchTemplate} from './components/search';
import {createFiltersTemplate} from './components/filter';
import {createTaskTemplate, createTaskBoardFiltersTemplate, createEditTaskTemplate} from './components/taskboard';
import {getMockTasks} from './components/datasource';

function Position() {}
Position.Beforebegin = `beforebegin`;
Position.Afterbegin = `afterbegin`;
Position.Beforeend = `beforeend`;
Position.afterend = `afterend`;

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const taskBoard = {
  portionSize: 8,
  showedTaskCount: 0,
  tasks: getMockTasks(),

  getNextTaskPortion() {
    let template = ``;

    const lastElementIndex = this.tasks.length < (this.showedTaskCount + this.portionSize) ? this.tasks.length : this.showedTaskCount + this.portionSize;

    for (let i = this.showedTaskCount; i < lastElementIndex; i++, this.showedTaskCount++) {
      template += i === 0 ? createEditTaskTemplate(this.tasks[i]) : createTaskTemplate(this.tasks[i]);
    }
    return template;
  }
};

render(document.querySelector(`.board`), createTaskBoardFiltersTemplate(), Position.Beforeend);
render(document.querySelector(`.board`), `<div class="board__tasks">${taskBoard.getNextTaskPortion()}</div>`, Position.Beforeend);
render(document.querySelector(`.board`), `<button class="load-more" type="button">load more</button>`, Position.Beforeend);
render(document.querySelector(`.main__control`), createMenuTemplate(), Position.Beforeend);
render(document.querySelector(`.main__search`), createSearchTemplate(), Position.Beforeend);
render(document.querySelector(`.main__filter`), createFiltersTemplate(taskBoard.tasks), Position.Beforeend);

document.querySelector(`.load-more`).addEventListener(`click`, () => {
  const template = taskBoard.getNextTaskPortion();
  render(document.querySelector(`.board__tasks`), template, Position.Beforeend);
  if (taskBoard.tasks.length === taskBoard.showedTaskCount) {
    document.querySelector(`.load-more`).classList.toggle(`visually-hidden`);
  }
});

