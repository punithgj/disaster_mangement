import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Firebase Modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Environment Configuration
import { environment } from '../environments/environment';

// Components
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ResourceComponent } from './component/resource/resource.component';
import { VolunteerComponent } from './component/volunteer/volunteer.component';
import { MapComponent } from './component/map/map.component';
// Services
import { RealtimeDatabaseService } from './realtime-database.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ResourceComponent,
    VolunteerComponent,
    MapComponent ,
    // Add VolunteerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Firebase initialization
    AngularFireAuthModule, // Firebase Auth
    AngularFireDatabaseModule, // Firebase Realtime Database
    FormsModule, // For template-driven forms
    ReactiveFormsModule ,
    // For reactive forms
  ],
  providers: [
    RealtimeDatabaseService, // Add RealtimeDatabaseService
    provideClientHydration() // For hydration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
