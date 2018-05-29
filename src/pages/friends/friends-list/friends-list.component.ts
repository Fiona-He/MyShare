import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ThreadService } from '../friends.service';
import { AuthService } from "../../core/auth.service";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {AddFriend} from "../friend-add/AddFriend";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService]
})
export class FriendsListComponent implements OnInit {
  friendList: any;

  QRScaning = false;
  doPerson:any;
  showSelect = false;
  prepareList=[];
  selectStatus:any;
  selectalltitle = "全选";
  constructor(private threadService: ThreadService,
              public auth: AuthService,
              private qrScanner: QRScanner,
              public navCtrl: NavController,private navParams: NavParams) {
    console.log("ChatThreadsComponent constructor");

  }

  ngOnInit() {
    console.log("FriendsListComponent ngOnInit");
    this.threadService.getFriends(this.auth.currentUserId).then(data => this.friendList = data);
    this.doPerson = this.navParams.get("doPerson")
    if(this.doPerson == null || this.doPerson == undefined || this.doPerson == "")
      this.showSelect = false;
    else this.showSelect = true;
  }

  updateFriendsList(friend) {
    console.log(friend.bfuid,friend.selectStatus)
    if(friend.selectStatus) {
      this.prepareList.push(friend.bfuid);
    }
    else{
      console.log(this.prepareList.indexOf(friend.bfuid));
      this.prepareList.splice(this.prepareList.indexOf(friend.bfuid),1);

    }
    console.log(this.prepareList);
  }

  selectAll(){
    this.prepareList.splice(0,this.prepareList.length);

    if("全选" == this.selectalltitle){
      for(let i =0 ; i< this.friendList.length; i++){
        this.prepareList.push(this.friendList[i].bfuid)
        this.friendList[i].selectStatus=true;
      }
      this.selectalltitle = "反选"
    }
    else if("反选" == this.selectalltitle){
      for(let j =0 ; j< this.friendList.length; j++){
        this.friendList[j].selectStatus=false;
      }
      this.selectalltitle = "全选"
    }


    console.log(this.prepareList);

  }
}
