export enum Progress {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

export interface Item {
  id: number;
  title: string;
  priority: string;
  progress: string;
  time: string;
}

export class TodoListItem implements Item {
  constructor(
    private _id: number,
    private _title: string = "",
    private _priority: string = "Low",
    private _progress: string = "To Do",
    private _time: string = new Date().toLocaleString()
  ) {}

  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }
  get title(): string {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }
  get priority(): string {
    return this._priority;
  }
  set priority(priority: string) {
    this._priority = priority;
  }
  get progress(): string {
    return this._progress;
  }
  set progress(progress: string) {
    this._progress = progress;
  }

  get time(): string {
    return this._time;
  }
  set time(time: string) {
    this._time = time;
  }
}
