import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class MainGuard implements CanActivate {

	constructor(private _router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const token = localStorage.getItem('access-token') || null;
		
		if(!token) {
			this._router.navigate(['/auth/login']);
			return false;
		}
		return true;
	}
}