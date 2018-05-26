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
}
