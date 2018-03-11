import { Component } from '@angular/core';
import { NavController, Platform ,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
