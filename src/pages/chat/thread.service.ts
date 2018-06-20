import {Injectable, Injector} from "@angular/core";
//import {Router} from '@angular/router'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

import {Thread} from "./thread.model";
import {Message} from "./message.model";

import {AuthService} from "../core/auth.service";
import {MessageService} from "./message.service";
import {ChatDetailComponent} from "./chat-detail/chat-detail.component";
import {NavController, App, LoadingController} from "ionic-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../user/user.model";

@Injectable()
export class ThreadService {
  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;
  threadUser: AngularFirestoreDocument<User>;

  loader: any;

  constructor(private afs: AngularFirestore,
              private auth: AuthService,
              public loadingCtrl: LoadingController,
              private messageService: MessageService,
              private app: App,
              private http: HttpClient) {
  }

  get navCtrl(): NavController {
    return this.app.getRootNav();
    //return this.injector.get(NavController);
  }

  getFriends(id: String): Promise<any> {
    let myurl = 'http://119.23.70.234:8182/getallfriends/' + id;
    return this.http.get(myurl).toPromise();
  }

  checkFriend(myuid:String, bfuid:String) :Promise<any> {
    let myurl = 'http://119.23.70.234:8182/checkfriend/'+myuid+'/'+bfuid;
    //let myurl='http://119.23.70.234:8182/checkfriend/jZOH2VrAzjO26nsknSEDelBJlfL2/YU21uGSJZOZTipNfnRLmAWcNjl53';
    console.log(myurl);
    return this.http.get(myurl).toPromise();
  }
  addFriend(friend:User, myuid:any) {//: Promise<any> {
    console.log("addFriend: ",friend.uid,myuid);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let myurl = 'http://119.23.70.234:8182/addfriend';
    // let formData  = new FormData();
    // formData.append('myuid',myuid);
    // formData.append('bfuid',friend.uid);
    // formData.append('bfdisplayname',friend.displayName);
    // formData.append('bfemail',friend.email);
    // formData.append('bfphotourl',friend.photoURL);
    // formData.append('bfdate','1');
    // formData.append('sequence','1');

    let data = {
      "myuid":myuid,
      "bfuid":friend.uid,
      "bfdisplayname":friend.displayName,
      "bfemail":friend.email,
      "bfphotourl":friend.photoURL,
      "bfdate":'1',
      "sequence":'1'
    };

    this.http.post(myurl, data,httpOptions).subscribe(data => console.log(data));//.toPromise();
  }

  getThreads() {
    console.log("do getThreads!");
    this.threadsCollection = this.afs.collection('chats', ref =>
      ref.where(`members.${this.auth.currentUserId}`, '==', true)
    )
    return this.threadsCollection.valueChanges()
  }

  getThread(profileId: string) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    return this.threadDoc.valueChanges();
  }

  getUserInfo(profileId: string) {
    this.threadUser = this.afs.doc<User>(`users/${profileId}`);
    console.log(profileId);
    //console.log(this.threadUser);
    return this.threadUser.valueChanges();
    /*this.threadUser = this.afs.collection('users', ref =>
      ref.where('uid','==',profileId)
    ).doc('users');*/
    //console.log(this.threadUser.)
  }

  otherUser: any;

  createThread(profileId) {
    // let otherAvatar;
    // let otherName;
    this.ShowLoading();
    //this.auth.getUser(profileId)
     // .subscribe(value => {
     //    console.log(value);
        const currentUserId = this.auth.currentUserId;
        var id =
          profileId < currentUserId
            ? `${profileId}_${currentUserId}`
            : `${currentUserId}_${profileId}`;

        this.getThread(id).subscribe(res=>{
          var lastMessage = "";
          if(res != null) {
            this.loader.dismiss();
            this.navCtrl.push(ChatDetailComponent, {id: id})
          }else{
            lastMessage = res.lastMessage;
            console.log("lastmessage"+lastMessage);
            // this.otherUser = value;
            // const otherAvatar = this.otherUser.photoURL;
            // const otherName = this.otherUser.displayName || this.otherUser.email;
            const otherAvatar = "";
            const otherName = "";
            const otherUID = profileId;
            const avatar = this.auth.authState.photoURL
            const creator = this.auth.authState.displayName || this.auth.authState.email;
            const members = {[profileId]: true, [currentUserId]: true}
            const thread: Thread = {id, avatar, creator, lastMessage, members, otherAvatar, otherName, otherUID}
            const threadPath = `chats/${id}`

            return this.afs.doc(threadPath).set(thread, {merge: true})
              .then(() => {//this.router.navigate([`chat/${id}`])
                //console.log("this.router.navigate([`chat/${id}`])"),
                this.loader.dismiss();
                this.navCtrl.push(ChatDetailComponent, {id: id})
            })
          }
        });
      //});

  }

  ShowLoading() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div>
        <img src="./assets/imgs/loading.gif" width="60">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    this.loader.present();
  }

  saveLastMessage(channelId, message) {
    const data = {
      lastMessage: message
    }
    return this.afs.doc(`chats/${channelId}`).set(data, {merge: true})
  }

  async deleteThread(threadId: string) {
    const batch = this.afs.firestore.batch()
    const query = await this.afs
      .collection(`chats/${threadId}/messages`)
      .ref.get()
    console.log(query)
    query.forEach(doc => {
      batch.delete(doc.ref)
    })
    batch.commit().then(() => {
      this.afs.doc(`chats/${threadId}`).delete()
    })
  }


}
