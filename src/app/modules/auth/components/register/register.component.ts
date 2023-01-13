import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerFG: FormGroup;
  submitButtonClicked: boolean;

  constructor() {
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
  }

  ngOnDestroy(): void { }
}
