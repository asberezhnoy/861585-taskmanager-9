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

export {Task as default, HashTag, DeadLine};
