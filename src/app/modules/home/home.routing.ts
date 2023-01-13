import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './container/home.component';

const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: '/home',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }