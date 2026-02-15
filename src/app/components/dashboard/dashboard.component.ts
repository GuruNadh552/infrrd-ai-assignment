import { Component, OnInit } from '@angular/core';
import { Ride, VehicleType } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rides: Ride[] = [];
  filteredRides: Ride[] = [];

  filterTime = '';
  vehicleFilter: any | VehicleType = '';

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.rideService.rides$.subscribe(rides => {
      this.rides = rides;
      this.applyFilters();
    });
  }

  onTimeChange(time: string): void {
    this.filterTime = time;
    this.applyFilters();
  }

  onVehicleChange(type: '' | VehicleType): void {
    this.vehicleFilter = type;
    this.applyFilters();
  }

  onClearFilters(): void {
    this.filterTime = '';
    this.vehicleFilter = '';
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredRides = this.rideService.getFilteredRides(
      this.filterTime,
      this.vehicleFilter
    );
  }
}
