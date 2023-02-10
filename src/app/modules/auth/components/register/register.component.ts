import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoadingSpinnerService } from '@services/loading.service';
import { NotificationsService } from '@services/notifications.service';
import { catchError, of, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerFG: FormGroup;
  submitButtonClicked: boolean;
  alive: boolean;

  constructor(private _notificationsService: NotificationsService,
              private _authService: AuthService,
              private _loadingService: LoadingSpinnerService,
              private _router: Router) {
    this.alive = true;
    this.submitButtonClicked = false;
    this.registerFG = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$'), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    });
  }

  get email(): FormControl {
    return this.registerFG.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.registerFG.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registerFG.get('password') as FormControl;
  }

  get passwordRepeat(): FormControl {
    return this.registerFG.get('passwordRepeat') as FormControl;
  }

  ngOnInit(): void { }

  createAccount() {
    this.submitButtonClicked = true;
    const { email, username, password, passwordRepeat } = this.registerFG.getRawValue();

    if (password !== passwordRepeat) {
      this._notificationsService.createMessage('error', 'Register', 'Incorrect repeated password.');
      return;
    }

    this._loadingService.setLoading(true);
    this._authService.register({ email, username, password }).pipe(
      takeWhile(() => this.alive),
      take(1),
      catchError(error => {
        this._loadingService.setLoading(false);
        this._notificationsService.handleError(error);
        return of(false);
      })
    ).subscribe((response: any) => {
      this._loadingService.setLoading(false);
        if(response) {
          this._notificationsService.createMessage('success', 'Register', 'Account created');
          setTimeout(() => {
            this._router.navigate(['/auth/login']);
          }, 2000);
        }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
