import { Component, OnInit, Input } from "@angular/core";
import { Thread } from "../thread.model";
import { ThreadService } from "../thread.service";
import {ModalController, NavController} from "ionic-angular";
import {ChatMessagesComponent} from "../chat-messages/chat-messages.component";
import {ChatDetailComponent} from "../chat-detail/chat-detail.component";
import {SharesLogComponent} from '../../shares/shares-log.component';

@Component({
  selector: "app-chat-friend",
  templateUrl: "./chat-friend.component.html",
  //styleUrls: ["./chat-friend.component.css"]
})
export class ChatFriendComponent implements OnInit {
  @Input() thread: Thread;

  constructor(private threadService: ThreadService,public navCtrl:NavController,public modalCtrl: ModalController,) {}

  ngOnInit() {}

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
  goIn(otherUID) {
      alert(otherUID);
  }
}
