import { Injectable,Injector} from "@angular/core";
//import {Router} from '@angular/router'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

import { Thread } from "./thread.model";
import { Message } from "./message.model";

import { AuthService } from "../core/auth.service";
import { MessageService } from "./message.service";
import {ChatDetailComponent} from "./chat-detail/chat-detail.component";
import {NavController,App} from "ionic-angular";

@Injectable()
export class ThreadService {
  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;

  constructor(
    //private router: Router,
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: MessageService,
    //public navCtrl:NavController
    protected injector: Injector,
    private app: App

  ) {}

  get navCtrl(): NavController {
    return this.app.getRootNav();
    //return this.injector.get(NavController);
  }

  getFriends() {
    console.log("do getFriends!");
    this.threadsCollection = this.afs.collection('chats', ref =>
      ref.where(`members.${this.auth.currentUserId}`, '==', true)
    )
    return this.threadsCollection.valueChanges()
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

  otherUser:any;
  createThread(profileId) {
    // let otherAvatar;
    // let otherName;

    this.auth.getUser(profileId)
      .subscribe(value => {
        console.log(value);

        this.otherUser = value;

        const otherAvatar=this.otherUser.photoURL;
        const otherName=this.otherUser.displayName||this.otherUser.email;

        const otherUID = profileId;
        const currentUserId = this.auth.currentUserId

        const id =
          profileId < currentUserId
            ? `${profileId}_${currentUserId}`
            : `${currentUserId}_${profileId}`
        // const avatar = this.auth.authState.photoURL
        //
        // const creator = this.auth.authState.displayName || this.auth.authState.email
        // const lastMessage = null
        // const members = { [profileId]: true, [currentUserId]: true }

        const avatar = this.auth.authState.photoURL
        const creator = this.auth.authState.displayName || this.auth.authState.email
        const lastMessage = null
        const members = { [profileId]: true, [currentUserId]: true }

        const thread: Thread = { id, avatar, creator, lastMessage ,members ,otherAvatar,otherName,otherUID}

        const threadPath = `chats/${id}`
        return this.afs.doc(threadPath).set(thread, { merge: true })
          .then(() => //this.router.navigate([`chat/${id}`])
            //console.log("this.router.navigate([`chat/${id}`])"),
            this.navCtrl.push(ChatDetailComponent,{id:id})
          )
      });

  }

  saveLastMessage(channelId, message) {
    const data = {
      lastMessage: message
    }
    return this.afs.doc(`chats/${channelId}`).set(data, { merge: true })
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
