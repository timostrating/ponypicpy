import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-figure-one',
    templateUrl: './figure-one.component.html',
    styleUrls: ['./figure-one.component.scss']
})
export class FigureOneComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions = {
        series: [{
            data: [1, 2, 3]
        }]
    };

    constructor() { }

    ngOnInit() {
    }

}
