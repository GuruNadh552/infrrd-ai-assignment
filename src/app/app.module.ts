import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/stats/stats.component';
import { FiltersComponent } from './components/filters/filters.component';
import { RideCardComponent } from './components/ride-card/ride-card.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatsComponent,
    FiltersComponent,
    RideCardComponent,
    AddRideComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
