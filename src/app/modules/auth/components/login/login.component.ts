import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoadingSpinnerService } from '@services/loading.service';
import { NotificationsService } from '@services/notifications.service';
import { UserService } from '@services/user.service';
import { of } from 'rxjs';
import { catchError, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  alive: boolean;
  loginFG: FormGroup;
  submitButtonClicked: boolean;

  constructor(private _loadingService: LoadingSpinnerService,
              private _authService: AuthService,
              private _notificationsService: NotificationsService,
              private _router: Router,
              private _userService: UserService) {
    this.alive = true;
    this.submitButtonClicked = false;
    this.loginFG = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    });
  }

  get email(): FormControl {
    return this.loginFG.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginFG.get('password') as FormControl;
  }

  ngOnInit() { }

  login() {
    const user = this.loginFG.getRawValue();

    this.submitButtonClicked = true;
    this._loadingService.setLoading(true);
    this._authService.login(user).pipe(
      takeWhile(() => this.alive),
      take(1),
      catchError(error => {
        this._loadingService.setLoading(false);
        this._notificationsService.handleError(error);
        return of(false);
      })
    ).subscribe((response: any) => {
      this._loadingService.setLoading(false);

      if (response) {
        const { user, token } = response;

        this._userService.setCurrentUser(user, token);
        this._notificationsService.createMessage('success', 'Register', 'Account created');
        this._router.navigate(['/main/sections']);
      }
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
