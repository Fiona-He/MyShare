import {NavParams, Platform, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  templateUrl:'./modal-content-step.component.html',
})
export class ModalContentStepComponent {
  status:any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
    this.status = this.params.get('status');
    console.log(this.params.get('status'))
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
