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

const routes: Routes = [
    { // index
        path: "",
        pathMatch: "full",
        component: IndexComponent,
        data: {
            index: true,
            title: "hOmEPAgiNA!!"
        }
    },
    {
        path: "vrije-feest-dagen",
        component: FigureOneComponent,
        data: {
            title: "Vrije- / feestdagem"
        }
    },
    { 
        path: "figuur-nlp", 
        component: FigureNlpComponent,
        data: {
            title: "hoi dit is een titel"
        }
    },
    { 
        path: "figuur-nieuws", 
        component: FigureNieuwsComponent,
        data: {
            title: "hoi dit is een titel"
        }
    },
    {
        path: "figuur-leeftijd-groen", 
        component: FigureAgeGreenComponent,
        data: {
            title: "hoi dit is een titel"
        }
    },
    {
        path: "figuur-groengrijs", 
        component: FigureGroenGrijsComponent,
        data: {
            title: "hoi dit is een titel"
        }
    },
    {
        path: "figuur-2",
        component: FigureTwoComponent,
        data: {
            title: "FigUUr 2!"
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