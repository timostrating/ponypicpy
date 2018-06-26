import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FigureOneComponent } from './pages/figure-one/figure-one.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FigureTwoComponent } from './pages/figure-two/figure-two.component';
import { FeaturedcardsComponent } from './components/featuredcards/featuredcards.component';
import { FigureNlpComponent } from './pages/figure-nlp/figure-nlp.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotFoundComponent,
    FigureOneComponent,
    ToolbarComponent,
    HighchartsChartComponent,
    FigureTwoComponent,
    FeaturedcardsComponent,
    FigureNlpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
