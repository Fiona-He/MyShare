import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders,HttpParams } from '@angular/common/http';

@Component({

  template: '',
})
@Injectable()

export class MyserviceService{

  constructor(private http: HttpClient) { }

  //https://console.faceplusplus.com.cn/documents/10069553  可查看此文档
  bankCardNo='https://api-cn.faceplusplus.com/cardpp/beta/ocrbankcard';
  wordRecgnize = 'https://api-cn.faceplusplus.com/imagepp/v1/recognizetext';
  receiptRecognize = 'https://aip.baidubce.com/rest/2.0/ocr/v1/receipt';
//https://ai.baidu.com/docs#/OCR-API/8f0d8075
  //https://ai.baidu.com/docs#/OCR-API/top


  getReceiptContent(image:any):Promise<Object>{
    console.log('getReceiptContent start ');

    /*let token='24.209429b1ec79e8fe6d4a13c21e2dc536.2592000.1529488135.282335-11269647';
    let myurl = 'http://119.23.70.234:8182/getauth';
    console.log(myurl);
    let formData  = new FormData();
    formData.append('image',image);
    //formData.append('recognize_granularity','small');

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      //params: new HttpParams().set('image', image)
    };*/
    // this.http.get(myurl).toPromise()
    //   .then(sign => {
    //     token = sign.toString();
    //     console.log(token);
    // });
    let formData  = new FormData();
    formData.append('base64Data',image);
    return this.http.post('http://119.23.70.234:8182/baidureceiptocr', formData ).toPromise();

  }

  //ionic http
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

  //angular http
  getBankCardNo(image):Promise<Object>{
    console.log('start ');
    let formData  = new FormData();
    formData.append('api_key','tW53FJsaRIkvQjmBOVyixiI2FUr2cMpD');
    formData.append('api_secret','GlNLHUxJKTLa_q-A4DTZ8upG_uZRvos8');
    //test
    formData.append('image_url',image);
    //proc
    //formData.append('image_base64',image);



    return this.http.post(this.bankCardNo, formData, {} ).toPromise();
      // .subscribe(data => {
      //   data = JSON.stringify(data);
      //   data = JSON.parse(data.toString());
      //   console.log('data.data',data.bank_cards[0].number);
      //   console.log('data.data',data.image_id);
      //   //返回的是HTTPResponse， 怎么拆成json
      //   // console.log('data.data:',data  );
      //   // let dataJson = JSON.stringify(data.toString());
      //   // let dataJson1 = JSON.parse(data.toString());
      //   // console.log('dataJson:',dataJson);
      //   // console.log('dataJson1:',dataJson);
      // })
  }

  getWords(image):Promise<Object>{
    console.log('start get words ');


    let formData  = new FormData();
    formData.append('api_key','tW53FJsaRIkvQjmBOVyixiI2FUr2cMpD');
    formData.append('api_secret','GlNLHUxJKTLa_q-A4DTZ8upG_uZRvos8');
    //test
    formData.append('image_url',image);
    //proc
    //formData.append('image_base64',image);


    return this.http.post(this.wordRecgnize, formData, {}).toPromise();
      // .subscribe(data => {
      //   console.log('data:',data);
      //   //返回的是HTTPResponse， 怎么拆成json
      //   console.log('data.data:',data  );
      //   alert('success : '+data);
      //
      // });
  }

  saveToUser(id:String, info:any){
    //let myurl = 'http://localhost:8182/updateuser/'+id;
    let myurl = 'http://119.23.70.234:8182/updateuser/'+id;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let data = {
      "id":9,
      "name":info
    };

    this.http.put(myurl, data,httpOptions)
      .subscribe(data => {
        console.log('data:',data);
    });
  }

  addToUser(myname:any, myphone:any){
    //let myurl = 'http://localhost:8182/saveuser';
    let myurl = 'http://119.23.70.234:8182/saveuser';
    let formData = new FormData();
    formData.append("name",myname);
    formData.append("phone",myphone);

    this.http.post(myurl, formData)//.toPromise();
      .subscribe(data => {
        console.log('data:',data);
      });
  }
}
