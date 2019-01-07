import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ViettelCAs, ViettelCAManager } from '../../providers/app-module/viettel-ca';

/**
 * Generated class for the SelectPackageModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-package-modal',
  templateUrl: 'select-package-modal.html',
})
export class SelectPackageModalPage {
  mDatas: Array<ViettelCAs> = [];
  mType : number = 1;
  constructor(
    public mViewController: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data["type"]){
      let type = this.navParams.get("type");
      this.mType  = type;
      if(type == 1){
        this.mDatas = ViettelCAManager.getInstance().onLoadViettelCaNew();
      }else if(type == 2){
        this.mDatas = ViettelCAManager.getInstance().onLoadViettelCaContinue();
      }else if (type == 3){
        this.mDatas = ViettelCAManager.getInstance().onLoadViettelCaCombo();
      }else{
        this.mDatas = ViettelCAManager.getInstance().onLoadViettelCaComboContinue();
      }
    }
  }

  ionViewDidLoad() {
  }

  onClickRegister(item){
    this.mViewController.dismiss(item);
  }

}
