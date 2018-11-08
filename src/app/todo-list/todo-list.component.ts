import { Component, OnInit } from '@angular/core';
import {TodoCategory} from "./model/todo-category";
import {Todo} from "./model/todo";
import {TodoService} from "../shared/todo.service";
import {TodoCategoryViewModel} from "./viewmodel/todo-category-view-model";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoCategoryList: TodoCategory[] = [];
  todoList: Todo[] = [];
  currentCategory: TodoCategory;
  currentTodo: Todo;
  pageNumber: number = 0;
  readonly itemsPerPage: number = 5;
  searchString: string;

  model: TodoCategoryViewModel = {
    categoryName: '',
  };

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.getTodoCategories();
    this.getAllTodos();
    //this.getTodoPageList();
  }

  public getTodoCategories() {

    this.todoService.getAllTodoCategories().subscribe(
      res => {
        this.todoCategoryList = res;
      },
      err => {
        alert("An error has occured getting all Todo Categories");
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

  public getTodosInCategory(categoryId: number, reset: boolean = false) {

    this.todoService.getTodosInCategory(categoryId).subscribe(
      res => {
        this.todoList = res;
        if (reset)
          this.resetPageNumber();
      },
      err => {
        alert("An error has occured getting Todo's");
      }
    );
  }

  public newTodoCategory() {

    this.todoService.createNewTodoCategory(this.model).subscribe(
      res => {
        this.todoCategoryList = res;
      },
      err => {
        alert("An error has occured creating a new Category");
      }
    );

  }

  public deleteCategory(categoryId: number) {
    if (confirm("THIS WILL DELETE ALL TODO's IN THE CATEGORY -> Are you sure you want to delete this category?"))
    {
      this.todoService.removeTodoCategory(categoryId).subscribe(
        res => {
          this.getTodoCategories();
          this.selectTodoCategory(null);
        },
        err => {
          alert("An error has occured deleting Todo Category");
        }
      );
    }
  }


  public selectTodoCategory(todoCategory: TodoCategory) {
    this.currentCategory = todoCategory;

    if (todoCategory == null)
      this.getAllTodos(true);
    else
      this.getTodosInCategory(todoCategory.id, true);


  }
  private resetPageNumber()
  {
    this.pageNumber=0;
  }

  public selectedCategoryClass(todoCategory: TodoCategory): string {
    if (this.currentCategory == todoCategory)
      return "list-group-item list-group-item-dark todo-selected";
    else
      return "list-group-item list-group-item-action";
  }

  public updateTodo(todo: Todo)
  {
    this.todoService.updateTodo(todo).subscribe(
      res => {
        //this.refreshTodoCategory();
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
      case 'Monthly':
        return this.getDayOfMonth(aDate.getDate());
      default:
        return aDate.toLocaleDateString('en-ZA');
    }
  }

  private getDayOfMonth(day: number) {
    switch (day%100)
    {
      case 11:
      case 12:
      case 13:
        return day + 'th';
    }

    switch (day%10)
    {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th'

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
    const notDue = 'due-date not-due';
    const dateTimeNow = new Date();
    const dueDate = new Date(todo.dueDate);
    const difference_ms = (dateTimeNow.getTime()-dueDate.getTime());
    const difference_weekly = dateTimeNow.getDay()-dueDate.getDay();
    const difference_daily = dateTimeNow.getHours()-dueDate.getHours() + (dateTimeNow.getMinutes()-dueDate.getMinutes())/60;
    const difference_monthly = dateTimeNow.getDate()-dueDate.getDate();

    const almostDueVariance = 3;
    const oneDay = 1000*60*60*24;
    let difference = 0;
    if (todo.dueDate == null || todo.completed == true)
    {
      return 'due-date not-due';
    }
    if (todo.frequency == null )
    {
      return 'due-date';
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
           break;
        case 'Monthly':
           difference = difference_monthly;
      }
    }

    if (difference >=0)
      return overDue;
    else if (difference < 0 && difference > -almostDueVariance)
      return almostDue;
    else if (difference <= -3)
      return notDue;
  }

  public deleteTodo(todo: Todo) {
    if (confirm("Are you sure you want to delete this Todo?"))
    this.todoService.removeTodo(todo.id).subscribe(
      res => {
        this.refreshTodoCategory();
      },
      err => {
        alert("An Error occured removing todo: "+ todo.title);
      }
    );

  }

  public refreshTodoCategory()
  {
    console.log("refresh");
    this.getTodoCategories();
    if (this.currentCategory == null)
      this.getAllTodos(true);
    else
      this.getTodosInCategory(this.currentCategory.id,true);
  }

  getCheckedClass(completed: boolean) {
    if (completed)
      return "fa fa-check-square-o";
    else
      return "fa fa-square-o";
  }

  getTodoPageList() {

    this.normalisePageNumber();
    const startItem = this.pageNumber*(this.itemsPerPage);
    const filteredTodoList = this.filterTodoList();

    return filteredTodoList.reverse().slice(startItem,this.itemsPerPage+startItem);
  }

  private normalisePageNumber() {
    const maxPageCount: number = Math.ceil(this.filterTodoList().length/this.itemsPerPage)-1;
    if (this.pageNumber > maxPageCount)
      this.pageNumber = maxPageCount;
    if (this.pageNumber < 0)
      this.pageNumber = 0;
  }

  filterTodoList() : Todo[]
  {
    if (this.searchString == null || this.searchString === "")
      return this.todoList;
    return this.todoList.filter(s=> s.title.toLowerCase().includes(this.searchString.toLowerCase()) || (
      s.todoCategory != null && s.todoCategory.categoryName.toLowerCase().includes(this.searchString.toLowerCase())));
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

    this.pageNumber = this.pageNumber + pages;
    this.normalisePageNumber();

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

  updateCategory(todoCategory: string) {
    this.currentCategory.categoryName = todoCategory;
    console.log(this.currentCategory.categoryName);
    this.todoService.updateCategory(this.currentCategory).subscribe(
      res => {

      },
      err => {

      }
    );
  }
}



