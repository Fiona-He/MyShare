import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, LoadingController, ModalController, NavController, NavParams, Platform,
  ViewController
} from 'ionic-angular';
import {AuthService} from "../core/auth.service";
import {ShareService} from "../../myservice/share.service";
import {ActivityPeopleComponent} from "../friends/friends-list/activity-people.component";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MyserviceService} from '../../myservice/myservice.service';
import {UserService} from '../user/user.service';
import {UpdateShareName} from './update-share-name';


@Component({
  template: `
    <ion-header [elasticHeader]="settingContent">
      <ion-toolbar>
        <ion-title>
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()"
                  style="font-size: 24px;color: #59b5c0; padding-left: 10px;">
            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #f4f4f4;" #settingContent>
      <ion-list no-lines>
        <ion-item>
          <ion-grid>
            <ion-row align-items-center>
              <ion-col col-2 *ngFor="let p of peopleList" class="head-icon-name"><img [src]="p.photoURL" 
                                                         class="head-icon">
              </ion-col>
              <ion-col col-2>
                <button ion-button (click)="addPeopleToActivity()" class="user-main-button">
                  <ion-icon name="add" ios="md-add"></ion-icon>
                </button>
              </ion-col>
              <ion-col col-2 [hidden]="!showDeleteButton">
                <button ion-button (click)="deletePeopleFromActivity()"class="user-main-button">
                  <ion-icon name="remove" ios="md-remove"></ion-icon>
                </button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
      <ion-list>
        <button ion-item (click)="openModalUpdateShareName()" style="border-bottom:  0.55px solid #c8c7cc;">
          拼單名稱
        </button>
        <ion-item-divider color="light">拼單圖片</ion-item-divider>
        <ion-item style="border-bottom:  0.55px solid #c8c7cc;">
          <ion-grid>
            <ion-row align-items-center style="padding-bottom: 10px;">
              <ion-col col-6 style="text-align: center;">
                <button (click)="presentActionSheet(projectid,1)" [ngStyle]="{'background-image': 'url('+share.front1+')'}" style="border-color:  #bbbbbb;border-width:  1px;border-style:  dashed;text-align:  center;height:120px;width:120px;font-size:  20px;color:  #bbbbbb;background-size:  100%;color: #eeeeee;">
                  <ion-icon ios="ios-image" md="md-image"></ion-icon>
                </button>
                <div style="padding-top: 10px;font-size: 22px;color: #c8c7cc;"><ion-icon ios="ios-close-circle" md="md-close-circle" (click)="resetPic(projectid,1)"></ion-icon></div>
              </ion-col>
              <ion-col col-6 style="text-align: center;">
                <button (click)="presentActionSheet(projectid,2)" [ngStyle]="{'background-image': 'url('+share.front2+')'}" style="border-color:  #bbbbbb;border-width:  1px;border-style:  dashed;text-align:  center; height:120px; width:120px;font-size:  20px;color:  #bbbbbb;background-size:  100%;color: #eeeeee;">
                  <ion-icon ios="ios-image" md="md-image"></ion-icon>
                </button>
                <div style="padding-top: 10px;font-size: 22px;color: #c8c7cc;"><ion-icon ios="ios-close-circle" md="md-close-circle" (click)="resetPic(projectid,2)"></ion-icon></div>
              </ion-col>
            </ion-row>
            <ion-row align-items-center>
              <ion-col col-6 style="text-align: center;">
                <button (click)="presentActionSheet(projectid,3)" [ngStyle]="{'background-image': 'url('+share.front3+')'}" style="border-color:  #bbbbbb;border-width:  1px;border-style:  dashed;text-align:  center; height:120px; width:120px;font-size:  20px;color:  #bbbbbb;background-size:  100%;color: #eeeeee;">
                  <ion-icon ios="ios-image" md="md-image"></ion-icon>
                </button>
                <div style="padding-top: 10px;font-size: 22px;color: #c8c7cc;"><ion-icon ios="ios-close-circle" md="md-close-circle" (click)="resetPic(projectid,3)"></ion-icon></div>
              </ion-col>
              <ion-col col-6 style="text-align: center;">
                <button (click)="presentActionSheet(projectid,4)" [ngStyle]="{'background-image': 'url('+share.front4+')'}" style="border-color:  #bbbbbb;border-width:  1px;border-style:  dashed;text-align:  center; height:120px; width:120px;font-size:  20px;color:  #bbbbbb;background-size:  100%;color: #eeeeee;">
                  <ion-icon ios="ios-image" md="md-image"></ion-icon>
                </button>
                <div style="padding-top: 10px;font-size: 22px;color: #c8c7cc;"><ion-icon ios="ios-close-circle" md="md-close-circle" (click)="resetPic(projectid,4)"></ion-icon></div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
        <button ion-item (click)="itemSelected(item)" style="border-bottom:  0.55px solid #c8c7cc;">
          拼單二維碼
        </button>
      </ion-list>
      <ion-list>
        <ion-item>
          <ion-label> 消息免打擾</ion-label>
          <ion-toggle checked="false"></ion-toggle>
        </ion-item>
      </ion-list>
      <div padding>
        <button ion-button round (click)="dismiss()" style="width:100%;border-radius:  10px; background-color: #e13838;">
          刪除并退出
        </button>
      </div>
    </ion-content>
  `
})
export class ModalContentSetting implements OnInit {
  character;
  loader:any;
  peopleList:any;
  projectid: any;
  share: any={};
  showDeleteButton:false;
  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,public auth: AuthService,
              public navCtrl: NavController,
              private shareService:ShareService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public userService: UserService,
              private myserviceService:MyserviceService,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit() {
    console.log(this.params.get("characterNum"));
    console.log(this.params.get("owner"));
    this.showDeleteButton = this.params.get("owner");
    this.projectid = this.params.get("characterNum");
    this.initShareDate();
  }

