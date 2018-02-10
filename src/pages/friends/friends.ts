import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {trigger, transition, useAnimation} from '@angular/animations';
import {bounce} from 'ng-animate';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-contact',
  templateUrl: 'friends.html',
  animations: [
    trigger('bounce1', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: {timing: 5, delay: 0}
    }))]),
    trigger('bounce2', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: {timing: 7, delay: 0}
    }))])
  ]
})
export class FriendsPage implements OnInit{

  constructor(public navCtrl: NavController,private qrScanner: QRScanner) {

  }

  QRScaning = false;

  ngOnInit(){
    Observable.interval(8000).subscribe((v)=>{
      this["bounce1"] = !this["bounce1"];
      this["bounce2"] = !this["bounce2"];
    })
  }

  StartScan(): void {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.qrScanner.hide(); // hide camera preview
          this.QRScaning = false;
          scanSub.unsubscribe(); // stop scanning
        });

        // show camera preview
        this.qrScanner.show();

        this.QRScaning = true;

        // wait for user to scan something, then the observable callback will be called

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
      .catch((e: any) => console.log('Error is', e));
  }

  EndScan():void {
    this.qrScanner.destroy();
    this.QRScaning = false;
  }

}
