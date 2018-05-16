import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {AuthService} from '../../core/auth.service';
import {SharesPage} from "../../shares/shares";
import {UserService} from "../../user/user.service";
import {User} from "../../user/user.model";
import {ThreadService} from "../../chat/thread.service";
import {FriendsListComponent} from "../friends-list/friends-list.component";

@Component({
  selector: 'my-qrcode',
  template: `
    <button (click)="goBack()">back</button>
    <div *ngIf="exist">
      {{friend.email}},
      {{friend.displayName}},
      {{friend.photoURL}}
      <button [hidden] = "friendAlready" (click)="addFriend()">confirm</button>
    </div>
    <div *ngIf="!exist">
      该用户不存在！
    </div>
    <button (click)="goBack()">back</button>
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
    console.log(this.myuid, this.frienduid);
    this.userService.getUser(this.frienduid).subscribe(data => {
      console.log(data);
      if (data) {
        this.exist = true;
        this.friend = data;
        alert(data.email);
        this.threadService.checkFriend(this.myuid,this.frienduid).then(data => {
          console.log(data);
          if(data == '-1')
            this.friendAlready = false;
          else this.friendAlready = true;
          console.log("this.friendAlready:",this.friendAlready);
        })
      }
      else
        alert("0");
    });
  }

  goBack() {
    this.navCtrl.push(SharesPage);
  }

  addFriend() {
    console.log(this.friend);
    this.threadService.addFriend(this.friend,this.myuid);//.then(data=> console.log(data));
    this.navCtrl.push(FriendsListComponent);
  }


}
