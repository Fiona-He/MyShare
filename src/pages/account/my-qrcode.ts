import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import {AccountPage} from "./account";

@Component({
  selector: 'my-qrcode',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="goBack()"
                  style="font-size: 24px;color: #59b5c0; padding-left: 10px;">
            <ion-icon ios="md-arrow-back"></ion-icon>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #c6e7f0;">
      <div style="width: 100%; text-align: center; padding-top: 60px;">
        <img style="border-radius: 40px;width: 80px;h;h;height: 80px;" [src]="avatar  || '//:0'">
      </div>
      <div style="width: 100%; text-align: center;">
      <qr-code [value]="myuid"></qr-code>
      </div>
    </ion-content>`,
  providers:[MyserviceService]
})
export class MyQrcode {

  loader:any;
  name: any;
  avatar: any;
  uid: any;

  myuid:any;
  constructor(public navCtrl: NavController,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              private myserviceService:MyserviceService
  ) {
    this.myuid = this.auth.currentUserId;
    this.name = this.auth.currentUserDisplayName;
    this.avatar = this.auth.currentUserPhotoURL;
    this.uid = this.auth.currentUserId;
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.pop();
  }





}
