import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TabsPage} from '../../../pages/tabs/tabs';
import {Observable} from "rxjs/Observable";
import {SharedModule} from "../../shared/shared.module";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: []
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;
  loader: any;

  constructor(public fb: FormBuilder,
              public auth: AuthService,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController) {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
  }

  get email() {
    return this.signInForm.get("email");
  }

  get password() {
    return this.signInForm.get("password");
  }

  signIn() {
    this.presentLoadingCustom();
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then(res => {
        this.loader.dismiss();
      });
  }

  googleSignin(){
    this.presentLoadingCustom();
    return this.auth.nativeGoogleLogin().then(
      res =>{
        this.loader.dismiss();
      });
  }

  facebookSignin() {
    this.presentLoadingCustom();
    return this.auth.facebookLogin().then(
      res => {
        /*this.navCtrl.setRoot(TabsPage);*/
        this.loader.dismiss();
      });
  }

  presentLoadingCustom() {
    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img src="./assets/imgs/loading.gif" width="80">
      </div>`,
      cssClass: 'loadingwrapper'
    });

    this.loader.onDidDismiss(() => {
      console.log('Login Dismissed loading');
    });

    this.loader.present();
  }
}
