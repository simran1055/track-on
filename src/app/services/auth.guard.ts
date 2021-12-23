import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) { }
  canActivate() {
    console.log(this.apiService.getToken());
    
    if (this.apiService.getToken() != "") {
      return true;
    } else {
      console.log('Hello');
      this.router.navigate(['sign-in'])
      return false;
    }
  }
}
