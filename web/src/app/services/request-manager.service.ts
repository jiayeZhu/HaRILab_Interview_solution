import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DateTime} from 'luxon';

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
  async getUserList(page: number): Promise<Response> {
    return this.http.get(`${baseUrl}/user?page=${page}`).toPromise() as Promise<Response>;
  }
  async getAttackList(userId: string, page: number): Promise<Response> {
    return this.http.get(`${baseUrl}/user/${userId}/attack?type=full&source=attacks&count=1&pageSize=10&page=${page}`)
                    .toPromise() as Promise<Response>;
  }
  async getWeeklyRecord(userId: string): Promise<Response> {
    return this.http.get(`${baseUrl}/user/${userId}/attack`
                                      + `?from=${DateTime.local().minus({days: 6}).startOf('day').toISO()}`
                                      + `&to=${DateTime.local().endOf('day').toISO()}`).toPromise() as Promise<Response>;
  }
}
