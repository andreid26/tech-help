import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private _authService: AuthService) {
        this.user.next({});
    }

    isLoggedIn() {
        const token = localStorage.getItem('access-token');

        return token && !!this.user.getValue();
    }

    setCurrentUser(user, token) {
        this.user.next(user);
        localStorage.setItem('access-token', token);
    }

    getCurrentUser() {
        const token = localStorage.getItem('access-token');

        if (token) {
            this._authService.getCurrentUser().pipe(
                take(1)
            ).subscribe(res => {
                if (res && res.user) {
                    this.setCurrentUser(res.user, token);
                }
            });
        }
    }

    logout() {
        this.user.next({});
        localStorage.removeItem('access-token');
    }
}