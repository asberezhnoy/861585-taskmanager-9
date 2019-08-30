function Filter(type, title, count) {
  this.title = title;
  this.count = count;

  this.getType = function () {
    return type;
  };
}

Filter.FILTERTYPE_ALL = `all`;
Filter.FILTERTYPE_FAVORITES = `favorites`;
Filter.FILTERTYPE_OVERDUE = `overdue`;
Filter.FILTERTYPE_REPEATINGS = `repeating`;
Filter.FILTERTYPE_TAGS = `tags`;
Filter.FILTERTYPE_ARCHIVE = `archive`;
Filter.FILTERTYPE_TODAY = `today`;

function FilterFactory() {
}

FilterFactory.createFilter = (tasks, type, title, isFilterTaskCallback) => {
  const count = tasks.reduce(function (previousValue, currentValue) {
    return isFilterTaskCallback(currentValue) ? previousValue + 1 : previousValue;
  }, 0);
  return new Filter(type, title, count);
};

FilterFactory.createAllFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_ALL, `All`, () => true);
FilterFactory.createFavoritesFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_FAVORITES, `Favorites`, (task) => task.isFavorite);
FilterFactory.createOverdueFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_OVERDUE, `Overdue`, (task) => task.isDeadLine());
FilterFactory.createRepeatingFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_REPEATINGS, `Repeating`, (task) => task.isRepeating());
FilterFactory.createTagsFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_TAGS, `Tags`, (task) => task.hasTags());
FilterFactory.createArchiveFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_ARCHIVE, `Archive`, (task) => task.isArchive);
FilterFactory.createTodayaFilter = (tasks) => FilterFactory.createFilter(tasks, Filter.FILTERTYPE_TODAY, `Today`, (task) => {
  const today = new Date();
  const taskDt = new Date(task.dueDate);

  return today.getFullYear() === taskDt.getFullYear() && today.getMonth() === taskDt.getMonth() && today.getDate() === taskDt.getDate();
});

const createFilterTemplate = (filter, isChecked, isDisabled = false) => `
    <input
    type="radio"
    id="filter__${filter.type}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? ` checked` : ``}
    ${isDisabled ? ` disabled` : ``}    
    />
    <label for="filter__${filter.type}" class="filter__label">
    ${filter.title} <span class="filter__${filter.type}-count">${filter.count}</span></label
    >`;

const createFiltersTemplate = (tasks) => {
  const filters = [FilterFactory.createAllFilter(tasks), FilterFactory.createOverdueFilter(tasks), FilterFactory.createTodayaFilter(tasks),
    FilterFactory.createFavoritesFilter(tasks), FilterFactory.createRepeatingFilter(tasks), FilterFactory.createTagsFilter(tasks),
    FilterFactory.createArchiveFilter(tasks)];

  return filters.map((filter) => createFilterTemplate(filter, filter.getType() === Filter.FILTERTYPE_ALL)).join(``);
};

export {Filter as default, createFiltersTemplate};
