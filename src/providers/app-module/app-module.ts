import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AppConfig } from '../core/app-config';
import { EmailConfig } from '../core/email-config';
import 'rxjs/add/operator/map';
import { ViettelCAManager } from './viettel-ca';
import { DistrictManager } from '../core/District';
import { StorageController } from '../core/storage';
import { Storage } from '@ionic/storage';

declare var Email;

/*
  Generated class for the AppModuleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppModuleProvider {
  private mAppConfig: AppConfig;
  private mEmailConfig: EmailConfig = null;
  private mDistrictManager : DistrictManager = null;
  private mStorageController: StorageController;
  phone_number: string = "0962018555";
  constructor(
    public mStorage: Storage,
    public mModalController: ModalController,
    public mHttp: Http) {
    this.mAppConfig = new AppConfig();
    this.mEmailConfig = new EmailConfig();
    this.mDistrictManager = new DistrictManager();
  }

  public getStorageController() {
    return this.mStorageController;
  }


  public getDistrictManager(): DistrictManager{
    return this.mDistrictManager;
  }


  public onLoadDistrict(){
    this.onReadFileJson("./assets/data/tinh_tp.json").then((data)=>{
      if(data){
        this.getDistrictManager().onResponseCity(data["tinh_tp"]);
        console.log(data);
        
      }
    })
    this.onReadFileJson("./assets/data/quan_huyen.json").then((data)=>{
      if(data){
        this.getDistrictManager().onResponseDistrict(data["quan_huyen"]);
      }
    })
    this.onReadFileJson("./assets/data/xa_phuong.json").then((data)=>{
      if(data){
        this.getDistrictManager().onResponseCommunes(data["xa_phuong"]);
      }
    })
  }

  public getAppConfig() {
    return this.mAppConfig;
  }

  private getEmailConfig() {
    return this.mEmailConfig;
  }

  public onLoadAppConfig() {
    return this.onReadFileJson("./assets/data/data.json").then((data) => {
      if (data) {
        this.mAppConfig.onResponseConfig(data);
        this.onResponseConfig();
      }
    })
  }

  public onResponseConfig() {
    ViettelCAManager.getInstance().onLoadDataConfig(this.getAppConfig().get("viettel-ca"));
    let dataConfig = {
      email_receive: "kunlyblack@gmail.com",
      email_sender: "cuahangviettel.vn@gmail.com",
      smtp_server: "smtp.gmail.com",
      username: "cuahangviettel.vn@gmail.com",
      password: "eknpglqnwzyydbur"
    };
    this.getEmailConfig().parseData(dataConfig);
  }

  public onReadFileJson(link: string) {
    return new Promise((resolve, reject) => {

      this.mHttp.get(link).map(res => res.json()).subscribe(data => {
        if (data) {
          resolve(data);
        } else {
          reject();
        }
      });
    })
  }


  public showModal(page, params?: any, callback?: any): void {
    let modal = this.mModalController.create(page, params ? params : null, {
      enterAnimation: 'fade-in',
      leaveAnimation: 'fade-out'
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (callback) {
        callback(data);
      }
    })
  }

  public sendEmail(body) {
    this.doCheckFiveMinutes().then((res) => {
      Email.send(this.mEmailConfig.email_sender,
        this.mEmailConfig.email_receive,
        "Chuyển Mạng Giữ Số",
        body,
        this.mEmailConfig.smtp_server,
        this.mEmailConfig.username,
        this.mEmailConfig.password);
      let time = new Date();
      this.getStorageController().saveDataToStorage("time_send", time.getTime());
    }).catch(err=>{
      
    })
  }

  doCheckFiveMinutes() {
    return new Promise((resolve, reject) => {
      this.getStorageController().getDataFromStorage("time_send").then((res) => {
        if (res) {
          let time = parseInt(res);
          let nowTime = new Date().getTime();
          let distance = nowTime - time;
          if (Math.floor(distance / 60000) < 3) {
            reject(false);
            alert("Vui lòng đăng ký lại sau ít phút hoặc liên hệ hotline " + this.phone_number + " để được hỗ trợ");
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    })

  }


}
