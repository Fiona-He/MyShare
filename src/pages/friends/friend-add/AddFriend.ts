import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController ,NavParams} from 'ionic-angular';
import {AuthService} from '../../core/auth.service';
import {SharesPage} from "../../shares/shares";
@Component({
  selector: 'my-qrcode',
  template: `
    <button (click)="goBack()">back</button>
    {{frienduid}}
    <button (click)="addFriend()">confirm</button>
  `
})
export class AddFriend {

  loader:any;

  myuid:any;
  frienduid:any;
  constructor(public navCtrl: NavController,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              public navParams:NavParams
  ) {
    this.myuid = this.auth.currentUserId;
    this.frienduid = this.navParams.get('frienduid');
    alert(this.frienduid + " - " + this.myuid);
  }

  ngOnInit() {
    console.log(this.myuid,this.frienduid);
  }

  goBack() {
    this.navCtrl.push(SharesPage);
  }

  addFriend() {

  }





}
