import {NavParams, Platform, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {ShareService} from '../../myservice/share.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth.service';

@Component({
  templateUrl:'./modal-content-step.component.html',
})
export class ModalContentStepComponent {
  status:any;
  projectid: any;
  fieldvalue1stForm: FormGroup;
  fieldvalue2ndForm: FormGroup;
  fieldvalue3rdForm: FormGroup;
  fieldvalue4thForm: FormGroup;

  constructor(public platform: Platform,
              public params: NavParams,
              private fb: FormBuilder,
              public auth: AuthService,
              public viewCtrl: ViewController,
              private shareService:ShareService) {
    this.status = this.params.get('status');
    console.log('status:'+this.status);
    this.projectid = this.params.get('projectid');
    console.log('projectid:'+this.projectid);
  }

  ngOnInit(): void {
    this.fieldvalue1stForm = this.fb.group({
      'projectid':[this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId,[]],
      'status': ['1',[]],
    });
    this.fieldvalue2ndForm = this.fb.group({
      'projectid':[this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId,[]],
      'status': ['1',[]],
    });
    this.fieldvalue3rdForm = this.fb.group({
      'projectid':[this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId,[]],
      'status': ['1',[]],
    });
    this.fieldvalue4thForm = this.fb.group({
      'projectid':[this.projectid,],
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
      'createby': [this.auth.currentUserId,[]],
      'status': ['1',[]],
    });
  }

  commit1st(){
    this.shareService.raiseHand(this.fieldvalue1stForm.value).then(()=>{
      this.dismiss();
      });
  }

  commit2st(){
    this.status =2;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
