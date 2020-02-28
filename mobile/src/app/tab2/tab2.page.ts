import { Component } from '@angular/core';
import {InfoManagerService} from "../services/info-manager.service";
import {CacheService} from "../services/cache.service";
import {DateTime} from "luxon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(
    private infoManager: InfoManagerService,
    private cache: CacheService,
    private router: Router,
  ) {}
  // computed property like Vue. Very useful in this case
  get recordList() {
    // return records within 24 hours and map them to the right format
    return this.cache.attackRecordCache
        .filter(e=>DateTime.fromISO(e.date)>DateTime.local().minus({days:1}))
        .map(e=>{return {date:DateTime.fromISO(e.date).setLocale('en-US').toFormat("LLL/dd HH:mm"), location:e.location, attackId:e.attackId}})
  }

}
