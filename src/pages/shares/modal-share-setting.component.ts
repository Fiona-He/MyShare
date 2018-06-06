import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {AuthService} from "../core/auth.service";
import {ShareService} from "../../myservice/share.service";
import {ActivityPeopleComponent} from "../friends/friends-list/activity-people.component";


@Component({
  template: `
    <ion-header [elasticHeader]="settingContent">
      <ion-toolbar>
        <ion-title>
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()"
                  style="font-size: 24px;color: #59b5c0; padding-left: 10px;">
            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #f4f4f4;" #settingContent>
      <ion-list no-lines>
        <ion-item>
          <ion-grid>
            <ion-row align-items-center>
              <ion-col col-2 *ngFor="let p of peopleList" class="head-icon-name"><img [src]="p.field3" 
                                                         class="head-icon">
              </ion-col>
              <ion-col col-2>
                <button ion-button (click)="addPeopleToActivity()" class="user-main-button">
                  <ion-icon name="add" ios="md-add"></ion-icon>
                </button>
              </ion-col>
              <ion-col col-2 [hidden]="!showDeleteButton">
                <button ion-button (click)="deletePeopleFromActivity()"class="user-main-button">
                  <ion-icon name="remove" ios="md-remove"></ion-icon>
                </button>
              </ion-col>
            </ion-row>
            
          </ion-grid>
        </ion-item>
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
        <button ion-button round (click)="dismiss()" style="width:100%;border-radius:  10px; background-color: #e13838;">
          刪除并退出
        </button>
      </div>
    </ion-content>
  `
})
export class ModalContentSetting implements OnInit {
  character;
  peopleList:any;
  showDeleteButton:false;
  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,public auth: AuthService,
              public navCtrl: NavController,
              private shareService:ShareService,
              public modalCtrl: ModalController,) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    console.log(this.params.get("characterNum"));
    console.log(this.params.get("owner"));
    this.showDeleteButton = this.params.get("owner");
    this.shareService.getActivityPeople(this.params.get("characterNum")).then(data=>{
      console.log(data);
      this.peopleList = data;
    })
  }
  addPeopleToActivity(){
    //this.auth.currentUserId
    let modal = this.modalCtrl.create(ActivityPeopleComponent,{action:'add',doPerson:this.auth.currentUserId,shareID:this.params.get("characterNum")});
    modal.onDidDismiss(data => {
      this.shareService.getActivityPeople(this.params.get("characterNum")).then(data=>{
        console.log(data);
        this.peopleList = data;
      })
    });
    modal.present();
  }
  deletePeopleFromActivity(){
    let modal = this.modalCtrl.create(ActivityPeopleComponent,{action:'delete',doPerson:this.auth.currentUserId,shareID:this.params.get("characterNum")});
    modal.onDidDismiss(data => {
      this.shareService.getActivityPeople(this.params.get("characterNum")).then(data=>{
        console.log(data);
        this.peopleList = data;
      })
    });
    modal.present();
  }
}
