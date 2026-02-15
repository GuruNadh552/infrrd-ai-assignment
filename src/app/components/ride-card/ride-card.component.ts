import { Component, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.scss']
})
export class RideCardComponent {

  @Input() ride!: Ride;

  isBookingMode = false;
  employeeId = '';
  error = '';

  constructor(private rideService: RideService) {}

  confirmBooking(): void {
    if (!this.employeeId.trim()) {
      this.error = 'Employee ID is required';
      return;
    }

    try {
      this.rideService.bookRide(
        this.ride.id,
        this.employeeId.trim().toUpperCase()
      );
      this.isBookingMode = false;
      this.employeeId = '';
      this.error = '';
    } catch (e: any) {
      this.error = e.message;
    }
  }

  cancel(): void {
    this.isBookingMode = false;
    this.employeeId = '';
    this.error = '';
  }

  get formattedTime(): string {
    const [h, m] = this.ride.time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
  }
}
