import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {ShareService} from "../../myservice/share.service";

@Component({
  selector: 'page-home',
  templateUrl: 'shares-log.component.html'
})
export class SharesLogComponent {

  projectid: any;
  showData = [];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public params: NavParams,
              private shareService: ShareService) {
    this.projectid = this.params.get('projectid');
    console.log('projectid:' + this.projectid);

    this.shareService.getProjectDetail(this.projectid).then(data=>{
      console.log("getProjectDetail:",data);
      this.showData = data;
    })
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
