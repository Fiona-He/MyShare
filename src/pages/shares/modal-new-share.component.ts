import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewProject} from '../../myservice/prjectservice.service';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShareService} from '../../myservice/share.service';

declare var moment: any;

@Component({
  template: `
    <ion-content style="background-color: #c6e7f0">
      <div style="background-image: url('./assets/imgs/newshare.png');" class="top-nav">
        <button ion-button (click)="dismiss()" style="font-size: 24px;padding-left: 0px;height: 20px;background-color: transparent;color: #59b5c0;">
          <ion-icon ios="md-arrow-back"></ion-icon>
          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
        </button>
      </div>
      <form [formGroup]="projectFrom">
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label floating>拼單名稱</ion-label>
            <ion-input formControlName="projectname" type="text" #projectname id="projectname"
                       value=""></ion-input>
          </ion-item>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label>報名失效週期</ion-label>
            <ion-select #priority id="priority" formControlName="priority">
              <ion-option value="1" selected="true">1天</ion-option>
              <ion-option value="2">1周</ion-option>
              <ion-option value="3">1個月</ion-option>
              <ion-option value="4">1年</ion-option>
              <ion-option value="5">永不</ion-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label>截止日期</ion-label>
            <ion-datetime displayFormat="YYYY-MM-DD" [min]="minDate" [max]="maxDate"
                          #enddate id="enddate" formControlName="enddate"></ion-datetime>
          </ion-item>
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label>最多人數</ion-label>
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
        </ion-list>
        <ion-list style="margin: 0; padding-left: 16px; padding-right: 16px; padding-bottom: 16px;">
          <ion-item
            style="background-color: #fafafa;border-width: 1px;border-color: #e3e4e6;border-style: solid;border-radius: 10px;color:#344b67;">
            <ion-label floating>備註</ion-label>
            <ion-input type="text" value="" #description id="description"
                       formControlName="description"></ion-input>
          </ion-item>
        </ion-list>
      </form>
      <div padding>
        <button ion-button (click)="save()" style="width:100%;border-radius: 10px;">確認新增</button>
      </div>
    </ion-content>
  `
})

export class ModalNewShare {
  minDate = moment().format('YYYY');
  maxDate = moment().add(10, 'y').format('YYYY');
  projectFrom: FormGroup;
  newproject = new NewProject('', '', '', '', '');

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController,
              private http: HttpClient,
              private fb: FormBuilder,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.projectFrom = this.fb.group({
      'projectname': [this.newproject.projectname, [Validators.maxLength(19)]],
      'priority': [this.newproject.priority, [Validators.maxLength(19)]],
      'headcount': [this.newproject.headcount, [Validators.maxLength(19)]],
      'enddate': [this.newproject.enddate, []],
      'description': [this.newproject.description, [Validators.maxLength(19)]],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.shareService.newShare(this.projectFrom.value);
  }
}
