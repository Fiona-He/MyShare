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

  constructor(private threadService: ThreadService,
              public navCtrl:NavController,
              public modalCtrl: ModalController,
              public auth: AuthService) {}

  ngOnInit() {
    this.threadService.getUserInfo(this.thread.otherUID).subscribe(data => {
      this.photoUrl = data.photoURL;
    });
  }

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }

  goIn(threadId) {
      let modal = this.modalCtrl.create(ChatDetailComponent,{id:threadId});
      modal.present();
    // this.navCtrl.push(ChatDetailComponent,{id:threadId})
  }
}
