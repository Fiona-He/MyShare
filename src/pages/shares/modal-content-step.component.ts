import {
  NavParams, Platform, ViewController, AlertController,
  LoadingController
} from 'ionic-angular';
import {Component} from '@angular/core';
import {ShareService} from '../../myservice/share.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth.service';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MyserviceService} from '../../myservice/myservice.service';
import {ElasticHeaderModule} from "ionic2-elastic-header/dist";
import {Fieldvalue} from "../../global/fieldvalue";
import {UserService} from '../user/user.service';
import {PhotoViewer} from '@ionic-native/photo-viewer';

@Component({
  templateUrl: './modal-content-step.component.html',
  providers: [MyserviceService]
})
export class ModalContentStepComponent {
  status: any;
  projectid: any;
  baselist: { label: any, value: any }[] = [];
  list: { id: any; label: any, value: number }[] = [];
  fieldvalue1stForm: FormGroup;
  fieldvalue2ndForm: FormGroup;
  fieldvalue3rdForm: FormGroup;
  fieldvalue4thForm: FormGroup;
  loader: any;
  data:any;
  picURL: any;
  maxamount: any = "0";
  menudata: any = {};
  isVisible: any;
  handsUpPeopleList=[];
  selectalltitle = "全选";
  subOrderPeopleList=[];
  constructor(public platform: Platform,
              public params: NavParams,
              private camera: Camera,
              private fb: FormBuilder,
              public auth: AuthService,
              public loadingCtrl: LoadingController,
              private myserviceService: MyserviceService,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController,
              public userService: UserService,
              private photoViewer: PhotoViewer,
              private shareService: ShareService
              ) {
    this.status = this.params.get('status');
    console.log('status:' + this.status);
    this.projectid = this.params.get('projectid');
    console.log('projectid:' + this.projectid);
    this.data = this.params.get('data');
    console.log(this.data);
  }

  ngOnInit(): void {
    this.fieldvalue1stForm = this.fb.group({
      'projectid': [this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId, []],
      'status': ['1', []],
    });
    this.fieldvalue2ndForm = this.fb.group({
      'projectid': [this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId, []],
      'status': ['1', []],
    });
    this.fieldvalue3rdForm = this.fb.group({
      'projectid': [this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId, []],
      'status': ['1', []],
    });
    this.fieldvalue4thForm = this.fb.group({
      'projectid': [this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId, []],
      'status': ['1', []],
    });
    /*this.baselist.push({label:'枸杞養生吐司 10.50',value:'10.50'});
    this.baselist.push({label:'葡萄吐司 13.00',value:'13.00'});
    this.baselist.push({label:'流心芝士包 13.00',value:'13.00'});
    this.baselist.push({label:'可口可樂 6.50',value:'6.50'});*/

    if( this.status == '1')
      this.initStatus1();
    if( this.status == '2')
      this.initStatus2();
    if( this.status == '3')
      this.initStatus3();

  }

  initStatus1(): any{
    console.log("need to get people of hands up");
    this.shareService.getHandsUpPeople(this.projectid).then(data=>{
      console.log(data);
      this.handsUpPeopleList = data;
      for (let j = 0; j < this.handsUpPeopleList.length; j++) {
        this.handsUpPeopleList[j].field200 = false;
        this.userService.getUser(this.handsUpPeopleList[j].field2).subscribe(res =>{
          console.log(res);
          this.handsUpPeopleList[j].photoURL = res.photoURL;
          this.handsUpPeopleList[j].displayName = res.displayName || res.email;
          return res;
        })
      }
    })
  }

  userList = [];
  subOrder :any;
  subOrderMain: any;
  initStatus2(): any{
    console.log("initStatus2");
    //獲取舉手人員名單
    this.shareService.getSubOrder(this.auth.currentUserId,this.projectid).then(data=>{
      console.log(data);
      this.subOrderMain = data;
      //舉手人員列表
      this.userList = data.list;
      this.subOrder = data.order;
      for(let x1 =0;x1<this.userList.length;x1++){
        //將舉手人總金額初始化為0
        this.userList[x1].field8 = 0;
        //從FireBase獲取舉手人員頭像和名稱
        this.userService.getUser(this.userList[x1].field2).subscribe(res =>{
          console.log(res);
          this.userList[x1].photoURL = res.photoURL;
          this.userList[x1].displayName = res.displayName || res.email;
          return res;
        })
      }

    })
  }

