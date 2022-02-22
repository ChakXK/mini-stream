import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { GamesComponent } from './games/games.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { PreventLoggedInAccess } from './PreventLoggedInAccess';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [PreventLoggedInAccess]},
  { path: 'friends', component: FriendsComponent, canActivate: [PreventLoggedInAccess] },
  { path: 'games', component: GamesComponent, canActivate: [PreventLoggedInAccess]},
  { path: 'library', component: UserGamesComponent, canActivate: [PreventLoggedInAccess]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }