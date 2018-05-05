import {Component, OnInit} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {SigninComponent} from '../pages/auth/signin/signin.component';
import { AuthService } from "../pages/core/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  rootPage:any = SigninComponent;

  constructor(
    platform: Platform, statusBar: StatusBar,
    public auth: AuthService,
    private splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.auth.afAuth.authState.subscribe(user => {
        if(user){
          this.rootPage = TabsPage;
        } else {
          this.rootPage = SigninComponent;
        }
        //this.splashScreen.hide();
      });
    });
  }

  ngOnInit() {

  }
}
