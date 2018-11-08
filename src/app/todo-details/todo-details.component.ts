import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TodoService } from "../shared/todo.service";
import {Todo} from "../todo-list/model/todo";
import {DateTimeModel} from "../todo-list/model/dateTimeModel";
import {Frequency} from "../todo-list/model/frequency";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  dateTime: DateTimeModel = new DateTimeModel();
  frequencyList: Frequency[] = [];

  @Input() todo : Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    if (this.todo.dueDate != null && this.todo != null)
    {
      this.dateTime.date = new Date(this.todo.dueDate).toLocaleDateString('en-za');
      this.dateTime.time = new Date(this.todo.dueDate).toLocaleTimeString('en-za');
    }
    this.getTodoFrequencyList();
  }

  updateTodoDetail () : void
  {
    const combinedDate = this.dateTime.getDateTime();
    console.log("dueDate"+ combinedDate);

    this.todo.dueDate = combinedDate;
    //this.todo.frequency = this.frequencyList[0];
    this.todoService.updateTodoDetails(this.todo).subscribe(
      res => {
      },
      err => {
        alert("An Error occured updating todo details");
      }

    );
  }

  getTodoFrequencyList () : void
  {
    this.todoService.getFrequencyList().subscribe(
      res => {
        this.frequencyList = res;
      },
      err =>{
        alert("An Error occured getting the list of frequencies")
      }
    );
  }
}
