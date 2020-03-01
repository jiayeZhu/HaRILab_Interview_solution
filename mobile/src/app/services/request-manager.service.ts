import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';
import {InfoManagerService} from './info-manager.service';
import {DateTime} from 'luxon';

const baseUrl = 'http://jiayezhu.cn:3000/api';
// const baseUrl = '/api';
// const baseUrl = 'http://192.168.1.66:3000/api';

interface Response {
  errorCode: number;
  msg: any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestManagerService {

  constructor(
    // private http: HttpClient,
    private http: HTTP,
    public toastController: ToastController,
    private router: Router,
    private infoManager: InfoManagerService
  ) {
    this.http.setDataSerializer('json');
   }
  async Toast(message: string, duration= 2000) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  async newUserRegist(user: { username: any; uuid: string; }): Promise<Response> {
    this.http.clearCookies();
    let {data}  = await this.http.post(`${baseUrl}/user`, user, {});
    data = JSON.parse(data);
    if (data.errorCode === 0) {
      // store the username
      this.infoManager.userId = data.msg.userId;
      this.Toast('Success.', 1000);
      this.router.navigate(['/tabs']);
    } else {
      this.Toast(data.msg);
    }
    return Promise.resolve(data as Response);
  }
  async createSession(): Promise<Response> {
    this.http.clearCookies();
    let {data} = await this.http.post(`${baseUrl}/user/${this.infoManager.userId}/session`,
                                        {username: this.infoManager.username, uuid: this.infoManager.uuid}, {});
    data = JSON.parse(data);
    if (data.errorCode !== 0) {
      this.Toast(data.msg, 5000);
    }
    return Promise.resolve(data as Response);
  }
  async updateRecord(attackId: string, record: {date: Date; location: number; }): Promise<Response> {
    let {data} = await this.http.put(`${baseUrl}/user/${this.infoManager.userId}/attack/${attackId}`, record, {});
    data = JSON.parse(data);
    if (data.errorCode === 0) {
      this.Toast('Success.', 1000);
    } else {
      this.Toast(data.msg, 2000);
    }
    return Promise.resolve(data as Response);
  }
  async postRecord(record: {date: Date; location: number; }): Promise<Response> {
    let {data} = await this.http.post(`${baseUrl}/user/${this.infoManager.userId}/attack`, record, {});
    data = JSON.parse(data);
    if (data.errorCode === 0) {
      this.Toast('Success.', 1000);
    } else {
      this.Toast(data.msg, 2000);
    }
    return Promise.resolve(data as Response);
  }
  async getWeeklyRecord(): Promise<Response> {
    let {data} = await this.http.get(`${baseUrl}/user/${this.infoManager.userId}/attack`
                                      + `?from=${DateTime.local().minus({days: 7}).startOf('day').toISO()}`
                                      + `&to=${DateTime.local().startOf('day').toISO()}`, {}, {});
    data = JSON.parse(data);
    if (data.errorCode !== 0) {this.Toast(data.msg, 2000); }
    return Promise.resolve(data as Response);
  }
}
