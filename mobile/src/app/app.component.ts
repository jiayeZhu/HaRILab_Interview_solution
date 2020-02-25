import { InfoManagerService } from './services/info-manager.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
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
    private infoManagerService: InfoManagerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      await this.infoManagerService.init();
      const storedUsername = this.infoManagerService.getUsername();
      const storedUUID = this.infoManagerService.getUUID();
      if (!storedUsername || !storedUUID) {
        console.log('设备未注册');
        console.log('username:', storedUsername, 'uuid:', storedUUID);
        const {uuid} = await Device.getInfo();
        console.log('获取到uuid', uuid);
        await this.infoManagerService.setUUID(uuid);
      }
      this.splashScreen.hide();
    });
  }
}
