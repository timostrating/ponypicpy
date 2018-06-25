import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';

@Component({
    selector: 'app-figure-one',
    templateUrl: './figure-one.component.html',
    styleUrls: ['./figure-one.component.css']
})
export class FigureOneComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: object = {
        series: [{ data: [] }]
    };

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(API_URL + "vrije-dagen").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
    }

}
