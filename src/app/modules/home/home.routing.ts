import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@guards/main.guard';
import { SectionsComponent } from './components/sections/sections.component';
import { ViewSectionComponent } from './components/view-section/view-section.component';
import { ViewTopicComponent } from './components/view-topic/view-topic.component';
import { HomeComponent } from './container/home.component';

const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {   
        path: 'sections',
        component: SectionsComponent,
        canActivate: [MainGuard]
    },
    {
        path: 'sections/:id',
        component: ViewSectionComponent,
        canActivate: [MainGuard]
    },
    {
        path: 'topics/:id',
        component: ViewTopicComponent,
        canActivate: [MainGuard]
    },
    {
        path: '**',
        redirectTo: '/main',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }