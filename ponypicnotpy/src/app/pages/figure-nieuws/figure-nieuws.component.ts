import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';

@Component({
  selector: 'app-figure-nieuws',
  templateUrl: './figure-nieuws.component.html',
  styleUrls: ['./figure-nieuws.component.scss']
})
export class FigureNieuwsComponent implements OnInit {

    Highcharts = Highcharts;
    Highcharts2 = Highcharts;
    chartOptions: object;
    chartOptions2: object;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(API_URL + "nieuws").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
        this.http.get(API_URL + "nieuws-fix").subscribe(res => {
          console.log(res);
          this.chartOptions2 = res;
      });
    }

}
