import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Message } from "../message.model";
import { MessageService } from "../message.service";
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  //styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages: Observable<Message[]>

  constructor(
    private messageService: MessageService,
    private navParams: NavParams
    //private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMessages()
  }

  getMessages() {
    const channelId = this.navParams.get('id');
      //'YU21uGSJZOZTipNfnRLmAWcNjl53_jZOH2VrAzjO26nsknSEDelBJlfL2';//this.route.snapshot.paramMap.get('id')
    this.messages = this.messageService.getMessages(channelId)
  }

}
