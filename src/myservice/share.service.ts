import { Component,Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {AppGlobal} from '../global/app-global';
import {Fieldvalue} from "../global/fieldvalue";
import {AuthService} from "../pages/core/auth.service";

@Component({
  template: ''
})
@Injectable()

export class ShareService{

  myurl = AppGlobal.getInstance().server;

  constructor(private http: HttpClient,public auth: AuthService) {}
  tempLog = new Fieldvalue();

  getNowTimeStpFormat(): any {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = ('0' + (date.getMonth() + 1).toString()).slice(-2);
    let dd = ('0' + (date.getDate()).toString()).slice(-2);
    let hour = ('0' + (date.getHours()).toString()).slice(-2);
    let min = ('0' + (date.getMinutes()).toString()).slice(-2);
    let second = ('0' + (date.getSeconds()).toString()).slice(-2);
    let msecond = ('0' + (date.getMilliseconds()).toString()).slice(-3);
    return yyyy + '-' + mm + '-' + dd+ ' ' + hour+':' + min+':' + second+':' + msecond;
  }
  //更新拼單簡述
  updateDesc(projctid:any, data: any) :Promise<Object>{
    let url = this.myurl +"/updateproject/"+projctid+"/"+data.plandesc ;
    console.log(url);
    return this.http.put(url, '').toPromise();
  }

  //更新拼單名稱
  updateName(projctid:any, data: any) :Promise<Object>{
    let url = this.myurl +"/projectname/"+projctid+"/"+data.projectname ;
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
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '1';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = '0';
    this.tempLog.field6 = 'newShare';
    this.tempLog.field7 = '';
    console.log("newShare - tempLog: ",this.tempLog);
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
    return this.http.post(url, share).toPromise();
  }

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
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '3';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = '0';
    this.tempLog.field6 = 'raiseHand';
    this.tempLog.field7 = fieldvalue.field1;
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
    return this.http.post(url,fieldvalue).toPromise();
  }

  //刪除舉手數據
  unraiseHand(projectid:any, sequence:any){
    let url = this.myurl + "/fieldvalueid/"+projectid+"/"+sequence;
    console.log(url);
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '7';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = '0';
    this.tempLog.field6 = 'unraiseHand';
    this.tempLog.field7 = sequence;
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
    return this.http.delete(url).toPromise();
  }

  //增加活动人员
  addActivityPeople(shareid:any, createby:any, grouppeople:any,status:any) {
    //localhost:8182/fieldvalueid/1/1/1
    let url = this.myurl + "/fieldvalueid/"+shareid+"/"+createby+"/"+status;
    console.log(url);
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '2';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = grouppeople.length.toString();
    this.tempLog.field6 = 'addActivityPeople';
    this.tempLog.field7 = shareid;
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
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
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '8';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = grouppeople.length.toString();
    this.tempLog.field6 = 'deleteActivityPeople';
    this.tempLog.field7 = shareid;
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
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
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '4';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = suborder.list.length.toString();
    this.tempLog.field6 = 'addSubOrder';
    this.tempLog.field7 = suborder.order.field6.toString();
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
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
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '5';
    this.tempLog.field4 = suborder.order.field3.toString();
    this.tempLog.field5 = suborder.list.length.toString();
    this.tempLog.field6 = 'updateSubOrder';
    this.tempLog.field7 = suborder.order.field6.toString();
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
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
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '9';
    this.tempLog.field4 = '0';
    this.tempLog.field5 = suborder.list.length.toString();
    this.tempLog.field6 = 'removeSubOrder';
    this.tempLog.field7 = suborder.order.field6.toString();
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
    return this.http.delete(url, httpOptions).toPromise();
  }

  //更新確認子訂單後的金額和狀態
  confirmSubOrder(suborderdetail:any) {
    let url = this.myurl + "/suborderconfirm";
    this.tempLog.projectid = 4;
    this.tempLog.field1 = this.auth.currentUserId;
    this.tempLog.field2 = this.getNowTimeStpFormat();
    this.tempLog.field3 = '6';
    this.tempLog.field4 = suborderdetail.field8.toString();
    this.tempLog.field5 = '0';
    this.tempLog.field6 = 'confirmSubOrder';
    this.tempLog.field7 = suborderdetail.field6.toString();
    this.addLog(this.tempLog).then(data => console.log("data-----:",data));
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

  //写日志
  addLog(fieldvalue:any):Promise<any>{
    let url = this.myurl + "/fieldvalueid";
    console.log(url);
    console.log(fieldvalue);
    return this.http.post(url,fieldvalue).toPromise();
  }
}
