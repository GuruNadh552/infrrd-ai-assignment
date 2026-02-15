import { Component, Input } from '@angular/core';
import { Ride } from 'src/app/models/ride';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})
export class RideListComponent {
  @Input() rides: Ride[] = [];
}
