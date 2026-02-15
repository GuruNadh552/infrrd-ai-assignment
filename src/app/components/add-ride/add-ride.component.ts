import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss']
})
export class AddRideComponent implements OnInit {

  rideForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private rideService: RideService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.rideForm = this.fb.group({
      employeeId: ['', Validators.required],
      vehicleType: ['Car', Validators.required],
      vehicleNo: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1)]],
      pickup: ['', Validators.required],
      destination: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.rideForm.get('vehicleType')?.valueChanges.subscribe(type => {
      this.updateSeatValidator(type);
    });

    this.updateSeatValidator(this.rideForm.get('vehicleType')?.value);
  }

  publishRide(): void {
    if (this.rideForm.invalid) {
      this.rideForm.markAllAsTouched();
      return;
    }

    const form = this.rideForm.value;

    try {
      this.rideService.addRide({
        id: crypto.randomUUID(),
        employeeId: form.employeeId.trim().toUpperCase(),
        vehicleType: form.vehicleType,
        vehicleNo: form.vehicleNo.trim(),
        seats: form.seats,
        pickup: form.pickup.trim(),
        destination: form.destination.trim(),
        time: form.time,
        booked_by: [],
        created_at: new Date().toISOString()
      });
      alert('Ride Added successfully!');
      this.navigateToHome();
    } catch (e: any) {
      this.error = e.message;
    }
  }


  navigateToHome(): void {
    this.router.navigateByUrl('/');
  }

  private updateSeatValidator(vehicleType: 'Car' | 'Bike'): void {
    const seatsControl = this.rideForm.get('seats');

    if (!seatsControl) return;

    if (vehicleType === 'Bike') {
      seatsControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(1)
      ]);
    } else {
      seatsControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(4)
      ]);
    }

    seatsControl.updateValueAndValidity();
  }
}
