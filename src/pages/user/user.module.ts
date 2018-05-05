import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { UserService } from "./user.service";
import { AuthService } from "../core/auth.service";
import {LoadingController, NavController} from 'ionic-angular';
import {FormBuilder} from '@angular/forms';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [
  ],
  providers: [UserService]
})
export class UserModule {


}
