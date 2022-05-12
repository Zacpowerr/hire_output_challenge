import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from './../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  exports: [
    BrowserModule,
    IonicModule,
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  },
    FormBuilder,
  ],
})
export class CoreModule { }
