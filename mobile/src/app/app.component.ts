import { InfoManagerService } from './services/info-manager.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
import {Router} from "@angular/router";
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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      await this.infoManagerService.init();
      if (!this.infoManagerService.isRegistered()) {
        // console.log('设备未注册');
        const {uuid} = await Device.getInfo();
        // console.log('获取到uuid', uuid);
        await this.infoManagerService.setUUID(uuid);
        await this.router.navigate(['/register']);
      }
      this.splashScreen.hide();
    });
  }
}
