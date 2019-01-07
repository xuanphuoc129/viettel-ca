import { Component, Input } from '@angular/core';
import { ViettelCAs } from '../../providers/app-module/viettel-ca';

/**
 * Generated class for the ViettelCaPackageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'viettel-ca-package',
  templateUrl: 'viettel-ca-package.html'
})
export class ViettelCaPackageComponent {
  @Input("item") item: ViettelCAs = new ViettelCAs();
  constructor() {
  }

}
