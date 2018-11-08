import { Component, OnInit } from '@angular/core';
import {TodoCollection} from "./model/todo-collection";
import {Todo} from "./model/todo";
import {TodoService} from "../shared/todo.service";
import {TodoCollectionViewModel} from "./viewmodel/todo-collection-view-model";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoCollectionList: TodoCollection[] = [];
  todoList: Todo[] = [];
  currentCollection: TodoCollection;
  currentTodo: Todo;
  pageNumber: number = 0;
  readonly itemsPerPage: number = 5;
  searchString: string;

  model: TodoCollectionViewModel = {
    collectionName: '',
  };

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.getTodoCollections();
    this.getAllTodos();
    //this.getTodoPageList();
  }

  public getTodoCollections() {

    this.todoService.getAllTodoCollections().subscribe(
      res => {
        this.todoCollectionList = res;
      },
      err => {
        alert("An error has occured getting all Todo Collections");
      }
    );

  }

  public getAllTodos(reset: boolean = false) {

    this.todoService.getAllTodos().subscribe(
      res => {
        this.todoList = res;
        if (reset)
          this.resetPageNumber();
      },
      err => {
        alert("An error has occured getting all Todo's");
      }
    );

  }

  public getTodosInCollection(collectionId: number, reset: boolean = false) {

    this.todoService.getTodosInCollection(collectionId).subscribe(
      res => {
        this.todoList = res;
        if (reset)
          this.resetPageNumber();
      },
      err => {
        alert("An error has occured");
      }
    );
  }

  public newTodoCollection() {

    this.todoService.createNewTodoCollection(this.model).subscribe(
      res => {
        this.todoCollectionList = res;
      },
      err => {
        alert("An error has occured creating a new Collection");
      }
    );

  }

  public deleteCollection(collectionId: number) {
    if (confirm("THIS WILL DELETE ALL TODO's IN THE COLLECTION -> Are you sure you want to delete this collection?"))
    {
      this.todoService.removeTodoCollection(collectionId).subscribe(
        res => {
          this.getTodoCollections();
          this.selectTodoCollection(null);
        },
        err => {
          alert("An error has occured deleting Todo Collection");
        }
      );
    }
  }


  public selectTodoCollection(todoCollection: TodoCollection) {
    this.currentCollection = todoCollection;

    if (todoCollection == null)
      this.getAllTodos(true);
    else
      this.getTodosInCollection(todoCollection.id, true);


  }
  private resetPageNumber()
  {
    this.pageNumber=0;
  }

  public selectedCollectionClass(todoCollection: TodoCollection): string {
    if (this.currentCollection == todoCollection)
      return "list-group-item list-group-item-dark todo-selected";
    else
      return "list-group-item list-group-item-action";
  }

  public updateTodo(todo: Todo)
  {
    this.todoService.updateTodo(todo).subscribe(
      res => {
        //this.refreshTodoCollection();
      },
      err => {
        alert("An error occured updating Todo");
      }
    );
  }

  public completedClass(completed: boolean) {
      return completed == true ? "btn btn-info pull-right btn-sm" :  "btn btn-action pull-right btn-sm";

  }

  public formatDateTime(todo: Todo)
  {
    const aDate = new Date(todo.dueDate);
    if (todo.frequency == null)
    {
      return aDate.toLocaleDateString('en-ZA');
    }
    switch (todo.frequency.name)
    {
      case 'Daily':
        const formattedTime = aDate.toLocaleTimeString('en-za',{hour12: false});
        return formattedTime.substr(0,formattedTime.lastIndexOf(':'));
      case 'Weekly':
        return this.getDayAsString(aDate.getDay());
      case 'Once':
        return aDate.toLocaleDateString('en-ZA');
      default:
        return aDate.toLocaleDateString('en-ZA');
    }
  }

  private getDayAsString(day: number)
  {
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[day];
  }

  public getDateTimeClass(todo: Todo)
  {
    const almostDue = 'due-date almost-due';
    const overDue = 'due-date over-due';
    const notDue = 'due-date';
    const dateTimeNow = new Date();
    const dueDate = new Date(todo.dueDate);
    const difference_ms = (dateTimeNow.getTime()-dueDate.getTime());
    const difference_weekly = dateTimeNow.getDay()-dueDate.getDay();
    const difference_daily = dateTimeNow.getHours()-dueDate.getHours() + (dateTimeNow.getMinutes()-dueDate.getMinutes())/60;
    const oneDay = 1000*60*60*24;
    let difference = 0;
    if (todo.dueDate == null || todo.completed == true)
    {
      return notDue;
    }
    if (todo.frequency == null )
    {
      difference = difference_ms/oneDay;
    }
    else
    {
      switch (todo.frequency.name)
      {
         case 'Daily':
           difference = difference_daily;
           break;
         case 'Weekly':
           difference = difference_weekly;
           break;
         case 'Once':
           difference = difference_ms/oneDay;
      }
    }

    if (difference >=0)
      return overDue;
    else if (difference < 0 && difference > -3)
      return almostDue;
    else if (difference <= -3)
      return notDue;
  }

  public deleteTodo(todo: Todo) {
    if (confirm("Are you sure you want to delete this Todo?"))
    this.todoService.removeTodo(todo.id).subscribe(
      res => {
        this.refreshTodoCollection();
      },
      err => {
        alert("An Error occured removing todo: "+ todo.title);
      }
    );

  }

  public refreshTodoCollection()
  {
    this.getTodoCollections();
    if (this.currentCollection == null)
      this.getAllTodos(true);
    else
      this.getTodosInCollection(this.currentCollection.id,true);
  }

  getCheckedClass(completed: boolean) {
    if (completed)
      return "fa fa-check-square-o";
    else
      return "fa fa-square-o";
  }

  getTodoPageList() {
    const startItem = this.pageNumber*(this.itemsPerPage);
    const filteredTodoList = this.filterTodoList();
    return filteredTodoList.reverse().slice(startItem,this.itemsPerPage+startItem);
  }

  filterTodoList() : Todo[]
  {
    if (this.searchString == null || this.searchString === "")
      return this.todoList;
    return this.todoList.filter(s=> s.title.toLowerCase().includes(this.searchString.toLowerCase()) || (
      s.todoCollection != null && s.todoCollection.collectionName.toLowerCase().includes(this.searchString.toLowerCase())));
  }

  setPage(page: number)
  {
    this.pageNumber = page;
  }

  getPagesNumbers() : number[] {
    const maxPageCount: number = Math.ceil(this.filterTodoList().length/this.itemsPerPage);

    let pageNumbers: number[]=[];
    for (let i = 0; i < maxPageCount ; i++)
    {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  flipPages(pages: number) {
    const maxPageCount: number = Math.ceil(this.filterTodoList().length/this.itemsPerPage)-1;
    const newPageNumber = this.pageNumber + pages;
    if (newPageNumber > maxPageCount)
      this.pageNumber = maxPageCount;
    else if (newPageNumber < 0)
      this.pageNumber = 0;
    else
      this.pageNumber = newPageNumber;

  }

  activePageClass(page: number) {
    if ( page == this.pageNumber)
      return "page-item active";
    else
      return "page-item";
  }

  navigationClass() : string {
    if (this.currentTodo != null)
    {
      return 'navigation-expanded';
    }
    return 'navigation'
  }
}



