import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import {
  NavController,
  ModalController,
  PopoverController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import {ModalNewShare} from './modal-new-share.component';
import {ModalContentSetting} from './modal-share-setting.component';
import {ModalContentStepComponent} from './modal-content-step.component';
import {trigger, transition, useAnimation} from '@angular/animations';
import {pulse, bounce} from 'ng-animate';
import {Observable} from "rxjs/Rx";
import {SharesLogComponent} from './shares-log.component';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import {ShareService} from '../../myservice/share.service';
import {AuthService} from '../core/auth.service';
import {AddFriend} from "../friends/friend-add/AddFriend";
import {AngularFirestore} from 'angularfire2/firestore';
import {UpdateShareDesc} from './update-share-desc';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var echarts;
declare var moment: any;

interface Order {
  orderid: string;
  status: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'shares.html',
  providers: [ShareService],
  animations: [
    trigger('pulse', [transition('* => *', useAnimation(pulse, {
      // Set the duration to 5seconds and delay to 2seconds
      params: {timing: 5, delay: 0}
    }))]),
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 5seconds and delay to 2seconds
      params: {timing: 5, delay: 0}
    }))])
  ],
})

export class SharesPage implements OnInit {


  chart: any;
  showData: any[] = new Array();
  passtime:any;
  nowHour:any;
  nowMinute:any;
  nowSecond:any;
  nowDate:any;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private qrScanner: QRScanner,
    public auth: AuthService,
    private socialSharing: SocialSharing,
    private afs: AngularFirestore,
    public popoverCtrl: PopoverController,
    private photoViewer: PhotoViewer,
    private shareService: ShareService) {

  }

  doDiffTime(now:any, before:any):any{
    let ONE_HOUR = 1000 * 60 * 60;  // 1小時的毫秒數
    let ONE_MIN = 1000 * 60; // 1分鐘的毫秒數
    let ONE_SEC = 1000;   // 1秒的毫秒數
    let diff = now - before;
    //console.log("doDiffTime:");
    //console.log("now:",now);
    //console.log("before:",before);
    //console.log("diff:",diff);


    let leftHours = Math.floor(diff/ONE_HOUR);
    if(leftHours > 0) diff = diff - (leftHours * ONE_HOUR);
    let leftMins = Math.floor(diff/ONE_MIN);
    if(leftMins >0) diff = diff - (leftMins * ONE_MIN);
    let leftSecs = Math.floor(diff/ONE_SEC);
    let result = leftHours+"小時"+leftMins+"分"+leftSecs+"秒";

    // the other method:
    // var Date_C = new Date(now - before);
    //   document.write("兩個時間差距為" +
    //   Math.floor(Date_C.getTime() / 3600000) + "小時 " +
    //   Date_C.getUTCMinutes() + "分 " +
    //   Date_C.getUTCSeconds() + "秒");
    return result;
  }

  shareViaFacebook(message, subject, url){

    var options = {
      message: message, // not supported on some apps (Facebook, Instagram)
      subject: subject, // fi. for email
      files: ['https://myshare123.oss-cn-shenzhen.aliyuncs.com/icon-76.png', ''], // an array of filenames either locally or remotely
      url: url,
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title,
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };

    var onSuccess = function(result) {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };

    var onError = function(msg) {
      console.log("Sharing failed with message: " + msg);
    };


    this.socialSharing.shareWithOptions(options);
  }

  getNowTimeStpFormat(): any{
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = ('0' + (date.getMonth()+1).toString() ).slice(-2);
    let dd = ('0' + (date.getDate()).toString() ).slice(-2);
    let hour = ('0' + (date.getHours()).toString() ).slice(-2);
    let min = ('0' + (date.getMinutes()).toString() ).slice(-2);
    let second = ('0' + (date.getSeconds()).toString() ).slice(-2);
    let msecond = ('0' + (date.getMilliseconds()).toString() ).slice(-3);
    this.passtime =  yyyy+mm+dd+hour+min+second+msecond;
    this.nowHour = date.getHours();
    this.nowMinute = date.getMinutes();
    this.nowSecond = date.getSeconds();
    this.nowDate = date;

    //console.log(this.passtime);
    //alert(this.passtime);
    // setInterval(this.getNowTimeStpFormat(),10000)
    // setTimeout(this.getNowTimeStpFormat(),10000000);
  }

  /* ngAfterViewInit() {
     let hours = ['', '', '', '', '', '5a', '6a',
       '7a', '8a', '9a', '10a', '11a',
       '12p', '1p', '2p', '3p', '4p', '5p',
       '6p', '7p', '8p', '9p', '10p', '11p'];
     let days = ['', '', '',
       '', '', '', ''];
     let data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
     setTimeout(() => {

       let ctx = this.container.nativeElement;
       this.chart = echarts.init(ctx);
       this.chart.setOption({
         tooltip: {
           type: 'axis'
         },
         visualMap: {
           max: 20,
           show: false,
           inRange: {
             color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
           }
         },
         xAxis3D: {
           type: 'category',
           name: '',
           axisTick: {
             show: false
           },
           data: hours,
           axisLine: {
             lineStyle: {
               color: 'rgba(0,0,0,0)'
             }
           }
         },
         yAxis3D: {
           type: 'category',
           name: '',
           axisTick: {
             show: false
           },
           data: days,
           axisLine: {
             lineStyle: {
               color: 'rgba(0,0,0,0)'
             }
           }
         },
         zAxis3D: {
           type: 'value',
           name: '',
           axisTick: {
             show: false
           },
           axisLine: {
             lineStyle: {
               color: 'rgba(0,0,0,0)'
             }
           }
         },
         grid3D: {
           show: false,
           boxWidth: 260,
           boxDepth: 80,
           axisPointer: {
             show: false
           },
           light: {
             main: {
               intensity: 1.2
             },
             ambient: {
               intensity: 0.3
             }
           },
           viewControl: {
             autoRotate: false,
             alpha: 0,
             beta: 0,
             animation: true,
             distance: 160,
           },
         },
         series: [{
           type: 'bar3D',
           label: {
             show: false,
             textStyle: {
               fontSize: 16,
               borderWidth: 1
             }
           },
           data: data.map(function (item) {
             return {
               value: [item[1], item[0], item[2]]
             };
           }),
           shading: 'color',
           itemStyle: {
             opacity: 0.6
           },

           emphasis: {
             label: {
               textStyle: {
                 fontSize: 20,
                 color: '#900'
               }
             },
             itemStyle: {
               color: '#900'
             }
           }
         }]
       });
     }, 1000);
   }*/

  pulse: any;
  bounce: any;
  QRScaning = false;
  loader: any;
  orderid: any = "";

  // To set current date as today
  myDate = moment().toDate();

  animate(name: 'string') {
    this[name] = !this[name];
    1;
  }

  ngOnInit() {
    Observable.interval(5000).subscribe((v) => {
      this["pulse"] = !this["pulse"];
      this["bounce"] = !this["bounce"];
    });

    this.InitData();
    Observable.interval(1000).subscribe((v) => {this.getNowTimeStpFormat()});
  }

  /*
    //沟崽子们
    ionViewDidLoad(){
      console.log('触发ionViewDidLoad');
    }

    ionViewWillEnter(){
      console.log('触发ionViewWillEnter');
    }

    ionViewDidEnter(){
      console.log('触发ionViewDidEnter');
    }

    ionViewWillLeave(){
      console.log('触发ionViewWillLeave');
    }

    ionViewDidLeave(){
      console.log('触发ionViewDidLeave');
    }

    ionViewWillUnload(){
      console.log('触发ionViewWillUnload');
    }*/

  @ViewChild('container') container: ElementRef;

  Step2 = false;

  nextStep() {
    this.Step2 = true;
  }

  presentModal(projectid) {
    let modal = this.modalCtrl.create(SharesLogComponent,{projectid: projectid});
    modal.present();
  }

  openModal(projectid, status, data) {
    let modal = this.modalCtrl.create(ModalContentStepComponent, { projectid: projectid, status:status, data: data});
    modal.onDidDismiss(data => {
      this.InitData();
    });
    console.log(status);
    modal.present();
  }

  openModalUpdateDesc(data) {
    let modal = this.modalCtrl.create(UpdateShareDesc, {data: data});
    modal.onDidDismiss(data => {
      this.InitData();
    });
    console.log(status);
    modal.present();
  }

  openModalSetting(characterNum) {
    let modal = this.modalCtrl.create(ModalContentSetting,
      {characterNum:characterNum.charNum,
      owner:characterNum.creator == this.auth.currentUserId?true:false});
    modal.onDidDismiss(data => {
      this.InitData();
    });
    modal.present();
  }

  openModalNewShare(uid) {
    let modal = this.modalCtrl.create(ModalNewShare, {uid: uid});
    modal.onDidDismiss(data => {
      this.InitData();
    });
    console.log("openModalNewShare : create modalCtrl before present");
    modal.present();
  }

  showPrompt(projectid) {
    let prompt = this.alertCtrl.create({
      title: '拼單詳述',
      inputs: [
        {
          name: 'plandesc',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            this.shareService.updateDesc(projectid, data).then(data => {
              this.InitData();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  ShowLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div>
        <img src="./assets/imgs/loading.gif" width="60">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loader.present();
  }

  /*
  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "./assets/imgs/demo1.jpg",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "./assets/imgs/demo2.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "./assets/imgs/demo3.jpg",
    }
  ];*/


  InitData() {

    //this.ShowLoading();
    this.getNowTimeStpFormat();
    let that = this;
    this.shareService.getShareList(that.auth.currentUserId).then((data: Array<String>) => {
      this.showData = [];
      console.log("this.showData:",this.showData);
      // data.forEach(function (value, index, array) {
      //   that.showData.push(data[index]);
      //   let tmpDate = new Date(that.showData[index].DateTime);
      //   that.showData[index].hour = tmpDate.getHours();
      //
      // });
      that.showData = data;
      for (let x =0 ; x<that.showData.length; x++){
        //在把數據更新到Firebase前，先做一次初始化，需要Fiona幫忙放到一個方法里 Start
        if(that.showData[x].DateTime != null) {
          var arr = that.showData[x].DateTime.replace(/-/g, "/");
          let tmpDate = new Date(arr);
          that.showData[x].orderDate = tmpDate;
        }
        //把拼單簡介的換行@$$@替換成<br/>
        /*if(this.showData[x].Project.plandesc != null)
          this.showData[x].Project.plandesc = this.showData[x].Project.plandesc.replaceAll('@$$@','<br/>');*/
        //在把數據更新到Firebase前，先做一次初始化，需要Fiona幫忙放到一個方法里 End
        this.afs.doc(`orders/`+this.showData[x].Project.projectid).set(this.showData[x], {merge: true});
        this.afs.doc<Order>(`orders/`+this.showData[x].Project.projectid).valueChanges().subscribe(
          res => {
            console.log(res);
            this.showData[x] = res;
            for(let i=0; i< this.showData[x].RaiseHandStatus.length; i++) {
              if(this.showData[x].RaiseHandStatus[i].uid == that.auth.currentUserId)
                this.showData[x].UserStatus= this.showData[x].RaiseHandStatus[i].status;
            }
            console.log("that.showData[x].DateTime : ",that.showData[x].DateTime);
            //剛剛創建活動的時候DataTime是null
            //在把數據更新到Firebase前，先做一次初始化，需要Fiona幫忙放到一個方法里 Start
            if(that.showData[x].DateTime != null) {
              var arr = that.showData[x].DateTime.replace( /-/g , "/" );
              let tmpDate = new Date(arr);
              //let tmpDate = new Date(that.showData[x].DateTime);
              console.log("tmpDate : ",tmpDate);
              that.showData[x].hour = tmpDate.getHours();
              that.showData[x].min = tmpDate.getMinutes();
              that.showData[x].second = tmpDate.getSeconds();
              that.showData[x].orderDate = tmpDate;
              console.log("that.showData[x].orderDate : ",that.showData[x].orderDate);
            }
            //在把數據更新到Firebase前，先做一次初始化，需要Fiona幫忙放到一個方法里 End
            //把拼單簡介的換行@$$@替換成<br/>
            /*if(this.showData[x].Project.plandesc != null)
              this.showData[x].Project.plandesc = this.showData[x].Project.plandesc.replace.replaceAll('@$$@','<br/>');*/
          }
        );

      }
      console.log("this.showData:",this.showData);
    });
    //this.loader.dismiss();
  }

  refreshData(refresher) {
    let that = this;
    this.shareService.getShareList(that.auth.currentUserId).then((data: Array<String>) => {
      this.showData = [];
      console.log("this.showData:",this.showData);
      data.forEach(function (value, index, array) {
        that.showData.push(data[index]);
      });
      refresher.complete();
    });
  }

  StartScan(): void {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
          alert(text);

          this.qrScanner.hide(); // hide camera preview
          this.QRScaning = false;
          scanSub.unsubscribe(); // stop scanning
          alert("aa");
          this.navCtrl.push(AddFriend,{frienduid:text});
          alert("bb");
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

  EndScan(): void {
    this.qrScanner.destroy();
    this.QRScaning = false;
  }

  presentPopover(myEvent,url) {
    var options = {
      share: true, // default is false
      closeButton: false, // default is true
      copyToReference: false // default is false
    };
    this.photoViewer.show(url,'',options);
  }

  good(projectid, num){
    console.log(num);
    this.shareService.good(projectid, parseInt(num)+1);
    console.log(parseInt(num)+1);
    this.afs.doc(`orders/`+projectid).set({Project:{specialind:parseInt(num)+1}}, {merge: true});
  }

}

@Component({
  template: `
    <div style="width: 100%; height: calc(100vh); text-align: center;">
      <img [src]="value1" style="padding-top: 100px; width: 90%">
      <div style="padding-top: 100px;">
      <button style="background-color: #ff6363;width:  56px;height:  56px;border-radius:  28px;font-size: 20px;color:  #ffffff;" (click)="close()">
        <ion-icon name="close"></ion-icon>
      </button>
      </div>
    </div>
  `
})
export class PopoverPage {
  value1:any;
  constructor(public viewCtrl: ViewController,public navParams:NavParams) {
    console.log(this.navParams.data);
    this.value1 = this.navParams.get('url');
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
