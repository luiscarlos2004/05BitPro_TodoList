import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {PrincipalTareasComponent} from '../app/obtener-tareas/principal-tareas.component'
import { FormsModule } from '@angular/forms';
// import swal, { SweetAlert }from 'sweetalert/typings/core';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalTareasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    // SweetAlert
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
