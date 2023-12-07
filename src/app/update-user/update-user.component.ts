import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LocalService } from '../service/local.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  updateUserForm!: FormGroup;
  user: any;
  isPasswordChange = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private localService: LocalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.localService.toSpin();
    const { id } = this.route.snapshot.params;
    this.authService.onGetOneUser(id).subscribe({
      next: (res: any) => {
        this.user = res.data;
        console.log(this.user);

        this.updateUserForm.get('email')?.setValue(this.user.email);
        this.updateUserForm.get('username')?.setValue(this.user.username);
        this.updateUserForm.get('role')?.setValue(this.user.role);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.updateUserForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{5,}[.]{1}[a-zA-Z]{2,}'
        ),
      ]),
      curPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      newPasswordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      role: new FormControl(''),
    });
  }

  onUpdateNewUser() {
    this.localService.toSpin();
    const { id } = this.route.snapshot.params;
    this.authService.onUpdateUser(id, this.updateUserForm.value).subscribe({
      next: (res: any) => {
        this.localService.toStopSpin();
        this.localService.toNotify('green', 'User Successfully Updated');
        this.router.navigateByUrl('/home');
      },
      error: (err: any) => {
        this.localService.toStopSpin();
        if (err.error.error === 'Incorrect password')
          return this.localService.toNotify('red', 'Incorrect password');
        if (err.error.error.code == 11000)
          return this.localService.toNotify('red', 'Email Already Exists');

        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }
}
