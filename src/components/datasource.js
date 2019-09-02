import Task, {RepeatingDays} from './task';

const TASKS_COUNT = 20;
const HASHTAGS_MAX_COUNT = 3;

const AvailableColors = Array.from(new Set([`black`, `yellow`, `blue`, `green`, `pink`]));
const AvailableHashTags = Array.from(new Set([`omework`, `theory`, `practice`, `intensive`, `keks`]));
const Descriptions = Array.from(new Set([`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`]));

const getDueDate = () => Date.now() + (1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000) * (Math.round(Math.random()) === 0 ? 1 : -1);

const getDescription = () => Descriptions[Math.floor(Math.random() * Descriptions.length)];

const getColor = () => AvailableColors[Math.floor(Math.random() * AvailableColors.length)];

const getHashTags = () => {
  const maxTagsCount = Math.floor(Math.random() * HASHTAGS_MAX_COUNT);
  const result = new Set();
  for (let i = 0; i < maxTagsCount; i++) {
    result.add(AvailableHashTags[Math.floor(Math.random() * AvailableHashTags.length)]);
  }
  return result;
};

const makeTask = () => {
  const task = new Task(getDescription(), getDueDate());

  getHashTags().forEach((value) => task.tags.add(value));
  task.color = getColor();
  if (Math.round(Math.random()) === 1) {
    const obj = new RepeatingDays();
    const days = Object.keys(obj).filter((key) => obj.hasOwnProperty(key) && typeof (key) !== `function`);

    for (let i = 0; i < days.length; i++) {
      task.repeatingDays[days[i]] = Math.round(Math.random()) === 1 ? true : false;
    }
  }

  return task;
};

const getMockTasks = () => {
  const result = new Array(TASKS_COUNT);

  for (let i = 0; i < result.length; i++) {
    result[i] = makeTask();
  }

  return result;
};

export {getMockTasks, AvailableColors};
