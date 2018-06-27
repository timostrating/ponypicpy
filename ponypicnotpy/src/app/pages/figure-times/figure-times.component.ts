import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';

@Component({
    selector: 'app-figure-times',
    templateUrl: './figure-times.component.html',
    styleUrls: ['./figure-times.component.scss']
})
export class FigureTimesComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: object;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get(API_URL + "tijden").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
    }

}
