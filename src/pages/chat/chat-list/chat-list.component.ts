import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  //styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

}
