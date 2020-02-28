import { InfoManagerService } from './services/info-manager.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import {Router} from "@angular/router";
import {RequestManagerService} from "./services/request-manager.service";
import {CacheService} from "./services/cache.service";
const { Device } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private infoManagerService: InfoManagerService,
    private router: Router,
    private requestManager: RequestManagerService,
    private cache: CacheService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      await this.infoManagerService.init();
      await this.cache.init();
      if (!this.infoManagerService.isRegistered()) {
        const {uuid} = await Device.getInfo();
        this.infoManagerService.uuid = uuid;
        await this.router.navigate(['/register']);
      }else{
        //create session
        await this.requestManager.createSession();
      }
      this.splashScreen.hide();
    });
  }
}
