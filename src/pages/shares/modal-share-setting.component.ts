import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {AuthService} from "../core/auth.service";
import {FriendsListComponent} from "../friends/friends-list/friends-list.component";
import {FriendsPage} from "../friends/friends";


@Component({
  template: `
    <ion-header>
      <ion-toolbar style="background-color: #ffffff">
        <ion-title>
          拼單設置
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span ion-text color="primary" showWhen="ios">Cancel</span>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #f4f4f4;">
      <ion-list no-lines>
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji12.png"
                                                         class="head-icon"><br>aaa
              </ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji22.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji11.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji2.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji3.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji4.png"
                                                         class="head-icon"></ion-col>
            </ion-row>
            <ion-row align-items-center>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji5.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji6.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji7.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2 class="head-icon-name"><img src="./assets/imgs/emoji8.png"
                                                         class="head-icon"></ion-col>
              <ion-col col-2>
                <button ion-button (click)="addPeopleToActivity()" class="user-main-button">
                  <ion-icon name="add" ios="md-add"></ion-icon>
                </button>
              </ion-col>
              <ion-col col-2>
                <button ion-button class="user-main-button">
                  <ion-icon name="remove" ios="md-remove"></ion-icon>
                </button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
        <ion-item></ion-item>
      </ion-list>
      <ion-list>
        <button ion-item (click)="itemSelected(item)">
          拼單名稱
        </button>
        <button ion-item (click)="itemSelected(item)">
          拼單二維碼
        </button>
      </ion-list>
      <ion-list>
        <ion-item>
          <ion-label> 消息免打擾</ion-label>
          <ion-toggle checked="false"></ion-toggle>
        </ion-item>
      </ion-list>
      <div padding>
        <button ion-button round (click)="dismiss()" style="width:100%; background-color: #e13838;">
          刪除并退出
        </button>
      </div>
    </ion-content>
  `
})
export class ModalContentSetting {
  character;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,public auth: AuthService,
              public navCtrl: NavController,) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addPeopleToActivity(){
    //this.auth.currentUserId

    this.navCtrl.push(FriendsPage,{doPerson:this.auth.currentUserId});
  }
}
