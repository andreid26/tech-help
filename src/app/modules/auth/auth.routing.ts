import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthContainerComponent } from './container/auth.component';

const routes: Routes = [
    { 
        path: '',
        component: AuthContainerComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/auth/login'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/auth/login',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }