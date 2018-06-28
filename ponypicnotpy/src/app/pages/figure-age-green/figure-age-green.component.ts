import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL, HIGHCHARTS_THEME } from '../../constants';

Highcharts.setOptions(HIGHCHARTS_THEME);

@Component({
  selector: 'app-figure-age-green',
  templateUrl: './figure-age-green.component.html',
  styleUrls: ['./figure-age-green.component.scss']
})
export class FigureAgeGreenComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: object;
    chartOptions1: object;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(API_URL + "leeftijd-groen").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });

        this.http.get(API_URL + "leeftijd-tijden").subscribe(res => {
            console.log(res);
            this.chartOptions1 = res;
        });
    }

}
