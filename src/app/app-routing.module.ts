import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', component: AuthComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  
  { path: 'user', component: UserComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  
  { path: 'user/:action', component: UserComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  
  { path: 'user/:action/:id', component: UserComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
