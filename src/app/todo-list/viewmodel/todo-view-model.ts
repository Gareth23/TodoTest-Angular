import {TodoCategory} from "../model/todo-category";
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
  todoCategory: TodoCategory;
}
