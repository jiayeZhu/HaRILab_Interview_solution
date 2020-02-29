import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import {InfoManagerService} from "./info-manager.service";
import {DateTime} from 'luxon';

// const baseUrl = 'https://jiayezhu.cn/api';
const baseUrl = '/api'

interface Response {
  errorCode: number;
  msg: any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestManagerService {

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private router: Router,
    private infoManager: InfoManagerService
  ) { }
  async Toast(message: string, duration= 2000) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  async newUserRegist(user: { username: any; uuid: string; }): Promise<Response> {
    const result = await this.http.post(baseUrl + '/user', user).toPromise() as Response;
    if (result.errorCode === 0) {
      //store the username
      this.infoManager.userId = result.msg.userId;
      this.Toast('Success.', 1000);
      this.router.navigate(['/tabs']);
    } else {
      this.Toast(result.msg);
    }
    return Promise.resolve(result);
  }
  async createSession(): Promise<Response> {
    const result = await this.http.post(baseUrl+"/user/"+this.infoManager.userId+'/session',{username:this.infoManager.username, uuid:this.infoManager.uuid}).toPromise() as Response;
    if (result.errorCode !== 0){
      this.Toast(result.msg,5000)
    }
    return Promise.resolve(result);
  }
  async updateRecord(attackId:string,record:{date: Date; location: number;}): Promise<Response> {
    const result = await this.http.put(baseUrl+'/user/'+this.infoManager.userId+'/attack/'+attackId,record).toPromise() as Response;
    if (result.errorCode === 0){
      this.Toast('Success.', 1000);
    } else {
      this.Toast(result.msg,2000)
    }
    return Promise.resolve(result);
  }
  async postRecord(record: {date: Date; location: number;}): Promise<Response> {
    const result = await this.http.post(baseUrl+"/user/"+this.infoManager.userId+'/attack',record).toPromise() as Response;
    if (result.errorCode === 0){
      this.Toast('Success.',1000);
    } else {
      this.Toast(result.msg,2000);
    }
    return Promise.resolve(result);
  }
  async getWeeklyRecord(): Promise<Response>{
    const result = await this.http.get(`${baseUrl}/user/${this.infoManager.userId}/attack?from=${DateTime.local().minus({days:7}).startOf('day').toISO()}&to=${DateTime.local().startOf('day').toISO()}`).toPromise() as Response;
    if (result.errorCode !== 0) {this.Toast(result.msg, 2000)}
    return Promise.resolve(result);
  }
}
