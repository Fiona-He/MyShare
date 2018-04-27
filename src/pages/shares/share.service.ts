import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {AppGlobal} from '../../global/app-global';

@Component({
  template: ''
})
@Injectable()

export class ShareService{

  myurl = AppGlobal.getInstance().server;

  constructor(private http: HttpClient) {}

  updateDesc(projctid:any, data: any) :Promise<Object>{
    let url = this.myurl +"/updateproject/"+projctid+"/"+data.plandesc ;
    console.log(url);
    return this.http.put(url, '').toPromise();
  }

  getShareList():Promise<Object>{
    let url = this.myurl + "/getsharelist";
    console.log(url);
    return this.http.get(url).toPromise();
  }


}
