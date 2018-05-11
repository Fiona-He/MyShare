import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Thread } from '../thread.model'
import { ThreadService } from '../thread.service';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService]
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<Thread[]>
  friendList: any;

  constructor(private threadService: ThreadService,public auth: AuthService) {
    console.log("ChatThreadsComponent constructor");
    //this.threads = this.threadService.getThreads();

    //this.threadService.getFriends(auth.currentUserId).then(data => this.friendList = data);

  }

  ngOnInit() {

    this.threads = this.threadService.getThreads();

    this.threadService.getFriends(this.auth.currentUserId).then(data => this.friendList = data);
    //this.chat();
  }



}
