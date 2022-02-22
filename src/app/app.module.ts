import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule }   from '@angular/forms';
import { FriendsComponent } from './friends/friends.component';
import { GamesComponent } from './games/games.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NavigatorComponent } from './navigator/navigator.component';
import { PreventLoggedInAccess } from './PreventLoggedInAccess';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    FriendsComponent,
    GamesComponent,
    UserGamesComponent,
    NavigatorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBz7v2PplUpeXa5ztAj1q_HPwl-2QsjLjI",
      authDomain: "mini-stream.firebaseapp.com",
      projectId: "mini-stream",
      storageBucket: "mini-stream.appspot.com",
      messagingSenderId: "821591477404",
      appId: "1:821591477404:web:57f9a4904e03c542777159"
    }),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [AuthService, PreventLoggedInAccess],
  bootstrap: [AppComponent]
})
export class AppModule { }
