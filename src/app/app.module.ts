import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountPage} from '../pages/account/account';
import {FriendsPage} from '../pages/friends/friends';
import {SharesPage,PopoverPage} from '../pages/shares/shares';
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
import {ShareService} from '../myservice/share.service';
import {CoreModule} from "../pages/core/core.module";
import {environment} from "../environments/environment";
import {ServiceWorkerModule} from '@angular/service-worker';
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';
import {ChatModule} from "../pages/chat/chat.module";
import {FriendInfoComponent} from "../pages/friends/friend-info/friend-info.component";
import {ChatThreadsComponent} from "../pages/chat/chat-threads/chat-threads.component";
import {ChatDetailComponent} from "../pages/chat/chat-detail/chat-detail.component";
import {FriendsListComponent} from '../pages/friends/friends-list/friends-list.component';
import {ChatFriendComponent} from '../pages/friends/chat-friend/chat-friend.component';
import { QRCodeModule } from 'angular2-qrcode';
import {MyQrcode} from "../pages/account/my-qrcode";
import {AddFriend} from "../pages/friends/friend-add/AddFriend";
import { ElasticHeaderModule } from "ionic2-elastic-header/dist";
import {ActivityPeopleComponent} from "../pages/friends/friends-list/activity-people.component";
import {UpdateDisplayName} from '../pages/account/update-display-name';

@NgModule({
  declarations: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    PopoverPage,
    FriendsListComponent,
    ChatFriendComponent,
    SharesLogComponent,
    TabsPage,
    ModalContentStepComponent,
    ModalContentSetting,
    ModalNewShare,
    MyserviceService,
    ProjectserviceService,
    ShareService,
    FriendInfoComponent,
    AddFriend,
    MyQrcode,
    ActivityPeopleComponent,
    UpdateDisplayName
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CoreModule,
    ChatModule,
    QRCodeModule,
    ElasticHeaderModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SharesPage,
    EventsPage,
    FriendsPage,
    AccountPage,
    PopoverPage,
    FriendsListComponent,
    SharesLogComponent,
    TabsPage,
    ModalContentStepComponent,
    ModalContentSetting,
    ModalNewShare,
    FriendInfoComponent,
    ChatThreadsComponent,
    ChatFriendComponent,
    ChatDetailComponent,
    AddFriend,
    MyQrcode,
    ActivityPeopleComponent,
    UpdateDisplayName
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Camera,
    IBeacon,
    MyserviceService,
    ProjectserviceService,
    ShareService,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {


}