  myBill:any;
  bill=0;
  subOrderPicurl:any;
  items: any;
  initStatus3(): any{
    this.shareService.getSubOrderAndConfirm(this.auth.currentUserId,this.projectid).then( data=>{
      this.myBill = data;
      this.bill = this.myBill[0].field8;
      this.subOrderPicurl = this.myBill[0].field9;
      this.items = JSON.parse(this.myBill[0].field10).items;
    })
  }

  presentPopover(myEvent,url) {
    var options = {
      share: true, // default is false
      closeButton: false, // default is true
      copyToReference: false // default is false
    };
    this.photoViewer.show(url,'',options);
  }

  getNowTimeStpFormat(): any {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = ('0' + (date.getMonth() + 1).toString()).slice(-2);
    let dd = ('0' + (date.getDate()).toString()).slice(-2);
    let hour = ('0' + (date.getHours()).toString()).slice(-2);
    let min = ('0' + (date.getMinutes()).toString()).slice(-2);
    let second = ('0' + (date.getSeconds()).toString()).slice(-2);
    let msecond = ('0' + (date.getMilliseconds()).toString()).slice(-3);
    return yyyy + mm + dd + hour + min + second + msecond;
  }

  selectAll(){
    this.subOrderPeopleList.splice(0,this.subOrderPeopleList.length);

    if("全选" == this.selectalltitle){
      for(let i =0 ; i< this.handsUpPeopleList.length; i++){

        this.subOrderPeopleList.push(this.handsUpPeopleList[i]);
        this.handsUpPeopleList[i].field200=true;
      }
      this.selectalltitle = "反选"
    }
    else if("反选" == this.selectalltitle){
      for(let j =0 ; j< this.handsUpPeopleList.length; j++){
        this.handsUpPeopleList[j].field200=false;
      }
      this.selectalltitle = "全选"
    }
    console.log(this.subOrderPeopleList);
  }

  updateHandsUpPeopleList(people) {
    console.log(people.field2,people.field200)
    if(people.field200) {
      this.subOrderPeopleList.push(people);
    }
    else{
      //console.log(this.subOrderPeopleList.indexOf(friend.bfuid));
      let index=0;
      for(let x=0; x<this.subOrderPeopleList.length; x++){
        if(this.subOrderPeopleList[x].uid == people.uid){
          index=x;
          break;
        }
      }
      console.log(this.subOrderPeopleList[index]);
      this.subOrderPeopleList.splice(index,1);

    }
    console.log(this.subOrderPeopleList);
  }

  //新增舉手數據
  commit1st() {
    let tmpfieldvalue = new Fieldvalue();
    /*1.2举手人  BO_FILEDSVALUE
    活动编号  field1
    举手人 field2
    举手时间 field3
    份额 field4
    备注 field5
    举手人状态 status*/
    console.log(this.getNowTimeStpFormat());

    tmpfieldvalue.projectid = 0;
    tmpfieldvalue.field1 = this.projectid;
    tmpfieldvalue.field2 = this.auth.currentUserId;
    tmpfieldvalue.field3 = this.getNowTimeStpFormat();
    tmpfieldvalue.field4 = this.fieldvalue1stForm.get("field1").value;
    tmpfieldvalue.field5 = this.fieldvalue1stForm.get("field2").value;
    tmpfieldvalue.status = '1';
    console.log(tmpfieldvalue);
    this.shareService.raiseHand(tmpfieldvalue).then(() => {
      this.dismiss();
    });
  }

  //刪除舉手數據
  uncommit2st(){
    for(let i=0; i< this.data.RaiseHandStatus.length; i++) {
      if(this.data.RaiseHandStatus[i].uid == this.auth.currentUserId)
        this.shareService.unraiseHand(0,this.data.RaiseHandStatus[i].sequence).then(res => {
          this.dismiss();
        });
    }
  }

