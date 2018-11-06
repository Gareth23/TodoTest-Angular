import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../todo-list/model/todo";

@Pipe({
  name: 'orderByCompleted'
})
export class OrderByCompletedPipe implements PipeTransform {

  transform(todoList: Todo[] ): Todo[] {
    return todoList.sort((a, b) => {return a.completed == b.completed ? 0 : a.completed? 1 : -1});
  }

}
