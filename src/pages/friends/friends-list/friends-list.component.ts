import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ThreadService } from '../friends.service';
import { AuthService } from "../../core/auth.service";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {AddFriend} from "../friend-add/AddFriend";
import {ModalController, NavController, NavParams, ViewController} from "ionic-angular";
import {HttpClient} from "@angular/common/http";
import {ShareService} from "../../../myservice/share.service";
import {ModalContentSetting} from "../../shares/modal-share-setting.component";
import {SharesPage} from "../../shares/shares";
import {TabsPage} from "../../tabs/tabs";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService,ShareService]
})
export class FriendsListComponent implements OnInit {
  friendList: any;

  QRScaning = false;
  doPerson:any;
  shareID:any;
  action:any;
  showSelect = false;
  prepareList=[];
  selectStatus:any;
  selectalltitle = "全选";
  constructor(private threadService: ThreadService,
              public auth: AuthService,
              private qrScanner: QRScanner,
              public navCtrl: NavController,private navParams: NavParams,
              private http: HttpClient,
              private shareService:ShareService,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController) {
    console.log("ChatThreadsComponent constructor");

  }

  ngOnInit() {
    console.log("FriendsListComponent ngOnInit");
    this.doPerson = this.navParams.get("doPerson");
    this.shareID = this.navParams.get("shareID");
    this.action = this.navParams.get("action");
    //if(this.action == "add")
      this.threadService.getFriends(this.auth.currentUserId).then(data => {
        this.friendList = data
      });
    // if(this.action == "delete")
    //   this.shareService.getActivityPeople(this.shareID).then(data => this.friendList = data);


    if(this.doPerson == null || this.doPerson == undefined || this.doPerson == "")
      this.showSelect = false;
    else this.showSelect = true;
  }

  updateFriendsList(friend) {
    console.log(friend.bfuid,friend.selectStatus)
    if(friend.selectStatus) {
      let tmp = {uid:friend.bfuid,photourl:friend.bfphotourl};
      this.prepareList.push(tmp);
    }
    else{
      //console.log(this.prepareList.indexOf(friend.bfuid));
      let index=0;
      for(let x=0; x<this.prepareList.length; x++){
        if(this.prepareList[x].uid == friend.bfuid){
          index=x;
          break;
        }
      }
      console.log(this.prepareList[index]);
      this.prepareList.splice(index,1);

    }
    console.log(this.prepareList);
  }

  selectAll(){
    this.prepareList.splice(0,this.prepareList.length);

    if("全选" == this.selectalltitle){
      for(let i =0 ; i< this.friendList.length; i++){

        let tmp = {uid:this.friendList[i].bfuid,photourl:this.friendList[i].bfphotourl};
        this.prepareList.push(tmp);
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
  doAdd(){
    console.log('doAdd');
    this.shareService.addActivityPeople(this.shareID,this.doPerson,this.prepareList,'1').then(data=>{
      if(data)
      {
        alert('添加成功');
        // let modal = this.modalCtrl.create(ModalContentSetting, {characterNum:this.shareID});
        // modal.present();
        //this.navCtrl.push(ModalContentSetting,{characterNum:this.shareID});
        //this.navCtrl.push(TabsPage);
        this.viewCtrl.dismiss();
      }
      else alert('添加失败，稍后再试');
    })
  }
  goBack() {
    this.viewCtrl.dismiss();
  }
}
