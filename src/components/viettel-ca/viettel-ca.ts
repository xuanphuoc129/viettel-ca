import { Component, Output, EventEmitter } from '@angular/core';
import { ViettelCAManager } from '../../providers/app-module/viettel-ca';

/**
 * Generated class for the ViettelCaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'viettel-ca',
  templateUrl: 'viettel-ca.html'
})
export class ViettelCaComponent {

  mViettelCA = [];
  mViettelCAContinue = [];
  mViettelCACombo = [];
  mViettelCAComboContinue = [];

  @Output("onRegister") mEvent = new EventEmitter();

  constructor() {
   
    this.mViettelCA = [
      {
        name: "Gói 1 năm",
        price: "1.045.000 đ",
        cts: "495.000 đ",
        price_device: "550.000 đ",
        des: "Thời gian sử dụng: 12 tháng + khuyến mại 6 tháng"
      },
      {
        name: "Gói 2 năm",
        price: "1.391.500 đ",
        cts: "841.500 đ",
        price_device: "550.000 đ",
        des: "Thời gian sử dụng: 24 tháng + khuyến mại 6 tháng"
      },
      {
        name: "Gói 3 năm",
        price: "1.188.000 đ",
        cts: "1.188.000 đ",
        price_device: "Miễn phí thiết bị",
        des: "Thời gian sử dụng: 36 tháng + khuyến mại 9 tháng"
      }
    ];

    this.mViettelCA = ViettelCAManager.getInstance().onLoadViettelCaNew();
    this.mViettelCAContinue = ViettelCAManager.getInstance().onLoadViettelCaContinue();
    this.mViettelCACombo = ViettelCAManager.getInstance().onLoadViettelCaCombo();
    this.mViettelCAComboContinue = ViettelCAManager.getInstance().onLoadViettelCaComboContinue();
  }

  onClickRegister(number){
    this.mEvent.emit(number);
    console.log(number);
    
  }

}
