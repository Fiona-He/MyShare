import {NavParams, Platform, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  template: `
    <ion-header>
      <ion-toolbar style="background-color: #ffffff">
        <ion-title>
          我要拼單
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
      <div padding style="height: 120px;text-align: center;">
        <img src="./assets/imgs/account.png" style="width:  120px;">
      </div>
      <table width="100%" cellspacing="10px;">
        <tr>
          <td align="center" height="80">
            <div class="progress-outer">
              <div class="progress-inner" style="width: 50%;">
                第二步
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!--<div padding>
        <ion-row align-items-center justify-content-center>
          <ion-col col-2  align-self-center><div class="progress-ind-last">1</div></ion-col>
          <ion-col col-1>
            <div class="progress-bar"></div>
          </ion-col>
          <ion-col col-3><div class="progress-ind-now">2</div></ion-col>
          <ion-col col-1>
            <div class="progress-bar"></div>
          </ion-col>
          <ion-col col-2><div class="progress-ind-next">3</div></ion-col>
          <ion-col col-1>
            <div class="progress-bar"></div>
          </ion-col>
          <ion-col col-2><div class="progress-ind-next">4</div></ion-col>
        </ion-row>
      </div>-->
      <ion-list>
        <ion-item-divider color="light">
          <ion-checkbox [(ngModel)]="pepperoni"></ion-checkbox>
          <ion-label>全選</ion-label>
        </ion-item-divider>
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
        <button ion-button round (click)="dismiss()" style="width:100%;">發起拼單</button>
        <button ion-button round (click)="dismiss()" style="width:100%;background-color: #e13838;">
          撤銷我的拼單
        </button>
      </div>
    </ion-content>
  `
})
export class ModalContentPage2nd {
  character;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'child',
        items: [
          {title: 'Race', note: 'Hobbit'},
          {title: 'Culture', note: 'River Folk'},
          {title: 'Alter Ego', note: 'Smeagol'}
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          {title: 'Race', note: 'Hobbit'},
          {title: 'Culture', note: 'Shire Folk'},
          {title: 'Weapon', note: 'Sting'}
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          {title: 'Race', note: 'Hobbit'},
          {title: 'Culture', note: 'Shire Folk'},
          {title: 'Nickname', note: 'Sam'}
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
