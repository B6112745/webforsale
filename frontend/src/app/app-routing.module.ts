import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'
import { GamesComponent } from './components/games/games.component'
import { AddgamesComponent } from './components/addgames/addgames.component'
import { UserComponent } from './components/user/user.component';
import { DevicesComponent } from './components/devices/devices.component';
import { AdddevicesComponent } from './components/adddevices/adddevices.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminSignupComponent } from './components/adminsignup/adminsignup.component';

const routes: Routes = [
  {path: 'header', component: HeaderComponent },
  {path: 'addgames', component: AddgamesComponent },
  {path: 'adddevices', component: AdddevicesComponent },
  {path: 'games', component: GamesComponent },
  {path: 'devices', component: DevicesComponent },
  {path: 'user', component: UserComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'adminsignup',component:AdminSignupComponent},
  {path:'',
  redirectTo: 'login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
