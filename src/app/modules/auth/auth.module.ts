import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthContainerComponent } from './container/auth.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        InputTextModule,
        ReactiveFormsModule
    ],
    providers: [],
    declarations: [
        AuthContainerComponent,
        LoginComponent,
        RegisterComponent
    ]
})

export class AuthModule { }