import {Component, ViewChild} from '@angular/core';
import {InfoManagerService} from "../services/info-manager.service";
import {Chart} from 'chart.js';
import {DateTime} from 'luxon';
import {RequestManagerService} from "../services/request-manager.service";
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('barChart',{static:true}) barChart;
  weeklyBars;
  weeklyData = new Array(7);
  lastUpdateDate;
  get labels() {
    const l = [];
    for(let i = 0; i < 7; i++){
      l.unshift(DateTime.local().minus({days:i+1}).toFormat('LL/dd'))
    }
    return l;
  }

  constructor(
    private infoManager: InfoManagerService,
    private requestManager: RequestManagerService
  ) {}

  async ionViewDidEnter(){
    //if it's the first time enter the page or it's another day, get the weekly record from server
    if (this.lastUpdateDate === undefined || this.lastUpdateDate !== new Date().toLocaleDateString()){
      const result = await this.requestManager.getWeeklyRecord();
      if(result.errorCode === 0){
        let weeklyCount = {}
        for(let i = 0; i < 7; i++) {weeklyCount[this.labels[i]] = 0}
        weeklyCount = result.msg.map(e => DateTime.fromISO(e.date).toFormat("LL/dd")).reduce((acc,cur)=>{acc[cur]++;return acc},weeklyCount)
        for(let i = 0; i < 7; i++) { this.weeklyData[i] = weeklyCount[this.labels[i]] }
        if(this.weeklyBars) {this.weeklyBars.update()}
        else {this.createBarChart()}
      }
    }
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
        }]
      },
      options: {
        maintainAspectRatio:false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
