import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';


@Component({
    selector: 'app-figure-nlp',
    templateUrl: './figure-nlp.component.html',
    styleUrls: ['./figure-nlp.component.scss']
})
export class FigureNlpComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions;

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get(API_URL + "mediauitingen").subscribe(res => {
            console.log(res);
            this.chartOptions = res;
        });
    }

}






