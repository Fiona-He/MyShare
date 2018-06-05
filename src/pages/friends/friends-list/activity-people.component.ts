import {Component, OnInit, Input} from "@angular/core";
import {ModalController, NavController, NavParams, ViewController} from "ionic-angular";
import {AuthService} from "../../core/auth.service";
import {ActivityPeople} from "./ActivityPeople";
import {FriendInfoComponent} from '../friend-info/friend-info.component';
import {ShareService} from "../../../myservice/share.service";
import {ThreadService} from "../friends.service";
import {QRScanner} from "@ionic-native/qr-scanner";
import {HttpClient} from "@angular/common/http";

@Component({
  template: `
    <div (click)="selectAll()">{{selectalltitle}}</div>
    <div *ngIf="action == 'add'" (click)="doAdd()">添加</div>
    <div *ngIf="action == 'delete'" (click)="doDelete()">刪除</div>
    <div (click)="goBack()">返回</div>
    <ion-list *ngFor="let people of peopleList " style="margin:0px;border-bottom: 0.55px solid #aaaaaa;background-color: #c6e7f0;" [hidden]="QRScaning">
      <ion-checkbox [(ngModel)]="people.selectStatus" (click)="updatePeopleList(people)"></ion-checkbox>
      <ion-item-sliding style="background-color: #c6e7f0;">
        <ion-item  style="height: 55px; background-color: #c6e7f0;">
          <ion-thumbnail item-start style="min-width:  40px;min-height:  40px;">
            <img style="border-radius: 5px; width: 40px; height: 40px;" [src]="people.photourl  || '//:0'">
          </ion-thumbnail>
          <ion-label>
            <div style="color: #1b3554; font-size: 15px;">{{people.displayname || people.email}}</div>
            <p></p>
          </ion-label>
        </ion-item>

      </ion-item-sliding>
    </ion-list>
    
  `,
  selector: "activity-people",
  providers:[ThreadService,ShareService]
})

export class ActivityPeopleComponent implements OnInit {
  peopleList =[];

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
    console.log("ActivityPeopleComponent constructor");

  }

  ngOnInit() {
    console.log("ActivityPeopleComponent ngOnInit");
    this.doPerson = this.navParams.get("doPerson");
    this.shareID = this.navParams.get("shareID");
    this.action = this.navParams.get("action");
    if(this.action == "add") {
      this.threadService.getFriends(this.auth.currentUserId).then(data => {
        console.log(data);
        //this.friendList = data
        let tmpList = data;
        console.log(tmpList.length());

        for (let j = 0; j < tmpList.length(); j++) {
          let tmp = {
            uid: tmpList[j].bfuid,
            photourl: tmpList[j].bfphotourl
            // email:tmpList[j].bfemail,
            // displayname:tmpList[j].bfdisplayname
          }
          this.peopleList.push(tmp);
        }

      });
      console.log("this.peopleList", this.peopleList);
    }
    if(this.action == "delete"){
      this.shareService.getActivityPeople(this.shareID).then(data => {
        console.log(data);
        let tmpList = data;
        for (let j = 0; j < tmpList.length(); j++) {
          let tmp = {
            uid: tmpList[j].field2,
            photourl: tmpList[j].field3
            // email:tmpList[j].bfemail,
            // displayname:tmpList[j].bfdisplayname
          }
          this.peopleList.push(tmp);
        }

      });
    }



    if(this.doPerson == null || this.doPerson == undefined || this.doPerson == "")
      this.showSelect = false;
    else this.showSelect = true;
  }

  updatePeopleList(people) {
    console.log(people.uid,people.selectStatus)
    if(people.selectStatus) {
      this.prepareList.push(people);
    }
    else{
      //console.log(this.prepareList.indexOf(friend.bfuid));
      let index=0;
      for(let x=0; x<this.prepareList.length; x++){
        if(this.prepareList[x].uid == people.uid){
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
      for(let i =0 ; i< this.peopleList.length; i++){

        this.prepareList.push(this.peopleList[i]);
        this.peopleList[i].selectStatus=true;
      }
      this.selectalltitle = "反选"
    }
    else if("反选" == this.selectalltitle){
      for(let j =0 ; j< this.peopleList.length; j++){
        this.peopleList[j].selectStatus=false;
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

  doDelete(){
    console.log('doDelete');
    // this.shareService.addActivityPeople(this.shareID,this.doPerson,this.prepareList,'1').then(data=>{
    //   if(data)
    //   {
    //     alert('刪除成功');
    //     // let modal = this.modalCtrl.create(ModalContentSetting, {characterNum:this.shareID});
    //     // modal.present();
    //     //this.navCtrl.push(ModalContentSetting,{characterNum:this.shareID});
    //     //this.navCtrl.push(TabsPage);
    //     this.viewCtrl.dismiss();
    //   }
    //   else alert('添加失败，稍后再试');
    // })
  }

}

