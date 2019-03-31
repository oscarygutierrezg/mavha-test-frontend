import {Component, OnInit, ViewChild, Input, OnDestroy} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { Todo } from 'src/app/model/todo';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { ImagenPreviewComponent } from '../imagen-preview/imagen-preview.component';

@Component({
  selector: 'table-pagination',
  styleUrls: ['table-pagination.css'],
  templateUrl: 'table-pagination.html',
})
export class TablePagination implements OnInit, OnDestroy  {
  displayedColumns: string[] = ['id', 'descripcion', 'estado', 'foto', 'cambio'];
  dataSource: any;
  private todoFilter: Todo;
  private todos: Todo[];
  private ids: number[] = [];
  private todosChangeObs: Subscription;

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.todoFilter = new Todo();
    this.todosChangeObs = this.todoService.todosChangeObs.subscribe( (todos: Todo[]) => {
        if ( this.ids.length === 0 ) {
          todos.forEach( t => {
            this.ids.push(t.id);
          });
        }
        this.todos = todos;
        this.dataSource = new MatTableDataSource<Todo>(this.todos);
        this.dataSource.paginator = this.paginator;
    });
  }


  ngOnDestroy() {
    this.todosChangeObs.unsubscribe();
  }

  filtrar() {
    this.todoService.getTodosByFilter(this.todoFilter).subscribe(todos => {
      console.log(JSON.stringify(todos));
    });
  }

  onViewImagen( base64Value: string ) {
    const dialogRef = this.dialog.open(ImagenPreviewComponent, {
      data: {
        title: 'Ver Imagen',
        foto: base64Value
       }
    });
  }

  cambiarEstado(todo: Todo) {
    todo.estado = todo.estado === 'pendiente' ? 'resuelta' : 'pendiente';
    this.todoService.updateTodo(todo).subscribe(todoUpdated => {
      console.log(JSON.stringify(todoUpdated));
    });
  }
}


