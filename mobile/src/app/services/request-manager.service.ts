import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

const bashUrl = 'http://localhost:3000/api';

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
    private router: Router
  ) { }
  async Toast(message: string, duration= 2000) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
  async newUserRegist(user: { username: any; uuid: string; }): Promise<Response> {
    const result = await this.http.post(bashUrl + '/user', user).toPromise() as Response;
    if (result.errorCode === 0) {
      this.Toast('Success.', 1000);
      this.router.navigate(['/tabs']);
    } else {
      this.Toast(result.msg);
    }
    return Promise.resolve(result);
  }
}
