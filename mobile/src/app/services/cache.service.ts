import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DateTime } from 'luxon';
const { Storage } = Plugins;
interface record {
  attackId: string,
  date: string,
  location: number,
}
function recordSortFun (a: record,b: record){
  //the records list shoud be desc
  if(a.date < b.date) return 1;
  if(a.date > b.date) return -1;
  return 0;
}
@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _attackRecordCache: [record?];
  constructor() {
    this._attackRecordCache = [];
  }

  public async init(){
    const {value} = await Storage.get({key:'cacheRecord'});
    if (value !== null) {
      // initialize the in mem record cache, remove those record longer than 24 hours
      this.attackRecordCache = JSON.parse(value).filter(e=>DateTime.fromISO(e.date)>DateTime.local().minus({days:1}))
      await Storage.set({key:'cacheRecord',value:JSON.stringify(this.attackRecordCache)})
    }
    return Promise.resolve()
  }

  get attackRecordCache(): [record?] {
    return this._attackRecordCache.sort(recordSortFun);
  }

  set attackRecordCache(value: [record?]) {
    this._attackRecordCache = value;
    Storage.set({key:'cacheRecord',value:JSON.stringify(this.attackRecordCache)});
  }

  public addRecord (record) {
    this.attackRecordCache.push(record);
    Storage.set({key:'cacheRecord',value:JSON.stringify(this.attackRecordCache)})
  }
}
