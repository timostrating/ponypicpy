import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';

@Component({
    selector: 'app-figure-two',
    templateUrl: './figure-two.component.html',
    styleUrls: ['./figure-two.component.scss']
})
export class FigureTwoComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: object;
    chartOptions1: object;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(API_URL + "zon-scatter").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
        this.http.get(API_URL + "zon").subscribe(res => {
            console.log(res);
            this.chartOptions1 = res;
        });
    }


}
