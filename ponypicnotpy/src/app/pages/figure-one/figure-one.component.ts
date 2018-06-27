import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL, HIGHCHARTS_THEME } from '../../constants';

Highcharts.setOptions(HIGHCHARTS_THEME);

@Component({
    selector: 'app-figure-one',
    templateUrl: './figure-one.component.html',
    styleUrls: ['./figure-one.component.scss']
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
            this.chartOptions = Object.assign(
                res, 
                {
                    tooltip: {
                        formatter: this.formatter
                    }
                }
            );
        });
    }

    formatter() {
        var feestdag = this["point"]["feestdag"];
        console.log(this);
        return this["key"] + "<br><b>" + this["y"] + " aanmeldingen</b>" + (
            feestdag != null ? "<br>" + feestdag : ""
        )
    }

}
