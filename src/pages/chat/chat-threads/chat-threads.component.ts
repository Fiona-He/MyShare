import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Thread } from '../thread.model'
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService]
})
export class ChatThreadsComponent implements OnInit {
  threads: Observable<Thread[]>
  friendList:  Observable<Thread[]>

  constructor(private threadService: ThreadService) {
    console.log("ChatThreadsComponent constructor");
    this.threads = this.threadService.getThreads();
    this.friendList = this.threadService.getFriends();

  }

  ngOnInit() {

    this.threads = this.threadService.getThreads();
    this.chat();
  }


  chat() {
    let friendList = [{id: "YU21uGSJZOZTipNfnRLmAWcNjl53"}, {id: "lhjs5ZL4qAbyEYtLVukeeVmYh8C2"},{id:'jZOH2VrAzjO26nsknSEDelBJlfL2'}];


    // this.threads.subscribe(
    //   value=>{ console.log(value)},
    //   error2 => {},
    //   ()=>{}
    //
    //   )
    for (let i = 0; i < friendList.length; i++) {
      var profileId = friendList[i].id;//this.route.snapshot.paramMap.get('id')
      //this.threadService.createThread(profileId)
    }

  }


}
