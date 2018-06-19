import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import {AccountPage} from "./account";
import { ActionSheetController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'updateDisplayName',
  template: `
    <ion-header [elasticHeader]="updateDisplayName">
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
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #c6e7f0;" fullscreen #updateDisplayName>
      <div style="text-align: center; width:140px; margin: 0 auto;">
        <div><img style="border-radius: 30px;width: 100px; height: 100px;border-style:  solid;border-width: 3px;border-color: #f3f1f1;" [src]="avatar  || '//:0'"></div>
      </div>
      <div style="height: 20px;"></div>
      <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
        <ion-item
          style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
          <ion-label>名字</ion-label>
          <ion-input type="text" #projectname id="projectname"
                     [(ngModel)]="name"></ion-input>
        </ion-item>
      </ion-list>
      <div padding>
        <button ion-button (click)="update()" style="width:100%; border-radius: 10px;">保存</button>
      </div>
    </ion-content>`,
  providers:[MyserviceService]
})

export class UpdateDisplayName {

  loader:any;
  name: any;
  avatar: any;
  uid: any;
  myuid:any;

  constructor(public navCtrl: NavController,
              public auth: AuthService,
              private http: HttpClient,
              public loadingCtrl: LoadingController
  ) {
    this.myuid = this.auth.currentUserId;
    this.name = this.auth.currentUserDisplayName||this.auth.currentUserEmail;
    this.avatar = this.auth.currentUserPhotoURL;
    this.uid = this.auth.currentUserId;
  }

  ngOnInit() {}

  presentLoadingCustom() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div>
        <img src="./assets/imgs/loading.gif" width="60">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loader.present();
  }

  update(){
    this.auth.updateProfileData(this.name, this.avatar);
    this.goBack();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
