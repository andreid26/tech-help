import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

	constructor(private _router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const token = localStorage.getItem('access-token') || null;
		
		if(token) {
			this._router.navigate(['/main']);
			return false;
		}
		return true;
	}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		const token = localStorage.getItem('access-token') || null;

		if(token) {
			this._router.navigate(['/main']);
			return false;
		}
		return true;
	}

}