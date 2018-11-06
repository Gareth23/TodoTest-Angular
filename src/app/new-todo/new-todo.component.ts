import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from "../shared/todo.service";
import {NewTodoViewModel} from "../todo-list/viewmodel/todo-view-model";
import {TodoCollection} from "../todo-list/model/todo-collection";

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  @Input() collection : TodoCollection;
  @Output() refreshTodoEmitter = new EventEmitter();

  model: NewTodoViewModel = {
    title:'',
    todoCollection : this.collection
  };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  addTodo(): void
  {
    this.model.todoCollection = this.collection;
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
