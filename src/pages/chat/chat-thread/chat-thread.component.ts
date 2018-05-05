import { Component, OnInit, Input } from "@angular/core";
import { Thread } from "../thread.model";
import { ThreadService } from "../thread.service";
import {NavController} from "ionic-angular";
import {ChatMessagesComponent} from "../chat-messages/chat-messages.component";
import {ChatDetailComponent} from "../chat-detail/chat-detail.component";

@Component({
  selector: "app-chat-thread",
  templateUrl: "./chat-thread.component.html",
  //styleUrls: ["./chat-thread.component.css"]
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;

  constructor(private threadService: ThreadService,public navCtrl:NavController) {}

  ngOnInit() {}

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
  goIn(threadId) {
    console.log("go in click! ",threadId);
    this.navCtrl.push(ChatDetailComponent,{id:threadId})
  }
}
