import {Component, OnInit, Input} from "@angular/core";
import {ModalController, NavController} from "ionic-angular";
import {AuthService} from "../../core/auth.service";
import {Friend} from "./Friend";
import {FriendInfoComponent} from '../friend-info/friend-info.component';

@Component({
  selector: "app-chat-friend",
  templateUrl: "./chat-friend.component.html",
})
export class ChatFriendComponent implements OnInit {
  @Input() friend: Friend;

  constructor(
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public auth: AuthService) {
  }

  ngOnInit() {
  }

  goIn() {
    /*let modal = this.modalCtrl.create(FriendInfoComponent, {
      name: this.friend.bfdisplayname || this.friend.bfemail,
      avatar: this.friend.bfphotourl,
      uid: this.friend.bfuid
    });
    modal.present();*/
    this.navCtrl.push(FriendInfoComponent,
      {
        name:this.friend.bfdisplayname||this.friend.bfemail,
        avatar:this.friend.bfphotourl,
        uid:this.friend.bfuid
              }
          )
  }
}
