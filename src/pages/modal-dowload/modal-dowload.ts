import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';

/**
 * Generated class for the ModalDowloadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'ModalDowloadPage',
    segment: 'dowload/:id'
  }
)
@Component({
  selector: 'page-modal-dowload',
  templateUrl: 'modal-dowload.html',
})
export class ModalDowloadPage {

  items1 = [];
  items2 = [];

  mId: number = 0;

  constructor(
    public mAppModule: AppModuleProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data['id']){
      this.mId = this.navParams.get("id");
    }

    if(this.mId == 0){
      this.mAppModule.onLoadDowloadFile().then((data)=>{
        if(data){
          this.items1 = data["Sheet1"];
        }
      }).catch(err=>{
        
      })
    }else{
      this.mAppModule.onLoadDowload1File().then((data)=>{
        if(data){
          this.items2 = data["Sheet1"];
        }
      }).catch(err=>{
        
      })
    }
   
  }

  ionViewDidLoad() {
    
  }

}
