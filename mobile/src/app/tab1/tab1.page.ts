import { Component } from '@angular/core';
import {InfoManagerService} from "../services/info-manager.service";
import {DateTime} from 'luxon';
import {RequestManagerService} from "../services/request-manager.service";
import {CacheService} from "../services/cache.service";
const locationMapping = {"indoor":1,"outdoor":0};

interface record {
  attackId: string,
  date: Date,
  location: number,
  createdAt: Date,
  updatedAt: Date
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  maxDate;
  minDate;
  record;
  submitDisabled;
  constructor(
      private infoManager: InfoManagerService,
      private requestManager : RequestManagerService,
      private cache: CacheService
  ) {
    this.record = {Date:null,location:null};
    this.submitDisabled = true;
  }
  setDateLimitation(){
    this.maxDate = DateTime.local().toISO();
    this.minDate = DateTime.local().minus({days:1}).toISO(); // can only report attack within 2 days
  }
  async submitRecord(){
    const postBody = {date: new Date(this.record.Date), location: locationMapping[this.record.location]}
    let result = await this.requestManager.postRecord(postBody);
    if (result.errorCode === 0) {
      const {attackId} = result.msg;
      const record = {
        attackId,
        date: new Date(this.record.Date).toISOString(),
        location: this.record.location,
      }
      //push this record to the local cache.
      this.cache.addRecord(record);
      this.record = {Date:null, location:null};
    }
  }
  checkAllowSubmit(){
    this.submitDisabled = !(!!this.record.Date && !!this.record.location);
  }
}
