import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class InfoManagerService {
  username: string;
  uuid: string;
  constructor() { }
  public async init() {
    const usernameValue = await Storage.get({key: 'username'});
    const uuidValue = await Storage.get({key: 'uuid'});
    this.username = usernameValue.value;
    this.uuid = uuidValue.value;
    return Promise.resolve();
  }
  public getUsername() {
    return this.username;
  }
  public getUUID() {
    return this.uuid;
  }
  public setUsername( username: string ) {
    this.username = username;
    return Storage.set({key: 'username', value: this.username});
  }
  public setUUID(uuid: string) {
    this.uuid = uuid;
    return Storage.set({key: 'uuid', value: this.uuid});
  }
}
