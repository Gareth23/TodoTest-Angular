import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TodoDetailsViewModel } from "../todo-list/viewmodel/todo-view-model";
import { TodoService } from "../shared/todo.service";
import {Todo} from "../todo-list/model/todo";
import {DateTimeModel} from "../todo-list/model/dateTimeModel";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {


  model: TodoDetailsViewModel = {
    id: -1,
    title: '',
    description: '',
    frequency: {id:-1,name:''},
    dueDate: null
  };

  dateTime: DateTimeModel = new DateTimeModel();

  selectedItem: string ='';

  @Input() todo : Todo;
  @Output() refreshTodoEmitter = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
      this.refreshModel();
      console.log("refreshed: " + this.todo.id);
  }

  updateTodoDetail () : void
  {

    console.log("date: " + this.dateTime.date);
    console.log("Time: " + this.dateTime.time);

    const combinedDate = this.dateTime.getDateTime();
    console.log("dueDate"+ combinedDate.toLocaleString("en-za"));
    this.model.dueDate = combinedDate;
    this.todoService.updateTodoDetails(this.model).subscribe(
      res => {
        this.refreshTodo();
        this.refreshTodoLocal();

      },
      err => {

        alert("An Error occured updating todo details");
      }

    );
    console.log("date: " + this.model.dueDate.toLocaleDateString("en-za"));
    console.log("Time: " + this.model.dueDate.toLocaleTimeString("en-za"));
  }

  refreshTodo ()
  {
    this.refreshTodoEmitter.emit();
  }

  private refreshTodoLocal()
{
  //this.todo.id = this.model.id  ;
  this.todo.title = this.model.title ;
  this.todo.frequency = this.model.frequency;
  this.todo.description = this.model.description ;
  this.todo.dueDate = this.model.dueDate ;
  this.dateTime.date = this.model.dueDate.toLocaleDateString();
  this.dateTime.time = this.model.dueDate.toLocaleTimeString();
}

  private refreshModel()
  {
    this.model.id = this.todo.id;
    this.model.title = this.todo.title;
    this.model.frequency = this.todo.frequency;
    this.model.description = this.todo.description;
    this.model.dueDate = this.todo.dueDate;

   //this.dateTime.date = this.todo.dueDate == null ? "" : this.todo.dueDate.toLocaleDateString();
   //this.dateTime.time = this.todo.dueDate == null ? "" : this.todo.dueDate.toLocaleTimeString();
    console.log("DateTime: " + this.dateTime.getDateTime())
  }

}
