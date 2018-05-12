import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { ChatDetailComponent } from "./chat-detail/chat-detail.component";
import { ChatListComponent } from "./chat-list/chat-list.component";
import { ChatInputComponent } from "./chat-input/chat-input.component";
import { ChatFeedComponent } from "./chat-feed/chat-feed.component";
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { ChatMessagesComponent } from "./chat-messages/chat-messages.component";
import { ChatThreadComponent } from "./chat-thread/chat-thread.component";
import { ChatThreadsComponent } from "./chat-threads/chat-threads.component";
import { MessageService } from './message.service';
import { ThreadService } from './thread.service';
import { IonicModule} from 'ionic-angular';


// const routes: Routes = [
//   { path: "chat/:id", component: ChatDetailComponent },
//   { path: "chat", component: ChatListComponent }
// ];

@NgModule({
//  imports: [SharedModule, RouterModule.forChild(routes)],
  imports: [IonicModule,SharedModule],

  exports: [
    ChatFeedComponent,
    ChatInputComponent,
    ChatMessagesComponent,
    ChatMessageComponent,
    ChatThreadsComponent
  ],
  declarations: [
    ChatDetailComponent,
    ChatListComponent,
    ChatInputComponent,
    ChatFeedComponent,
    ChatMessageComponent,
    ChatMessagesComponent,
    ChatThreadComponent,
    ChatThreadsComponent
  ],
  providers: [MessageService, ThreadService],
  entryComponents:[ChatListComponent,ChatMessagesComponent,ChatDetailComponent]
})
export class ChatModule {}
