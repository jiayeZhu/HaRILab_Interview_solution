import { RequestManagerService } from './../services/request-manager.service';
import { InfoManagerService } from './../services/info-manager.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username;
  constructor(
    private infoManager: InfoManagerService,
    private requestManager: RequestManagerService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    //check if already registered
    // if(this.infoManager.isRegistered()) { this.router.navigate(['/tabs']) }
  }

  async handleSubmit() {
    const uploadingBody = {
      username : this.username,
      uuid : this.infoManager.getUUID()
    };
    await this.infoManager.setUsername(this.username);
    // console.log(uploadingBody);
    const result = await this.requestManager.newUserRegist(uploadingBody);
    // console.log(result)infoManagerService
  }
}
