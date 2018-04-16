import { Component } from '@angular/core';
import { NavController, Platform ,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'shares-log.component.html'
})
export class SharesLogComponent {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
