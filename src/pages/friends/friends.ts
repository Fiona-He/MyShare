import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {trigger, transition, useAnimation} from '@angular/animations';
import {bounce} from 'ng-animate';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {Observable} from 'rxjs/Rx';
import {AddFriend} from "./friend-add/AddFriend";

import {FriendSortPipe} from "../../myservice/ActivitySortPipe";
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
  onInput(e){}
  onCancel(e){}
  // changeInput(value){
  //   this.searchContent = value;
  //   console.log(this.searchContent);
  //   console.log("myInput",this.myInput)
  // }
  myInput: any;
  goActivityPeople:any;
  searchContent:any;
  constructor(public navCtrl: NavController,private qrScanner: QRScanner,private navParams: NavParams,) {
    if(this.navParams.get("action") == undefined || this.navParams.get("action") == ""){
      this.goActivityPeople = false;
      console.log("this.goActivityPeople",this.goActivityPeople);
    }
    else
      this.goActivityPeople = true;

    this.myInput = '';
  }

  QRScaning = false;

  ngOnInit(){
    if(this.navParams.get("action") == undefined || this.navParams.get("action") == ""){
      this.goActivityPeople = false;
      console.log("this.goActivityPeople",this.goActivityPeople);
    }
    else
      this.goActivityPeople = true;

    Observable.interval(8000).subscribe((v)=>{
      this["bounce1"] = !this["bounce1"];
      this["bounce2"] = !this["bounce2"];
    })

  }

  Step2 = false;

  nextStep(){
    this.Step2 = true;
  }

  StartScan(): void {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {

      // camera permission was granted
      if (status.authorized) {

        // show camera preview
        // start scanning
        this.qrScanner.show();
        this.QRScaning = true;

        // wait for user to scan something, then the observable callback will be called
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.qrScanner.hide(); // hide camera preview
          this.QRScaning = false;
          scanSub.unsubscribe(); // stop scanning
          alert("aa");
          this.navCtrl.push(AddFriend,{frienduid:text});
          alert("bb");
        });

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
