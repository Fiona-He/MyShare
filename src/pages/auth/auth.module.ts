import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SigninComponent } from "./signin/signin.component";
import {IonicModule} from 'ionic-angular';

@NgModule({
  imports: [IonicModule,SharedModule],
  declarations: [SigninComponent],
  entryComponents:[SigninComponent]
})
export class AuthModule {}
