import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormGroup , FormControl , Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  miFormulario: FormGroup;

  constructor(private service: EmpleadosService ,
              private alertify: AlertifyService ,
              private router: Router) {
    this.miFormulario = new FormGroup({
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

  }

  guardarCambios(){
    this.service.guardarEmpleado(this.miFormulario.value).subscribe(data => {
      this.miFormulario.reset();
      this.router.navigate(['/listar']);
      this.alertify.success('Empleado registrado correctamente!');
    },
    error => {
      this.alertify.error('No se ha podido registrar empleado!');
     });
  }
}
