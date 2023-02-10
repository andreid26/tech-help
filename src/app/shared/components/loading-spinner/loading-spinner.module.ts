import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";


@NgModule({
    imports: [
        CommonModule,
        ProgressSpinnerModule
    ],
    providers: [],
    exports: [LoadingSpinnerComponent],
    declarations: [LoadingSpinnerComponent]
})

export class LoadingSpinnerModule { };