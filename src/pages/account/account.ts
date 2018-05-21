import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";
import {AuthService} from '../core/auth.service';
import {MyQrcode} from "./my-qrcode";
import {ThreadService} from "../chat/thread.service";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {FriendsPage} from "../friends/friends";

declare var echarts;

@Component({
  selector: 'page-about',
  templateUrl: 'account.html',
  providers:[MyserviceService,ThreadService,UserService]
})
export class AccountPage {
  user = {};

  @ViewChild('container') container: ElementRef;
  OCRScaning:boolean = false;
  chart: any;
  mycardno = "";
  loader:any;

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private alertCtrl: AlertController,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              private myserviceService:MyserviceService,
              public threadService: ThreadService,
              public userService: UserService
) {}

  ngOnInit() {}

  showMyQRcode() {
    this.navCtrl.push(MyQrcode);
  }

  logoutUser(): Promise<void> {
    this.presentLoadingCustom();
    return this.auth.afAuth.auth.signOut().then(
      res=>{
        this.user = {};
        this.auth.gplus.logout().catch(
          error=>{ console.log(error);
            this.user = {};
          }
        );
        this.loader.dismiss();
      }
    );
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

  takePhoto(type:any){
    this.OCRScaning = true;
    const options: CameraOptions = {
      quality: 20,
      //this.camera.DestinationType.FILE_URI 或者 this.camera.DestinationType.DATA_URL 或者 NATIVE_URI
      //test
      destinationType: this.camera.DestinationType.FILE_URI,
      //proc
      //destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    //生产
    // this.camera.getPicture(options).then((imageData) => {
    //   console.log('getPicture: '+imageData);
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image =  imageData;
    //   //let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   //let base64Image = imageData;
    //   //alert(base64Image);
    //   this.myserviceService.getBankCardNo(base64Image);
    //
    // },(err) => {});

    //测试直接使用下面2句可行


    if(type=='showPic'){
      this.camera.getPicture(options).then((imageData) => {
        console.log('getPicture: '+imageData);
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image =  imageData;
        //let base64Image = 'data:image/jpeg;base64,' + imageData;
        //let base64Image = imageData;
        //alert(base64Image);

      },(err) => {});

    }

    if(type=='card'){
      //let base64Image= 'https://cgblogassets.s3-ap-northeast-1.amazonaws.com/blog/zh_TW/wp-content/uploads/2015/07/%E5%A4%A7%E7%9C%BE%E6%84%9Bpass%E9%88%A6%E9%87%91%E5%8D%A1.jpg';
      let base64Image='http://www.haitaoshen.com/uploads/allimg/160128/221ZU304-0.jpg';
      this.myserviceService.getBankCardNo(base64Image).then(data=>{
        console.log(data);
        let data1 = JSON.stringify(data);
        let data2 = JSON.parse(data1.toString());
        console.log(data2.bank_cards[0].number);
        this.mycardno = data2.bank_cards[0].number;
      });

    }

    if(type=='word'){
      //let base64Image= 'https://cgblogassets.s3-ap-northeast-1.amazonaws.com/blog/zh_TW/wp-content/uploads/2015/07/%E5%A4%A7%E7%9C%BE%E6%84%9Bpass%E9%88%A6%E9%87%91%E5%8D%A1.jpg';
      let base64Image='http://qcloud.dpfile.com/pc/nsheXMHVOJNx0uFdQPJvcAV2WEC34uH8FlDbFOVwWDgwYJ0BoCGqruGdnykGepTrTYGVDmosZWTLal1WbWRW3A.jpg';
      this.myserviceService.getWords(base64Image).then(data=>{
        console.log(data);
        let data1 = JSON.stringify(data);
        let data2 = JSON.parse(data1.toString());
        console.log(data2.result[0].value);

      });

    }


    if(type=='id'){
      let base64Image='http://imgsrc.baidu.com/forum/w%3D580/sign=f2ac865282025aafd3327ec3cbecab8d/a7648535e5dde711b3508364a7efce1b9c1661ac.jpg';
      this.myserviceService.getWords(base64Image);
    }
    if(type=='save'){
      this.myserviceService.saveToUser('9','jjj');
    }
    if(type=='add'){
      this.myserviceService.addToUser('tttss','99900088');
    }

  }



  EndScan(): void {
    //this.qrScanner.destroy();
    this.OCRScaning = false;
  }

  //friend :User;
  test(){
    // //this.threadService.checkFriend('1','2').then( data => console.log(data));
    // this.userService.getUser('YU21uGSJZOZTipNfnRLmAWcNjl53').subscribe(data => {
    //   console.log(data);
    //   if (data) {
    //     this.friend = data;
    //     alert(data.email);
    //     this.threadService.addFriend(this.friend,this.auth.currentUserId);
    //   }
    //   else
    //     alert("0");
    // });
    this.navCtrl.push(FriendsPage);
  }

  showPicUrl:any;

  showPic(){
    const options: CameraOptions = {
      quality: 20,
      //this.camera.DestinationType.FILE_URI 或者 this.camera.DestinationType.DATA_URL 或者 NATIVE_URI
      //test
      //destinationType: this.camera.DestinationType.FILE_URI,
      //proc
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
      console.log('getPicture: '+imageData);
      let base64Image =  imageData;
      this.showPicUrl = 'data:image/jpeg;base64,' + base64Image;
      this.myserviceService.getReceiptContent(base64Image).then(data=>{

        console.log(data);
        let data1 = JSON.stringify(data);
        let data2 = JSON.parse(data1.toString());
        console.log(data2.words_result[0].words);
      })

    },(err) => {});

  }


  ionViewDidEnter() {


    let hours = ['', '', '', '', '', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p', '2p', '3p', '4p', '5p',
      '6p', '7p', '8p', '9p', '10p', '11p'];
    let days = ['', '', '',
      '', '', '', ''];
    let data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    this.chart.setOption({
      title: {
        text: '我的收支情況',
        left: 'center'
      },
      series : [
        {
          type: 'pie',
          radius : '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data:[
            {
              value:6000,
              name: '欠款'
            },
            {value:2000, name: '應收'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }

}
