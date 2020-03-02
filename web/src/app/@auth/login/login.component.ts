import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { RequestManagerService } from '../../services/request-manager.service';
import { InfoManagerService } from '../../services/info-manager.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  clinicianForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  validationResult = {
    username: true,
    password: true,
  };
  constructor(
    private fb: FormBuilder,
    private requestManager: RequestManagerService,
    private infoManager: InfoManagerService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {
    if (this.infoManager.clinicianId) { this.router.navigate(['/dashboard']); }
  }
  validateInput(key: string) {
    this.validationResult[key] = this.clinicianForm.get(key).valid;
  }
  async login() {
    let {username, password} = this.clinicianForm.value;
    password = Md5.hashStr(password);
    const result = await this.requestManager.login({username, password});
    if (result.errorCode === 0) {
      // store clinician info in Memory.
      this.infoManager.clinicianId = result.msg.clinicianId;
      this.infoManager.clinicianUsername = username;
      this.showToast('top-right', 'success', '');
      this.router.navigate(['/dashboard']);
    } else {
      this.showToast('top-right', 'danger', result.msg);
    }
  }
  showToast(position, status, msg) {
    this.toastrService.show(
      '',
      `${msg}`,
      { position, status });
  }
  ngOnInit() {

  }
}
