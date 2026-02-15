import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() filterTime = '';
  @Input() vehicleFilter: '' | 'Car' | 'Bike' = '';

  @Output() filterTimeChange = new EventEmitter<string>();
  @Output() vehicleFilterChange = new EventEmitter<'' | 'Car' | 'Bike'>();
  @Output() clearFilters = new EventEmitter<void>();

  get hasFilters(): boolean {
    return !!this.filterTime || !!this.vehicleFilter;
  }

  setTime(value: string) {
    this.filterTimeChange.emit(value);
  }

  setVehicle(type: '' | 'Car' | 'Bike') {
    this.vehicleFilterChange.emit(type);
  }

  onClear() {
    this.clearFilters.emit();
  }
}
