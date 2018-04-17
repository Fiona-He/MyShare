import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountPage} from '../pages/account/account';
import {FriendsPage} from '../pages/friends/friends';
import {SharesPage} from '../pages/shares/shares';
import {ModalNewShare} from '../pages/shares/modal-new-share.component';
import {ModalContentSetting} from '../pages/shares/modal-share-setting.component';
import {ModalContentStepComponent} from '../pages/shares/modal-content-step.component';
import {EventsPage} from '../pages/events/events';
import {TabsPage} from '../pages/tabs/tabs';
import {QRScanner} from '@ionic-native/qr-scanner';
import {IBeacon} from '@ionic-native/ibeacon';
import {Camera} from '@ionic-native/camera';
import {SharesLogComponent} from '../pages/shares/shares-log.component';
import {HttpClientModule} from '@angular/common/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MyserviceService} from '../myservice/myservice.service';
import {ProjectserviceService} from '../myservice/prjectservice.service';
import {ShareDetailOpsComponent} from '../pages/shares/share-detail-ops.component';

@NgModule({
  declarations: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    SharesLogComponent,
    TabsPage,
    ModalContentStepComponent,
    ModalContentSetting,
    ModalNewShare,
    MyserviceService,
    ProjectserviceService,
    ShareDetailOpsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    SharesLogComponent,
    TabsPage,
    ModalContentStepComponent,
    ModalContentSetting,
    ModalNewShare
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Camera,
    IBeacon,
    MyserviceService,
    ProjectserviceService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {


}
