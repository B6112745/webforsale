import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'
import { GamesComponent } from './components/games/games.component'
import { AddgamesComponent } from './components/addgames/addgames.component'
import { AddequipmentsComponent } from './components/addequipments/addequipments.component';
import { EquipmentsComponent} from './components/equipments/equipments.component'
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {path: 'header', component: HeaderComponent },
  {path: 'addgames', component: AddgamesComponent },
  {path: 'addequipments', component: AddequipmentsComponent },
  {path: 'games', component: GamesComponent },
  {path: 'equipments', component: EquipmentsComponent },
  {path: 'user', component: UserComponent },
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
