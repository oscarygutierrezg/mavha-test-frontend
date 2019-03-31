import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { MaterialModule } from './angular-material/angular-material.module';
import { TablePagination } from './angular-material/components/table-pagination/table-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ImagenPreviewComponent } from './angular-material/components/imagen-preview/imagen-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    TablePagination,
    ImagenPreviewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    ImagenPreviewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

