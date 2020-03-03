import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RequestManagerService } from '../../services/request-manager.service';
import {DateTime} from 'luxon';

const PAGESIZE = 10;


// interface TreeNode<T> {
//   data: T;
//   children?: TreeNode<T>[];
//   expanded?: boolean;
// }

interface FSEntry {
  'username': string;
  'alert (or not)': boolean;
  'last time of report': string;
  userId: string;
}

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  total: number;
  pageSize: number;
  paginate= { id: 'server', itemsPerPage: PAGESIZE, currentPage: 1, totalItems: 3 }
  customColumn = 'username';
  defaultColumns = [ 'alert (or not)', 'last time of report'];
  allColumns = ['username', 'alert (or not)', 'last time of report'];
  source: NbTreeGridDataSource<FSEntry>;
  private data: FSEntry[] = [];
  getters: NbGetters<FSEntry, FSEntry> = {
    dataGetter: (node: FSEntry) => node,
    // childrenGetter: (node: FSEntry) => node.childEntries || undefined,
    // expandedGetter: (node: FSEntry) => !!node.expanded,
  };
  constructor(
    dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private requestManager: RequestManagerService,
  ) {
    this.pageSize = PAGESIZE;
    this.source = dataSourceBuilder.create(this.data, this.getters);
  }
  async ngOnInit() {
    // const result = await this.requestManager.getUserList(1);
    // console.log(result);
    this.getPage(1);
  }

  async getPage(page: number) {
    const result = await this.requestManager.getUserList(page);
    this.total = result.msg.userCount;
    this.data = result.msg.userList.map( e => {
      const lastDate = DateTime.fromISO(e.lastAttack);
      return ({
        username: e.username,
        'last time of report': lastDate.isValid ? lastDate.toLocaleString(DateTime.DATETIME_FULL) : null,
        userId: e._id,
        'alert (or not)': DateTime.fromISO(e.lastAttack) < DateTime.local().minus({days:2})
      });
      },
    );
    this.source.setData(this.data, this.getters);
  }
}
