import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ThreadService } from '../friends.service';
import { AuthService } from "../../core/auth.service";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {AddFriend} from "../friend-add/AddFriend";
import {NavController} from "ionic-angular";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService]
})
export class FriendsListComponent implements OnInit {
  friendList: any;

  QRScaning = false;
  constructor(private threadService: ThreadService,
              public auth: AuthService,
              private qrScanner: QRScanner,
              public navCtrl: NavController) {
    console.log("ChatThreadsComponent constructor");
  }

  ngOnInit() {
    console.log("FriendsListComponent ngOnInit");
    this.threadService.getFriends(this.auth.currentUserId).then(data => this.friendList = data);
  }
  StartScan(): void {
    // Optionally request the permission early
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);

          this.qrScanner.hide(); // hide camera preview
          this.QRScaning = false;
          scanSub.unsubscribe(); // stop scanning
          alert("aa");
          this.navCtrl.push(AddFriend,{frienduid:text});
          alert("bb");
        });

        // show camera preview
        this.qrScanner.show();

        this.QRScaning = true;

        // wait for user to scan something, then the observable callback will be called

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
      .catch((e: any) => console.log('Error is', e));
  }

  EndScan():void {
    this.qrScanner.destroy();
    this.QRScaning = false;
  }


}
