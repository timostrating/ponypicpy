import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FigureOneComponent } from './pages/figure-one/figure-one.component';
import { FigureTwoComponent } from './pages/figure-two/figure-two.component';

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
    { path: "figuur-1", component: FigureOneComponent },
    { path: "figuur-2", component: FigureTwoComponent }, 
    { path: "**", component: NotFoundComponent } // 404
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }