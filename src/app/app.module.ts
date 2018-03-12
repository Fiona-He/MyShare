import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountPage } from '../pages/account/account';
import { FriendsPage } from '../pages/friends/friends';
import { SharesPage } from '../pages/shares/shares';
import { EventsPage} from '../pages/events/events';
import { TabsPage } from '../pages/tabs/tabs';
import { QRScanner } from '@ionic-native/qr-scanner';
import { IBeacon } from '@ionic-native/ibeacon';
import { Camera } from '@ionic-native/camera';
import { HomePage} from '../pages/shares/home';
import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    HomePage,
    TabsPage
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Camera,
    IBeacon,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule{




}
