import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFG: FormGroup;
  submitButtonClicked: boolean;

  constructor() {
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

  ngOnInit(): void { }

  login() {
    this.submitButtonClicked = true;
  }

  ngOnDestroy(): void { }
}
