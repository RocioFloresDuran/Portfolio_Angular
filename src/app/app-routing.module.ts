import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  // {path:'portfolio', component:PortfolioComponent, ...canActivate(()=>redirectUnauthorizedTo(['/iniciar-sesion']))},
  {path:'iniciar-sesion', component:IniciarSesionComponent},
  {path:'', redirectTo:'portfolio', pathMatch:'full'},
  {path: 'portfolio', component:PortfolioComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
