import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

import { AboutComponent } from './component/about/about.component';
import { ResourceComponent } from './component/resource/resource.component';
import { MapComponent } from './component/map/map.component';
import { VolunteerComponent } from './component/volunteer/volunteer.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'about', component: AboutComponent },
  { path: 'resource', component: ResourceComponent },
  { path: 'map', component: MapComponent },
  { path: 'volunteer', component: VolunteerComponent },
<<<<<<< HEAD
  
=======
  { path: '', redirectTo: '/resources', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/resources' } 
>>>>>>> a3bf4629f428d882cc20322be2e724c405499980
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
