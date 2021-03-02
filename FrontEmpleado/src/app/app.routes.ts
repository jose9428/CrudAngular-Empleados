import { ListarComponent } from './components/listar/listar.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { EditarComponent } from './components/editar/editar.component';

import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

const APP_ROUTES: Routes = [
  {path : 'listar' , component : ListarComponent },
  {path : 'nuevo' , component : NuevoComponent },
  {path : 'editar/:id' , component : EditarComponent },
  { path: '**', pathMatch: 'full' , redirectTo: 'listar' }
];

export const APP_ROUTING  = RouterModule.forRoot(APP_ROUTES);

