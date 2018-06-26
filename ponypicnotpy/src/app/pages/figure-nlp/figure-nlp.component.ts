import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-figure-nlp',
  templateUrl: './figure-nlp.component.html',
  styleUrls: ['./figure-nlp.component.scss']
})
export class FigureNlpComponent implements OnInit {
  
  Highcharts = Highcharts;
    chartOptions = {
      chart: {
        type: 'column'
    },
    title: {
        text: 'De verschillende soorten nieuws uitingen'
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Aantal nieuwsuitingen'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
      { name: 'totaal', data: [3, 0, 1, 0, 5, 1, 1, 1, 1, 0, 1, 1, 0, 2, 0, 0, 1, 1, 0, 2, 1, 1, 1, 0, 3, 1, 2, 3, 2, 0, 1, 1, 2, 2, 2, 2, 1, 0, 2, 2, 1, 3, 0, 1, 1, 0, 3, 1, 1, 0, 3, 0] },
      { name: 'neutraal', data: [2, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 1, 0, 3, 1, 2, 3, 2, 0, 1, 1, 1, 1, 1, 2, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2] },
      { name: 'pos', data: [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0] },
      { name: 'neg', data: [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}

 	  	 




