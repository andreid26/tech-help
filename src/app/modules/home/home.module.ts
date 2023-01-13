import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './container/home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule
    ],
    providers: [],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule { }