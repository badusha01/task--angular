import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  spinnig = new BehaviorSubject(false);
  notifications = new BehaviorSubject(false);
  notificationMsg = new BehaviorSubject('Success');
  notificationColor = new BehaviorSubject('');

  constructor() {}

  toNotify(color: string, msg: string) {
    this.notifications.next(true);
    this.notificationMsg.next(msg);
    this.notificationColor.next(color);
    setTimeout(() => {
      this.notifications.next(false);
    }, 2000);
  }

  toSpin(){
    this.spinnig.next(true);
    setTimeout(() => {
      this.spinnig.next(false);
    }, 2000);
  }

  toStopSpin() {
    this.spinnig.next(false);
  }
}
