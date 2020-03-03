import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { RequestManagerService } from '../../services/request-manager.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const PAGESIZE = 10;


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

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
  p: number = 1;
  total: number;
  loading: boolean;
  asyncData: Observable<FSEntry[]>;
  paginate= { id: 'server', itemsPerPage: PAGESIZE, currentPage: 1, totalItems: 3 }
  customColumn = 'username';
  defaultColumns = [ 'alert (or not)', 'last time of report'];
  allColumns = ['username', 'alert (or not)', 'last time of report'];
  source: NbTreeGridDataSource<FSEntry>;
  private data: FSEntry[] = [
    {
      'username': 'user 1', 'alert (or not)': true, 'last time of report': '5', userId: 'userId1',
    },
    {
      'username': 'user 2', 'alert (or not)': false, 'last time of report': '400 KB', userId: 'userId2',
    },
    {
      'username': 'user 3', 'alert (or not)': false, 'last time of report': '109 MB', userId: 'userId3',
    },
  ];
  constructor(
    dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private requestManager: RequestManagerService,
  ) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      // childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      // expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.source = dataSourceBuilder.create(this.data, getters);
  }
  async ngOnInit() {
    // const result = await this.requestManager.getUserList(1);
    // console.log(result);
    this.getPage(1);
  }

  async getPage(page: number) {
    this.loading = true;
    this.asyncData = this.requestManager.getUserListRx( page).pipe(
        tap(res => {
            this.total = Math.ceil(res.msg.userCount / PAGESIZE);
            this.p = page;
            this.loading = false;
        }),
        map(res => res.msg.userList),
    );
    let result = await this.asyncData.toPromise();
    console.log(result)
}
}
