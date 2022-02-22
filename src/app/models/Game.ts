import {
    AngularFirestoreDocument, DocumentReference
  } from '@angular/fire/compat/firestore';

export default interface Game{
    id: string;
    description: string;
    name: string;
    price: number;
    tag: string[]
}
export interface UserGame{
    games: DocumentReference[];
}