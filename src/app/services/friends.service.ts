import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { first, map, switchMap, zip } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserFriends } from '../models/Friend';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getFriends() {
    return this.firestore
      .doc<UserFriends>(`users/${this.authService.userUid}`)
      .valueChanges()
      .pipe(
        map((value) => {
          return value?.friends ?? [];
        }),
        switchMap((friends: DocumentReference[]) => {
          const friendsStream = friends?.map((friend) => {
            return this.firestore
              .doc<User>(friend.path)
              .valueChanges()
              .pipe(
                map((data = { id: '', age: 0, name: '' }) => {
                  data.id = friend.id;
                  return { ...data };
                })
              );
          });
          return zip(...friendsStream);
        })
      );
  }

  search(querySearch: string) {
    return this.firestore
      .collection('users', (ref) =>
        ref
          .where('name', '>=', querySearch)
          .where('name', '<=', querySearch + '~')
      )
      .snapshotChanges()
      .pipe(
        map((searchData) =>
          searchData.map((data) => {
            const userData = data.payload.doc.data() as User;
            userData.id = data.payload.doc.id;
            return userData;
          })
        )
      );
  }

  addFriend(userId: string) {
    let friends;
    this.firestore
      .doc<UserFriends>(`users/${this.authService.userUid}`)
      .valueChanges()
      .pipe(
        map((value) => {
          return value?.friends ?? [];
        }),
        first()
      )
      .subscribe((data) => {
        friends = data;
        friends.push(
          this.firestore.doc(`users/${userId}`)
            .ref as DocumentReference<DocumentData>
        );
        this.firestore
          .doc(`users/${this.authService.userUid}`)
          .update({ friends: friends });
      });
  }

  removeFriend(userId: string) {
    let friends;
    this.firestore
      .doc<UserFriends>(`users/${this.authService.userUid}`)
      .valueChanges()
      .pipe(
        map((value) => {
          return value?.friends ?? [];
        }),
        first()
      )
      .subscribe((data) => {
        friends = data;
        let index = friends.indexOf(this.firestore.doc(`users/${userId}`)
        .ref as DocumentReference<DocumentData>)
        friends.splice(index);
        this.firestore
          .doc(`users/${this.authService.userUid}`)
          .update({ friends: friends });
      });
  }
}
