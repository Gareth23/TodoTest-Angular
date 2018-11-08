import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Todo} from "../todo-list/model/todo";
import {Observable} from 'rxjs';
import {TodoCategory} from "../todo-list/model/todo-category";
import {NewTodoViewModel, TodoDetailsViewModel} from "../todo-list/viewmodel/todo-view-model";
import {Frequency} from "../todo-list/model/frequency";
import {TodoCategoryViewModel} from "../todo-list/viewmodel/todo-category-view-model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private rootUrl = "http://localhost:8080";
  private createTodoUrl = this.rootUrl + "/todo/create";
  private allTodoUrl = this.rootUrl + "/todo/all";
  private createTodoCategoryUrl = this.rootUrl + "/todocategory/create";
  private allTodoCategoryUrl = this.rootUrl + "/todocategory/all";
  private removeTodoCategoryUrl = this.rootUrl + "/todocategory/remove/";
  private removeTodoUrl = this.rootUrl + "/todo/remove/";
  private allTodosInCategoryUrl = this.rootUrl + "/todo/incategory/";
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

  getAllTodoCategories() : Observable<TodoCategory[]>{
    return this.http.get<TodoCategory[]>(this.allTodoCategoryUrl);
  }

  createNewTodoCategory(todoCategory: TodoCategoryViewModel) : Observable<TodoCategory[]>
  {
    return this.http.post<TodoCategory[]>(this.createTodoCategoryUrl,todoCategory);
  }

  removeTodoCategory(id: number) : Observable<any>
  {
    return this.http.delete(this.removeTodoCategoryUrl+id);
  }

  removeTodo(id: number) : Observable<any>
  {
    return this.http.delete(this.removeTodoUrl+id);
  }

  getTodosInCategory(categoryId: number) : Observable<Todo[]>
  {
    return this.http.get<Todo[]>(this.allTodosInCategoryUrl + categoryId);

  }

  updateTodo(todo: Todo) : Observable<Todo[]> {
    return this.http.post<Todo[]>(this.createTodoUrl,todo);
  }

  updateCategory(category : TodoCategory) : Observable<TodoCategory[]>
  {
    console.log("here");
    return this.http.post<TodoCategory[]>(this.createTodoCategoryUrl,category);
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
