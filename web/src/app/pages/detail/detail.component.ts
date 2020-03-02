import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestManagerService } from '../../services/request-manager.service';
import {Location} from '@angular/common';
@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  userId;
  constructor(
    private route: ActivatedRoute,
    private requestManager: RequestManagerService,
    private loc: Location,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log(this.userId);
  }
  async cancel() {
    this.loc.back();
  }
}
