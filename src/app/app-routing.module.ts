import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [

{
  path:'auth',
  loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
},
{
  path:'dashboard',
  loadChildren:()=> import('./protected/protected.module').then(m=>m.ProtectedModule),
  canActivate:[ValidarTokenGuard],
  canLoad:[ValidarTokenGuard]
},
{
  path:'**',
  redirectTo:'auth'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:false
    //cuando esta en true nos genera el # en la ruta para que pueda acceder
    //desde el servidor a las apis, si no se configura aqui , se configura en node
    
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
