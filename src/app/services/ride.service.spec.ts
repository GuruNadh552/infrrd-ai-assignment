import { TestBed } from '@angular/core/testing';
import { RideService } from './ride.service';
import { Ride } from '../models/ride';

describe('RideService', () => {
  let service: RideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideService);
    localStorage.clear();
  });

  function createRide(overrides?: Partial<Ride>): Ride {
    return {
      id: '1',
      employeeId: 'EMP1',
      vehicleType: 'Car',
      vehicleNo: 'KA01AB1234',
      seats: 4,
      time: futureTime(),
      pickup: 'A',
      destination: 'B',
      booked_by: [],
      created_at: new Date().toISOString(),
      ...overrides
    };
  }

  function futureTime(minutes = 30): string {
    const d = new Date();
    d.setMinutes(d.getMinutes() + minutes);
    return `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  function pastTime(minutes = 30): string {
    const d = new Date();
    d.setMinutes(d.getMinutes() - minutes);
    return `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a ride successfully', () => {
    service.addRide(createRide());

    service.rides$.subscribe(rides => {
      expect(rides.length).toBe(1);
      expect(rides[0].employeeId).toBe('EMP1');
    });
  });

  it('should not allow same employee to add multiple rides', () => {
    service.addRide(createRide());

    expect(() => service.addRide(createRide())).toThrowError(
      'Employee has already added a ride'
    );
  });

  it('should not allow adding ride with past departure time', () => {
    const ride = createRide({ time: pastTime() });

    expect(() => service.addRide(ride)).toThrowError(
      'Departure time must be greater than current time'
    );
  });

  it('should reject bike with more than 1 seat', () => {
    const ride = createRide({
      vehicleType: 'Bike',
      seats: 2
    });

    expect(() => service.addRide(ride)).toThrow();
  });

  it('should allow booking a ride and reduce seat count', () => {
    service.addRide(createRide());

    service.bookRide('1', 'EMP2');

    service.rides$.subscribe(rides => {
      expect(rides[0].seats).toBe(3);
      expect(rides[0].booked_by).toContain('EMP2');
    });
  });

  it('should not allow employee to book own ride', () => {
    service.addRide(createRide());

    expect(() =>
      service.bookRide('1', 'EMP1')
    ).toThrowError('You cannot book your own ride');
  });

  it('should not allow double booking by same employee', () => {
    service.addRide(createRide());

    service.bookRide('1', 'EMP2');

    expect(() =>
      service.bookRide('1', 'EMP2')
    ).toThrowError('You already booked this ride');
  });

  it('should not allow booking after ride departure time', () => {
    service.addRide(createRide({ time: pastTime() }));

    expect(() =>
      service.bookRide('1', 'EMP2')
    ).toThrowError('Cannot book a ride whose departure time has passed');
  });

  it('should not allow booking when no seats left', () => {
    service.addRide(createRide({ seats: 1 }));

    service.bookRide('1', 'EMP2');

    expect(() =>
      service.bookRide('1', 'EMP3')
    ).toThrowError('No seats available');
  });
});
