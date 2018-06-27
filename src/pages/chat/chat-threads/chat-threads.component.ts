import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Thread } from '../thread.model'
import { ThreadService } from '../thread.service';
import { AuthService } from "../../core/auth.service";
import {FriendSortPipe} from "../../../myservice/ActivitySortPipe";

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService]
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<Thread[]>
  friendList: any;
  //@Input() searchContent:String;
  constructor(private threadService: ThreadService,public auth: AuthService) {
    console.log("ChatThreadsComponent constructor");
    //this.searchContent = '';
  }

  ngOnInit() {

    this.threads = this.threadService.getThreads();

    this.threadService.getFriends(this.auth.currentUserId).then(data => {
      console.log("this.friendList:",data);
      this.friendList = data
    });

  }



}
