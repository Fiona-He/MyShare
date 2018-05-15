import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import {AccountPage} from "./account";

@Component({
  selector: 'my-qrcode',
  template: `<button (click)="goBack()">back</button>
    <qr-code [value]="myuid"></qr-code>`,
  providers:[MyserviceService]
})
export class MyQrcode {

  loader:any;

  myuid:any;
  constructor(public navCtrl: NavController,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              private myserviceService:MyserviceService
  ) {
    this.myuid = this.auth.currentUserId;
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.push(AccountPage);
  }





}
