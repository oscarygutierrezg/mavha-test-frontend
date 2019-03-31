    // tslint:disable-next-line:max-line-length
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosUrl = '/api/todos';
  todosChangeObs = new Subject<Todo[]>();


  constructor(
    private http: HttpClient,
    private  messageService: MessageService
  ) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.api + this.todosUrl)
      .pipe(
        tap(_ => {
          this.todosChangeObs.next(_);
          this.log('fetched Todos');
        }),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  getTodosByFilter(todoFilter: Todo): Observable<Todo[]> {
    const filterEstado = todoFilter.estado ? todoFilter.estado : 'X';
    const filterDescripcion = todoFilter.descripcion  ? todoFilter.descripcion : 'X';
    const filterId = todoFilter.id ? todoFilter.id : 0;
    return this.http.get<Todo[]>(environment.api + this.todosUrl + '/' + filterId + '/'
    + filterDescripcion + '/' + filterEstado)
      .pipe(
        tap(_ => {
          this.todosChangeObs.next(_);
          this.log('fetched Todos');
        }),
        catchError(this.handleError<Todo[]>('getTodos', []))
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.api + this.todosUrl, todo, httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added Todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(environment.api + this.todosUrl + '/' + todo.id + '/' + todo.estado, httpOptions).pipe(
      tap(_ => this.log(`updated Todo id=${todo.id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }
}
