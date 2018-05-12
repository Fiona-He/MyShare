import { Component } from '@angular/core';

import { AccountPage} from '../account/account';
import { FriendsPage } from '../friends/friends';
import { SharesPage } from '../shares/shares';
import { EventsPage } from '../events/events';
import { ChatListComponent } from'../chat/chat-list/chat-list.component';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = SharesPage;
  tab2Root = EventsPage
  tab3Root = ChatListComponent;
  tab4Root = FriendsPage;
  tab5Root = AccountPage;
  user = {};

  constructor(

  ) {

    //this.chat().then(()=>console.log("add thread"));


  }

}