  //新增小單
  commit2st() {
    let orderNo = this.auth.currentUserId+'_'+this.getNowTimeStpFormat();

    //準備子訂單主信息
    let subOrderMain = new Fieldvalue();
    subOrderMain.field6 = orderNo;  //此小单编号
    subOrderMain.projectid = 2;     //小單主信息保存表
    subOrderMain.field1 = this.projectid;   //訂單编号
    subOrderMain.field2 = this.auth.currentUserId;  //小單團長uid
    subOrderMain.field3 = '0';      //小單總金額
    subOrderMain.field4 = '';       //小單用時
    subOrderMain.field5 = '';       //小單是否完全結清
    subOrderMain.status = '1';      //小單狀態

    //從舉手人中選擇子訂單參與者
    for(let i =0; i<this.subOrderPeopleList.length; i++){
      this.subOrderPeopleList[i].projectid = 3;     //小單人員信息保存表
      this.subOrderPeopleList[i].field6 = orderNo;  //小單編號
      this.subOrderPeopleList[i].field7 = 1;        //小單人員狀態
    }

    //拼裝數據結構
    let data = {
      "order":subOrderMain,
      "list":this.subOrderPeopleList
    }

    console.log(data);
    //新增子單主數據到fieldsvalue2，新增子單參與人數據到fieldsvalue3，更新fieldsvalue0的舉手狀態
    this.shareService.addSubOrder(data).then(res => {
      this.dismiss();
    });
  }

  //刪除小單
  uncommit3st(){
    this.shareService.removeSubOrder(this.subOrderMain).then( res =>{
      this.dismiss();
    })
  }


  commit3st(value):any{
    console.log(this.userList);
    let calculateTotal = 0;
    this.subOrder.field3 = value;
    this.subOrder.field5 = '0';
    this.subOrder.field7 = this.picURL;
    for(let x1 =0;x1<this.userList.length;x1++){
      calculateTotal =calculateTotal+ Number(this.userList[x1].field8);
    }
    console.log("calculateTotal",calculateTotal);

    if(calculateTotal != Number(value)){
      this.presentAlert("打起精神啊！","錢算不對啊，大哥");
    }
    else if( value == 0){
      let data = {
        "order":this.subOrder,
        "list":this.userList
      }
      this.presentConfirm("不用給錢？！！","總金額是 0 啊啊啊啊！","手滑按錯","怎樣我就愛請客",data);
    } else {

      this.presentAlert("終於算完錢啦，辛苦啦^^","!");
      let data = {
        "order":this.subOrder,
        "list":this.userList
      }
      console.log(data);
      //this.finishOrderFunc2(data);
      this.shareService.updateSubOrder(data).then(res => {
        this.dismiss();
      });
    }
  }
  // finishOrderFunc1():any{
  //   console.log("cancel click");
  // }
  // finishOrderFunc2(data):any{
  //   this.shareService.updateSubOrder(data).then(res => {
  //     this.dismiss();
  //   });
  // }

  calculatemoney(event) {
    console.log(event);
    if (event != undefined) {
      console.log(this.userList.length)
      for(let x1 =0;x1<this.userList.length;x1++){
        this.userList[x1].field8 = event/this.userList.length;
      }
    }
  }

