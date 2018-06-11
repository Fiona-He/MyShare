import { Component,Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {AppGlobal} from '../global/app-global';

@Component({
  template: ''
})
@Injectable()

export class ShareService{

  myurl = AppGlobal.getInstance().server;

  constructor(private http: HttpClient) {}

  //更新拼單簡述
  updateDesc(projctid:any, data: any) :Promise<Object>{
    let url = this.myurl +"/updateproject/"+projctid+"/"+data.plandesc ;
    console.log(url);
    return this.http.put(url, '').toPromise();
  }

  //獲取拼單列表
  getShareList(uid: string):Promise<Object>{
    let url = this.myurl + "/getsharelist/"+uid;
    console.log(url);
    return this.http.get(url).toPromise();
  }

  //新建拼單
  newShare(share:any){
    let url = this.myurl + "/newproject";
    console.log(url);
    return this.http.post(url, share).toPromise();
  }

  //新建拼單
  getShare(projectid:any){
    let url = this.myurl + "/findByProjectid/"+projectid;
    console.log(url);
    return this.http.get(url).toPromise();
  }

  raiseHand(fieldvalue:any){
    let url = this.myurl + "/fieldvalueid";
    console.log(url);
    console.log(fieldvalue);
    return this.http.post(url,fieldvalue).toPromise();
  }

  //增加活动人员
  addActivityPeople(shareid:any, createby:any, grouppeople:any,status:any) {
    //localhost:8182/fieldvalueid/1/1/1
    let url = this.myurl + "/fieldvalueid/"+shareid+"/"+createby+"/"+status;
    console.log(url);
    return this.http.post(url,grouppeople).toPromise();
  }
  //獲取活动人员
  getActivityPeople(field1value:any) :Promise<any>{
    let url = this.myurl + "/fieldvalueall/1/field1/"+field1value;
    console.log(url);
    return this.http.get(url).toPromise();
  }
  //刪除活动人员
  deleteActivityPeople(shareid:any, createby:any, grouppeople:any,status:any) {
    let url = this.myurl + "/fieldvalueiddelete/"+shareid+"/"+createby+"/"+status;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      }),
      body: grouppeople
    };
    console.log(url);
    return this.http.delete(url,httpOptions).toPromise();
  }
  //更新拼單圖片
  updateprojectfront(projectid:any, target:any, photourl:any) {
    let url = this.myurl + "/updateprojectfront"+target;
    console.log(url);
    console.log(JSON.parse("{\"projectid\":\""+projectid+"\",\"front"+target+"\":\""+photourl+"\"}"));
    return this.http.put(url, JSON.parse("{\"projectid\":\""+projectid+"\",\"front"+target+"\":\""+photourl+"\"}")).toPromise();
  }
  //獲取活动人员
  getHandsUpPeople(field1value:any) :Promise<any>{
    let url = this.myurl + "/fieldvalueall/0/field1/"+field1value;
    console.log(url);
    return this.http.get(url).toPromise();
  }

  //小单成立 小单信息
  addOrder(fieldvalue:any){
    let url = this.myurl + "/fieldvalueid";
    console.log(url);
    console.log(fieldvalue);
    return this.http.post(url,fieldvalue).toPromise();
  }

  //小单明细
  addOrderDetail(fieldvalue:any){
    let url = this.myurl + "/fieldvalueids";
    console.log(url);
    console.log(fieldvalue);
    return this.http.post(url,fieldvalue).toPromise();
  }

  //小单明细
  buildOrder(fieldvalue:any){
    let url = this.myurl + "/suborder";
    console.log(url);
    console.log(fieldvalue);
    return this.http.post(url,fieldvalue).toPromise();
  }

  //獲取活动人员
  getOrder(field1value:any) :Promise<any>{
    let url = this.myurl + "/fieldvalueall/0/field1/"+field1value;
    console.log(url);
    return this.http.get(url).toPromise();
  }
}
