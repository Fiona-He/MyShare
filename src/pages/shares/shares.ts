import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import {
  NavController,
  ModalController,
  PopoverController,
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

declare var echarts;
declare var moment: any;

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

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private qrScanner: QRScanner,
    public auth: AuthService,
    private shareService: ShareService) {

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

    this.ShowLoading();

    this.InitData();
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

  presentModal() {
    let modal = this.modalCtrl.create(SharesLogComponent);
    modal.present();
  }

  openModal(projectid, status) {
    let modal = this.modalCtrl.create(ModalContentStepComponent, { projectid: projectid, status:status });
    console.log(status);
    modal.present();
  }

  openModalSetting(characterNum) {
    let modal = this.modalCtrl.create(ModalContentSetting, characterNum);
    modal.present();
  }

  openModalNewShare(characterNum) {
    let modal = this.modalCtrl.create(ModalNewShare, characterNum);
    console.log("openModalNewShare : create modalCtrl before present");
    modal.present();
  }

  showPrompt(projectid) {
    let prompt = this.alertCtrl.create({
      title: '提示',
      message: "請輸入拼單提示信息",
      inputs: [
        {
          name: 'plandesc',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.ShowLoading();
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
      <div class="custom-spinner-container">
        <img src="./assets/imgs/loading.gif" width="80">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loader.present();
  }

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
  ];


  InitData() {

    let that = this;
    this.shareService.getShareList(that.auth.currentUserId).then((data: Array<String>) => {
      this.showData = [];
      data.forEach(function (value, index, array) {
        that.showData.push(data[index]);
      });
    });
    this.loader.dismiss();

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

}


