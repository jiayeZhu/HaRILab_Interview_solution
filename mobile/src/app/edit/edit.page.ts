import { Component, OnInit } from '@angular/core';
import {InfoManagerService} from '../services/info-manager.service';
import {ActivatedRoute} from '@angular/router';
import {CacheService} from '../services/cache.service';
import {DateTime} from 'luxon';
import {RequestManagerService} from '../services/request-manager.service';
import {Location} from '@angular/common';

const locationMapping = {indoor: 1, outdoor: 0};

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  attackId;
  idx;
  record;
  submitDisabled;
  maxDate;
  minDate;
  constructor(
    public infoManager: InfoManagerService,
    private route: ActivatedRoute,
    private cache: CacheService,
    private requestManager: RequestManagerService,
    private loc: Location
  ) {
    this.submitDisabled = true;
  }

  ngOnInit() {
    this.idx = this.route.snapshot.paramMap.get('attackIdx');
    this.record = {Date: new Date(this.cache.attackRecordCache[this.idx].date).toISOString(),
                   location: this.cache.attackRecordCache[this.idx].location};
    this.attackId = this.cache.attackRecordCache[this.idx].attackId;
  }
  checkAllowSubmit() {
    this.submitDisabled = !(!!this.record.Date && !!this.record.location);
  }
  setDateLimitation() {
    this.maxDate = DateTime.local().toISO();
    this.minDate = DateTime.local().minus({days: 1}).toISO(); // can only report attack within 2 days
  }
  async updateRecord() {
    const postBody = {date: DateTime.fromISO(this.record.Date).startOf('minute').toISO(), location: locationMapping[this.record.location]};
    const result = await this.requestManager.updateRecord(this.attackId, postBody);
    if (result.errorCode === 0) {
      // update the existed record in cache
      const newCache = this.cache.attackRecordCache;
      newCache[this.idx].date = DateTime.fromISO(this.record.Date).startOf('minute').toISO();
      newCache[this.idx].location = this.record.location;
      this.cache.attackRecordCache = newCache;
      this.record = {Date: null, location: null};
      this.loc.back();
    }
  }
  async cancel() {
    // this.record = {Date:null, location:null};
    this.loc.back();
  }
}
