import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AppModuleProvider } from '../../providers/app-module/app-module';
import { ViettelCAs } from '../../providers/app-module/viettel-ca';
import { Utils } from '../../providers/core/util';
import { Questions } from '../../providers/app-module/questions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) myContent: Content;
  menuID: number = 1;
  isLoading: boolean = true;
  mCity: string = "Tỉnh/thành phố";
  mDistrict: string = "Quận/huyện";
  mLocal: string = "Xã/phường";
  mCityCode: string = "-1";
  mDistrictCode: string = "-1";
  mCommuneCode: string = "-1";
  mItemSelected: ViettelCAs = new ViettelCAs();

  mName: string = "";
  mPhone: string = "";
  mAddress: string = "";

  mQuestions: Array<Questions>  = [];
  mQuestions2: Array<Questions>  = [];
  mQuestionSelected: number = -1;
  mMode: number = 1;
  constructor(
    public mAppModule: AppModuleProvider,
    public navCtrl: NavController) {
    this.mAppModule.onLoadDistrict();
    this.mAppModule.onLoadAppConfig().then(() => {
      this.onLoadConfigSuccess();
    })
  }

  onChangeMode(number){
    this.mMode = number;
  }

  onLoadConfigSuccess() {
    this.isLoading = false;
    this.mQuestions = this.mAppModule.getAppConfig().get("question");
    this.mQuestions2 = this.mQuestions.filter((ele,index)=>{
      return index < 5;
    })
    console.log(this.mQuestions);
    
  }

  onClickQuestion(item){
    if(item == this.mQuestionSelected){
      this.mQuestionSelected = -1;
    }else{
      this.mQuestionSelected = item;
    }
  }

  // onClickItem(number){
  //   this.menuID = number;
  // }

  onClickRegister(type) {

    this.mAppModule.showModal("SelectPackageModalPage", { type: type }, (data) => {
      if (data) {
        this.mItemSelected = data;
        this.scrollToId("registerId");
      }
    })
  }

  scrollTo(scrollTop) {
    this.myContent.scrollTo(0, scrollTop, 200);
  }

  getScrollTopById(id) {
    let element = document.getElementById(id);

    if (element) {
      return element.offsetTop;
    } else {
      return 0;
    }
  }

  scrollToId(id) {
    this.scrollTo(this.getScrollTopById(id));
  }

  onClickCity() {
    let array = [];
    let citys = this.mAppModule.getDistrictManager().getCitys();
    citys.forEach(element => {
      array.push({
        id: element.code,
        name: element.name
      });
    });

    this.mAppModule.showModal("SelectAddressPage", { params: { title: "Chọn tỉnh/thành phố", items: array, selected: this.mCityCode } }, (id) => {
      if (id) {
        if (id != this.mCityCode) {
          this.mCityCode = id;
          let index = citys.findIndex(ele => {
            return ele.code == this.mCityCode;
          })
          if (index > -1) {
            this.mCity = citys[index].name;
          }
        }
      }
    });

  }

  onClickDistrict() {
    if (this.mCityCode == "-1") {
      alert("Bạn chưa chọn tỉnh/thành phố");
      return;
    } else {
      let array = [];
      let districts = this.mAppModule.getDistrictManager().getDistrictWithCityCode(this.mCityCode);
      districts.forEach(element => {
        array.push({
          id: element.code,
          name: element.cap + " " + element.name
        });
      });

      this.mAppModule.showModal("SelectAddressPage", { params: { title: "Chọn quận/huyện", items: array, selected: this.mDistrictCode } }, (id) => {
        if (id) {
          if (id != this.mDistrictCode) {
            this.mDistrictCode = id;
            let index = districts.findIndex(ele => {
              return ele.code == this.mDistrictCode;
            })
            if (index > -1) {
              this.mDistrict = districts[index].cap + " " + districts[index].name;
            }
          }
        }
      });
    }
  }

  onClickCommune() {
    if (this.mDistrictCode == "-1") {
      alert("Bạn chưa chọn quận/huyện");
      return;
    } else {
      let array = [];
      let communes = this.mAppModule.getDistrictManager().getDistrictWithDistrictCode(this.mDistrictCode);
      communes.forEach(element => {
        array.push({
          id: element.code,
          name: element.cap + " " + element.name
        });
      });

      this.mAppModule.showModal("SelectAddressPage", { params: { title: "Chọn xã/phường", items: array, selected: this.mCommuneCode } }, (id) => {
        if (id) {
          if (id != this.mCommuneCode) {
            this.mCommuneCode = id;
            let index = communes.findIndex(ele => {
              return ele.code == this.mCommuneCode;
            })
            if (index > -1) {
              this.mLocal = communes[index].cap + " " + communes[index].name;
            }
          }
        }
      });
    }
  }

  onClickSendInformation() {
    if (this.checkForm()) {
      this.mAppModule.sendEmail(this.createBodyMail());
      this.mAppModule.showModal("SendMailDonePage", {params: this.mPhone},()=>{
        this.resetData();
      });
    } else {
      return;
    }
  }

  checkForm(): boolean {
    if(this.mItemSelected.id == -1){
      alert("Bạn vui lòng chọn gói cước");
      this.scrollToId('tablePriceId');
      return false;
    }

    if (this.mName.trim() == '') {
      alert("Bạn chưa điền tên");

      return false;
    }
    if (this.mPhone.trim() == '' || !Utils.isValidPhone(this.mPhone) || this.mPhone.length < 9 || this.mPhone.length > 11 || parseInt(this.mPhone) < 299999999) {
      alert("Số điện thoại không hợp lệ");
      return false;
    }

    if (this.mCityCode == "-1" || this.mDistrictCode == "-1" || this.mCommuneCode == "-1") {
      alert("Vui lòng chọn đầy đủ địa chỉ");
      return false;
    }

    return true;
  }

  createBodyMail() {
    let l1 = "Họ tên: " + this.mName;
    let l2 = "Số điện thoại: " + this.mPhone;
    let l3 = "Địa chỉ: " + this.mLocal + ", " + this.mDistrict + ", " + this.mCity;
    let l4 = "Địa chỉ chi tiết: " + this.mAddress;
    let typeName = "";
    if (this.mItemSelected.type == 1) {
      typeName = " Gói cước Viettel CA";
    } else if (this.mItemSelected.type == 2) {
      typeName = " Gia hạn Viettel CA";
    } else if (this.mItemSelected.type == 3) {
      typeName = "Gói cước Viettel CA + BHXH";
    } else {
      typeName = "Gia hạn Viettel CA + BHXH";
    }
    let l5 = "Đăng ký: " + typeName + " - " + this.mItemSelected.name;

    return l1 +"; "+l2 +"; "+ l5 +"; "+ l3 +"; "+ l4 ;
  }

  resetData(){
    this.mName = "";
    this.mPhone = "";
    this.mAddress = "";
    this.mCityCode = "-1";
    this.mCity  = "Tỉnh/thành phố";
    this.mDistrict = "Quận/huyện";
    this.mDistrictCode = "-1";
    this.mLocal = "Xã/phường";
    this.mCommuneCode = "-1";
    this.mItemSelected = new ViettelCAs();
  }

}
