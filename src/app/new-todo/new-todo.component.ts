import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TodoService} from "../shared/todo.service";
import {TodoViewModel} from "../todo-list/viewmodel/todo-view-model";

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  model: TodoViewModel = {
    title:'',
    description:'',
    dueDate:''
  };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }



  addTodo(): void{

    this.todoService.createNewTodo(this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("An Error has occurred creating Todo");
      }
    )
  }

}
