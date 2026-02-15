import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss']
})
export class AddRideComponent {

  constructor(
    private _router:Router
  ){

  }

  navigateToHome(){
    this._router.navigateByUrl('/');
  }

}
