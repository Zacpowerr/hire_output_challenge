import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '../core/classes/firestore.class';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends Firestore<Order> {

  constructor(db: AngularFirestore) {
    super(db);
    this.init();
  }
  private init(): void {
    this.setCollection('/orders'); // Sets collection to orders
  }
}

