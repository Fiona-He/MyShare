import {Component, OnInit, Input} from "@angular/core";
import {ThreadService} from "../../chat/thread.service";
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";

@Component({
  selector: "app-friend-info",
  templateUrl: "./friend-info.component.html",
})
export class FriendInfoComponent implements OnInit {

  name: any;
  avatar: any;
  loader: any;
  uid: any;

  constructor(private threadService: ThreadService,
              public viewCtrl: ViewController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.name = this.navParams.get("name");
    this.avatar = this.navParams.get("avatar");
    this.uid = this.navParams.get("uid");
  }

  ngOnInit() {
  }

  create() {
    this.ShowLoading();
    this.threadService.createThread(this.uid);
    this.loader.dismiss();
  }

  ShowLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div>
        <img src="./assets/imgs/loading.gif" width="60">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loader.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
