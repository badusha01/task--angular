import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  },
  {
    path:'create-user',
    component: CreateUserComponent
  },
  {
    path: 'update',
    component: UpdateUserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
