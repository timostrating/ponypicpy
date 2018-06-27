import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-percentage-card',
    templateUrl: './percentage-card.component.html',
    styleUrls: ['./percentage-card.component.scss']
})
export class PercentageCardComponent implements OnInit {

    @Input() title: string;
    @Input() percentage: number;
    @Input() href: string;

    constructor() { }

    ngOnInit() {
    }

}
