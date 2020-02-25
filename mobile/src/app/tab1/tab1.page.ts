import { Component } from '@angular/core';
import {InfoManagerService} from "../services/info-manager.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
      private infoManager: InfoManagerService
  ) {}

}
