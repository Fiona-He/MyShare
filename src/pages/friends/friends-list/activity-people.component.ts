import {Component, OnInit, Input} from "@angular/core";
import {ModalController, NavController, NavParams, ViewController} from "ionic-angular";
import {AuthService} from "../../core/auth.service";
import {ShareService} from "../../../myservice/share.service";
import {ThreadService} from "../friends.service";
import {QRScanner} from "@ionic-native/qr-scanner";
import {HttpClient} from "@angular/common/http";

@Component({
  template: `
    <ion-header [elasticHeader]="myContent">
      <ion-toolbar>
        <ion-title>
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()"
                  style="font-size: 24px;color: #59b5c0; padding-left: 10px;">
            <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
          </button>
        </ion-buttons>
        <ion-buttons end>
          <button *ngIf="action == 'add'"  ion-button (click)="doAdd()"
                  style="font-size: 16px;color: #59b5c0;padding-right: 10px;">
            完成
          </button>
          <button *ngIf="action == 'delete'" ion-button (click)="doDelete()"
                  style="font-size: 16px;color: #59b5c0;padding-right: 10px;">
            完成
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #f4f4f4;" fullscreen #myContent>
      <ion-list>
        <ion-item-divider color="light">
          <ion-checkbox (click)="selectAll()"></ion-checkbox>
          <ion-label>{{selectalltitle}}</ion-label>
        </ion-item-divider>
          <ion-item  *ngFor="let people of peopleList " style="margin:0px;border-bottom: 0.55px solid #dedede;background-color: #ffffff;">
            <ion-checkbox [(ngModel)]="people.selectStatus" (click)="updatePeopleList(people)"></ion-checkbox>
            <ion-avatar item-start>
              <img  [src]="people.photourl  || '//:0'">
            </ion-avatar>
            <ion-label>
              <div style="color: #1b3554; font-size: 15px;">{{people.displayname || people.email}}</div>
            </ion-label>
          </ion-item>
      </ion-list>
    </ion-content>
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

        for (let j = 0; j < tmpList.length; j++) {
          let tmp = {
            uid: tmpList[j].bfuid,
            photourl: tmpList[j].bfphotourl,
            email:tmpList[j].bfemail,
            displayname:(tmpList[j].bfdisplayname == null ? "" : tmpList[j].bfdisplayname ),
            peoplestatus:1
          }
          this.peopleList.push(tmp);
        }

      });
    }

    if(this.action == "delete"){
      this.shareService.getActivityPeople(this.shareID).then(data => {
        console.log(data);
        let tmpList = data;
        for (let j = 0; j < tmpList.length; j++) {
          let tmp = {
            uid: tmpList[j].field2,
            photourl: tmpList[j].field3,
            email:tmpList[j].field5,
            displayname:(tmpList[j].field6 == null? "":tmpList[j].field6),
            peoplestatus:tmpList[j].status
          }
          if(tmpList[j].field2 != this.auth.currentUserId)
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
        //alert('添加成功');
        // let modal = this.modalCtrl.create(ModalContentSetting, {characterNum:this.shareID});
        // modal.present();
        //this.navCtrl.push(ModalContentSetting,{characterNum:this.shareID});
        //this.navCtrl.push(TabsPage);
        this.viewCtrl.dismiss();
      }
      //else alert('添加失败，稍后再试');
    })
  }

  doDelete(){
    console.log('doDelete');
    this.shareService.deleteActivityPeople(this.shareID,this.doPerson,this.prepareList,'1').then(data=>{
      if(data)
      {
        // alert('刪除成功');
        // let modal = this.modalCtrl.create(ModalContentSetting, {characterNum:this.shareID});
        // modal.present();
        //this.navCtrl.push(ModalContentSetting,{characterNum:this.shareID});
        //this.navCtrl.push(TabsPage);
        this.viewCtrl.dismiss();
      }
    //   else alert('添加失败，稍后再试');
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

