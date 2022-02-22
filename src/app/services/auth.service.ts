import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { first, map, switchMap, take } from 'rxjs';
import User from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  userUid: string = '';
  userEmail: string = '';
  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    if(localStorage.getItem('user')){
      this.userUid = JSON.parse(localStorage.getItem('user') ?? '').uid??'';
      this.userEmail = JSON.parse(localStorage.getItem('user') ?? '').email??'';
    }
  }
  async signIn(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
  getInfo() {
    return this.firestore
      .doc<User>(`users/${this.userUid}`)
      .valueChanges()
      .pipe(
        map((user) => {
          const id = user?.id ?? '';
          const age = user?.age ?? 0;
          const name = user?.name ?? '';
          return {id, age, name};
        })
      );
  }
  updateProfile(data: User) {
    this.firestore.doc<User>(`users/${this.userUid}`).update(data);
  }
}
