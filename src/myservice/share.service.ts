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
    let url = this.myurl + "/share";
    console.log(url);
    return this.http.post(url, share).toPromise();
  }

  //新建拼單
  getShare(projectid:any){
    let url = this.myurl + "/findByProjectid/"+projectid;
    console.log(url);
    return this.http.get(url).toPromise();
  }

  //新增舉手數據
  raiseHand(fieldvalue:any){
    let url = this.myurl + "/fieldvalueid";
    console.log(url);
    console.log(fieldvalue);
    return this.http.post(url,fieldvalue).toPromise();
  }

  //刪除舉手數據
  unraiseHand(projectid:any, sequence:any){
    let url = this.myurl + "/fieldvalueid/"+projectid+"/"+sequence;
    console.log(url);
    return this.http.delete(url).toPromise();
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

  //新增子單主信息及參加人員
  addSubOrder(suborder:any) :Promise<any>{
    let url = this.myurl + "/suborder";
    console.log(url);
    console.log(suborder);
    return this.http.post(url,suborder).toPromise();
  }

  //查詢子單主信息及參加人員
  getSubOrder(uid:any, projectid:any) :Promise<any>{
    let url = this.myurl + "/suborder/" +uid+"/"+projectid;
    console.log(url);
    return this.http.get(url).toPromise();
  }

  //更新子單主信息及參加人員
  updateSubOrder(suborder:any) :Promise<any>{
    let url = this.myurl + "/suborder";
    console.log(url);
    return this.http.put(url, suborder).toPromise();
  }

  //刪除子單主信息及參加人員，刪除fieldsvalue2,刪除filedsvalue3多條，更新fieldsvalue0
  removeSubOrder(suborder:any) :Promise<any>{
    let url = this.myurl + "/suborder";
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: suborder
    };
    return this.http.delete(url, httpOptions).toPromise();
  }

  //更新確認子訂單後的金額和狀態
  confirmSubOrder(suborderdetail:any) {
    let url = this.myurl + "/suborderconfirm";
    return this.http.put(url, suborderdetail).toPromise();
  }

  getSubOrderAndConfirm(uid, projectid):Promise<any>{
    //localhost:8182/fieldvaluemulticond/3/field1/1/field2/YU21uGSJZOZTipNfnRLmAWcNjl53/field7/1
    let url = this.myurl + "/fieldvaluemulticond/3/field1/"+projectid+"/field2/"+uid+"/field7/1";
    console.log(url);
    return this.http.get(url).toPromise();
  }

  good(projectid, specialind){
    let url = this.myurl + "/updateprojectspecialind";
    return this.http.put(url, JSON.parse("{\"projectid\":\""+projectid+"\",\"specialind\":\""+specialind+"\"}")).toPromise();
  }


}
