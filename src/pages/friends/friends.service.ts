import { Injectable,Injector} from "@angular/core";
//import {Router} from '@angular/router'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

import { Thread } from "../chat/thread.model";
import { Message } from "../chat/message.model";

import { AuthService } from "../core/auth.service";
import { MessageService } from "../chat/message.service";
import {ChatDetailComponent} from "../chat/chat-detail/chat-detail.component";
import {NavController,App} from "ionic-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppGlobal} from "../../global/app-global";

@Injectable()
export class ThreadService {
  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;
  url = AppGlobal.getInstance().server;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: MessageService,
    private app: App,
    private http: HttpClient

  ) {}

  get navCtrl(): NavController {
    return this.app.getRootNav();
    //return this.injector.get(NavController);
  }

  getFriends(id:String):Promise<any>{
    let myurl = this.url+'/getallfriends/'+id;
    return this.http.get(myurl).toPromise();
  }


}
