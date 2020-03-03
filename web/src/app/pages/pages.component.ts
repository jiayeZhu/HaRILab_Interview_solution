import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {InfoManagerService} from '../services/info-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  constructor(
    private infoManager: InfoManagerService,
    private router: Router,
  ) {
    if (this.infoManager.clinicianUsername === undefined || this.infoManager.clinicianId === undefined) {
      this.router.navigate(['/auth/login']);
    }
  }
}
