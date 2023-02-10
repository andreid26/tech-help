import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTopicDialogComponent } from '@shared/components/add-topic-dialog/add-topic-dialog.component';
import { SectionBoxComponent } from '@shared/components/section-box/section-box.component';
import { InputTextModule } from 'primeng/inputtext';
import { SectionsComponent } from './components/sections/sections.component';
import { ViewSectionComponent } from './components/view-section/view-section.component';
import { ViewTopicComponent } from './components/view-topic/view-topic.component';
import { HomeComponent } from './container/home.component';
import { HomeRoutingModule } from './home.routing';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        DialogModule,
        InputTextareaModule
    ],
    providers: [
    ],
    declarations: [
        HomeComponent,
        SectionsComponent,
        SectionBoxComponent,
        ViewSectionComponent,
        ViewTopicComponent,
        AddTopicDialogComponent
    ]
})

export class HomeModule { }