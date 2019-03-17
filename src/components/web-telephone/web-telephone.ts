import { Component } from '@angular/core';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the WebTelephoneComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'web-telephone',
  templateUrl: 'web-telephone.html'
})
export class WebTelephoneComponent {

  phone: string = "0973950482";
  phone_show: string = "0973.950.482";
  constructor(public mAppModule: AppModuleProvider) {
    this.mAppModule.onLoadAppConfig().then(()=>{
      this.phone = this.mAppModule.getAppConfig().get("telephone");
      this.phone_show = this.mAppModule.getAppConfig().get("phone_show");
    })
  }

}
