import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private todos: Todo[];

  constructor(
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
    .subscribe(todos => {
      this.todos = todos;
    });
  }

  goNewTodo(){
    this.router.navigateByUrl('/new');
  }

}

