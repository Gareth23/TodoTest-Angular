import {TodoCategory} from "./todo-category";
import {Frequency} from "./frequency";

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  frequency: Frequency;
  todoCategory: TodoCategory;
}





