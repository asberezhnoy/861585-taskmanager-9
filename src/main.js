import {Menu} from './components/menu';
import {SearchBar} from './components/search';
import {Filter} from './components/filter';
import {TaskBoard, TaskBoardFilter} from './components/taskboard';
import {getMockTasks} from './components/datasource';

const Position = {
  BeforeBegin: `beforebegin`,
  AfterBegin: `afterbegin`,
  BeforeEnd: `beforeend`,
  AfterEnd: `afterend`
};

const render = (container, template, position) => {
  if (typeof (template) === `string`) {
    container.insertAdjacentHTML(position, template);
    return;
  }

  if (position === Position.AfterBegin) {
    container.prepend(template);
  } else if (position === Position.BeforeBegin) {
    container.before(template);
  } else if (position === Position.AfterEnd) {
    container.after(template);
  } else if (position === Position.BeforeEnd) {
    container.append(template);
  }
};

const tasks = getMockTasks();
const filter = new Filter(tasks);
const menu = new Menu();
const searchBar = new SearchBar();
const taskBoardFilter = new TaskBoardFilter();
const taskBoard = new TaskBoard(tasks);

render(document.querySelector(`.board`), taskBoardFilter.getElement(), Position.BeforeEnd);
render(document.querySelector(`.board`), taskBoard.getElement(), Position.BeforeEnd);
render(document.querySelector(`.main__control`), menu.getElement(), Position.BeforeEnd);
render(document.querySelector(`.main__search`), searchBar.getElement(), Position.BeforeEnd);
render(document.querySelector(`.main__filter`), filter.getElement(), Position.AfterBegin);
