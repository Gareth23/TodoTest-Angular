import {TodoCollection} from "../model/todo-collection";
import {Frequency} from "../model/frequency";

export interface TodoDetailsViewModel {
  id: number;
  title:string;
  frequency: Frequency;
  dueDate: Date;
  description:string;

}

export interface NewTodoViewModel {
  title:string;
  todoCollection: TodoCollection;
}
