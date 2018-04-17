import { Component, OnInit, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'share-detail-ops',
  templateUrl: './share-detail-ops.component.html',
})
export class ShareDetailOpsComponent implements OnInit {
  @Input() projectid: string;
  showData: any;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    let myurl = 'http://localhost:8182/fieldvalue/'+this.projectid;

    this.http.get(myurl)
      .subscribe((data: Array<String>) => {
        console.log(data);
        this.showData = data;
      });
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
