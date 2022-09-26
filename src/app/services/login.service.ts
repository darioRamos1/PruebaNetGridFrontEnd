import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.sessionStorage.getData('user')
  );

  get isLoggedIn() {
    // es una interfaz que permite observar el valor de un BehaviorSubject
    return this.loggedIn.asObservable();
  }

  constructor(private sessionStorage: SessionStorageService) {}

  login(user: User): boolean {
    const USER = new User('info@yampi.co', '12345678');
    if (user.email === USER.email && user.password === USER.password) {
      this.sessionStorage.saveData('user', user);
      // next() permite cambiar el valor de un BehaviorSubject
      this.loggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.sessionStorage.removeData('user');
  }
}
