import { Component } from '@angular/core';
import { LocalService } from './service/local.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  isSpinnerActive = false;
  notify = false;
  formMsg = '';
  notifyColor = ''

  constructor(private localService: LocalService) {}

  ngOnInit() {
    this.localService.spinnig.subscribe({
      next: (res: boolean) => (this.isSpinnerActive = res),
    });

    this.localService.notifications.subscribe({
      next: (res: boolean) => (this.notify = res),
    });

    this.localService.notificationMsg.subscribe({
      next: (res: string) => (this.formMsg = res),
    });

    this.localService.notificationColor.subscribe({
      next: (res: string) => (this.notifyColor = res),
    });
  }

}
