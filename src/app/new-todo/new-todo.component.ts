import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from "../shared/todo.service";
import {NewTodoViewModel} from "../todo-list/viewmodel/todo-view-model";
import {TodoCategory} from "../todo-list/model/todo-category";

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  @Input() category : TodoCategory;
  @Output() refreshTodoEmitter = new EventEmitter();

  model: NewTodoViewModel = {
    title:'',
    todoCategory : this.category
  };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  addTodo(): void
  {
    this.model.todoCategory = this.category;
    this.todoService.createNewTodo(this.model).subscribe(
      res => {
        this.refreshTodoList();
      },
      err => {
        alert("An Error has occurred creating Todo");
      }
    );
  }

  refreshTodoList ()
  {
    this.refreshTodoEmitter.emit();
  }

}
