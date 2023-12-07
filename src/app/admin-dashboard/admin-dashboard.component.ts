import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LocalService } from '../service/local.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  users!: any;
  constructor(
    private authService: AuthService,
    private localService: LocalService
  ) {}

  ngOnInit() {
    this.getAllUsers()
  }


  getAllUsers() {
    this.authService.onGetAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        console.log(res.users);
      },
      error: (err: any) => {},
    });
  }


  onDeleteUser(id: string) {
    this.authService.onDeleteUser(id).subscribe({
      next: (res: any) => {
        this.localService.toNotify('green', 'User deleted successfully');
        this.getAllUsers()
      },
      error: (err: any) => {
        this.localService.toNotify('red', 'Something went wrong');
      },
    });
  }
}
