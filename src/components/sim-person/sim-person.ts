import { Component } from '@angular/core';

/**
 * Generated class for the SimPersonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sim-person',
  templateUrl: 'sim-person.html'
})
export class SimPersonComponent {

  text: string;

  constructor() {
    console.log('Hello SimPersonComponent Component');
    this.text = 'Hello World';
  }

}
