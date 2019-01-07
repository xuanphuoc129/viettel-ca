import { Component } from '@angular/core';

/**
 * Generated class for the SimBusinessComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sim-business',
  templateUrl: 'sim-business.html'
})
export class SimBusinessComponent {

  text: string;

  constructor() {
    console.log('Hello SimBusinessComponent Component');
    this.text = 'Hello World';
  }

}
