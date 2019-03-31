/* tslint:disable: member-ordering forin */
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { Todo } from '../model/todo';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {

  todo: Todo;
  todoForm: FormGroup;
  estados = ['pendiente', 'resuelta'];
  fileToUpload: File = null;

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
    private router: Router,
    private todoService: TodoService) {}

  ngOnInit(): void {
    this.todo = new Todo();
    this.todoForm = new FormGroup({
      'descripcion': new FormControl(this.todo.descripcion, [
        Validators.required,
        Validators.minLength(10)
      ]),
      'estado': new FormControl(this.todo.estado, Validators.required),
      'foto': new FormControl(null, Validators.required),
    }, ); // <-- add custom validator at the FormGroup level
  }

  get descripcion() {
    return this.todoForm.get('descripcion');
  }

  get estado() {
    return this.todoForm.get('estado');
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files.item(0);
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    console.log(this.fileToUpload.type);
    if (!validImageTypes.includes(this.fileToUpload.type)) {
      this.setErrorFoto();
    } else {
      this.getBase64(this.fileToUpload).then(
        data => {
          let base64 = JSON.stringify(data);
          base64 = base64.replace('data:image/png;base64,', '');
          base64 = base64.substr(1, base64.length - 2);
          this.todo.foto = base64;
        }
      );
    }
  }

  setErrorFoto() {
    this.myInputVariable.nativeElement.value = "";
    this.todoForm.get('foto').setErrors({
      'incorrect': true
    });
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  guardar() {
    console.log(JSON.stringify(this.todo));
    this.todoService.addTodo(this.todo)
    .subscribe(todo => {
      console.log(JSON.stringify(todo));
      this.router.navigateByUrl('/');
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

}
