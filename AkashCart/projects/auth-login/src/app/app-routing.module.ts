import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {path:'login',
 loadChildren: () =>
  import('./login/login-module/login-module.module').then((m) => m.LoginModuleModule),
  
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
