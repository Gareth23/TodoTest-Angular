import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../todo-list/model/todo";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(todoList: Todo[], searchString: string): Todo[] {
    if (searchString == null || searchString === "")
    {
      return todoList;
    }
    return todoList.filter(s=> s.title.toLowerCase().includes(searchString.toLowerCase()) || (
                          s.todoCategory != null && s.todoCategory.categoryName.toLowerCase().includes(searchString.toLowerCase())));
  }

}
