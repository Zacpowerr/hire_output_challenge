import { Injectable } from '@angular/core';
import { Firestore } from '../core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Firestore<User> {

  constructor(db: AngularFirestore) {
    super(db);
    this.init();
  }
  private init(): void {
    this.setCollection('/users'); //Sets collection to users
  }
}
