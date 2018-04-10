import {Component, OnInit} from '@angular/core';
import { NavController,ModalController,PopoverController, Platform, NavParams, ViewController } from 'ionic-angular';
import { trigger, transition, useAnimation } from '@angular/animations';
import { pulse, bounce } from 'ng-animate';
import { Observable } from "rxjs/Rx";
import { HomePage } from './home';
import { RaiseHand} from './raisehand';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';

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
export class SharesPage implements OnInit{

  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public popoverCtrl: PopoverController,private qrScanner: QRScanner) {

  }

  pulse: any;
  bounce: any;
  QRScaning = false;

  animate(name: 'string') {
    this[name] = !this[name];
  }

  ngOnInit(){
    Observable.interval(10000).subscribe((v)=>{
      this["pulse"] = !this["pulse"];
      this["bounce"] = !this["bounce"];
    })
  }

  Step2 = false;

  nextStep(){
    this.Step2 = true;
  }

  presentModal() {
    let modal = this.modalCtrl.create(HomePage);
    modal.present();
  }

  presentPopover() {
    let modal = this.modalCtrl.create(RaiseHand);
    modal.present();
  }

  openModal1st(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage1st, characterNum);
    modal.present();
  }

  openModal2nd(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage2nd, characterNum);
    modal.present();
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

@Component({
  template: `
<ion-header>
  <ion-toolbar style="background-color: #ffffff">
    <ion-title>
      {{character.name}}
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content style="background-color: #c6e7f0;">
  <div style="height: 20px;"></div>
  <div padding>
    <ion-range min="1" max="4" step="1" snaps="true" color="secondary" pin="true" [(ngModel)]="singleValue4">
      <img src="./assets/imgs/face1.png" range-left style="width:  25px;">
      <img src="./assets/imgs/face2.png" range-right style="width:  60px;">
    </ion-range>
  </div>
  <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 10px;">
    <ion-item style="background-color: #f3f8f8;border:  none;border-radius: 20px; color:#344b67;">
      <ion-label>How many people in?</ion-label>
      <ion-select [(ngModel)]="gaming" interface="popover">
        <ion-option value="1" selected="true">1</ion-option>
        <ion-option value="2">2</ion-option>
        <ion-option value="3">3</ion-option>
        <ion-option value="4">4</ion-option>
        <ion-option value="5">5</ion-option>
        <ion-option value="6">6</ion-option>
      </ion-select>
    </ion-item>
  </ion-list>
  <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 32px;">
    <ion-item style="background-color: #f3f8f8;border:  none;border-radius: 20px; color:#344b67;">
      <ion-label floating>Comment</ion-label>
      <ion-input type="text" value=""></ion-input>
    </ion-item>
  </ion-list>
  <div padding>
    <button ion-button round (click)="dismiss()" style="width:100%;">Join this Share</button>
    <button ion-button round (click)="dismiss()" style="width:100%;background-color: #607483;">Quit this Share</button>
  </div>
</ion-content>
`
})
export class ModalContentPage1st {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'child',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
    this.character.name = this.params.get('shareTitle');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  template: `
<ion-header>
  <ion-toolbar style="background-color: #ffffff">
    <ion-title>
      {{character.name}}
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content style="background-color: #c6e7f0;">
  <div style="height: 20px;"></div>
  <div padding>
    <ion-range min="1" max="4" step="1" snaps="true" color="secondary" pin="true" [(ngModel)]="singleValue4">
      <img src="./assets/imgs/face1.png" range-left style="width:  25px;">
      <img src="./assets/imgs/face2.png" range-right style="width:  60px;">
    </ion-range>
  </div>
  <ion-list>
    <ion-item-sliding>
      <ion-item style="background-color: #f3f8f8;border:  none;color:#344b67;">
        <ion-checkbox [(ngModel)]="pepperoni"></ion-checkbox>
        <ion-avatar item-start>
          <img src="./assets/imgs/emoji2.png">
        </ion-avatar>
        <ion-label>
          <h2>Finn</h2>
          <h3>Don't Know What To Do!</h3>
          <p>I've had a pretty messed up day. If we just...</p>
        </ion-label>
      </ion-item>
      <ion-item-options side="right">
        <button ion-button color="secondary">
          <ion-icon name="information-circle"></ion-icon>
          Detail
        </button>
        <button ion-button color="dark">
          <ion-icon name="close" style="font-weight: bold;"></ion-icon>
          Delete
        </button>
      </ion-item-options>
    </ion-item-sliding>
    <ion-item-sliding>
      <ion-item style="background-color: #f3f8f8;border:  none;color:#344b67;">
        <ion-checkbox [(ngModel)]="pepperoni1"></ion-checkbox>
        <ion-avatar item-start>
          <img src="./assets/imgs/emoji1.png">
        </ion-avatar>
        <ion-label>
          <h2>Finn</h2>
          <h3>Don't Know What To Do!</h3>
          <p>I've had a pretty messed up day. If we just...</p>
        </ion-label>
      </ion-item>
      <ion-item-options side="right">
        <button ion-button color="secondary">
          <ion-icon name="information-circle"></ion-icon>
          Detail
        </button>
        <button ion-button color="dark">
          <ion-icon name="close" style="font-weight: bold;"></ion-icon>
          Delete
        </button>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
  <div padding>
    <button ion-button round (click)="dismiss()" style="width:100%;">Start Sharing</button>
  </div>
</ion-content>
`
})
export class ModalContentPage2nd {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'child',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
    this.character.name = this.params.get('shareTitle');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
