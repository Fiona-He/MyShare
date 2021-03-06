import {Component, OnInit, Input} from "@angular/core";
import {
  AlertController, ModalController, NavController, NavParams,
  ViewController
} from "ionic-angular";
import {AuthService} from "../../core/auth.service";
import {ShareService} from "../../../myservice/share.service";
import {ThreadService} from "../friends.service";
import {QRScanner} from "@ionic-native/qr-scanner";
import {HttpClient} from "@angular/common/http";
import {UserService} from '../../user/user.service';
import {AngularFirestore} from 'angularfire2/firestore';

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
              private afs: AngularFirestore,
              public alertCtrl: AlertController,
              public userService: UserService,
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
          this.userService.getUser(tmpList[j].bfuid).subscribe(res =>{
            let tmp = {
              uid: tmpList[j].bfuid,
              photourl:  res.photoURL,
              email:res.email,
              displayname:(res.displayName == null ? "" : res.email ),
              peoplestatus:1
            }
            this.peopleList.push(tmp);
          })

        }

      });
    }

    if(this.action == "delete"){
      this.shareService.getActivityPeople(this.shareID).then(data => {
        console.log(data);
        let tmpList = data;

        for (let j = 0; j < this.peopleList.length; j++) {
          this.userService.getUser(this.peopleList[j].field2).subscribe(res =>{
            console.log(res);
            this.peopleList[j].photoURL = res.photoURL;
            this.peopleList[j].displayName = res.displayName || res.email;
            return res;
          })
        }

        for (let j = 0; j < tmpList.length; j++) {
          this.userService.getUser(tmpList[j].field2).subscribe(res =>{
            console.log(res);
            let tmp = {
              uid: tmpList[j].field2,
              photourl: res.photoURL,
              email: res.email,
              displayname:(res.displayName || res.email),
              peoplestatus:tmpList[j].status
            }

            if(tmpList[j].field2 != this.auth.currentUserId)
              this.peopleList.push(tmp);
          })

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
        console.log(this.prepareList.length);
        for(var i=0; i < this.prepareList.length; i++) {
          let shareobj = JSON.parse("{\"shareid\":"+this.shareID+"}");
          var ordersRef = this.afs.doc(`people_order/` + this.prepareList[i].uid).collection("roders").ref;
          ordersRef.doc(this.shareID+"").set(shareobj);
          console.log(this.prepareList[i]);
        }

        this.viewCtrl.dismiss();
      }
      //else alert('添加失败，稍后再试');
    })
  }

  doDelete(){
    console.log('doDelete');
    this.shareService.deleteActivityPeople(this.shareID,this.doPerson,this.prepareList,'1').then(data=>{
      console.log(data);
      //如果刪除成功
      if(JSON.parse(JSON.stringify(data)).res == 0){
        //將所有用戶的Firebase參與拼單數據刪除
        for(var i =0; i< this.prepareList.length; i ++) {
          var ordersRef = this.afs.doc(`people_order/` + this.prepareList[i].uid).collection("roders").ref;
          ordersRef.doc(this.shareID+"").delete();
        }
        this.viewCtrl.dismiss();
        //如果刪除不成功
      }else{
        var currUserName = "";
        console.log(this.peopleList);
        //獲取被刪除用戶的displayName
        for(var i=0; i <this.peopleList.length; i++){
          if(JSON.parse(JSON.stringify(data)).res == this.peopleList[i].uid)
            currUserName = this.peopleList[i].displayname;
        }
        let alert = this.alertCtrl.create({
          title: "刪除用戶不成功",
          subTitle: currUserName+"還未完成拼單，請確認！",
          buttons: ['關閉']
        });
        alert.present();
      }
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

