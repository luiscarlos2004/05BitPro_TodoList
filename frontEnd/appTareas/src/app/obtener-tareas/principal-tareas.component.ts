import { Component, OnInit} from '@angular/core';
import {ServicioService} from '../services/servicio.service';
import { NgForm } from '@angular/forms';
import { TareasModelo } from '../models/tareas.model';
import Swal from 'sweetalert2';
// import swal from 'sweetalert';
declare var JQuery:any;
declare var $:any;
@Component({
  selector: 'principal-tareas',
  templateUrl: './principal-tareas.component.html',
  styleUrls: ['./principal-tareas.component.css']
})
export class PrincipalTareasComponent implements OnInit{

  constructor(public servicio:ServicioService) { }
  ngOnInit() {
    this.obtenerTareas();
  }
  public acordion(event:any){
    $(event).slideToggle();
  }
  obtenerTareas(){
    this.servicio.getTareas().subscribe({
      next:(res)=>{this.servicio.tareas = res},
      error:(err)=>{console.log(err)}
    });
  }
  crearTarea(dato:NgForm){
    if(dato.value._id){
      this.servicio.editarTarea(dato.value).subscribe({
        next:(res)=>{console.log(res); dato.reset(); this.obtenerTareas()},
        error:(err)=>{console.log(err)}
      })
    }else{
      this.servicio.postTarea(dato.value).subscribe({
        next:(res)=>{console.log(res); dato.reset();this.obtenerTareas()},
        error:(err)=>{console.log(err)},
      });
    }
  }
  eliminarTarea(id:any){
    Swal.fire({
      title: 'Quieres eliminar el elemento #: ' + id,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        this.servicio.deleteTarea(id).subscribe({
          next:(res)=>{this.obtenerTareas();},
          error:(err)=>{console.log(err)}
        });
      } else if (result.isDenied) {
        Swal.fire('Cancelado con exito', '', 'info')
      }
    })
    // let confirmacion = confirm("Desea eliminar la tareas #: " + id);
    // if(confirmacion){
    //   this.servicio.deleteTarea(id).subscribe({
    //     next:(res)=>{this.obtenerTareas();},
    //     error:(err)=>{console.log(err)}
    //   });
    // }
  }

  editarTarea(datos:TareasModelo){
    this.servicio.datosTarea = datos;
  }
}
