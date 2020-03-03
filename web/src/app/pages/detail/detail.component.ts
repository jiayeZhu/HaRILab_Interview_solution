import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestManagerService } from '../../services/request-manager.service';
import {Chart} from 'chart.js';
import {DateTime} from 'luxon';
import {Location} from '@angular/common';
import { NbTreeGridDataSource, NbGetters, NbTreeGridDataSourceBuilder } from '@nebular/theme';


const PAGESIZE = 10;

interface FSEntry {
  'attack date': string;
  'attack time': boolean;
  'location': string;
}

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  total: number;
  pageSize: number;
  paginate= { id: 'server', itemsPerPage: PAGESIZE, currentPage: 1, totalItems: 3 };
  allColumns = ['attack date', 'attack time', 'location'];
  source: NbTreeGridDataSource<FSEntry>;
  private data: FSEntry[] = [];
  getters: NbGetters<FSEntry, FSEntry> = {
    dataGetter: (node: FSEntry) => node,
  };
  @ViewChild('barChart', {static: true}) barChart;
  userId;
  weeklyBars;
  weeklyData = new Array(7);
  lastUpdateDate;
  get labels() {
    const l = [];
    for (let i = 0; i < 7; i++) {
      l.unshift(DateTime.local().minus({days: i}).toFormat('LL/dd'));
    }
    return l;
  }
  constructor(
    dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private route: ActivatedRoute,
    private requestManager: RequestManagerService,
    private loc: Location,
  ) {
    this.pageSize = PAGESIZE;
    this.source = dataSourceBuilder.create(this.data, this.getters);
   }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getPage(1);
    // console.log(this.userId);
    if (this.lastUpdateDate === undefined || this.lastUpdateDate !== new Date().toLocaleDateString()) {
      const result = await this.requestManager.getWeeklyRecord(this.userId);
      if (result.errorCode === 0) {
        let weeklyCount = {};
        for (let i = 0; i < 7; i++) {weeklyCount[this.labels[i]] = 0; }
        weeklyCount = result.msg.map(e => DateTime.fromISO(e.date).toFormat('LL/dd'))
                                .reduce((acc, cur) => {acc[cur]++; return acc; }, weeklyCount);
        for (let i = 0; i < 7; i++) { this.weeklyData[i] = weeklyCount[this.labels[i]]; }
        if (this.weeklyBars) {this.weeklyBars.update(); } else {this.createBarChart(); }
      }
    }
  }
  async getPage(page: number) {
    const result = await this.requestManager.getAttackList(this.userId, page);
    this.total = result.msg.count;
    this.data = result.msg.attackList.map( e => {
      return ({
        'attack date': DateTime.fromISO(e.date).toFormat('DDD'),
        'attack time': DateTime.fromISO(e.date).toFormat('t'),
        'location': (e.location === 0) ? 'outside' : 'inside',
      });
      },
    );
    this.source.setData(this.data, this.getters);
  }

  createBarChart() {
    this.weeklyBars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Attacks in past 7 days',
          data: this.weeklyData,
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)',
        }],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }
}
