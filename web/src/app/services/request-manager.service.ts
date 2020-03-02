import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const baseUrl = 'http://jiayezhu.cn:3000/api';
const baseUrl = '/api';

interface Response {
  errorCode: number;
  msg: any;
}

@Injectable({
  providedIn: 'root',
})
export class RequestManagerService {

  constructor(
    private http: HttpClient,
  ) { }

  async newClinicianRegist(clinician: {username: string, password: string}): Promise<Response> {
    return this.http.post(`${baseUrl}/clinician`, clinician).toPromise() as Promise<Response>;
  }
  async login(clinician: {username: string, password: string}): Promise<Response> {
    return this.http.post(`${baseUrl}/clinician/${clinician.username}/session`, clinician).toPromise() as Promise<Response>;
  }
}
