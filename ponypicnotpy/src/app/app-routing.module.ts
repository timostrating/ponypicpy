import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FigureOneComponent } from './pages/figure-one/figure-one.component';
import { FigureTwoComponent } from './pages/figure-two/figure-two.component';
import { FigureNlpComponent } from './pages/figure-nlp/figure-nlp.component';
import { FigureAgeGreenComponent } from './pages/figure-age-green/figure-age-green.component';
import { FigureGroenGrijsComponent } from './pages/figure-groengrijs/figure-groengrijs.component';
import { FigureNieuwsComponent } from './pages/figure-nieuws/figure-nieuws.component';
import { FigureWeekComponent } from './pages/figure-week/figure-week.component';
import { FigureTimesComponent } from './pages/figure-times/figure-times.component';

const routes: Routes = [
    { // index
        path: "",
        pathMatch: "full",
        component: IndexComponent,
        data: {
            index: true,
            title: "Home"
        }
    },
    {
        path: "vrije-feest-dagen",
        component: FigureOneComponent,
        data: {
            title: "Vrije- / feestdagen"
        }
    },
    { 
        path: "figuur-nlp", 
        component: FigureNlpComponent,
        data: {
            title: "Mediauitingen BenCom"
        }
    },
    { 
        path: "figuur-nieuws", 
        component: FigureNieuwsComponent,
        data: {
            title: "Relevant nieuws"
        }
    },
    {
        path: "figuur-leeftijd", 
        component: FigureAgeGreenComponent,
        data: {
            title: "Leeftijd"
        }
    },
    {
        path: "figuur-week", 
        component: FigureWeekComponent,
        data: {
            title: "Verloop week"
        }
    },
    {
        path: "figuur-overstap-tijden", 
        component: FigureTimesComponent,
        data: {
            title: "Gemiddelde overstaptijden"
        }
    },
    {
        path: "figuur-groengrijs", 
        component: FigureGroenGrijsComponent,
        data: {
            title: "Groen/grijs"
        }
    },
    {
        path: "zon",
        component: FigureTwoComponent,
        data: {
            title: "Zonnestraling"
        }
    },
    {   // 404
        path: "**",
        component: NotFoundComponent,
        data: {
            title: "Er is hier niks te zien"
        }
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }