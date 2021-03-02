import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [
  ]
})
export class ListarComponent implements OnInit {

  empleados: any ;
  constructor(private service: EmpleadosService , private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getListar();
  }

  getListar(){
    this.service.getEmpleados().subscribe(data => {
      this.empleados = data;
      console.log(this.empleados);
    });
  }

  ConfEliminar(id: number){
    this.alertify.confirm(`¿Deseas eliminar el empleado con id ${id}?` ,
    () => {
      this.Eliminar(id);
    },
    () => {
      this.alertify.error('Cancelo!');
    });
  }

  Eliminar(id: number){
    this.service.deleteEmpleado(id).subscribe(data => {
      this.alertify.success('Empleado eliminado con exito!');
      this.getListar();
   });
  }

}
