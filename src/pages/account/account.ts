import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import {MyserviceService} from "../../myservice/myservice.service";

@Component({
  selector: 'page-about',
  templateUrl: 'account.html',
  providers:[MyserviceService]
})
export class AccountPage {

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private alertCtrl: AlertController,
              private myserviceService:MyserviceService
  ) {}

  takePhoto(){
    const options: CameraOptions = {
      quality: 20,
      //this.camera.DestinationType.FILE_URI 或者 this.camera.DestinationType.DATA_URL
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log('getPicture: '+imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      //let base64Image =  imageData;
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //alert(base64Image);
      this.myserviceService.getBankCardNo(base64Image);

    },(err) => {});

    //直接使用下面2句可行
    // let base64Image= 'https://cgblogassets.s3-ap-northeast-1.amazonaws.com/blog/zh_TW/wp-content/uploads/2015/07/%E5%A4%A7%E7%9C%BE%E6%84%9Bpass%E9%88%A6%E9%87%91%E5%8D%A1.jpg';
    // this.myserviceService.getBankCardNo(base64Image);

  }

}
