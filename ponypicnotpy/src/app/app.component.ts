import { Component } from '@angular/core';
import { routerAnimation } from './animations/routerAnimation';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [routerAnimation]
})
export class AppComponent {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title
    ) {

        this.subscribeToNavEnd();

    }

    private subscribeToNavEnd() {

        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe(data => {
                if ("title" in data)
                    this.title.setTitle(data["title"]);
            });
    }

    getState(outlet): any {
        return outlet.activatedRouteData.index ? "index" : outlet
    }

}
