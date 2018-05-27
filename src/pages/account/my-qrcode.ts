import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import {AccountPage} from "./account";
import { ActionSheetController } from 'ionic-angular';

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
            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
        <ion-buttons end>
          <button ion-button (click)="presentActionSheet()"
                  style="font-size: 24px;color: #59b5c0; padding-left: 10px;">
            <ion-icon ios="ios-more" md="md-more"></ion-icon>
          </button>
        </ion-buttons>
        
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #c6e7f0;">
      <div style="width: 100%; text-align: center;">
        <div><img style="border-radius: 30px;width: 100px;h;h;height: 100px;border-style:  solid;border-width: 3px;border-color: #f3f1f1;" [src]="avatar  || '//:0'"></div>
        <h2>{{auth.currentUserDisplayName || ''}}</h2>
        <p style="color: #55687f">{{auth.currentUserEmail || ''}}</p>
      </div>
      <div  style="background-image: url('./assets/imgs/qrcode.png');background-size: auto 100%;text-align: center;background-repeat: no-repeat;height:  300px;padding-top:  70px;margin-top: 40px;background-position:  center;">
      <qr-code [value]="myuid" [size]="131"></qr-code>
      </div>
      <div style="width:  100%;text-align:  center;height: 140px;line-height: 60px; color: #55687f;">掃描上方二維碼，加我為好友</div>
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
              private myserviceService:MyserviceService,
              public actionSheetCtrl: ActionSheetController
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

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '從手機相冊選擇',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '名字',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '郵箱',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



}
