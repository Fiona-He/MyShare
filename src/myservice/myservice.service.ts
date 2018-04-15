import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({

  template: '',
})
@Injectable()

export class MyserviceService{

  constructor(private http: HttpClient) { }

  //https://console.faceplusplus.com.cn/documents/10069553  可查看此文档
  bankCardNo='https://api-cn.faceplusplus.com/cardpp/beta/ocrbankcard';
  wordRecgnize = 'https://api-cn.faceplusplus.com/imagepp/v1/recognizetext';
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
      'image_base64': image
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.bankCardNo, data, httpOptions)
      .subscribe(data => {
        console.log('data:',data);
        //返回的是HTTPResponse， 怎么拆成json
        console.log('data.data:',data  );
        let dataJson = JSON.stringify(data.toString());
        let dataJson1 = JSON.parse(data.toString());
        console.log('dataJson:',dataJson);
        console.log('dataJson1:',dataJson);
        alert('success : '+data);
      });
  }

  getWords(image):void{
    console.log('start ');
    let data = {
      'api_key': 'tW53FJsaRIkvQjmBOVyixiI2FUr2cMpD',
      'api_secret': 'GlNLHUxJKTLa_q-A4DTZ8upG_uZRvos8',
      'image_base64': image
    };
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.wordRecgnize, data, httpOptions)
      .subscribe(data => {
        console.log('data:',data);
        //返回的是HTTPResponse， 怎么拆成json
        console.log('data.data:',data  );
        alert('success : '+data);
      });
  }
}
