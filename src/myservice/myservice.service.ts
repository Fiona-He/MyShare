
import { HTTP } from '@ionic-native/http';
import { Component,Injectable } from '@angular/core';

@Component({})
@Injectable()

export class MyserviceService{

  constructor(private http: HTTP) { }

  //https://console.faceplusplus.com.cn/documents/10069553  可查看此文档
  bankCardNo='https://api-cn.faceplusplus.com/cardpp/beta/ocrbankcard';
  // getBankCardNo(image):void{
  //   //const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let data = {
  //     'api_key': 'tW53FJsaRIkvQjmBOVyixiI2FUr2cMpD',
  //     'api_secret': 'GlNLHUxJKTLa_q-A4DTZ8upG_uZRvos8',
  //     'image_base64': image
  //   };
  //   let headers = {
  //     'Content-Type': 'application/json'
  //   };
  //   this.http.post(this.bankCardNo, data, headers)
  //     .then(data => {
  //
  //       alert('succeed'+data);
  //     })
  //     .catch(error => {
  //       alert(Object(error));
  //     });
  // }
  getBankCardNo(image):void{
    console.log('start ');
    let data = {
      'api_key': 'tW53FJsaRIkvQjmBOVyixiI2FUr2cMpD',
      'api_secret': 'GlNLHUxJKTLa_q-A4DTZ8upG_uZRvos8',
      'image_url': image
    };
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    this.http.post(this.bankCardNo, data, headers)
      .then(data => {
        console.log(data);
        alert('succeed:'+data.toString());
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  }
}
