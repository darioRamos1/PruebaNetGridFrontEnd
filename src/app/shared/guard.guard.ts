import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.sessionStorage.getData('user')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
