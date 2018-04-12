import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountPage } from '../pages/account/account';
import { FriendsPage } from '../pages/friends/friends';
import {
  ModalContentPage1st, ModalContentPage2nd, ModalContentSetting,
  SharesPage
} from '../pages/shares/shares';
import { EventsPage} from '../pages/events/events';
import { TabsPage } from '../pages/tabs/tabs';
import { QRScanner } from '@ionic-native/qr-scanner';
import { IBeacon } from '@ionic-native/ibeacon';
import { Camera } from '@ionic-native/camera';
import { HomePage} from '../pages/shares/home';
import { RaiseHand } from '../pages/shares/raisehand';
import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyserviceService } from '../myservice/myservice.service';

@NgModule({
  declarations: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    HomePage,
    RaiseHand,
    TabsPage,
    ModalContentPage1st,
    ModalContentPage2nd,
    ModalContentSetting,
    MyserviceService
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    HomePage,
    RaiseHand,
    TabsPage,
    ModalContentPage1st,
    ModalContentPage2nd,
    ModalContentSetting
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Camera,
    IBeacon,
    HTTP,
    MyserviceService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule{




}
