import {NavParams, Platform, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  template: `
    <ion-header>
      <ion-toolbar style="background-color: #ffffff">
        <ion-title>
          我要拼單
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span ion-text color="primary" showWhen="ios">Cancel</span>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #c6e7f0;">
      <div padding style="height: 120px;text-align: center;">
        <img src="./assets/imgs/account.png" style="width:  120px;">
      </div>
      <table width="100%" cellspacing="10px;">
        <tr>
          <td align="center" height="80">
            <div class="progress-outer">
              <div class="progress-inner" style="width: 25%">
                第一步
              </div>
            </div>
          </td>
        </tr>
      </table>
      <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 10px;">
        <ion-item
          style="background-color: #f3f8f8;border:  none;border-radius: 20px; color:#344b67;">
          <ion-label>份額</ion-label>
          <ion-select [(ngModel)]="gaming" interface="popover">
            <ion-option value="1" selected="true">1</ion-option>
            <ion-option value="2">2</ion-option>
            <ion-option value="3">3</ion-option>
            <ion-option value="4">4</ion-option>
            <ion-option value="5">5</ion-option>
            <ion-option value="6">6</ion-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 32px;">
        <ion-item
          style="background-color: #f3f8f8;border:  none;border-radius: 20px; color:#344b67;">
          <ion-label floating>備註</ion-label>
          <ion-input type="text" value=""></ion-input>
        </ion-item>
      </ion-list>
      <div padding>
        <button ion-button round (click)="dismiss()" style="width:100%;">舉手報名</button>
      </div>
    </ion-content>
  `
})
export class ModalContentPage1st {

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
