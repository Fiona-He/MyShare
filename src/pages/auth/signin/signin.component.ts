import { Component, OnInit } from "@angular/core";
import { LoadingController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Observable } from "rxjs/Observable";

import { SharedModule } from "../../shared/shared.module";
import { AuthService } from "../../core/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: []
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public loadingCtrl: LoadingController
  ) {
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
    this.presentLoadingCustom();
  }

  get email() {
    return this.signInForm.get("email");
  }
  get password() {
    return this.signInForm.get("password");
  }

  signIn() {
    console.log("signIn");
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then(user => {
        if (this.signInForm.valid) {
          console.log("login successful");
        }
      });
  }

  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img src="./assets/imgs/loading.gif" width="80">
      </div>`,
      duration: 5000,
      cssClass: 'loadingwrapper'
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }
}
