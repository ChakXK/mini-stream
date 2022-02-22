import { Component, OnInit } from '@angular/core';
import Game from '../models/Game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  querySearch: string = '';
  games$: Game[] = [];
  allGames$: Game[] = [];
  price: number = 1;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((games) => {
      this.allGames$ = [];
      games.map((game: Game) => {
        if (game) {
          this.allGames$.push(game);
        }
      });
      this.games$ = this.allGames$;
    });
  }

  onSearch() {
    this.gamesService.search(this.querySearch).subscribe((games) => {
      this.games$ = [];
      games.map((game: Game) => {
        if (game) {
          this.games$.push(game);
        }
      });
    });
  }

  onAdd(game: Game) {
   this.gamesService.addToLibrary(game.id);
  }

  onFilter(event: Event){
    const element = event.target as HTMLInputElement;
    this.games$ = this.allGames$.filter(game => game.tag?.includes(element.value));
  }

  onSlider(){
    if(this.price<1000){
      this.games$ = this.allGames$.filter(game => game.price<this.price);
    }
  }
}
