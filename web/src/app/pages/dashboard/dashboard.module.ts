import { NgModule } from '@angular/core';
import { NbCardModule, NbTreeGridModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbTreeGridModule,
    NbIconModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
