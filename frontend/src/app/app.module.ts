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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    AddgamesComponent,
    UserComponent,
    DevicesComponent,
    AdddevicesComponent
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
