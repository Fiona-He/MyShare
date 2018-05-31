import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import {AccountPage} from "./account";
import { ActionSheetController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-qrcode',
  template: `
    <ion-header [elasticHeader]="myQrcode">
      <ion-toolbar>
        <ion-title>
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="goBack()"
                  style="font-size: 24px;color: #59b5c0; padding-left: 10px;">
            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
        <ion-buttons end>
          <button ion-button (click)="presentActionSheet()"
                  style="font-size: 24px;color: #59b5c0; padding-right: 10px;">
            <ion-icon ios="ios-more" md="md-more"></ion-icon>
          </button>
        </ion-buttons>
        
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #c6e7f0;" fullscreen #myQrcode>
      <div style="width: 100%; text-align: center;">
        <div><img style="border-radius: 30px;width: 100px;h;h;height: 100px;border-style:  solid;border-width: 3px;border-color: #f3f1f1;" [src]="avatar  || '//:0'"></div>
        <h2>{{auth.currentUserDisplayName || ''}}</h2>
        <p style="color: #55687f">{{auth.currentUserEmail || ''}}</p>
      </div>
      <div  style="background-image: url('./assets/imgs/qrcode.png');background-size: auto 100%;text-align: center;background-repeat: no-repeat;height:  300px;padding-top:  70px;margin-top: 40px;background-position:  center;">
      <qr-code [value]="myuid" [size]="131"></qr-code>
      </div>
      <div style="width:  100%;text-align:  center;height: 140px;line-height: 60px; color: #55687f;">掃描上方二維碼，加我為好友</div>
    </ion-content>`,
  providers:[MyserviceService]
})

export class MyQrcode {

  loader:any;
  name: any;
  avatar: any;
  uid: any;
  myuid:any;

  constructor(public navCtrl: NavController,
              public auth: AuthService,
              private http: HttpClient,
              public loadingCtrl: LoadingController,
              private myserviceService:MyserviceService,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController
  ) {
    this.myuid = this.auth.currentUserId;
    this.name = this.auth.currentUserDisplayName;
    this.avatar = this.auth.currentUserPhotoURL;
    this.uid = this.auth.currentUserId;
  }

  ngOnInit() {}


  showPic(option){

    //手機上使用部分開始
    const options: CameraOptions = {
      quality: 80,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit: true,
      sourceType:option,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.presentLoadingCustom();
      let base64Image =  imageData;
      base64Image = 'data:image/jpeg;base64,' + base64Image;
      this.myserviceService.updateHead(base64Image).then(data=>{
        this.auth.afAuth.auth.currentUser.updateProfile({displayName:this.auth.currentUserDisplayName,photoURL:JSON.parse(JSON.stringify(data)).picurl});
        console.log("End update photo to firebase");
        this.myserviceService.updateHeadDB(this.auth.currentUserId,JSON.parse(JSON.stringify(data)).picurl).then(
          data =>{
            this.auth.getUser(this.auth.currentUserId);
            this.loader.dismiss();
          });
      })

    },(err) => {});

    this.presentLoadingCustom();
    let base64Image ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGccAigAYkZCTUQwMTAwMGE4MDAxMDAwMGVkMDEwMDAwNzYwMjAwMDA5NzAyMDAwMGNiMDIwMDAwNWUwMzAwMDAwNTA0MDAwMDM1MDQwMDAwNTYwNDAwMDA4NzA0MDAwMDljMDUwMDAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIADIAMgMAIgABEQECEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMAAAERAhEAAAGgSHxFheqGgZOOSON8YebG8yhC2SEf6hmHWhMKvyoAJwuQy0W3z2zFtxR0efsVrIUhGhB7dQ2DM1h//8QAIxAAAgICAQQCAwAAAAAAAAAAAgMAAQQSEQUTFCEyMxAiQf/aAAgBAAABBQKvVKZYl00t1DKi62KsYOLwzqsbFNswkWlYcwYj7N5t3qSsViMLLZ5Cj3X3WAzepVVV1HPBAY1qJyzEw/sItYLBKdULYyTwrohypxMv914vdBmYzctruYR2mxcfmVlesj44szvtGK+Z3+P/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECEQE/AQf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEBEQE/AQf/xAAnEAABAwMEAQMFAAAAAAAAAAABAAIRAxAhEiIxUVITQYFhcXJzof/aAAgBAAAGPwLtcJxPleFyVy3+qRx2UWuIMunCM2+LFgMOnKhvFvTpNYYMbjyg7tbA2PrYnu2qoU+u6BTDdWUHMILT1fdhbSD9lRatYnBVVvyjPdjkaWlbGEz7IYghZKcfIQnSdhYDZ35KndirfrFv/8QAIBABAAMBAAICAwEAAAAAAAAAAQARITFBUXGBEGGxkf/aAAgBAAABPyG6FHymUCPRZR0KpOPx+lRQv/SPVzL5AbQeAuxnRCp1Hc+JxHr5Qx1hlmRTapjo6tfYpcjLmCv1CHsDdPiVt1HhG7IIAHpiyWkBwAtWfbzNZzQBB5+slw62A+2Gubja6mi5SwnQAFL2bq5gnAwkGZXx0A9uBIkKVk2vCZSLWvbN9clf2atbS+6i05G94Nt/ROH3/fw3ZG8nK/1BaNZ//9oADAMAAAERAhEAABByxATRwhDDyxgQThT/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAECEQE/EAf/xAAUEQEAAAAAAAAAAAAAAAAAAABA/9oACAEBEQE/EAf/xAAkEAEAAgEEAgICAwAAAAAAAAABABEhMUFhcVGRgaEQ8MHR4f/aAAgBAAABPxB5kdXbEFQAoX1EsFQXeAKzBQfxK4pm47I02kFgWwZImh1KhsGALionWgS0FBWeoAyRtSq2EUfq25FAbUrMsmeEcXt9xOTJlnLvDy8EYPAzsV0DNWw9wNTPkPTAu6huW7PG1X81LCjV4zH7lgMsp1SyR1gBaBHoMPG3qg9VRnaCjC1o646lKeP2R/yV5gStREgYnjPcCpi2WBuWhf1B/CRIlbo2THuJeGpr0bp/j1BgFRRKT9IqHiOgctpVg4vG/wBzEnQwfDbibxj5OuhHMfBjCJEEAtkFW6uJkUkDFTbe2ixyiSihH+oalZC51c5hUA3ZZxNduln5TQfEwOQtI5ueyo8HT2+5xo8z/9k=";

    let formData  = new FormData();
    formData.append('base64Data',base64Image);
    this.http.post('http://119.23.70.234:8182/aliyunfile', formData ).subscribe(data =>{
      this.auth.updateProfileData(this.auth.currentUserDisplayName,JSON.parse(JSON.stringify(data)).picurl);
      console.log("End update photo to firebase");
      this.myserviceService
      this.myserviceService.updateHeadDB(this.auth.currentUserId,JSON.parse(JSON.stringify(data)).picurl).then(
        data =>{
          this.auth.getUser(this.auth.currentUserId);
          this.loader.dismiss();
        });
    });
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

  goBack() {
    this.navCtrl.pop();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.showPic(1);
            console.log('Archive clicked');
          }
        },{
          text: '從手機相冊選擇',
          handler: () => {
            this.showPic(2);
            console.log('Destructive clicked');
          }
        },{
          text: '名字',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '郵箱',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



}
