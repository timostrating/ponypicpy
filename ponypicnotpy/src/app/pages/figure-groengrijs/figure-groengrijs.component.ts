import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';
import { API_URL } from '../../constants';

@Component({
  selector: 'app-figure-groengrijs',
  templateUrl: './figure-groengrijs.component.html',
  styleUrls: ['./figure-groengrijs.component.scss']
})
export class FigureGroenGrijsComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions: object;

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.http.get(API_URL + "groen-grijs").subscribe(res => {
        console.log(res);
        this.chartOptions = res;
    });
  }

}
