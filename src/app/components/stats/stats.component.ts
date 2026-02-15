import { Component, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride';

interface Stat {
  label: string;
  value: number;
  icon: 'route' | 'car' | 'bike' | 'users';
  colorClass: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  @Input() rides: Ride[] = [];

  stats: Stat[] = [];

  ngOnChanges(): void {
    const totalRides = this.rides.length;
    const carRides = this.rides.filter(r => r.vehicleType === 'Car').length;
    const bikeRides = this.rides.filter(r => r.vehicleType === 'Bike').length;
    const totalSeats = this.rides.reduce(
      (acc, r) => acc + (r.seats || 0),
      0
    );

    this.stats = [
      {
        label: 'Total Rides',
        value: totalRides,
        icon: 'route',
        colorClass: 'indigo'
      },
      {
        label: 'Cars',
        value: carRides,
        icon: 'car',
        colorClass: 'blue'
      },
      {
        label: 'Bikes',
        value: bikeRides,
        icon: 'bike',
        colorClass: 'amber'
      },
      {
        label: 'Seats Available',
        value: totalSeats,
        icon: 'users',
        colorClass: 'emerald'
      }
    ];
  }
}
