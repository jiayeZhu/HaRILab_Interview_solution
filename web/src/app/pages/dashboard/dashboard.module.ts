import { NgModule } from '@angular/core';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbTreeGridModule,
    NbIconModule,
    RouterModule,
    MatPaginatorModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
