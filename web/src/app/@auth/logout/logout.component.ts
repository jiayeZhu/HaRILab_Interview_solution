import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoManagerService } from '../../services/info-manager.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private infoManager: InfoManagerService,
  ) { }

  ngOnInit() {
    this.infoManager.clear();
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 500);
  }

}
