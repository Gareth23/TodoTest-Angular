import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Todo} from "../todo-list/model/todo";
import {Observable} from 'rxjs';
import {TodoCollection} from "../todo-list/model/todo-collection";
import {TodoCollectionViewModel} from "../todo-list/viewmodel/todo-collection-view-model";
import {NewTodoViewModel, TodoDetailsViewModel} from "../todo-list/viewmodel/todo-view-model";
import {Frequency} from "../todo-list/model/frequency";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private rootUrl = "http://localhost:8080";
  private createTodoUrl = this.rootUrl + "/todo/create";
  private allTodoUrl = this.rootUrl + "/todo/all";
  private createTodoCollection = this.rootUrl + "/todocollection/create";
  private allTodoCollectionUrl = this.rootUrl + "/todocollection/all";
  private removeTodoCollectionUrl = this.rootUrl + "/todocollection/remove/";
  private removeTodoUrl = this.rootUrl + "/todo/remove/";
  private allTodosInCollectionUrl = this.rootUrl + "/todo/incollection/";
  private updateTodoDetailsUrl = this.rootUrl + "/todo/updatedetails";
  private getAllFrequencyUrl = this.rootUrl + "/frequency/all";

  constructor(private http: HttpClient) {

    }

   getAllTodos() : Observable<Todo[]>{
    return this.http.get<Todo[]>(this.allTodoUrl);
  }

  createNewTodo(todo: NewTodoViewModel) : Observable<any> {
  return this.http.post(this.createTodoUrl,todo);
  }

  getAllTodoCollections() : Observable<TodoCollection[]>{
    return this.http.get<TodoCollection[]>(this.allTodoCollectionUrl);
  }

  createNewTodoCollection(todoCollection: TodoCollectionViewModel) : Observable<TodoCollection[]>
  {
    return this.http.post<TodoCollection[]>(this.createTodoCollection,todoCollection);
  }

  removeTodoCollection(id: number) : Observable<any>
  {
    return this.http.delete(this.removeTodoCollectionUrl+id);
  }

  removeTodo(id: number) : Observable<any>
  {
    return this.http.delete(this.removeTodoUrl+id);
  }

  getTodosInCollection(collectionId: number) : Observable<Todo[]>
  {
    return this.http.get<Todo[]>(this.allTodosInCollectionUrl + collectionId);

  }

  updateTodo(todo: Todo) : Observable<Todo[]> {
    return this.http.post<Todo[]>(this.createTodoUrl,todo);
  }

  updateTodoDetails(todo: TodoDetailsViewModel) : Observable<any>
  {
    return this.http.post(this.updateTodoDetailsUrl,todo);
  }

  getFrequencyList() : Observable<Frequency[]>
  {
    return this.http.get<Frequency[]>(this.getAllFrequencyUrl);
  }
}
