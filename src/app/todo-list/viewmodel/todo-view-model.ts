import {TodoCollection} from "../model/todo-collection";

export interface TodoViewModel {
  title:string;
  description:string;
  dueDate:string;
}

export interface newTodoViewModel {
  title:string;
  todoCollection: TodoCollection;
}
