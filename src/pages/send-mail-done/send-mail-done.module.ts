import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMailDonePage } from './send-mail-done';

@NgModule({
  declarations: [
    SendMailDonePage,
  ],
  imports: [
    IonicPageModule.forChild(SendMailDonePage),
  ],
})
export class SendMailDonePageModule {}
