import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, transition, useAnimation } from '@angular/animations';
import { pulse, bounce } from 'ng-animate';

@Component({
  selector: 'page-home',
  templateUrl: 'shares.html',
  animations: [
    trigger('pulse', [transition('* => *', useAnimation(pulse, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 5, delay: 0 }
    }))]),
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 5, delay: 0 }
    }))])
  ],
})
export class SharesPage {

  constructor(public navCtrl: NavController) {

  }

  pulse: any;
  bounce: any;
  animate(name: 'string') {
    this[name] = !this[name];
  }

  Step2 = false;

  nextStep(){
    this.Step2 = true;
  }

}
