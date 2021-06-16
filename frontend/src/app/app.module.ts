import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GamesComponent } from './components/games/games.component';
import { AddgamesComponent } from './components/addgames/addgames.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { DevicesComponent } from './components/devices/devices.component';
import { AdddevicesComponent } from './components/adddevices/adddevices.component';
import { UpdatedevicesComponent } from './components/updatedevices/updatedevices.component';
import { UpdategamesComponent } from './components/updategames/updategames.component';
import { HistoryComponent } from './components/history/history.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminSignupComponent } from './components/adminsignup/adminsignup.component';
import { AdminbarComponent } from './components/adminbar/adminbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    AddgamesComponent,
    UserComponent,
    DevicesComponent,
    AdddevicesComponent,
    UpdatedevicesComponent,
    UpdategamesComponent,
    HistoryComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    AdminSignupComponent,
    AdminbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
