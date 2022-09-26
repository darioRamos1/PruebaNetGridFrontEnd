import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './shared/guard.guard';

const routes: Routes = [
  { path: '', component : ListComponent, canActivate: [GuardGuard]},
  { path: 'add', component : AddComponent, canActivate: [GuardGuard]},
  { path: 'edit/:id', component : AddComponent, canActivate: [GuardGuard]},
  { path: 'login', component : LoginComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
