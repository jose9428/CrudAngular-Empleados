import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url = 'http://localhost:9090/api/empleados';

  constructor(private http: HttpClient ) { }

  getEmpleados(){
    return this.http.get(this.url);
  }

  deleteEmpleado(id: number){
    return this.http.delete(this.url + '/' + id);
  }

  guardarEmpleado(data: any){
    return this.http.post(this.url , data);
  }

  editarEmpleado(data: any , id: number){
    return this.http.put(this.url + '/' + id, data);
  }

  buscarPorId( id: number){
    return this.http.get(this.url + '/' + id);
  }
}
