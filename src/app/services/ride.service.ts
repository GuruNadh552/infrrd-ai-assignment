import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ride } from '../models/ride';

const STORAGE_KEY = 'RIDES_DATA';

@Injectable({ providedIn: 'root' })
export class RideService {

  private ridesSubject = new BehaviorSubject<Ride[]>(this.loadFromStorage());
  rides$ = this.ridesSubject.asObservable();

  addRide(ride: Ride): void {
    this.validateAddRide(ride);
    this.ensureEmployeeHasNoRide(ride.employeeId);

    const updated = [
      ...this.ridesSubject.value,
      {
        ...ride,
        employee_id: ride.employeeId.toUpperCase(),
        booked_by: [],
      }
    ];

    this.updateState(updated);
  }


  bookRide(rideId: string, employeeId: string): void {
    const empId = employeeId.toUpperCase();
    let found = false;

    const updated = this.ridesSubject.value.map(ride => {
      if (ride.id !== rideId) return ride;

      found = true;
      this.validateBooking(ride, empId);

      return {
        ...ride,
        seats: ride.seats - 1,
        booked_by: [...ride.booked_by, empId]
      };
    });

    if (!found) {
      throw new Error('Ride not found');
    }

    this.updateState(updated);
  }


  getFilteredRides(time?: string, vehicle?: 'Car' | 'Bike'): Ride[] {
    return this.ridesSubject.value.filter(ride => {
      const matchVehicle = !vehicle || ride.vehicleType === vehicle;
      const matchTime =
        !time ||
        Math.abs(this.toMinutes(ride.time) - this.toMinutes(time)) <= 60;

      return matchVehicle && matchTime;
    });
  }

  private updateState(rides: Ride[]): void {
    this.ridesSubject.next(rides);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rides));
  }

  private loadFromStorage(): Ride[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private validateAddRide(ride: Ride): void {
    if (
      !ride.employeeId ||
      !ride.vehicleNo ||
      !ride.pickup ||
      !ride.destination ||
      !ride.time
    ) {
      throw new Error('All fields are mandatory');
    }

    if (!['Car', 'Bike'].includes(ride.vehicleType)) {
      throw new Error('Invalid vehicle type');
    }

    if (ride.seats <= 0) {
      throw new Error('Vacant seats must be greater than zero');
    }


    if (!this.isTimeInFuture(ride.time)) {
      throw new Error('Departure time must be greater than current time');
    }
  }

  private ensureEmployeeHasNoRide(employeeId: string): void {
    const exists = this.ridesSubject.value.some(
      r => r.employeeId === employeeId.toUpperCase()
    );

    if (exists) {
      throw new Error('Employee has already added a ride');
    }
  }

  private validateBooking(ride: Ride, employeeId: string): void {
    if (ride.employeeId === employeeId) {
      throw new Error('You cannot book your own ride');
    }

    if (ride.booked_by.includes(employeeId)) {
      throw new Error('You have already booked this ride');
    }

    if (ride.seats <= 0) {
      throw new Error('No vacant seats available');
    }
  }

  private toMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  private isTimeInFuture(time: string): boolean {
    const now = new Date();

    const [h, m] = time.split(':').map(Number);

    const selected = new Date();
    selected.setHours(h, m, 0, 0);

    return selected > now;
  }


}
