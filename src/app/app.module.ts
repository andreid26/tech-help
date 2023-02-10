import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingSpinnerModule } from '@shared/components/loading-spinner/loading-spinner.module';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MessagesModule } from "primeng/messages";
import { AuthGuard } from '@guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainGuard } from '@guards/main.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingSpinnerModule,
    MessagesModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    MainGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
