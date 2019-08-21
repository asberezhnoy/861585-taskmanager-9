import Task, {DeadLine, HashTag} from './task';

const getMockTasks = () => {
  return [
    new Task(`Example default task with default color`, new DeadLine(`23 September`, `11:15 PM`), [new HashTag(`#todo`), new HashTag(`#personal`), new HashTag(`#important`)]),
    new Task(`Example default task with default color`, null, [new HashTag(`#todo`), new HashTag(`#personal`), new HashTag(`#important`)]),
    new Task(`Example default task with default color`, new DeadLine(`23 September`, `11:15 PM`), null),
  ];
};

export {getMockTasks};
