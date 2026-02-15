import { Component, Input, OnChanges } from '@angular/core';
import { Ride } from 'src/app/models/ride';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls : ['./stats.component.scss']
})
export class StatsComponent implements OnChanges {

  @Input() rides: Ride[] = [];

  stats: any[] = [];
  today = new Date();

  ngOnChanges(): void {
    const totalRides = this.rides.length;
    const carRides = this.rides.filter(r => r.vehicleType === 'Car').length;
    const bikeRides = this.rides.filter(r => r.vehicleType === 'Bike').length;
    const totalSeats = this.rides.reduce((a, r) => a + r.seats, 0);

    this.stats = [
      { label: 'Total Rides', value: totalRides, icon: 'route', colorClass: 'indigo' },
      { label: 'Cars', value: carRides, icon: 'car', colorClass: 'blue' },
      { label: 'Bikes', value: bikeRides, icon: 'bike', colorClass: 'amber' },
      { label: 'Seats Available', value: totalSeats, icon: 'users', colorClass: 'emerald' }
    ];
  }
}
