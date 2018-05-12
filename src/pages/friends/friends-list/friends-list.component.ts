import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { ThreadService } from '../friends.service';
import { AuthService } from "../../core/auth.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  //styleUrls: ['./chat-threads.component.css']
  providers:[ThreadService]
})
export class FriendsListComponent implements OnInit {
  friendList: any;

  constructor(private threadService: ThreadService,public auth: AuthService) {
    console.log("ChatThreadsComponent constructor");
  }

  ngOnInit() {
    this.threadService.getFriends(this.auth.currentUserId).then(data => this.friendList = data);
  }



}
