import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Router, Routes} from "@angular/router";
import { RouterModule } from "@angular/router";
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NewTodoComponent } from './new-todo/new-todo.component';
import { CommonModule } from "@angular/common";

const appRoutes : Routes = [
  {
    path: 'todoList',
    component: TodoListComponent
  },
  {
    path: '',
    component: TodoListComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactComponent
  }
  ,
  {
    path: '**',
    component: TodoListComponent
  }


]

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    TodoListComponent,
    ContactComponent,
    NewTodoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
