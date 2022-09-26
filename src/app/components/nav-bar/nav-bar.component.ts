import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  correo: string = '';

  constructor(
    private sessionStorage: SessionStorageService,
    private logiService: LoginService
  ) {}

  ngOnInit(): void {
  // aqui definimos la funcion para recibir el valor del BehaviorSubject
    this.logiService.isLoggedIn.subscribe((data) => {
      this.isLoggedIn = data;
      if (this.sessionStorage.getData('user')) {
        this.correo = this.sessionStorage.getData('user').email;
      }
    });
  }

  cerrarSesion() {
    this.sessionStorage.removeData('user');
    window.location.reload();
  }
}
