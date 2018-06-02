import { Component, OnInit, Input } from "@angular/core";
import { Thread } from "../thread.model";
import { ThreadService } from "../thread.service";
import { ModalController, NavController} from "ionic-angular";
import {ChatMessagesComponent} from "../chat-messages/chat-messages.component";
import {ChatDetailComponent} from "../chat-detail/chat-detail.component";
import {SharesLogComponent} from '../../shares/shares-log.component';
import {AuthService} from "../../core/auth.service";
import {Observable} from 'rxjs/Observable';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Component({
  selector: "app-chat-thread",
  templateUrl: "./chat-thread.component.html",
  //styleUrls: ["./chat-thread.component.css"]
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  photoUrl:any;
  incoming: boolean;

  constructor(private threadService: ThreadService,
              public navCtrl:NavController,
              public modalCtrl: ModalController,
              public auth: AuthService) {}

  ngOnInit() {
    this.checkIncoming();
    console.log(this.incoming);
    if(!this.incoming)
    {
      this.threadService.getUserInfo(this.thread.id.replace(this.auth.currentUserId,'').replace("_",'')).subscribe(data => {
        console.log(this.thread.otherUID);
        console.log(data);
        this.photoUrl = data.photoURL;
      });
    }else{
      this.photoUrl = this.auth.currentUserPhotoURL;
    }

  }

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }

  goIn(threadId) {
      let modal = this.modalCtrl.create(ChatDetailComponent,{id:threadId});
      modal.present();
    // this.navCtrl.push(ChatDetailComponent,{id:threadId})
  }

  checkIncoming() {
    const user = this.auth.currentUserId
    if(this.thread.otherUID && user) {
      this.incoming = this.thread.otherUID !== user
    }
  }
}