  presentAlert(title,subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentConfirm(title,subtitle,yes,no,data) {
    let alert = this.alertCtrl.create({
      title: title,
      message: subtitle,
      buttons: [
        {
          text: yes,
          role: 'cancel',
          handler: ()=>{ console.log("cancel click;")}
        },
        {
          text: no,
          handler:()=>{
            this.shareService.updateSubOrder(data).then(res => {
                this.dismiss();
              });}
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  everyDoConfirm():any {
    console.log(this.myBill);
    this.myBill[0].status = 2;
    this.shareService.confirmSubOrder(this.myBill[0]).then(res => {
      this.dismiss();
    });
  }

  //選擇每個舉手人的消費項目
  showCheckbox(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle('請選擇消費項目');

    //將所有消費項目初始化到baselist中
    for (var i = 0; i < this.baselist.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.baselist[i].label,
        value: '' + i,
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log(data);
        //將當前人的消費總額初始化為0
        this.userList[id].field8 = 0;
        //將選中的消費項目增加id標識，放到list中
        for (var j = data.length - 1; j >= 0; j--) {
          console.log('Checkbox data:', data[j]);
          this.list.push({
            id: id,
            label: this.baselist[data[j]].label,
            value: this.baselist[data[j]].value
          });
          //從總的消費項目清單中將選中的項目刪除掉
          this.baselist.splice(data[j], 1);
          console.log(this.list);
          console.log(this.baselist);
        }
        //計算選中消費項目的總金額
        for (var k = this.list.length - 1; k >= 0; k--) {
          //為每個人保存消費項目
          let items = "{\"items\": [";
          if (this.list[k].id == id) {
            this.userList[id].field8 = this.userList[id].field8 +  + parseFloat(this.list[k].value.toString());
            items = items + "{\"item\":"+this.list[k].label+"},";
          }
          items = items + "]}";
          this.userList[id].field10 = items;
          console.log(items);
        }
      }
    });
    alert.present();
  }

  removeItem(label, value, id, index) {
    this.baselist.push({label: label, value: value});
    this.list.splice(index, 1);
    //將當前人的消費總額初始化為0
    this.userList[id].field8 = 0;
    //重新計算選中消費項目的總金額
    for (var k = this.list.length - 1; k >= 0; k--) {
      if (this.list[k].id == id) {
        this.userList[id].field8 = this.userList[id].field8 +  + parseFloat(this.list[k].value.toString());
      }
    }
  }

  editItem(title, amount,index){
    const prompt = this.alertCtrl.create({
      title: '編輯消費項目',
      inputs: [
        {
          name: 'title',
          //placeholder: title,
          value: title.replace(amount,'')
        },
        {
          name: 'amount',
          //placeholder: amount,
          value: amount
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '保存',
          handler: data => {
            console.log(data);
            console.log('Saved clicked');
            this.baselist[index].label= data.amount + data.title;
            console.log(data.title);
            this.baselist[index].value= data.amount;
            console.log(data.amount);
          }
        }
      ]
    });
    prompt.present();
  }

  removeTotalItem(label, value, index) {
    this.baselist.splice(index, 1);
  }

  showPic() {

    //手機上使用部分開始
    const options: CameraOptions = {
      quality: 80,
      targetWidth: 600,
      targetHeight: 1200,
      //allowEdit: true,
      sourceType: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.presentLoadingCustom();
      let base64Image = imageData;
      base64Image = 'data:image/jpeg;base64,' + base64Image;
      this.myserviceService.getReceiptContent(base64Image).then(data => {
        console.log(data);

        this.picURL = JSON.parse(JSON.stringify(data)).picurl.picurl;
        console.log(this.picURL);
        this.menudata = JSON.parse(JSON.stringify(data)).menuJson;
        //初始化
        let tempwords = "";
        this.baselist = [];
        this.list = [];
        this.maxamount = "0";
        this.calculatemoney(this.maxamount);
        console.log(this.menudata);
        for (var i = 0; i < this.menudata.words_result.length; i++) {
          //識別可能把小數點識別成逗號，所以替換回來
          this.menudata.words_result[i].words = this.menudata.words_result[i].words.replace(',', '.');
          //數字開頭，有正負號，有一個或多個小數點，最後一個小數點後面有2位數字，或者全部是數字,如果全部是數字，長度不能超過4
          if (/^[\d\,\=\+\-\.]*[\d\,\=]*\.{1}\d{0,2}$/.test(this.menudata.words_result[i].words) || (/^[\d]*$/.test(this.menudata.words_result[i].words) && this.menudata.words_result[i].words.length <= 4)) {

            console.log((this.menudata.words_result[i].words.split(".")).length - 1);
            //如果包含多過一個小數點
            if ((this.menudata.words_result[i].words.split(".")).length - 1 > 1) {

              let start = this.menudata.words_result[i].words.lastIndexOf('.');
              let leng = 3;
              let star = 1;

              //取最後一個小數點前後2位共3位，并在整串數字中匹配，如果包含，就把整數位往前推，直到沒有匹配為止
              while ((this.menudata.words_result[i].words.split(this.menudata.words_result[i].words.substr(start - star, leng))).length - 1 >= 2) {
                leng = leng + 1;
                star = star + 1;
                console.log(this.menudata.words_result[i].words.substr(start - star, leng));
              }

              //把最後判斷出來的金額放到變量里
              let finalamount = this.menudata.words_result[i].words.substr(start - (star - 1), leng - 1);

              //如果取到的金額是以小數點開頭，意味著整串數字中沒有出現重複值，那就有可能是購買數量超過1件的商品
              if (finalamount.startsWith('.')) {
                //假設購買數量不超過20件
                for (var m = 2; m < 20; m++) {
                  leng = 3;
                  star = 1;
                  //逐步增加位數截取最後的金額，再以獲取到的金額除以假設的數量，看整串數字中是否有出現
                  while (!((this.menudata.words_result[i].words.split((parseFloat(this.menudata.words_result[i].words.substr(start - star, leng)) / m).toString())).length - 1 >= 1) && leng <= this.menudata.words_result[i].words.length) {
                    //console.log("Finding str:"+(parseFloat(this.menudata.words_result[i].words.substr(start - star, leng))/m).toString());
                    leng = leng + 1;
                    star = star + 1;
                  }
                  //如果不是循環結束都沒有發現，也就是發現了可能的合法值
                  if (leng != this.menudata.words_result[i].words.length + 1) {
                    console.log("Found str:" + (parseFloat(this.menudata.words_result[i].words.substr(start - star, leng)) / m).toString() + " length" + leng.toString());
                    finalamount = this.menudata.words_result[i].words.substr(start - star, leng);
                  }
                }
              }

              //把金額格式化成沒有多餘0的格式。
              finalamount = parseFloat(finalamount).toString();
              //把金額和商品名放到baselist裡面
              this.baselist.push({label: finalamount + " " + tempwords, value: finalamount});

              //找到最大的金額，如果金額比之前的都大就替換到變量里
              if (parseFloat(finalamount) > parseFloat(this.maxamount)) {
                this.maxamount = finalamount;
                this.calculatemoney(this.maxamount);
              }
              //如果包含一個小數點
            } else {

              //把金額和商品名放到baselist裡面
              this.baselist.push({
                label: this.menudata.words_result[i].words.replace('=', '') + " " + tempwords,
                value: this.menudata.words_result[i].words.replace('=', '')
              });
              console.log("label:" + tempwords + ",value:" + this.menudata.words_result[i].words.replace('=', ''));
              //找到最大的金額，如果金額比之前的都大就替換到變量里
              if (parseFloat(this.menudata.words_result[i].words.replace('=', '')) > parseFloat(this.maxamount)) {
                this.maxamount = this.menudata.words_result[i].words.replace('=', '');
                this.calculatemoney(this.maxamount);
              }

            }

          } else {
            tempwords = this.menudata.words_result[i].words;
          }
        }

        /*for(let j =this.baselist.length-1; j > 0; j--)
        {
          if(this.baselist[j].value == this.maxamount) {
            this.baselist.splice(j, 1);
            console.log(this.baselist);
          }
        }*/

        this.loader.dismiss();
      });

    }, (err) => {
    });
    //手機上使用部分結束

    //測試環境使用開始
    /*var data = JSON.parse("{\"picurl\":{\"picurl\":\"http://myshare123.oss-cn-shenzhen.aliyuncs.com/e5578864-59bc-4600-9e23-192b2becb89b.jpg\"},\"menuJson\":{\"log_id\":6231664113711480000,\"words_result\":[{\"words\":\"atbeEskimo(富达店)\",\"location\":{\"top\":93,\"left\":153,\"width\":238,\"height\":61}},{\"words\":\"补打结张单\",\"location\":{\"top\":136,\"left\":216,\"width\":125,\"height\":49}},{\"words\":\"餐桌:\",\"location\":{\"top\":188,\"left\":19,\"width\":62,\"height\":44}},{\"words\":\"单号:PC218052600020收银员:1003\",\"location\":{\"top\":215,\"left\":15,\"width\":380,\"height\":40}},{\"words\":\"时间:05-2613:12\",\"location\":{\"top\":247,\"left\":7,\"width\":209,\"height\":34}},{\"words\":\"序\",\"location\":{\"top\":311,\"left\":0,\"width\":31,\"height\":29}},{\"words\":\"品名\",\"location\":{\"top\":307,\"left\":156,\"width\":55,\"height\":33}},{\"words\":\"数量价格金\",\"location\":{\"top\":307,\"left\":313,\"width\":231,\"height\":32}},{\"words\":\"蛋鸡肉饭(原价)\",\"location\":{\"top\":371,\"left\":21,\"width\":217,\"height\":33}},{\"words\":\"140.0040.00040.00\",\"location\":{\"top\":372,\"left\":355,\"width\":187,\"height\":29}},{\"words\":\"佇檬绿茶(半价)\",\"location\":{\"top\":401,\"left\":23,\"width\":189,\"height\":40}},{\"words\":\"111.5011.5\",\"location\":{\"top\":404,\"left\":354,\"width\":190,\"height\":30}},{\"words\":\"消费金:510\",\"location\":{\"top\":466,\"left\":0,\"width\":192,\"height\":63}},{\"words\":\"应收:5.50\",\"location\":{\"top\":518,\"left\":0,\"width\":141,\"height\":61}},{\"words\":\"现金一付款1.0\",\"location\":{\"top\":598,\"left\":3,\"width\":307,\"height\":57}},{\"words\":\"实付1:150\",\"location\":{\"top\":646,\"left\":9,\"width\":138,\"height\":56}},{\"words\":\"签名:\",\"location\":{\"top\":723,\"left\":18,\"width\":62,\"height\":22}},{\"words\":\"次迎下次久地临\",\"location\":{\"top\":757,\"left\":212,\"width\":137,\"height\":24}},{\"words\":\"2850905\",\"location\":{\"top\":775,\"left\":235,\"width\":82,\"height\":16}}],\"words_result_num\":19,\"direction\":0}}");
    this.picURL = JSON.parse(JSON.stringify(data)).picurl.picurl;
    console.log(this.picURL);
    this.menudata = JSON.parse(JSON.stringify(data)).menuJson;
    // this.menudata = JSON.parse("{\"log_id\":8154668713636634000,\"words_result\":[{\"words\":\"oK便利店\",\"location\":{\"top\":170,\"left\":110,\"width\":372,\"height\":76}},{\"words\":\"號(Store):616-皇朝建興隆分店(2872795)\",\"location\":{\"top\":266,\"left\":19,\"width\":548,\"height\":38}},{\"words\":\"機:2店員:YING2018/05/2613:17\",\"location\":{\"top\":300,\"left\":18,\"width\":445,\"height\":34}},{\"words\":\"1利口樂桴檬糖45G\",\"location\":{\"top\":364,\"left\":30,\"width\":238,\"height\":33}},{\"words\":\"9.919.8\",\"location\":{\"top\":363,\"left\":420,\"width\":57,\"height\":30}},{\"words\":\"利口燊珠什莓味\",\"location\":{\"top\":395,\"left\":66,\"width\":190,\"height\":32}},{\"words\":\"9\",\"location\":{\"top\":397,\"left\":431,\"width\":20,\"height\":27}},{\"words\":\"1易極強勁薄荷味\",\"location\":{\"top\":426,\"left\":25,\"width\":230,\"height\":34}},{\"words\":\"17.5\",\"location\":{\"top\":425,\"left\":421,\"width\":58,\"height\":32}},{\"words\":\"可口可架300毫升\",\"location\":{\"top\":458,\"left\":62,\"width\":207,\"height\":34}},{\"words\":\"4.5\",\"location\":{\"top\":459,\"left\":431,\"width\":47,\"height\":29}},{\"words\":\"(Total)\",\"location\":{\"top\":523,\"left\":137,\"width\":166,\"height\":38}},{\"words\":\"42.4\",\"location\":{\"top\":525,\"left\":394,\"width\":61,\"height\":32}},{\"words\":\"現金(Cash):\",\"location\":{\"top\":558,\"left\":137,\"width\":164,\"height\":34}},{\"words\":\"2.4\",\"location\":{\"top\":559,\"left\":407,\"width\":48,\"height\":30}},{\"words\":\"找款(Change):0.0\",\"location\":{\"top\":590,\"left\":136,\"width\":306,\"height\":37}},{\"words\":\"米****多謝惠顧**米*\",\"location\":{\"top\":660,\"left\":134,\"width\":279,\"height\":33}},{\"words\":\"開始消費時間:2018/05/2613:17:11\",\"location\":{\"top\":723,\"left\":2,\"width\":447,\"height\":32}}],\"words_result_num\":18,\"direction\":0}");

    let tempwords = "";
    this.baselist = [];
    this.list = [];
    this.maxamount = "0";
    this.calculatemoney(this.maxamount);
    console.log(this.menudata);
    for(var i=0; i<this.menudata.words_result.length; i++)
    {
      //識別可能把小數點識別成逗號，所以替換回來
      this.menudata.words_result[i].words = this.menudata.words_result[i].words.replace(',','.');
      //數字開頭，有正負號，有一個或多個小數點，最後一個小數點後面有2位數字，或者全部是數字,如果全部是數字，長度不能超過4
      if(/^[\d\,\=\+\-\.]*[\d\,\=]*\.{1}\d{0,2}$/.test(this.menudata.words_result[i].words)||(/^[\d]*$/.test(this.menudata.words_result[i].words) && this.menudata.words_result[i].words.length<=4)){

        console.log((this.menudata.words_result[i].words.split(".")).length-1);
        //如果包含多過一個小數點
        if((this.menudata.words_result[i].words.split(".")).length-1 > 1) {

          let start = this.menudata.words_result[i].words.lastIndexOf('.');
          let leng = 3;
          let star = 1;

          //取最後一個小數點前後2位共3位，并在整串數字中匹配，如果包含，就把整數位往前推，直到沒有匹配為止
          while ((this.menudata.words_result[i].words.split(this.menudata.words_result[i].words.substr(start - star, leng))).length - 1 >= 2) {
            leng = leng + 1;
            star = star + 1;
            console.log(this.menudata.words_result[i].words.substr(start - star, leng));
          }

          //把最後判斷出來的金額放到變量里
          let finalamount = this.menudata.words_result[i].words.substr(start - (star - 1), leng - 1);

          //如果取到的金額是以小數點開頭，意味著整串數字中沒有出現重複值，那就有可能是購買數量超過1件的商品
          if(finalamount.startsWith('.')){
            //假設購買數量不超過20件
            for(var m =2; m<20; m++) {
              leng = 3;
              star = 1;
              //逐步增加位數截取最後的金額，再以獲取到的金額除以假設的數量，看整串數字中是否有出現
              while(!((this.menudata.words_result[i].words.split((parseFloat(this.menudata.words_result[i].words.substr(start - star, leng))/m).toString())).length - 1 >= 1) && leng<= this.menudata.words_result[i].words.length){
                //console.log("Finding str:"+(parseFloat(this.menudata.words_result[i].words.substr(start - star, leng))/m).toString());
                leng = leng + 1;
                star = star + 1;
              }
              //如果不是循環結束都沒有發現，也就是發現了可能的合法值
              if(leng != this.menudata.words_result[i].words.length+1) {
                console.log("Found str:" + (parseFloat(this.menudata.words_result[i].words.substr(start - star, leng)) / m).toString() + " length" + leng.toString());
                finalamount = this.menudata.words_result[i].words.substr(start - star, leng);
              }
            }
          }

          //把金額格式化成沒有多餘0的格式。
          finalamount = parseFloat(finalamount).toString();
          //把金額和商品名放到baselist裡面
          this.baselist.push({label: finalamount + " " + tempwords, value: finalamount});

          //找到最大的金額，如果金額比之前的都大就替換到變量里
          if (parseFloat(finalamount) > parseFloat(this.maxamount)) {
            this.maxamount = finalamount;
            this.calculatemoney(this.maxamount);
          }
        //如果包含一個小數點
        }else{

          //把金額和商品名放到baselist裡面
          this.baselist.push({label:this.menudata.words_result[i].words.replace('=','')+" "+tempwords,value:this.menudata.words_result[i].words.replace('=','')});
          console.log("label:"+tempwords+",value:"+this.menudata.words_result[i].words.replace('=',''));
          //找到最大的金額，如果金額比之前的都大就替換到變量里
          if(parseFloat(this.menudata.words_result[i].words.replace('=','')) > parseFloat(this.maxamount) ) {
            this.maxamount = this.menudata.words_result[i].words.replace('=', '');
            this.calculatemoney(this.maxamount);
          }

        }

      }else{
        tempwords = this.menudata.words_result[i].words;
      }
    }*/
    //測試環境使用結束

    /*for(let j =this.baselist.length-1; j > 0; j--)
    {
      if(this.baselist[j].value == this.maxamount) {
        this.baselist.splice(j, 1);
        console.log(this.baselist);
      }
    }*/

  }

  presentLoadingCustom() {
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
}
