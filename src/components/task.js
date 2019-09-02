function RepeatingDays() {
  this.Mo = false;
  this.Tu = false;
  this.We = false;
  this.Th = false;
  this.Fr = false;
  this.Sa = false;
  this.Su = false;
}

function Task(description, dueDate) {
  this.description = description;
  this.dueDate = dueDate;
  this.tags = new Set();
  this.color = null;
  this.repeatingDays = new RepeatingDays();
  this.isFavorite = false;
  this.isArchive = false;
}

Task.prototype = {
  isRepeating() {
    return this.repeatingDays !== null && this.repeatingDays.Mo || this.repeatingDays.Tu || this.repeatingDays.We
     || this.repeatingDays.Th || this.repeatingDays.Fr || this.repeatingDays.Sa || this.repeatingDays.Su;
  },

  isDeadLine() {
    return Date.now() > this.dueDate;
  },

  hasTags() {
    return this.tags !== null && this.tags.size > 0;
  }
};

export {Task as default, RepeatingDays};
