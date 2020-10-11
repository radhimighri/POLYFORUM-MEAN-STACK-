import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements  CanActivate{

  constructor(private router: Router){
  }

  canActivate() {
    if (localStorage.getItem('isLogged') == '1') {
      this.router.navigate(['/home']);
      return false;
    } else
      return true
  }
}
