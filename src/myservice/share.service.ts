import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  getShareList():Promise<Object>{
    let url = this.myurl + "/getsharelist";
    console.log(url);
    return this.http.get(url).toPromise();
  }

  //新建拼單
  newShare(share:any){
    let url = this.myurl + "/newproject";
    console.log(url);
    return this.http.post(url, share).toPromise();
  }

  raiseHand(projectid:any){
    let url = this.myurl + "/getsharelist";
    console.log(url);
    return this.http.get(url).toPromise();
  }


}
