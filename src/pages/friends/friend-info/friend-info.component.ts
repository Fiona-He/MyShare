import {Component, OnInit, Input} from "@angular/core";
import {ThreadService} from "../../chat/thread.service";
import {NavController, NavParams, ViewController} from "ionic-angular";

@Component({
  selector: "app-friend-info",
  templateUrl: "./friend-info.component.html",
})
export class FriendInfoComponent implements OnInit {

  name: any;
  avatar: any;
  uid: any;

  constructor(private threadService: ThreadService,
              public viewCtrl: ViewController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.name = this.navParams.get("name");
    this.avatar = this.navParams.get("avatar");
    this.uid = this.navParams.get("uid");
  }

  ngOnInit() {
  }

  create() {
    this.threadService.createThread(this.uid);
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
