import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { RequestManagerService } from '../../services/request-manager.service';
import { Router } from '@angular/router';
import { InfoManagerService } from '../../services/info-manager.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  clinicianForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordRepeat: ['', Validators.required],
  });
  validationResult = {
    username: true,
    password: true,
    passwordRepeat: true,
  };
  passwordMatched = true;
  constructor(
    private fb: FormBuilder,
    private requestManager: RequestManagerService,
    private infoManager: InfoManagerService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {
    if (this.infoManager.clinicianId) { this.router.navigate(['/dashboard']); }
  }
  async regist() {
    // tslint:disable-next-line: prefer-const
    let {username, password} = this.clinicianForm.value;
    password = Md5.hashStr(password);
    const result = await this.requestManager.newClinicianRegist({username, password});
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
  validateInput(key: string) {
    this.validationResult[key] = this.clinicianForm.get(key).valid;
  }
  validatePasswordRepeat() {
    this.passwordMatched = this.clinicianForm.value.passwordRepeat === this.clinicianForm.value.password;
    this.validationResult.passwordRepeat = this.passwordMatched;
    this.validationResult.password = this.passwordMatched;
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
