import { Component } from '@angular/core';

import { AccountPage} from '../account/account';
import { FriendsPage } from '../friends/friends';
import { SharesPage } from '../shares/shares';
import { EventsPage } from '../events/events';
import { ChatListComponent } from'../chat/chat-list/chat-list.component';
import { ThreadService } from '../chat/thread.service';

@Component({
  templateUrl: 'tabs.html',
  providers:[ThreadService]
})
export class TabsPage {

  tab1Root = SharesPage;
  tab2Root = EventsPage;
  tab3Root = ChatListComponent;
  tab4Root = AccountPage;

  constructor(
    private threadService: ThreadService
  ) {

    this.chat().then(()=>console.log("add thread"));

  }
  chat() {
    const profileId = 'YU21uGSJZOZTipNfnRLmAWcNjl53';//this.route.snapshot.paramMap.get('id')
    return this.threadService.createThread(profileId)
      .then(() => console.log('Thread created!'))
      .catch(error => console.log(error))
  }
}
