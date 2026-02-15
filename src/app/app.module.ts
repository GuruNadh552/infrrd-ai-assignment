import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/stats/stats.component';
import { FiltersComponent } from './components/filters/filters.component';
import { RideCardComponent } from './components/ride-card/ride-card.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path : 'add',
    component : AddRideComponent
  },
  {
    path : '**',
    redirectTo : ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatsComponent,
    FiltersComponent,
    RideCardComponent,
    AddRideComponent,
    DashboardComponent,
    RideListComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES),FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
