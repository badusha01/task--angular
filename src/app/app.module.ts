import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    SpinnerComponent,
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
