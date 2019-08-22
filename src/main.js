import {createMenuTemplate} from './components/menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createTaskBoardTemplate} from './components/taskboard';
import {getMockTasks} from './components/datasource';

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

render(document.querySelector(`.board`), createTaskBoardTemplate(getMockTasks()));
render(document.querySelector(`.main__control`), createMenuTemplate());
render(document.querySelector(`.main__search`), createSearchTemplate());
render(document.querySelector(`.main__filter`), createFilterTemplate());
