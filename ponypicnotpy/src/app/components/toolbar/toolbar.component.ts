import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input() title: string;
    @Input() backgroundColor: string;

    constructor() { }

    ngOnInit() {
    }

}
