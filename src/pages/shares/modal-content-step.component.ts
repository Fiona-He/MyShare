import {NavParams, Platform, ViewController,AlertController} from 'ionic-angular';
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
  amount: number[]=[0,0,0];
  baselist:{label:any,value:any}[] = [];
  list: {id:any;label:any,value:number}[] = [];
  fieldvalue1stForm: FormGroup;
  fieldvalue2ndForm: FormGroup;
  fieldvalue3rdForm: FormGroup;
  fieldvalue4thForm: FormGroup;

  constructor(public platform: Platform,
              public params: NavParams,
              private fb: FormBuilder,
              public auth: AuthService,
              public alertCtrl: AlertController,
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
    this.baselist.push({label:'枸杞養生吐司 10.50',value:'10.50'});
    this.baselist.push({label:'葡萄吐司 13.00',value:'13.00'});
    this.baselist.push({label:'流心芝士包 13.00',value:'13.00'});
    this.baselist.push({label:'可口可樂 6.50',value:'6.50'});

  }

  commit1st(){
    this.shareService.raiseHand(this.fieldvalue1stForm.value).then(()=>{
      this.dismiss();
      });
  }

  commit2st(){
    this.status =2;
  }

  calculatemoney(event) {
    console.log(event);
    if(event != undefined)
    {
      this.amount[1] = event/2;
      this.amount[2] = event/2;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showCheckbox(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle('請選擇消費項目');

    for(var i =0; i < this.baselist.length; i++)
    {
      alert.addInput({
        type: 'checkbox',
        label: this.baselist[i].label,
        value: ''+i,
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log(data);
        for(var j=data.length-1; j>=0; j--)
        {
        console.log('Checkbox data:', data[j]);
        this.list.push({id:id,label:this.baselist[data[j]].label,value:this.baselist[data[j]].value});
        this.amount[id]= this.amount[id] + parseFloat(this.baselist[data[j]].value);
        this.baselist.splice(data[j],1);
        console.log(this.list);
        console.log(this.baselist);
        }
      }
    });
    alert.present();
  }

  removeItem(label,value,id,index){
    this.baselist.push({label:label, value:value})
    this.amount[id] = this.amount[id] - parseFloat(value);
    console.log(this.list);
    console.log(index);
    this.list.splice(index,1);
  }
}
