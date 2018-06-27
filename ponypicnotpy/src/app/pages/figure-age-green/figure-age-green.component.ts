import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';

@Component({
  selector: 'app-figure-age-green',
  templateUrl: './figure-age-green.component.html',
  styleUrls: ['./figure-age-green.component.scss']
})
export class FigureAgeGreenComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: object;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(API_URL + "leeftijd-groen").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
    }

}
