import { Component, OnInit, Input } from "@angular/core";
import { Thread } from "../thread.model";
import { ThreadService } from "../thread.service";
import {ModalController, NavController} from "ionic-angular";
import {ChatMessagesComponent} from "../chat-messages/chat-messages.component";
import {ChatDetailComponent} from "../chat-detail/chat-detail.component";
import {SharesLogComponent} from '../../shares/shares-log.component';

@Component({
  selector: "app-chat-thread",
  templateUrl: "./chat-thread.component.html",
  //styleUrls: ["./chat-thread.component.css"]
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;

  constructor(private threadService: ThreadService,public navCtrl:NavController,public modalCtrl: ModalController,) {}

  ngOnInit() {}

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
  goIn(threadId) {
      let modal = this.modalCtrl.create(ChatDetailComponent,{id:threadId});
      modal.present();
  }
}
