import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import { ActionSheetController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {HttpClient} from '@angular/common/http';
import {ShareService} from '../../myservice/share.service';

@Component({
  selector: 'updateShareName',
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
    <ion-content style="background-color: #ffffff;" fullscreen #updateDisplayName>
      <div style="text-align: center; width:140px; margin: 0 auto;">
        <div style="height: 140px;background-color: #c6e7f0;border-radius: 80px;">
          <img src="./assets/imgs/balloon.png" height="120px">
        </div>
      </div>
      <div style="height: 20px;"></div>
      <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
        <ion-item
          style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
          <ion-label floating>拼單名稱</ion-label>
          <ion-input type="text" #projectname id="projectname"
                     [(ngModel)]="data.projectname" value=""></ion-input>
        </ion-item>
      </ion-list>
      <div padding>
        <button ion-button (click)="update()" style="width:100%; border-radius: 10px;">保存</button>
      </div>
    </ion-content>`,
  providers:[MyserviceService]
})

export class UpdateShareName {

  loader:any;
  data:any;

  constructor(public navCtrl: NavController,
              public auth: AuthService,
              public params: NavParams,
              private shareService:ShareService,
              private http: HttpClient,
              public loadingCtrl: LoadingController,
  ) {
    this.data = this.params.get('data');
    console.log(this.data);
  }

  ngOnInit() {}

  presentLoadingCustom() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img src="./assets/imgs/loading.gif" width="80">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.present();
  }

  update(){
    this.shareService.updateName(this.data.projectid, this.data).then(data => {
      this.goBack();
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
