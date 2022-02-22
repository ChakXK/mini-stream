import {
    AngularFirestoreDocument, DocumentReference
  } from '@angular/fire/compat/firestore';

export interface UserFriends{
    friends: DocumentReference[];
}
export interface Friend{
    id: string;
    name: string;
    isFriend: boolean;
}