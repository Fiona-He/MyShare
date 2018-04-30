import { Component, OnInit } from "@angular/core";

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
    public auth: AuthService
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

  ngOnInit() {}

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
}
