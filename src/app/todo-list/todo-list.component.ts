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
  completeTodoList: Todo[] = [];
  incompleteTodoList: Todo[] = [];

  model: TodoCollectionViewModel = {
    collectionName: '',
  };

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.getTodoCollections();
    this.getAllTodos();
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

  public getAllTodos() {

    this.todoService.getAllTodos().subscribe(
      res => {
        this.todoList = res;
      },
      err => {
        alert("An error has occured getting all Todo's");
      }
    );

  }

  public getTodosInCollection(collectionId: number) {

    this.todoService.getTodosInCollection(collectionId).subscribe(
      res => {
        this.todoList = res;
      },
      err => {
        alert("An error has occured");
      }
    );
  }

  public newTodoCollection() : boolean {
    this.todoService.createNewTodoCollection(this.model).subscribe(
      res => {
        this.todoCollectionList = res;
        return true;
      },
      err => {
        alert("An error has occured creating a new Collection");
        return false;
      }
    );
    return false;
  }

  public deleteCollection(collectionId: number) {
    if (confirm("Are you sure you want to delete this collection?"))
      this.todoService.removeTodoCollection(collectionId).subscribe(
        res => {
          this.getTodoCollections();
        },
        err => {
          alert("An error has occured deleting Todo Collection");
        }
      )
  }

  public selectTodoCollection(todoCollection: TodoCollection) {
    this.currentCollection = todoCollection;

    if (todoCollection == null)
      this.getAllTodos();
    else
      this.getTodosInCollection(todoCollection.id);
  }

  public selectedCollectionClass(todoCollection: TodoCollection): any {
    if (this.currentCollection == todoCollection)
      return "list-group-item list-group-item-dark todo-selected";
    else
      return "list-group-item list-group-item-action";
  }

  public updateTodo(todo: Todo)
  {
    this.todoService.updateTodo(todo).subscribe(
      res => {
        if (this.currentCollection == null)
        this.todoList = res;
        else
          this.getTodosInCollection(this.currentCollection.id);
      },
      err => {
        alert("An error occured updating Todo");
      }
    );
  }

  public completedClass(completed: boolean) {
      return completed == true ? "btn btn-info pull-right btn-sm" :  "btn btn-action pull-right btn-sm";

  }

  public formatDate(date: Date)
  {
    const aDate = new Date(date);
    return aDate.toLocaleDateString('en-ZA');
  }

}



