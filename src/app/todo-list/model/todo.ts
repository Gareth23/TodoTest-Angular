import {TodoCollection} from "./todo-collection";
import {Category} from "./category";

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  category: Category;
  todoCollection: TodoCollection;
}





