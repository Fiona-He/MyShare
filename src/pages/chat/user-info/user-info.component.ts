import { Component, OnInit, Input } from "@angular/core";
import { Thread } from "../thread.model";
import { ThreadService } from "../thread.service";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {ChatMessagesComponent} from "../chat-messages/chat-messages.component";
import {ChatDetailComponent} from "../chat-detail/chat-detail.component";
import {SharesLogComponent} from '../../shares/shares-log.component';
import {ChatThreadsComponent} from "../chat-threads/chat-threads.component";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  //styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {


  name:any;
  avatar:any;
  uid:any;
  constructor(private threadService: ThreadService,
              public navCtrl:NavController,
              public modalCtrl: ModalController,
              public navParams:NavParams) {
    this.name = this.navParams.get("name");
    this.avatar = this.navParams.get("avatar");
    this.uid = this.navParams.get("uid");
  }

  ngOnInit() {}


  create(){
    this.threadService.createThread(this.uid);
  }
  back(){
    this.navCtrl.push(ChatThreadsComponent);
  }
}
