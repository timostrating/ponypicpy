import { Component } from '@angular/core';
import { routerAnimation } from './animations/routerAnimation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routerAnimation]
})
export class AppComponent {

    getState(outlet): any {
        return outlet.activatedRouteData.index ? "index" : outlet
    }

}
