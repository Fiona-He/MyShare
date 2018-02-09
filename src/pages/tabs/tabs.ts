import { Component } from '@angular/core';

import { AccountPage} from '../account/account';
import { FriendsPage } from '../friends/friends';
import { SharesPage } from '../shares/shares';
import { EventsPage } from '../events/events';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SharesPage;
  tab2Root = EventsPage;
  tab3Root = FriendsPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
