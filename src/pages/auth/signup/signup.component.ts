import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController, ViewController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TabsPage} from '../../../pages/tabs/tabs';
import {Observable} from "rxjs/Observable";
import {SharedModule} from "../../shared/shared.module";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signup.component.html",
  styleUrls: []
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  hide = true;
  loader:any;

  constructor(
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public auth: AuthService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });
  }

  ngOnInit() {}

  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  signUp() {
    return this.auth
      .emailSignUp(this.email.value, this.password.value)
      .then(user => {
        if (this.signUpForm.valid) {
          this.dismiss();
        }
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
