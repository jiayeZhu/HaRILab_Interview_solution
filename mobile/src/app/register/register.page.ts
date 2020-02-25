import { RequestManagerService } from './../services/request-manager.service';
import { InfoManagerService } from './../services/info-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username;
  constructor(
    private infoManager: InfoManagerService,
    private requestManager: RequestManagerService
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {

  }

  async handleSubmit() {
    const uploadingBody = {
      username : this.username,
      uuid : this.infoManager.getUUID()
    };
    await this.infoManager.setUsername(this.username);
    console.log(uploadingBody);
    const result = await this.requestManager.newUserRegist(uploadingBody);
    console.log(result)
  }
}
