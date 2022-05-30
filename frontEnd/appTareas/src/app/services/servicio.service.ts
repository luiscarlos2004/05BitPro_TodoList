import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TareasModelo} from '../models/tareas.model';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  URL = 'http://localhost:3000'
  constructor(private http:HttpClient) { }
  tareas:TareasModelo[] = []
  datosTarea:TareasModelo = {
    tipo:'',
    autor:'',
    mensaje:'',
    fecha:'',
    hora:'',
    etiqueta:'',
    urgencia:'',
    fechaFinal:''
  }
  getTareas(){
    let peticion = this.http.get<TareasModelo[]>(this.URL + '/tareas');
    return peticion;
  }
  postTarea(datos:TareasModelo){
    let peticion = this.http.post(this.URL + '/tareas',datos);
    return peticion;
  }
  deleteTarea(id:string){
    let peticion = this.http.delete(this.URL + '/tareas/' + id);
    return peticion;
  }
  editarTarea(datos:TareasModelo){
    let peticion = this.http.put(this.URL + '/tarease/'+datos._id,datos);
    return peticion;
  }
}
