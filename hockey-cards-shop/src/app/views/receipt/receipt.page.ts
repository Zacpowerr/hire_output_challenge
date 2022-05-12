import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Order } from '../../model/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  order: Order; // Declares order Object
  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit(): Promise<void> {
    let loading = await this.loadingCtrl.getTop(); // Gets top loading component from last page
    if (!loading) { //Checks if there is no previous loading component
      loading = await this.loadingCtrl.create({
        message: "Loading..."
      }); // Creates new loading component
      loading.present();
    }
    let key_doc = this.route.snapshot.paramMap.get('key_doc'); // Gets key_doc from URL and sets to variable
    this.orderService.get(key_doc).pipe(take(1)).subscribe((order) => { // Gets specific document from database and sets to order Object
      this.order = order;

      loading.dismiss(); // Dismisses loading component
    });
  }

}
