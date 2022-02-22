import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { first, map, switchMap, zip } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Game, { UserGame } from '../models/Game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getGames() {
    return this.firestore
      .collection('games')
      .snapshotChanges()
      .pipe(
        map((games) =>
          games.map((data) => {
            const game = data.payload.doc.data() as Game;
            game.id = data.payload.doc.id;
            return game;
          })
        )
      );
  }

  search(querySearch: string) {
    return this.firestore
      .collection('games', (ref) =>
        ref
          .where('name', '>=', querySearch)
          .where('name', '<=', querySearch + '~')
      )
      .snapshotChanges()
      .pipe(
        map((games) =>
          games.map((data) => {
            const game = data.payload.doc.data() as Game;
            game.id = data.payload.doc.id;
            console.log(game);
            return game;
          })
        )
      );
  }

  addToLibrary(gameId: string) {
    let games;
    this.firestore
      .doc<UserGame>(`users/${this.authService.userUid}`)
      .valueChanges()
      .pipe(
        map((value) => {
          return value?.games ?? [];
        }),
        first()
      )
      .subscribe((data) => {
        games = data;
        games.push(
          this.firestore.doc(`games/${gameId}`)
            .ref as DocumentReference<DocumentData>
        );
        this.firestore
          .doc(`users/${this.authService.userUid}`)
          .update({ games: games });
      });
  }

  getUserGames(){
    return this.firestore
    .doc<UserGame>(`users/${this.authService.userUid}`)
    .valueChanges()
    .pipe(
      map((value) => {
        return value?.games ?? [];
      }),
      switchMap((games: DocumentReference[]) => {
        const gamesStream = games?.map((game) => {
          return this.firestore
            .doc<Game>(game.path)
            .valueChanges()
            .pipe(
              map((data = { id: '', name: '' , description: '', price: 0, tag: []}) => {
                data.id = game.id;
                return { ...data };
              })
            );
        });
        return zip(...gamesStream);
      })
    );
  }
}
