import { NgModule } from '@angular/core';

import { ReceiptPageRoutingModule } from './receipt-routing.module';

import { ReceiptPage } from './receipt.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReceiptPageRoutingModule
  ],
  declarations: [ReceiptPage]
})
export class ReceiptPageModule { }
