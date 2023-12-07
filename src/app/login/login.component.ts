import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { LocalService } from '../service/local.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private localService: LocalService,private auth: AuthService) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,  Validators.pattern(
        '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
      )]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')]]
    })
 }

 onLogin() {
  // if (!this.loginForm.valid)
  //   return this.localService.toNotify(
  //     'red',
  //     'Please fill the necessary fields in correct format'
  //   );
  this.localService.toSpin();

console.log(this.loginForm.value,'///value');


  this.auth.onLogin(this.loginForm.value).subscribe({
    next: (res: any) => {
      console.log(res,'////res');
      this.router.navigate(['/admin-dashboard']);
      this.localService.toStopSpin();
      this.localService.toNotify('green', 'Successfully Logged In');
    },
    error: (err: any) => {
      console.log(err);
      this.localService.toStopSpin();

      if (err.status == 401)
        return this.localService.toNotify('red', 'Invalid email or password');

      this.localService.toNotify('red', 'Something went wrong');
    },
  });
}

}

