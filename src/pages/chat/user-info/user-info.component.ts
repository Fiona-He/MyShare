import { Component, OnInit, Input } from "@angular/core";
import { ThreadService } from "../thread.service";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {ChatListComponent} from "../chat-list/chat-list.component";

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
    //this.navCtrl.push(ChatDetailComponent,{id:id})

  }
  back(){
    this.navCtrl.push(ChatListComponent);
  }
}
