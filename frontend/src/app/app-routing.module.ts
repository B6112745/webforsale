import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'
import { GamesComponent } from './components/games/games.component'
import { AddgamesComponent } from './components/addgames/addgames.component'
import { UserComponent } from './components/user/user.component';
import { DevicesComponent } from './components/devices/devices.component';
import { AdddevicesComponent } from './components/adddevices/adddevices.component';
import { HistoryComponent } from './components/history/history.component';


const routes: Routes = [
  {path: 'header', component: HeaderComponent },
  {path: 'addgames', component: AddgamesComponent },
  {path: 'adddevices', component: AdddevicesComponent },
  {path: 'games', component: GamesComponent },
  {path: 'devices', component: DevicesComponent },
  {path: 'user', component: UserComponent },
  {path: 'history', component: HistoryComponent },
  {path:'',
  redirectTo: 'games',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
