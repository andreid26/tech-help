import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/main'
    },
    {
        path: '**',
        redirectTo: '/main',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }