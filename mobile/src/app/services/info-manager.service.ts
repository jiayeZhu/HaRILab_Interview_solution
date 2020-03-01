import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class InfoManagerService {
  private _username: string;
  private _uuid: string;
  private _userId: string;
  constructor() { }
  public async init() {
    const usernameValue = await Storage.get({key: 'username'});
    const uuidValue = await Storage.get({key: 'uuid'});
    const userIdValue = await Storage.get({key: 'userId'});
    this._username = usernameValue.value;
    this._uuid = uuidValue.value;
    this._userId = userIdValue.value;
    return Promise.resolve();
  }
  // public getUsername() {
  //   return this._username;
  // }
  // public getUUID() {
  //   return this._uuid;
  // }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
    Storage.set({key: 'userId', value: this._userId});
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
    Storage.set({key: 'username', value: this._username});
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
    Storage.set({key: 'uuid', value: this._uuid});
  }

  // public setUsername( username: string ) {
  //   this._username = username;
  //   return Storage.set({key: 'username', value: this._username});
  // }
  // public setUUID(uuid: string) {
  //   this._uuid = uuidc sec setUsername( username: string ) {
  //   this._username = username;
  //   return Storage.set({key: 'username', value: this._username});
  // }

  // public setUsername( username: string ) {
  //   this._username = username;
  //   return Storage.set({key: 'username', value: this._username});
  // }
  // public setUUID(uuid: string) {
  //   this._uuid = uuid;
  //   return Storage.set({key: 'uuid', value: this._uuid});
  // };
  //   return Storage.set({key: 'uuid', value: this._uuid});
  // }
  public isRegistered() {
    return !!this._username && !!this._uuid && !!this._userId;
  }
}
