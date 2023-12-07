import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalService } from '../service/local.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  createUserForm!: FormGroup;

  constructor(
    private localService: LocalService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.createUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),

      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),

      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onCreateNewUser() {
    console.log(this.createUserForm.value);

    if (!this.createUserForm.valid)
      return this.localService.toNotify('red', 'Form is not valid');

    if (
      this.createUserForm.value.password !==
      this.createUserForm.value.passwordConfirm
    ) {
      return this.localService.toNotify(
        'red',
        'Password and Password Confirmation do not match'
      );
    }
    this.localService.toSpin();

    // console.log(this.createUserForm.value);
    this.auth.onAddUser(this.createUserForm.value).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.router.navigate(['/admin-dashboard']);
        this.localService.toStopSpin();
        this.localService.toNotify('green', 'Successfully Signed In');
      },
      error: (err) => {
        console.log(err);
        this.localService.toStopSpin();
        if (err.error.error.code == 11000)
          return this.localService.toNotify('red', 'Email Already Exists');
        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }
}
