import { Component, OnInit } from '@angular/core';
import Game from '../models/Game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent implements OnInit {

  games$: Game[] = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getUserGames().subscribe((games) => {
      this.games$ = [];
      games.map((game: Game) => {
        if (game) {
          this.games$.push(game);
        }
      });
    });
  }
}
