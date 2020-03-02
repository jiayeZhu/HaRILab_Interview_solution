import { Component, OnInit } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

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
  ) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      // childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      // expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.source = dataSourceBuilder.create(this.data, getters);
  }
  ngOnInit() {}
}
