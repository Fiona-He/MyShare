import {NavParams, Platform, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {ShareService} from '../../myservice/share.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl:'./modal-content-step.component.html',
})
export class ModalContentStepComponent {
  status:any;
  fieldvalueForm: FormGroup;

  constructor(public platform: Platform,
              public params: NavParams,
              private fb: FormBuilder,
              public viewCtrl: ViewController,
              private shareService:ShareService) {
    this.status = this.params.get('status');
    console.log(this.params.get('status'))
  }

  ngOnInit(): void {
    this.fieldvalueForm = this.fb.group({
      'field1': ['', [Validators.maxLength(19)]],
      'field2': ['', [Validators.maxLength(19)]],
      'field3': ['', [Validators.maxLength(19)]],
      'field4': ['', []],
      'field5': ['', [Validators.maxLength(19)]],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
