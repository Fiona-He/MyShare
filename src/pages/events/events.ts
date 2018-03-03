import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-about',
  templateUrl: 'events.html'
})
export class EventsPage {

  constructor(public navCtrl: NavController,private ibeacon: IBeacon) {

  }



  enableiBeacon(): void {
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
// create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();

// Subscribe to some of the delegate's event handlers
    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => console.error()
      );
    delegate.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    delegate.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion = this.ibeacon.BeaconRegion('ce16785d142c','B9407F30-F5F8-466E-AFF9-25556B57FE6D');

    this.ibeacon.startMonitoringForRegion(beaconRegion)
      .then(
        () => console.log('Native layer recieved the request to monitoring'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }

}
