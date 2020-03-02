import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoManagerService {
  private _clinicianUsername: string;
  private _clinicianId: string;
  constructor() {
    if (sessionStorage.getItem('clinicianId')) this.clinicianId = sessionStorage.getItem('clinicianId');
    if (sessionStorage.getItem('clinicianUsername')) this.clinicianUsername = sessionStorage.getItem('clinicianUsername');
  }

  get clinicianUsername(): string {
    return this._clinicianUsername;
  }

  get clinicianId(): string {
    return this._clinicianId;
  }

  set clinicianUsername(value: string) {
    this._clinicianUsername = value;
    sessionStorage.setItem('clinicianId', value);
  }

  set clinicianId(value: string) {
    this._clinicianId = value;
    sessionStorage.setItem('clinicianUsername', value);
  }
}
