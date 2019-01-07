import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPackageModalPage } from './select-package-modal';

@NgModule({
  declarations: [
    SelectPackageModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPackageModalPage),
  ],
})
export class SelectPackageModalPageModule {}
