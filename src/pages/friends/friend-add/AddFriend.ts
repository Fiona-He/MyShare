import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {AuthService} from '../../core/auth.service';
import {SharesPage} from "../../shares/shares";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.model";
import {ThreadService} from "../../chat/thread.service";
import {FriendsListComponent} from "../friends-list/friends-list.component";
import {FriendsPage} from "../friends";

@Component({
  selector: 'my-qrcode',
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
      <div *ngIf="exist" style="width: 100%; text-align: center;">
        <div style="text-align: center; width:140px; margin: 0 auto;">
          <div><img style="border-radius: 30px;width: 100px; height: 100px;border-style:  solid;border-width: 3px;border-color: #f3f1f1;" [src]="friend.photoURL  || '//:0'"></div>
          <h2>{{friend.displayName || ''}}</h2>
          <p style="color: #55687f">{{friend.email || ''}}</p>
        </div>
        <div style="height: 20px;"></div>
        <div padding>
          <button ion-button (click)="addFriend()" style="width:100%; border-radius: 10px;">確認添加</button>
        </div>
      </div>
      <div *ngIf="!exist" style="width: 100%; text-align: center;">
        <div style="text-align: center; width:140px; margin: 0 auto;">
          <div style="height: 140px;background-color: #efefef;border-radius: 80px;">
            <img src="./assets/imgs/notfound.png" height="140px">
          </div>
        </div>
        <div style="height: 20px;"></div>
        <div style="width: 100%; text-align: center; color: #55687f;">
          该用户不存在！
        </div>
      </div>
    </ion-content>
  `,
  providers: [UserService, ThreadService]
})
export class AddFriend {

  loader: any;
  myuid: any;
  frienduid: any;
  friend: User; //{displayName:'',email:'',photoURL:'',uid:''};
  exist = false;
  friendAlready = false;
  constructor(public navCtrl: NavController,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public userService: UserService,
              public threadService: ThreadService) {
    this.myuid = this.auth.currentUserId;
    this.frienduid = this.navParams.get('frienduid');
    alert(this.frienduid + " - " + this.myuid);
  }

  ngOnInit() {

    this.presentLoadingCustom();

    console.log(this.myuid, this.frienduid);
    this.userService.getUser(this.frienduid).subscribe(data => {
      console.log(data);
      if (data) {
        this.exist = true;
        this.friend = data;
        this.threadService.checkFriend(this.myuid,this.frienduid).then(data => {
          if(data == '-1')
            this.friendAlready = false;
          else
            this.friendAlready = true;

          this.loader.dismiss();
        })
      }
    });
  }

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

  goBack() {
    this.navCtrl.pop();
  }

  addFriend() {
    console.log(this.friend);
    this.threadService.addFriend(this.friend,this.myuid);//.then(data=> console.log(data));
    this.navCtrl.push(FriendsPage);
  }


}
