import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from "@angular/core";
import {ViewController} from 'ionic-angular';

@Component({
  selector: "app-chat-detail",
  templateUrl: "./chat-detail.component.html",
  //styleUrls: ["./chat-detail.component.css"]
})
export class ChatDetailComponent implements OnInit {
  @ViewChild("scroller") private feed: ElementRef;

  constructor(public el: ElementRef,public viewCtrl: ViewController) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector(".chat-feed");
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
