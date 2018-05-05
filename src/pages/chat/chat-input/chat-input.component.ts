import { Component, OnInit } from "@angular/core";
//import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../../core/auth.service";
import { MessageService } from "../message.service";

import { Message } from "../message.model";
import { ThreadService } from '../thread.service';

import {NavController, LoadingController} from 'ionic-angular';

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  //styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent implements OnInit {
  message: string;

  constructor(
    //private route: ActivatedRoute,
    private messageService: MessageService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private threadService: ThreadService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  send(): void {
    const channelId = 'YU21uGSJZOZTipNfnRLmAWcNjl53_jZOH2VrAzjO26nsknSEDelBJlfL2';//this.route.snapshot.paramMap.get("id");
    const photoURL = this.auth.authState.photoURL;
    const sender = this.auth.authState.displayName || this.auth.authState.email;
    const senderId = this.auth.currentUserId;
    const message = this.message;
    this.messageService.sendMessage(
      channelId,
      photoURL,
      sender,
      senderId,
      message
    );
    this.saveLast(channelId, message)
    this.message = "";
  }

  saveLast(channelId, message) {
    this.threadService.saveLastMessage(channelId, message)
  }

  handleSubmit(event) {
    if(event.keyCode === 13) {
      this.send()
    }
  }
}
