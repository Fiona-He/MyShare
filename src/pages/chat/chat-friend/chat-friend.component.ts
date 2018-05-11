import { Component, OnInit, Input } from "@angular/core";
import { Thread } from "../thread.model";
import { ThreadService } from "../thread.service";
import {ModalController, NavController} from "ionic-angular";
import {ChatMessagesComponent} from "../chat-messages/chat-messages.component";
import {ChatDetailComponent} from "../chat-detail/chat-detail.component";
import {SharesLogComponent} from '../../shares/shares-log.component';
import {AuthService} from "../../core/auth.service";
import {UserInfoComponent} from "../user-info/user-info.component";
import {Friend} from "./Friend";

@Component({
  selector: "app-chat-friend",
  templateUrl: "./chat-friend.component.html",
  //styleUrls: ["./chat-friend.component.css"]
})
export class ChatFriendComponent implements OnInit {
  @Input() friend: Friend;

  constructor(private threadService: ThreadService,
              public navCtrl:NavController,
              public modalCtrl: ModalController,
              public auth: AuthService) {}

  ngOnInit() {}


  goIn() {
      alert(this.friend.bfuid);
      this.navCtrl.push(UserInfoComponent,
        {
          name:this.friend.bfdisplayname||this.friend.bfemail,
          avatar:this.friend.bfphotourl,
          uid:this.friend.bfuid
                }
            )
  }
}
