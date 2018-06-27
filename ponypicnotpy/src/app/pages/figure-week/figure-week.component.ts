import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL, HIGHCHARTS_THEME } from '../../constants';

Highcharts.setOptions(HIGHCHARTS_THEME);

@Component({
    selector: 'app-figure-week',
    templateUrl: './figure-week.component.html',
    styleUrls: ['./figure-week.component.scss']
})
export class FigureWeekComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: object;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get(API_URL + "week").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
    }

}
