import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  miFormulario: FormGroup;
  empleado: any;

  constructor(private service: EmpleadosService ,
              private routerAct: ActivatedRoute,
              private router: Router,
              private alertify: AlertifyService) {

    this.miFormulario = new FormGroup({
      id_empleado: new FormControl(),
      fecha_registro: new FormControl(),
      nombres: new FormControl('' , [
        Validators.required ,
        Validators.minLength(4)]
      ),
      ape_paterno: new FormControl('' , [
        Validators.required]
      ),
      ape_materno: new FormControl('' , [
        Validators.required]
      ),
      fecha_nacimiento: new FormControl('' , [
        Validators.required
      ]
      ),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      genero: new FormControl('M'),
      sueldo: new FormControl('' , [
        Validators.required
      ]
      ),
    });
   }

  ngOnInit(): void {
    this.routerAct.params.subscribe( data => {
      this.getEmpleado(data.id);
    });
  }

  getEmpleado(id: number){
    if (id){
      this.service.buscarPorId(id).subscribe(data => {
        this.empleado = data;
        this.miFormulario.setValue(data);
        console.log('Data : ' , this.empleado);
      } , (error: HttpErrorResponse) => {
       // console.log(HttpErrorResponse); // Error con mas detalles
        this.alertify.error(`No se encontro empleado con el id ${id}.`);
        this.router.navigate(['/listar']);
      });
    }
  }

  guardarCambios(){
      if (this.miFormulario.value.id_empleado == null){
        this.miFormulario.value.id_empleado = this.empleado.id_empleado;
        this.miFormulario.value.fecha_registro = this.empleado.fecha_registro;
      }

      this.service.editarEmpleado(this.miFormulario.value , this.miFormulario.value.id_empleado ).subscribe( data => {
        this.alertify.success('Datos editados correctamente!');
        this.router.navigate(['/listar']);
      } , error => {
         this.alertify.error('No se ha podido editar informacion!');
       });
  }
}
