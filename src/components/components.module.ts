import { NgModule } from '@angular/core';
import { ViettelCaComponent } from './viettel-ca/viettel-ca';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ViettelProComponent } from './viettel-pro/viettel-pro';
import { SimPersonComponent } from './sim-person/sim-person';
import { SimBusinessComponent } from './sim-business/sim-business';
import { ViettelCaPackageComponent } from './viettel-ca-package/viettel-ca-package';
@NgModule({
	declarations: [ViettelCaComponent,
    ViettelProComponent,
    SimPersonComponent,
    SimBusinessComponent,
    ViettelCaPackageComponent],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [ViettelCaComponent,
    ViettelProComponent,
    SimPersonComponent,
    SimBusinessComponent,
    ViettelCaPackageComponent]
})
export class ComponentsModule {}
