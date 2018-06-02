import { Component, OnInit, Input } from '@angular/core'

import { Message } from '../message.model'
import { MessageService } from '../message.service';
import { AuthService } from '../../core/auth.service';
import {ThreadService} from '../thread.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  //styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message
  incoming: boolean;
  photoUrl:any = "";

  constructor(
    private threadService: ThreadService,
    private messageService: MessageService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.checkIncoming();
    console.log(this.incoming);
    console.log(this.message.senderId);
    if(this.incoming) {
      this.threadService.getUserInfo(this.message.senderId).subscribe(data => {
        console.log("getUserInfo Data2:" + data);
        this.photoUrl = data.photoURL;
      });
    }else{
      this.photoUrl = this.auth.currentUserPhotoURL;
    }
  }

  checkIncoming() {
    const user = this.auth.currentUserId
    if(this.message.sender && user) {
      this.incoming = this.message.senderId !== user
    }
  }

}
