import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FigureOneComponent } from './pages/figure-one/figure-one.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: IndexComponent,
        data: {
            index: true,
            title: "hOmEPAgiNA!!"
        }
    },
    {
        path: "figuur-1",
        component: FigureOneComponent,
        data: {
            title: "fiGUUR 1!!"
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