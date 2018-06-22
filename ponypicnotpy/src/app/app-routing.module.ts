import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FigureOneComponent } from './pages/figure-one/figure-one.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: IndexComponent
    },
    {
        path: "figuur-1",
        component: FigureOneComponent
    },
    {   // 404
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }