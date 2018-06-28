import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL, HIGHCHARTS_THEME } from '../../constants';

Highcharts.setOptions(HIGHCHARTS_THEME);

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
    chartOptions3: object;

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
        this.http.get(API_URL + "nieuws-scatter").subscribe(res => {
            console.log(res);
            this.chartOptions3 = res;
        });
    }

}