  addPeopleToActivity(){
    //this.auth.currentUserId
    let modal = this.modalCtrl.create(ActivityPeopleComponent,{action:'add',doPerson:this.auth.currentUserId,shareID:this.params.get("characterNum")});
    modal.onDidDismiss(data => {
      this.initShareDate();
    });
    modal.present();
  }

  deletePeopleFromActivity(){
    let modal = this.modalCtrl.create(ActivityPeopleComponent,{action:'delete',doPerson:this.auth.currentUserId,shareID:this.params.get("characterNum")});
    modal.onDidDismiss(data => {
      this.initShareDate();
    });
    modal.present();
  }

  presentActionSheet(projectid, target) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.showPic(projectid,1,target);
            console.log('Archive clicked');
          }
        },{
          text: '從手機相冊選擇',
          handler: () => {
            this.showPic(projectid,2,target);
            console.log('Destructive clicked');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showPic(projectid,option,target) {

    //手機上使用部分開始
    const options: CameraOptions = {
      quality: 80,
      targetWidth: 800,
      targetHeight: 800,
      allowEdit: true,
      sourceType: option,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.presentLoadingCustom();
      let base64Image = imageData;
      base64Image = 'data:image/jpeg;base64,' + base64Image;
      this.myserviceService.updateHead(base64Image).then(data => {
        console.log(data.toString());
        this.shareService.updateprojectfront(projectid, target, JSON.parse(JSON.stringify(data)).picurl).then(
          res =>{
            this.initShareDate();
            this.loader.dismiss();
          });
      })
    }, (err) => {});
/*
    let base64Image ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGccAigAYkZCTUQwMTAwMGE4MDAxMDAwMGVkMDEwMDAwNzYwMjAwMDA5NzAyMDAwMGNiMDIwMDAwNWUwMzAwMDAwNTA0MDAwMDM1MDQwMDAwNTYwNDAwMDA4NzA0MDAwMDljMDUwMDAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIADIAMgMAIgABEQECEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMAAAERAhEAAAGgSHxFheqGgZOOSON8YebG8yhC2SEf6hmHWhMKvyoAJwuQy0W3z2zFtxR0efsVrIUhGhB7dQ2DM1h//8QAIxAAAgICAQQCAwAAAAAAAAAAAgMAAQQSEQUTFCEyMxAiQf/aAAgBAAABBQKvVKZYl00t1DKi62KsYOLwzqsbFNswkWlYcwYj7N5t3qSsViMLLZ5Cj3X3WAzepVVV1HPBAY1qJyzEw/sItYLBKdULYyTwrohypxMv914vdBmYzctruYR2mxcfmVlesj44szvtGK+Z3+P/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECEQE/AQf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEBEQE/AQf/xAAnEAABAwMEAQMFAAAAAAAAAAABAAIRAxAhEiIxUVITQYFhcXJzof/aAAgBAAAGPwLtcJxPleFyVy3+qRx2UWuIMunCM2+LFgMOnKhvFvTpNYYMbjyg7tbA2PrYnu2qoU+u6BTDdWUHMILT1fdhbSD9lRatYnBVVvyjPdjkaWlbGEz7IYghZKcfIQnSdhYDZ35KndirfrFv/8QAIBABAAMBAAICAwEAAAAAAAAAAQARITFBUXGBEGGxkf/aAAgBAAABPyG6FHymUCPRZR0KpOPx+lRQv/SPVzL5AbQeAuxnRCp1Hc+JxHr5Qx1hlmRTapjo6tfYpcjLmCv1CHsDdPiVt1HhG7IIAHpiyWkBwAtWfbzNZzQBB5+slw62A+2Gubja6mi5SwnQAFL2bq5gnAwkGZXx0A9uBIkKVk2vCZSLWvbN9clf2atbS+6i05G94Nt/ROH3/fw3ZG8nK/1BaNZ//9oADAMAAAERAhEAABByxATRwhDDyxgQThT/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECEQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEBEQE/EAf/xAAkEAEAAgEEAgICAwAAAAAAAAABABEhMUFhcVGRgaEQ8MHR4f/aAAgBAAABPxB5kdXbEFQAoX1EsFQXeAKzBQfxK4pm47I02kFgWwZImh1KhsGALionWgS0FBWeoAyRtSq2EUfq25FAbUrMsmeEcXt9xOTJlnLvDy8EYPAzsV0DNWw9wNTPkPTAu6huW7PG1X81LCjV4zH7lgMsp1SyR1gBaBHoMPG3qg9VRnaCjC1o646lKeP2R/yV5gStREgYnjPcCpi2WBuWhf1B/CRIlbo2THuJeGpr0bp/j1BgFRRKT9IqHiOgctpVg4vG/wBzEnQwfDbibxj5OuhHMfBjCJEEAtkFW6uJkUkDFTbe2ixyiSihH+oalZC51c5hUA3ZZxNduln5TQfEwOQtI5ueyo8HT2+5xo8z/9k=";

    this.myserviceService.updateHead(base64Image).then(data => {
      console.log(data.toString());
      this.shareService.updateprojectfront(projectid, target, JSON.parse(JSON.stringify(data)).picurl);
    })*/
  }

  resetPic(projectid, target){
    this.presentLoadingCustom();
    this.shareService.updateprojectfront(projectid, target, '').then(
      res =>{
        this.initShareDate();
        this.loader.dismiss();
      });
  }

  initShareDate(){
    this.shareService.getShare(this.projectid).then( data =>{
      console.log(data);
      this.share = data;
    });
    this.shareService.getActivityPeople(this.params.get("characterNum")).then(data=>{
      console.log("getActivityPeople",data);
      this.peopleList = data;
      for (let j = 0; j < this.peopleList.length; j++) {
        this.userService.getUser(this.peopleList[j].field2).subscribe(res =>{
          console.log("res",res);
          this.peopleList[j].photoURL = res.photoURL;
          this.peopleList[j].displayName = res.displayName || res.email;
          //return res;
        })
      }
    })
  }

  openModalUpdateShareName() {
    let modal = this.modalCtrl.create(UpdateShareName, {data: this.share});
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  presentLoadingCustom() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img src="./assets/imgs/loading.gif" width="80">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.present();
  }

}
