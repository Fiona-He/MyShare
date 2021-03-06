import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewProject} from '../../myservice/prjectservice.service';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShareService} from '../../myservice/share.service';
import {AngularFirestore} from 'angularfire2/firestore';

declare var moment: any;

@Component({
  template: `
    <ion-header [elasticHeader]="newShare">
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
      </ion-toolbar>
    </ion-header>
    <ion-content style="background-color: #c6e7f0" fullscreen #newShare>
      <div style="background-image: url('./assets/imgs/newshare.png');" class="top-nav"></div>
      <form [formGroup]="projectFrom">
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label floating>拼單名稱*</ion-label>
            <ion-input formControlName="projectname" type="text" #projectname id="projectname"  
                       ></ion-input>
          </ion-item>
          <div *ngIf="formError.projectname" style="height: 20px;text-align: left;width: 300px;line-height:  40px;padding-left:  10px;color:  #ff0000;">{{formError.projectname}}</div>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label>報名失效週期*</ion-label>
            <ion-select #priority id="priority" formControlName="priority">
              <ion-option value="1" selected="true">1天</ion-option>
              <ion-option value="2">1周</ion-option>
              <ion-option value="3">1個月</ion-option>
              <ion-option value="4">1年</ion-option>
              <ion-option value="5">永不</ion-option>
            </ion-select>
          </ion-item>
          <div *ngIf="formError.priority" style="height: 20px;text-align: left;width: 300px;line-height:  40px;padding-left:  10px;color:  #ff0000;">{{formError.priority}}</div>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label>截止日期*</ion-label>
            <ion-datetime displayFormat="YYYY-MM-DD" [min]="minDate" [max]="maxDate"
                          #enddate id="enddate" formControlName="enddate"></ion-datetime>
          </ion-item>
          <div *ngIf="formError.enddate" style="height: 20px;text-align: left;width: 300px;line-height:  40px;padding-left:  10px;color:  #ff0000;">{{formError.enddate}}</div>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label>最多人數*</ion-label>
            <ion-select #headcount id="headcount" formControlName="headcount">
              <ion-option value="10">10</ion-option>
              <ion-option value="20">20</ion-option>
              <ion-option value="30">30</ion-option>
              <ion-option value="40">40</ion-option>
              <ion-option value="50">50</ion-option>
              <ion-option value="60">60</ion-option>
              <ion-option value="70">70</ion-option>
              <ion-option value="80">80</ion-option>
              <ion-option value="90">90</ion-option>
              <ion-option value="100" selected="true">100</ion-option>
            </ion-select>
          </ion-item>
          <div *ngIf="formError.headcount" style="height: 20px;text-align: left;width: 300px;line-height:  40px;padding-left:  10px;color:  #ff0000;">{{formError.headcount}}</div>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label floating>備註</ion-label>
            <ion-input type="text" value="" #description id="description"
                       formControlName="description"></ion-input>
          </ion-item>
          <div *ngIf="formError.description" style="height: 20px;text-align: left;width: 300px;line-height:  40px;padding-left:  10px;color:  #ff0000;">{{formError.description}}</div>
        </ion-list>
      </form>
      <div padding>
        <button ion-button (click)="save()" [disabled]="projectFrom.invalid" style="width:100%;border-radius: 10px;">確認新增</button>
      </div>
    </ion-content>
  `
})

export class ModalNewShare {
  minDate = moment().format('YYYY');
  maxDate = moment().add(10, 'y').format('YYYY');
  projectFrom: FormGroup;
  uid: any;
  newproject = new NewProject('', '', '', '', '');
active = false;
  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private http: HttpClient,
              private fb: FormBuilder,
              private afs: AngularFirestore,
              private shareService: ShareService) {
    this.uid = this.params.get('uid');
    console.log(this.uid);
  }

  ngOnInit(){
    this.projectFrom = this.fb.group({
      'projectname': [this.newproject.projectname, [Validators.maxLength(19),Validators.required]],
      'priority': [this.newproject.priority, [Validators.required]],
      'headcount': [this.newproject.headcount, [Validators.required]],
      'enddate': [this.newproject.enddate, [Validators.required]],
      'createby': [this.uid],
      'description': [this.newproject.description, [Validators.maxLength(19)]]
    });
     this.projectFrom.valueChanges.subscribe(data=>this.onValueChanged());
     this.onValueChanged();
  }

  formError = {
    'projectname':'',
    'priority':'',
    'headcount':'',
    'enddate':'',
    'createby':'',
    'description':''
  }
  validationMessages = {
    'projectname':{'required':'必须输入','maxlength':'不多于19位'},
    'priority':{'required':'必须输入'},
    'headcount':{'required':'必须输入'},
    'enddate':{'required':'必须输入'},
    'createby':{},
    'description':{}
  }

  onValueChanged(data ?: any) {
    if(!this.newproject){
      return;
    }
    const form = this.projectFrom;
    for(const field in this.formError){
      this.formError[field] = '';
      const control = form.get(field);
      if(control && (control.dirty || control.touched) && !control.valid) {
        const message = this.validationMessages[field];
        for(const key in control.errors) {
          this.formError[field] += message[key] + ' '
        }
      }
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.shareService.newShare(this.projectFrom.value).then(
      res => {
        console.log(res);
        let shareobj = JSON.parse("{\"shareid\":"+JSON.parse(JSON.stringify(res)).projectid+"}");
        var ordersRef = this.afs.doc(`people_order/` + this.uid).collection("roders").ref;
        ordersRef.doc(JSON.parse(JSON.stringify(res)).projectid+"").set(shareobj);
        this.viewCtrl.dismiss();
      }
    );
  }
}
