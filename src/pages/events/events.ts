import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-about',
  templateUrl: 'events.html'
})
export class EventsPage {

  constructor(public navCtrl: NavController,private ibeacon1: IBeacon,
  private ibeacon2: IBeacon) {

  }



  enableiBeacon(): void {
    // Request permission to use location on iOS
    this.ibeacon1.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate1 = this.ibeacon1.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate1.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => console.error()
      );
    delegate1.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    delegate1.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion1 = this.ibeacon1.BeaconRegion('ce16785d142c','B9407F30-F5F8-466E-AFF9-25556B57FE6D');

    this.ibeacon1.startMonitoringForRegion(beaconRegion1)
      .then(
        () => console.log('Native layer recieved the request to monitoring 1'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );


    // Request permission to use location on iOS
    this.ibeacon2.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate2 = this.ibeacon2.Delegate();

    // Subscribe to some of the delegate's event handlers
    delegate2.didRangeBeaconsInRegion()
      .subscribe(
        data => console.log('didRangeBeaconsInRegion: ', data),
        error => console.error()
      );
    delegate2.didStartMonitoringForRegion()
      .subscribe(
        data => console.log('didStartMonitoringForRegion: ', data),
        error => console.error()
      );
    delegate2.didEnterRegion()
      .subscribe(
        data => {
          console.log('didEnterRegion: ', data);
        }
      );

    let beaconRegion2 = this.ibeacon2.BeaconRegion('ce16785d142c','39407F30-F5F8-466E-AFF9-25556B57FE6D');

    this.ibeacon2.startMonitoringForRegion(beaconRegion2)
      .then(
        () => console.log('Native layer recieved the request to monitoring 2'),
        error => console.error('Native layer failed to begin monitoring: ', error)
      );
  }

}
